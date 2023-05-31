define([ 'jquery', 'statics-core/js/core/log', 
         'statics-core/js/core/ajax', 
         'statics-components/js/componentes/messageBox/messageBox', 
         'statics-core/js/core/componentParser', 
         'statics-core/js/core/topic', 
         'statics-components/js/componentes/loading/loading', 
         'statics-core/js/core/mobileUtil', 
         'statics-core/js/core/util', 
         'statics-core/js/core/tabIndex', 
         'jquery.hashchange', 
         'statics-core/js/core/richString', 
         'jquery.corner', 
         'statics-core/js/lib/flowtype', 
         'statics-core/dropkick/js/dropkick.min', 
         'statics-core/js/lib/datatables.bootstrap' ], function($, log, AjaxNB, Message, ComponentParser, Topic, Loading, MobileUtil, Util) {
    var loadContent = {
        init: function() {
            Topic('/loadPage/begin').subscribe($.proxy(this.loadingBegin, this));
            Topic('/loadPage/end').subscribe($.proxy(this.loadingEnd, this));
            Topic('/conta/selecionada').subscribe($.proxy(this.contaSelecionada, this));
            Topic('/loadPage/begin').subscribe($.proxy(this.toggleBGTopoInterna, this));
            $(document).on('changeHeight', '[data-component="carouselInternal"]', $.proxy(this.calculaBGTopoInterna, this));
            function debouncer(func, timeout) {
                var timeoutID, timeout = timeout || 200;
                return function() {
                    var scope = this, args = arguments;
                    clearTimeout(timeoutID);
                    timeoutID = setTimeout(function() {
                        func.apply(scope, Array.prototype.slice.call(args));
                    }, timeout);
                };
			   }
			$(window).resize(debouncer(this.calculaBGTopoInterna));
			jQuery(window).hashchange($.proxy(this.hashChanged, this));
            if (location.hash) {
				jQuery(window).hashchange();
            } else {
				if (this.isPageLogin()) {
                    location.hash = '#!nb/login';
				} else if (this.isHomePage()) {
                    location.hash = '#!/sinbc/nb/carrossel';
				}
			}
			this.marginMobile();
		},
        popstate: function() {
			if (location.pathname === '/sinbc/nb/home' && window.location.hash === '') {
				window.location.hash = '#!/sinbc/nb/carrossel';
			}
		},
        loadingBegin: function() {
          
		},
        loadingEnd: function() {
            this.preventFormSubmission();
            this.calculaBGTopoInterna();
		},
        marginMobile: function() {
            if (MobileUtil.isMobile() && !MobileUtil.isiPad() && !MobileUtil.isiPhone()) {
                $('body').attr('style', '');
                var seletorInputs = '[type=number], [type=text], [type=tel], [type=password],textarea';
            	$(document).on('focus.1', seletorInputs, function(event) {
                    var $input = $(this), marginHeight = 500;
                    $('body').css({
                        'padding-bottom': marginHeight + 'px'
                    }).promise().done(function() {
                        var scrollTop = Number($input.offset().top - 30), atualScrollTop = $('body').scrollTop();
                        if (scrollTop > -1) {
                            $('body').data({
                                atualScrollTop: atualScrollTop,
                                scrollTop: scrollTop
	                		});
                            window.scrollTo(window.scrollX, scrollTop);
	                	}
                        if ($('.blocLoginCinza').length < 1) {
                            $('body').removeClass('androidFix');
		                }
	                });
                });
            	$(document).on('blur.1', seletorInputs, function() {
                    $('body').attr('style', '');
                	var scrollTop = Number($('body').data('atualScrollTop'));
            		window.scrollTo(window.scrollX, scrollTop);
                });
            }
		},
		setUrl: function(url) {
            location.hash = '#!' + url;
		},
        isPageLogin: function() {
            if (location.pathname.match('home')) {
				return false;
			}
            return !!location.pathname.match(/sinbc/);
		},
        isHomePage: function() {
            return location.pathname == '/sinbc/nb/home' && (window.location.hash == '' || window.location.hash == '#!/sinbc/nb/carrossel');
		},
        toogleBarraAcessSuperior: function() {
            if (!$('.acessSuperior').is(':visible')) {
                $('.BGTopo').addClass('semAcessSuperior');
            } else {
                $('.BGTopo').removeClass('semAcessSuperior');
                $('.BGTopo').data('heightAcessSuperior', $('.acessSuperior').height());
			}
		},
        calculaBGTopoInterna: function() {
            if ($('[data-component="carouselInternal"]').length) {
				var hCarroselInernal = Number($('[data-component="carouselInternal"]').height());
				$('.BGTopoInterna .complemento-headerPrincipal').height(hCarroselInernal);
			}
			loadContent.toogleBarraAcessSuperior();
		},
        toggleBGTopoInterna: function() {
            if (this.isHomePage()) {
                $('.BGTopo').removeClass('BGTopoInterna');
                $('#home').addClass('homeCarousel');
            } else {
                $('.BGTopo').addClass('BGTopoInterna');
                $('#home').removeClass('homeCarousel');
			}
			this.toogleBarraAcessSuperior();
        },
		hashChanged: function(e) {
			var hashContent = location.hash;
            if (document.getElementById('overlay')) {
                document.getElementById('overlay').style.display = 'none';
            }
            if (!this.hashValid(hashContent)) {
                log.debug('Hash ' + hashContent + ' nao atende o padrao #!pagina');
				return;
			}
			hashContent = hashContent.substr(2);
            if (hashContent.startsWith('/SIIBC')) {
                hashContent = hashContent.replace('interna#!', 'interna');
                context = 'sinbc';
			} else {
				context = null;
			}
			var ajax = new AjaxNB(hashContent, context);
            Topic('/loadPage/begin').publish();
			var url = hashContent;
            if (context) {
                url = '/' + context  + url.replace('/nb', 'nb');
            }
            if (hashContent.startsWith('/SIIBC')) {
                ajax.type('html').sync().get($.proxy(this.setPage, this), $.proxy(this.errorOnGetPage, this, hashContent));
            } else {
                ajax.type('html').get($.proxy(this.setPage, this), $.proxy(this.errorOnGetPage, this, hashContent));
            }
			
			var uri = $(location).attr('href').substring($(location).attr('href').length -4, $(location).attr('href').length);
			if (!this.isHomePage()) {				
				$(".escondeCarousel").css("margin-left", "0px");
				$(".escondeCarousel").css("position", "relative");
				$(".pesquisaPrincipal").hide();
				$(".painelUsuario .usuario").hide();
				$(".painelUsuario .acesso").hide();				
				//Esconde todos os messageBox abertos
				$(".messageBox").fadeOut(0);
				$(".messageBox p").html("");
            }
            var divTools = document.querySelector('.row.tools');
            if (divTools) {
                if (!/carrossel/.exec(hashContent)) {
                    divTools.classList.add('hide');
                } else {
                    divTools.classList.remove('hide');
                }
            }
		},
        hashValid: function(hashContent) {
			var validHashRegex = /^#!.+/;
            if (hashContent.match('sinbc-portalbanking') != null) {
				return false;
			}
			return validHashRegex.test(hashContent);
		},
        setPage: function(htmlPage) {
            var $conteudo = $('#conteudo');
            if ($conteudo.length == 0) {
                setTimeout($.proxy(this.setPage, this, htmlPage), 1e3);
                return;
            }
            if (!this.isHomePage()) {
                if ($('#corpoPrincipal').hasClass('fundoCorpoPrincipal')) {
                    $('#corpoPrincipal').removeClass('fundoCorpoPrincipal');
                    $('#corpoPrincipal').addClass('corpoPrincipal');
            	}
                $('.messageBox').fadeOut(0);
                $('.messageBox p').html('');
            }
            $conteudo.html(htmlPage).promise().done($.proxy(function() {
            	this.showMessageErrorPage();
				$('button').corner('3px');
				$('.roundCorners').corner('10px');
				ComponentParser.parse($conteudo);
                if ($.fn.dropkick) $('.selectCinza').dropkick();
            }, this));
            Topic('/loadPage/end').publish();
		},
		preventFormSubmission: function() {
            $.each($('#conteudo').find('form'), function(i, form) {
                $(form).submit(function(e) {
					e.preventDefault();
					log.debug('Impediu envio do form id=' + form.id);
					return false;
				});
				$(form).on('keypress', function(e) {
					if (e.which == 13 || e.keyCode == 13) {
						e.preventDefault();
						log.debug('Impediu envio do form id=' + form.id);
					}
				});
			});
		},
        errorOnGetPage: function(hashContent, jqXhr, errorStatus, errorThrown) {
            log.error('Erro ao carregar pagina: ' + hashContent);
            log.error('Status: ' + errorStatus);
            if (jqXhr.status == 404) {
                var ajax = new AjaxNB('/sinbc/nb/home/pageNotFound');
                ajax.type('html').get($.proxy(this.setPage, this), $.proxy(this.errorOnGetPage, this, hashContent));
            } else {
                Topic('/loadPage/end').publish();
            }
		},
        showMessageErrorPage: function() {
            $('.fieldErrorView').each(function() {
                if (this.id != 'undefined' && this.id != null) {
					var id = this.id.substr(0, this.id.indexOf('.'));
                    var msg = this.innerHTML;
                    var div = $('<div></div>');
                    $('body').append(div);
					var msgBox = new Message(div, {
						msg: msg,
						element: id
					});
					msgBox.showMessage();
				}
			});
		},
        contaSelecionada: function() {
			hash = window.location.hash;
            if (hash.startsWith('#!/sinbc-saldo/nb/consultaSaldo') || hash.startsWith('#!/sinbc-saldo/nb/ExtratoFlex') || hash.startsWith('#!/sinbc-saldo/nb/linhaTempo')) {
				date = new Date();
				separator = hash.indexOf('?') > -1 ? '&' : '?';
				window.location.hash = hash + separator + date.getTime();
			}
		}
	};
	return loadContent;
});