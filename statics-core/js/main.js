requirejs.config({
    baseUrl: '/',
    urlArgs: 'v=38',
    paths: {
        'jquery': 'statics-core/js/lib/jquery',
        'jquery.ui': 'statics-core/js/lib/jquery-ui',
        'mustache': 'statics-core/js/lib/mustache',
        'class': 'statics-core/js/lib/class',
        'text': 'statics-core/js/lib/text',
        'component': 'statics-core/js/lib/component',
        'messages': 'statics-core/js/lib/messages',
        'jquery.moodular': 'statics-core/js/lib/jquery.moodular',
        'jquery.moodular.controls': 'statics-core/js/lib/jquery.moodular.controls',
        'jquery.moodular.effects': 'statics-core/js/lib/jquery.moodular.effects',
        'jquery.formatoautofill.min': 'statics-core/js/lib/jquery.formautofill.min',
        'jquery.sweet.pages': 'statics-core/js/lib/jquery.sweet.pages',
        'jquery.hashchange': 'statics-core/js/lib/jquery.ba-hashchange.min',
        'jquery.carouFredSel': 'statics-core/js/lib/jquery.carouFredSel-6.2.0-packed',
        'jquery.jcarousel': 'statics-core/js/lib/jquery.jcarousel',
        'jquery.transit': 'statics-core/js/lib/jquery.transit.min',
        'jquery.ba-throttle-debounce': 'statics-core/js/lib/jquery.ba-throttle-debounce.min',
        'jquery.blackcalculator': 'statics-core/js/lib/jquery.blackcalculator.beta.min',
        'jquery.formatNumber': 'statics-core/js/lib/jquery.format-1.2.min',
        'jquery.breadcrumb': 'statics-core/js/lib/jquery.breadcrumb',
        'jquery.corner': 'statics-core/js/lib/jquery.corner',
        'jquery.mask.min': 'statics-core/js/lib/jquery.mask.min',
        'jquery.dragsort': 'statics-core/js/lib/jquery.dragsort-0.5.1',
        'jquery.touch.punch': 'statics-core/js/lib/jquery.ui.touch-punch-0.2.3',
        dropkick: 'statics-core/dropkick/js/dropkick.min',
        datatables: 'statics-core/js/lib/jquery.dataTables',
        interact: 'statics-core/js/lib/interact',
        comboMultiSelect: 'statics-core/js/lib/jquery.multiple.select',
        bootstrap: 'statics-core/bootstrap/js/bootstrap',
        detectmobilebrowser: 'statics-core/js/lib/detectmobilebrowser',
        'datatables.bootstrap': 'statics-core/js/lib/datatables.bootstrap',
        'warsaw.wrapper': 'statics-core/js/warsaw/warsaw-wrapper',
        'warsaw.agent': 'statics-core/js/warsaw/warsaw-agent',
        'warsaw-json': 'statics-core/js/warsaw/warsaw-json',
        'warsaw-platform-detect': 'statics-core/js/warsaw/warsaw-platform-detect',
        'warsaw-swfobject': 'statics-core/js/warsaw/warsaw-swfobject',
        'warsaw-typedarray': 'statics-core/js/warsaw/warsaw-typedarray',
        'warsaw-web_socket': 'statics-core/js/warsaw/warsaw-web_socket',
        'jquery.masonry': 'statics-core/js/lib/jquery.masonry.min',
        'jquery.touchSwipe': 'statics-core/js/lib/jquery.touchSwipe.min',
        'datalist': 'statics-core/js/lib/datalist',
        'datalist.scroll': 'statics-core/js/lib/datalist.scroll'
    },
    shim: {
        'jquery.ui': {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'jquery.carouFredSel': {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'jquery.jcarousel': {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'jquery.transit': {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'jquery.ba-throttle-debounce': {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'jquery.blackcalculator': {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'jquery.formatNumber': {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'jquery.hashchange': {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'jquery.moodular': {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'jquery.moodular.controls': {
            deps: [ 'jquery', 'jquery.moodular' ],
            exports: '$'
        },
        'jquery.moodular.effects': {
            deps: [ 'jquery', 'jquery.moodular' ],
            exports: '$'
        },
        'jquery.formatoautofill.min': {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'jquery.breadcrumb': {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'jquery.corner': {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'jquery.dragsort': {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'jquery.touch.punch': {
            deps: [ 'jquery', 'jquery.ui' ],
            exports: '$'
        },
        dropkick: {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'jquery.mask.min': {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'datatables.bootstrap': {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'jquery.masonry': {
            deps: [ 'jquery' ],
            exports: '$'
        },
        'jquery.touchSwipe': {
            deps: [ 'jquery' ],
            exports: '$'
        }

    },
    waitSeconds: 0
});

require([ 'jquery', 
          'statics-core/js/core/loadContent', 
          'statics-core/js/core/componentParser', 
          'statics-core/js/gbuster/gbuster_base', 
          'statics-core/js/core/topic', 
          'jquery.mask.min',
          'mustache',
          'statics-core/js/lib/mustache-wax'], 
			function($, loadContent, ComponentParser, GBusterBase, Topic, jQuery ,Mustache, MustacheWax) {
    ComponentParser.parse();
    loadContent.init();
    Mustache.Formatters = {
			"currencyFormatter": function (value) {
				if(value.indexOf(',') > -1){
					return parseInt(value.replace('.', '')).toLocaleString('pt-BR') + ','  + value.split(',')[1];
				}else if(value.indexOf('.') > -1){
					return parseInt(value).toLocaleString('pt-BR') + ','  + value.split('.')[1];
				}else{
					return parseInt(value.substring(0, value.length-2)).toLocaleString('pt-BR') + ','  + value.substring(value.length-2);
				}
				
			}, 
			"dateFormatter": function (value) {
				if(value.length === 8){
					return value.substring(0, 2) + '/' + value.substring(2, 4) + '/' + value.substring(4, 8);
				}else{
					return "";
				}
				
			},
			"cpfCnpjFormatter": function (value) {
				if(value.length === 11){
					return value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6, 9)  + '-' + value.substring(9, 11);
				}else{
					return value.substring(0, 2) + '.' + value.substring(2, 5) + '.' + value.substring(5, 8) + '/' +  value.substring(8, 12) + '-' +  value.substring(12, 14);
				}
				
			},
			"cepFormatter": function (value) {
				if(value.length == 8){
					return value.substring(0,5) + "-" + value.substring(5);
				}else{
					return value;
				}
			},
			"fullDateFormatter": function(value) {
				try {
					var data = new Date(value);
	
					var dia = data.getDate().toString(),
						diaF = (dia.length == 1) ? '0' + dia : dia,
						mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
						mesF = (mes.length == 1) ? '0' + mes : mes,
						anoF = data.getFullYear();
					return diaF + "/" + mesF + "/" + anoF;
	
				} catch (e) {
					return "";
				}
			},
			"currencyFormatterAlt": function(value) {
				if (value.indexOf(".") == -1) {
					value = value + ".00";
				}				
				if (value.indexOf(',') > -1) {
					return parseInt(value.replace('.', '')).toLocaleString('pt-BR') + ',' + value.split(',')[1];
				} else if (value.indexOf('.') > -1) {
					return parseInt(value).toLocaleString('pt-BR') + ',' + value.split('.')[1];
				} else {
					return parseInt(value.substring(0, value.length - 2)).toLocaleString('pt-BR') + ',' + value.substring(value.length - 2);
				}
	
			},
		};
    $.extend(window, {
        listAsyncComponentElements: {},
        setValuesAsyncComponent: function() {
            var selectores = Object.keys(this.listAsyncComponentElements);
            $.each(selectores, $.proxy(function(i, selector) {
                if (!this.listAsyncComponentElements.hasOwnProperty(selector)) {
                    return true;
                }
                var obj = this.listAsyncComponentElements[selector];
                if (selector[0] == '#') {
                    selector = '[id=\'' + selector.slice(1) + '\']';
                }
                var $el = $(selector);
                if (obj.set || !$el.length) {
                    return true;
                }
                $el.val(obj.value);
                obj.set = true;
            }, this));
        },
        addValueAsyncComponent: function(element, value) {
            if (Object.keys(this.listAsyncComponentElements).length == 0) {
                Topic('/component/rendered').subscribe($.proxy(this.setValuesAsyncComponent, this));
            }
            var selector = typeof element == 'string' ? element : element.selector;
            this.listAsyncComponentElements[selector] = {
                value: value,
                set: false
            };
        }
    });
 
    $(document).ready(function() {
        
        $.ajax({
            method: 'GET',
            url: '/sinbc/nb/login/getAmbiente'
        }).done(function(data) {
            ambiente = data.ambiente;
            $.ajax({
                type: 'GET',
                url: '/statics-portal/conteudo_login/' + ambiente + '/rodapeConteudo.json',
                dataType: 'json',
                crossDomain: true,
                cache: false,
                success: rodapeConteudo,
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Ocorreu um erro ao carregar o rodap\u00E9.');
                }
            });
        });
        $('body').on('click', '#mobileVolta', function(evt) {
            var headerXs = {
                $el: $(evt.target),
                seletoresBtnVoltar: [ '#btnVoltar', '#btnRetornar', '.btnVoltar' ],
                findBtnVoltar: function() {
                    var $btn = null;
                    var seletoresContainerBtnVoltar = [ $('[data-component="keyboard"]'), this.$el.parents('#conteudo') ];
                    var find = function(i, $container) {
                        if (!$container.length) {
                            return true;
                        }
                        $.each(this.seletoresBtnVoltar, $.proxy(function(i, selector) {
                            if ($container.find(selector).length && $container.find(selector) != this.$el) {
                                $btn = $container.find(selector);
                                return false;
                            }
                        }, this));
                    };
                    $.each(seletoresContainerBtnVoltar, $.proxy(find, this));
                    if ($btn !== null) return $btn;
                },
                fnHeaderVolta: function(e) {
                    e.preventDefault();
                    var $btnVoltar = this.findBtnVoltar();
                    if ($btnVoltar !== undefined && $btnVoltar.length) {
                        $btnVoltar.click();
                    } else {
                        history.back();
                    }
                }
            };
            return $.proxy(headerXs.fnHeaderVolta(evt), headerXs);
        });
        $('.skip').click(function(event) {
            var skipTo = '#' + $(this).attr('data-href');
            if (skipTo == '#pesquisa') {
                $('.pesquisaPrincipal').show();
            } else if (skipTo == '#categoriaContainer') {
                if ($('#categoriaContainer').length == false) {
                    skipTo = '#categoriaInterno';
                }
            } else if (skipTo == '#toolbarOpen') {
                $('.botaoRodapeAlerta').click();
                skipTo = '#toolbarOpen .toolbarOpenButtons a';
            } else if (skipTo == '#conteudo') {
                if ($('#conteudo input[type!=\'hidden\']:visible').length != false) {
                    skipTo = '#conteudo input[type!=\'hidden\']:visible';
                } else if ($('#conteudo button:visible').length != false) {
                    skipTo = '#conteudo button:visible';
                } else if ($('#conteudo div:not(#breadCrumbPath) a:visible').length != false) {
                    skipTo = '#conteudo div:not(#breadCrumbPath) a:visible';
                }
            }
            setTimeout(function() {
                var elem = $(skipTo).first().attr('tabindex', -1).on('blur focusout', function() {
                    $(this).removeAttr('tabindex');
                }).focus();
                window.scrollTo(0, elem.offset().top - 20);
            }, 10);
        });
        $(document).on('change', '.toogle-type-password-input', function(e) {
            var $this = $(this);
            var $input = $($this.data('input'));
            var originalType = $this.data('original-input-type'), classNumberPassword = 'numberpsw', mostrar = $this.is(':checked');
            if (originalType == undefined) {
                originalType = $input.attr('type');
                $this.data('original-input-type', originalType);
            }
            var toggleType = function($mostrar) {
                if ($mostrar) {
                    return originalType != 'number' ? 'text' : originalType;
                } else {
                    return originalType;
                }
            };
            if ($input.length) {
                $input.prop('type', toggleType(mostrar));
                if (originalType == 'number') {
                    if (mostrar) {
                        $input.removeClass(classNumberPassword);
                    } else {
                        $input.addClass(classNumberPassword);
                    }
                }
            }
            var inputsPass = Array.from(
                document.querySelectorAll('#passKeyboard #passKeyboardConfirm')
            );
            inputsPass.forEach(function(item) {
                item.addEventListener(
                    'input',
                    function(e) {
                        var inputString = e.target.value;
                        if (
                            inputString.slice(-1).match(/[a-zA-Z0-9\s]/) &&
                            inputString.length <= 8
                        ) {
                            return true;
                        } else {
                            e.target.value = inputString.substring(
                            0,
                            inputString.length - 1
                            );
                            e.preventDefault();
                            return false;
                        }
                    },
                    true
                );
            });
        });
        Topic('/loadPage/end').subscribe(function() {
            $('.toogle-type-password-input').each(function() {
                var $this = $(this);
                var $input = $($this.data('input'));
                var type = $input.attr('type');
                if ($input.length && type != 'password' && (GBusterBase.isFirefox() || GBusterBase.isInternetExplorer())) {
                    $input.prop('type', 'password');
                }
            });
            $('input.maskInput').each(function() {
                $this = $(this);
                $this.mask($this.data('mascara'));
            });
            fixMaxLengthInputs();
        });
        Topic('/component/rendered').subscribe(fixMaxLengthInputs);
        function fixMaxLengthInputs() {
            $('input[maxlength]').each(function() {
                var maxlength = $(this).attr('maxlength'), keysPermitidas = [ 8, 9, 46 ];
                $(this).removeAttr('maxlength').data('maxlength', maxlength);
                $(this).on('keypress change keyup', function(e) {
                    var $this = $(this);
                    var maxlength = $this.data('maxlength');
                    var key = e.which || e.keyCode;
                    if (e.type == 'keypress') {
                        if (this.value.length >= maxlength && ($.inArray(key, keysPermitidas) == -1 || e.shiftKey || e.altKey)) {
                            return false;
                        }
                    } else {
                        if (this.value.length > maxlength) {
                            $this.val(this.value.substring(0, maxlength));
                        }
                    }
                });
            });
        }
        $(document).on('change', 'input.toggle-class[type=\'radio\'],input.toggle-class[type=\'checkbox\']', function() {
            var $this = $(this);
            var classCss = $(this).data('classCss');
            var el = $(this).data('element');
            var acao = $(this).data('acao') !== undefined ? $(this).data('acao') : 'remove';
            if ($this.is(':checked') && acao === 'remove') {
                $(el).removeClass(classCss);
            } else {
                $(el).addClass(classCss);
            }
        }).on('cut copy paste', 'input[type=password], input.numberpsw', function(e) {
            e.preventDefault();
        });
        var seletoresBtnTouch = '.botaoLaranja';
        $(document).on('touchstart', seletoresBtnTouch, function() {
            $(this).removeClass('touchfix');
        }).on('touchend', seletoresBtnTouch, function() {
            $(this).addClass('touchfix');
        });
        function getCookie(cname) {
            var name = cname + '=';
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return '';
        }
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var height = getCookie('webview');
            if (height == '') {
                var pActualWidth = 0, pActualHeight = 0, pdensity = 0;
                var args = window.location.hash.split('&');
                for (var i = 0; i < args.length; i++) {
                    var pair = args[i].split('=');
                    if (decodeURIComponent(pair[0]) == 'actualWidth') {
                        pActualWidth = Math.round(+decodeURIComponent(pair[1]));
                    } else if (decodeURIComponent(pair[0]) == 'actualHeight') {
                        pActualHeight = Math.round(+decodeURIComponent(pair[1]));
                    } else if (decodeURIComponent(pair[0]) == 'density') {
                        pdensity = decodeURIComponent(pair[1]);
                    }
                }
                if (pdensity != 0 && pActualHeight != 0 && pActualWidth != 0) {
                    var density = pdensity;
                    height = pActualHeight / density / 1.5;
                    document.cookie = 'webview=' + height + ';';
                }
            }
            if (height === '') {
                height = 'auto';
            }
            $('meta[name=viewport]').remove();
            $('head').append('<meta name="viewport" content="width=auto !important, height=' + height + ', user-scalable=0, initial-scale=1">');
        }
    });
});

var pageObj;

function ativaContraste(cssContraste) {
    $('link.' + cssContraste).attr('href', '/statics-core/css/' + cssContraste + '.css');
    $('#boxCentral_imagem').attr('src', '/statics-core/img/imgPhoneContrast.png');
    $('#conheca_imagem').attr('src', '/statics-core/img/knowCxContrast.jpg');
    $('.imgBannerAside').attr('src', '/statics-core/img/bannerAsideContrast.png');
}

function desativaContraste(cssContraste) {
    $('link.' + cssContraste).attr('href', '');
    $('#boxCentral_imagem').attr('src', '/statics-core/img/imgPhone.png');
    $('#conheca_imagem').attr('src', '/statics-core/img/knowCx.jpg');
    $('.imgBannerAside').attr('src', '/statics-core/img/bannerAside.png');
}

var numericTimeoutMask;

function isNumberMobile(elemID, maxLength) {
    console.log(elemID, maxLength);
    $('#' + elemID).unbind('input keypress change paste');
    $('#' + elemID).bind('input keypress change paste', function() {
        var el = this;
        if (numericTimeoutMask) {
            clearTimeout(numericTimeoutMask);
        }
        numericTimeoutMask = setTimeout(function() {
            el.value = numericMask(el.value, maxLength);
        }, 1);
    });
}

function numericMask(v, maxLength) {
    v = v.replace(/\D/g, '');
    if (v.length > maxLength) {
        v = v.substring(0, maxLength);
    }
    return v;
}

function isNumber(e) {
    if ($.inArray(e.keyCode, [ 46, 8, 9, 27, 13, 110, 190 ]) !== -1 || e.keyCode == 67 && e.ctrlKey === true || e.keyCode == 88 && e.ctrlKey === true || e.keyCode >= 35 && e.keyCode <= 39 || (!e.shiftKey && (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode >= 96 && e.keyCode <= 105)) {
        return;
    }
    if (!e.shiftKey && (e.keyCode < 48 || e.keyCode > 57) || e.shiftKey && (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
}

function isDigit(e) {
    if ($.inArray(e.keyCode, [ 46, 8, 9, 27, 13, 110, 190 ]) !== -1 || e.keyCode == 67 && e.ctrlKey === true || e.keyCode == 88 && e.ctrlKey === true || e.keyCode >= 35 && e.keyCode <= 39 || (!e.shiftKey && (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode >= 96 && e.keyCode <= 105) || (e.shiftKey && (e.keyCode == 88 || e.keyCode == 80) || e.keyCode == 88 || e.keyCode == 80)) {
        return;
    }
    if (!e.shiftKey && (e.keyCode < 48 || e.keyCode > 57) || e.shiftKey && (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
}

var count = 0;

function alterFont(action) {
    var tags = [ 'p', 'a', 'span', 'h1', 'h2', 'li', 'ul', 'div', 'dt', 'dd' ];
    if (action == 'increase' && count < 1) {
        jQuery.each(tags, function(i, val) {
            $(val).each(function(j, obj) {
                var size = $(this).css('font-size');
                size = size.replace('px', '');
                size = parseInt(size) + 1;
                $(this).animate({
                    'font-size': size + 'px'
                });
            });
        });
        count++;
    }
    if (action == 'decrease' && count > -1) {
        jQuery.each(tags, function(i, val) {
            $(val).each(function(j, obj) {
                var size = $(this).css('font-size');
                size = size.replace('px', '');
                size = parseInt(size) - 1;
                $(this).animate({
                    'font-size': size + 'px'
                });
            });
        });
        count--;
    }
}

function abrirLink(l) {
    var link = $('#' + l).attr('href');
    if (link != undefined && (link != null && link.length > 0)) {
        window.open(link, '', 'height=630,width=650,top=150,left=485,scrollbars=yes');
        return false;
    } else {
        console.log('Link solicitado n\u00E3o foi encontrado');
    }
}

window.mobilecheck = function() {
    var a = false;
    var b = navigator.userAgent;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))) {
        a = true;
    }
    return a;
};

function rodapeConteudo(data) {
    if (mobilecheck() === false) {
        if (document.querySelector('#rodapeSuporte')) {
            document.getElementById('rodapeSuporte').innerHTML = data.rodape_txt_suporte;
            document.getElementById('rodapeSeguranca').setAttribute('href', data.rodape_link_seguranca);
            document.getElementById('rodapeAtendimento').setAttribute('href', data.rodape_link_atendimento);
            document.getElementById('rodapeAjuda').setAttribute('href', data.rodape_link_ajuda);
            document.getElementById('rodapeTermos').setAttribute('href', data.rodape_link_contrato);
        }
    }
}

function cargaRodape() {}

function closeAllModals() {
    var $modalHeaders = $('.mobileHeader:visible').get();
    $.each($modalHeaders, function(i, modalHeader) {
        var $modalHeader = $(modalHeader);
        var $containerCrrossel = $modalHeader.parents('.submenuContainer:visible');
        if ($containerCrrossel.length) {
            $containerCrrossel.hide();
        } else {
            if ($modalHeader.parent().is('body')) {
                $modalHeader.hide();
            } else if ($modalHeader.parent().is('.modal')) {
                $modalHeader.parent().hide();
            }
        }
    });
}

var jsonpRodapeConteudo = 'rodapeConteudo';

String.prototype.allCapitalize = function() {
    var palavras = this.split(' ');
    palavras = palavras.map(function(palavra) {
        return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
    });
    return palavras.join(' ');
};

String.prototype.padLeft = function(len, c) {
    var s = this, c = c || '0';
    while (s.length < len) s = c + s;
    return s;
};

//Polyfill para Object Assign
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(target) {
        'use strict';
        if (target === undefined || target === null) {
          throw new TypeError('Cannot convert first argument to object');
        }
  
        var to = Object(target);
        for (var i = 1; i < arguments.length; i++) {
          var nextSource = arguments[i];
          if (nextSource === undefined || nextSource === null) {
            continue;
          }
          nextSource = Object(nextSource);
  
          var keysArray = Object.keys(Object(nextSource));
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
        return to;
      }
    });
  }