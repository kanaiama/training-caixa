define(
  ['jquery', 'statics-core/js/lib/class', 'statics-core/js/core/log'],
  function($, Class, log, Topic) {
	var ajaxQueue = [];
	var executing = false;
	var async = true;
	var AjaxNB = Class.extend({
		inQueue: false,
		parameters: {},
		requestType: 'html',
		showLoading: true,
		redirectError: false,
		sync: function() {
			this.async = false;
            return this;
		},
      asSync: function() {
            this.inQueue = true;
            return this;
        },
      asAsync: function() {
            this.inQueue = false;
            return this;
        },
		init: function(url, context) {
			if (!url) {
          throw new Error('Url e obrigatorio para criar uma requisicao ajax');
			}
			this.url = url;
            this.context = context;
		},
      parameter: function(key, value) {
			this.parameters[key] = value;
			return this;
		},
      type: function(requestType) {
			this.requestType = requestType;
			return this;
		},
      asHtml: function() {
        this.requestType = 'html';
            return this;
        },
      asJson: function() {
        this.requestType = 'json';
            return this;
        },
      asNoShowLoading: function() {
      	  this.showLoading = false;
          return this;
      },
	  redirectOnError: function () {
		  this.redirectError = true;
		  return this;		  
	  },
      get: function(success, error) {
        this.ajax('GET', this.parameters, success, error, this.context);
		},
      post: function(params, success, error) {
        this.ajax('POST', params, success, error, this.context);
		},
	  controlaLoading: function() {
			this.abreFechaLoading(true);
		},
       closeLoading: function() {
    	   this.abreFechaLoading(false);
		},
		abreFechaLoading:function(isOpen){

			if(isOpen){
				window.requisicoes = window.requisicoes === undefined ? 1 : window.requisicoes + 1;
				if (/noloading/.exec(this.url) === null) {
					$('.modalBgLoading').show();
				}
			}else if (window.loadingModal == true){
				window.requisicoes = window.requisicoes - 1;
				if (/noloading/.exec(this.url) === null) {
					$('.modalBgLoading').show();
				}
			} else{
				window.requisicoes = window.requisicoes - 1;
				if (window.requisicoes === 0) {
					   setTimeout(function() {
						   if (window.requisicoes === 0){
							   $('.modalBgLoading').fadeOut();
						   }
					   }, 1000);
				}
			}
		},
		ajax: function(method, data, success, error, context) {
				this.controlaLoading();
				if (this.inQueue) {
					if (executing) {
						ajaxQueue.push({
							ajaxRequest: this,
							method: method,
							data: data,
							success: success,
							error: error
						});
						return;
				    }
				executing = true;
			}
			var url = this.url;
        if (context) {
          url = '/' + context + '/' + url.replace('/nb', 'nb');
            }
        url += url.indexOf('?') >= 0 ? '&' : '?';
        url += 'nocache=' + new Date().getTime();
        if (!async) {
			$.ajax(url, {
				dataType: this.requestType,
				type: method,
				data: data,
					async: false,
				cache: false,
				success: this.makeSuccessFunction(success),
            error: this.makeErrorFunction({
              method: method,
              data: data,
              success: success,
              error: error
            }),
            complete: $.proxy(this, 'completeRequest')
			});
			} else {
				$.ajax(url, {
					dataType: this.requestType,
					type: method,
					data: data,
					success: this.makeSuccessFunction(success),
            error: this.makeErrorFunction({
              method: method,
              data: data,
              success: success,
              error: error
            }),
            complete: $.proxy(this, 'completeRequest')
				});
			}
		},
      makeSuccessFunction: function(success) {
        var isHtml = this.requestType.toLocaleLowerCase() == 'html';
			var me = this;
		var isRedirect = this.redirectError;
        return function(data, status, jqXHR) {
          var sessionTimeOut = jqXHR.getResponseHeader('sessionTimeOut');
          if (sessionTimeOut === 'true') {
            window.location = '/sinbc/#!nb/sessaoEncerradaNovo';
		    		return;
				}
          var redirectLogin = jqXHR.getResponseHeader('data-login');
          if (redirectLogin === 'true') {
            window.location = '/sinbc/';
					return;
				}
          var headerAccountFilter = jqXHR.getResponseHeader(
            'headerAccountFilter'
          );
          if (headerAccountFilter === 'true') {
            if (typeof JSON.parse(data) == 'string') {
              $('#numeroConta').html(JSON.parse(data));
            } else if (typeof JSON.parse(data) == 'object') {
              if (
                JSON.parse(data).errorCode != undefined &&
                JSON.parse(data).urlReturn != undefined
              ) {
                if (JSON.parse(data).errorCode == 'PASSO_4') {
                  window.location.href =
                    '/sinbc/nb/home#!/' + JSON.parse(data).urlReturn;
								return;
							}
						} else {
                var numeroConta_str =
                  '<br/>A conta selecionada n&atilde;o pode utilizar esse servi&ccedil;o.';
                numeroConta_str += '<br/><br/>Sugerimos a troca de conta: ';
                numeroConta_str +=
                  '<select id=\'accountFilterSelect\' onchange="atualizaSaldo(this.value);"><option value="#">Selecione</option>';
							for (var r = 0; r < JSON.parse(data).length; r++) {
								var linha = JSON.parse(data)[r];
                  numeroConta_str +=
                    '<option value="' +
                    linha.chave +
                    '">' +
                    linha.contaFormatada +
                    '</option>';
							}
                numeroConta_str += '</select><br/><br/><br/>';
							$('#numeroConta').html(numeroConta_str);
						}
					}
            $('#loading').hide();
            $('.escondeCarousel').hide();
            $('#submenuContainer').hide();
					$('[id="horSep"]').hide();
            $('.pesquisaPrincipal').show();
            $('#accountFilterModal').show();
					$('.modalBgLoading').fadeOut();
					return;
				}
          var redirectConvivencia = jqXHR.getResponseHeader(
            'conv-redct-header'
          );
          if (redirectConvivencia === 'true') {
					$('.modalBgLoading').show();
					var redctUrl;
            if (data.url) {
						redctUrl = data.url;
					} else {
						var redctConvData = JSON.parse(data);
						redctUrl = redctConvData.url;
					}
					window.location.href = redctUrl;
					return;
				}
          var redirectDirecionaDispositivoSeguranca = jqXHR.getResponseHeader(
            'redirectDirecionaDispositivoSeguranca'
          );
          if (redirectDirecionaDispositivoSeguranca === 'true') {
            window.location = '/sinbc/nb/login/redirecionaDispSeguranca';
		    		return;
			    }
          var headerDirecionaDispositivoSeguranca = jqXHR.getResponseHeader(
            'headerDirecionaDispositivoSeguranca'
          );
          if (headerDirecionaDispositivoSeguranca === 'true') {
            window.location.hash = '#!/sinbc/nb/login/redirecionaDispSeguranca';
		    		return;
			    }
          var headerDirecionaCadastroAssinatura = jqXHR.getResponseHeader(
            'headerDirecionaCadastroAssinatura'
          );
          if (headerDirecionaCadastroAssinatura === 'true') {
            window.location.hash = '#!/sinbc/nb/login/redirecionaAssinatura';
		    		return;
				}

			var headerDirecionaCadastroAssinaturaMaquina = jqXHR.getResponseHeader(
				'headerDirecionaCadastroAssinaturaMaquina'
			);
			if (headerDirecionaCadastroAssinaturaMaquina === 'true') {
				window.location.hash = '#!/sinbc/nb/login/redirecionaAssinaturaMaquina';
				return;
			}
          var headerDirecionaCadastroMaquina = jqXHR.getResponseHeader(
            'headerDirecionaCadastroMaquina'
          );
          if (headerDirecionaCadastroMaquina === 'true') {
            window.location.hash = '#!/sinbc/nb/login/redirecionaMaquina';
		    		return;
			    }
          var errorPage = jqXHR.getResponseHeader('error-page-header');
          if (errorPage === 'true') {
					if (data) {
						if (data.login) {
                window.location = '/sinbc/nb/sessaoEncerrada';
							return;
						} else {
							var answer = data;
							if (typeof data === 'string') {
								answer = JSON.parse(data);
							}
                $.ajax('/sinbc/nb/login/errorPageHandler', {
								async: false,
								dataType: 'html',
								type: 'POST',
                  data: {
                    mensagemPaginaErro: answer.mensagemPaginaErro,
                    tituloPaginaErro: answer.tituloPaginaErro,
                    view: answer.view,
                    urlReturn: answer.urlReturn
                  },
								success: function(dt, st, jX) {
									if (isRedirect) {
										$('#conteudo').html(dt);
										success = null;
										return;
									}
									data = dt;
									status = st;
									jqXHR = jX;
								},
								error: function(jX, st, et) {
									jqXHR = jX;
									textStatus = st;
									errorThrown = et;
								}
							});
						}
					}
				}
          if (success) {
					success.call(null, data, status, jqXHR);
				}
          if (isHtml) {
            me.getJavascriptPageObject(
              jqXHR.getResponseHeader('data-viewname')
            );
				}
			};
		},
      getJavascriptPageObject: function(url) {
        if (!url) return;
        if (url.startsWith('/')) {
				url = url.substring(1);
			}
        if (url.endsWith('/')) {
				url = url.substr(0, url.length - 1);
			}
        var dotIndex = url.indexOf('.');
        if (dotIndex > 0) {
				url = url.substring(0, dotIndex - 1);
			}
        var context = url.split('/')[0];
        var urlJs = url.replace(context, '');
        var prefixUrl = '';
        urlJs = prefixUrl + context + '/js' + urlJs;
        require([urlJs], function(PagObject) {
				if (PagObject !== undefined) {
            pageObj = new PagObject($('#conteudo'));
				}
			});
		},
		makeErrorFunction: function(options) {
        return function(jqXHR, textStatus, errorThrown) {
                if (options.error) {
					options.error.call(null, jqXHR, textStatus, errorThrown);
				}
			};
		},
      completeRequest: function() {
		this.closeLoading();
        if (this.inQueue) {
				executing = false;
          if (ajaxQueue.length > 0) {
					var nextRequest = ajaxQueue[0];
					ajaxQueue = ajaxQueue.slice(1);
            setTimeout(function() {
              nextRequest.ajaxRequest.ajax(
                nextRequest.method,
                nextRequest.data,
                nextRequest.success,
                nextRequest.error
              );
					}, 0);
				}
			}
		},
      clearQueue: function() {
        if (this.inQueue) {
				executing = false;
          if (ajaxQueue.length > 0) {
					ajaxQueue = [];
				}
			}
		}
	});
    AjaxNB.getContext = function() {
      var context = location.hash.replace(/#!\/([^\/]+)\/.*/, '$1');
      if (context === '')
        context = location.pathname.replace(/\/([^\/]+)\/.*/, '$1');
      if (context === 'statics-core') context = 'sinbc';
      if (context.indexOf('#!pages/') == 0) return 'DemoComponentes';
      if (context.indexOf('#!') == 0) context = 'sinbc';
		return context;
	};
	return AjaxNB;
  }
);

function atualizaSaldo(chaveConta) {
	var userAgent = navigator.userAgent;
    var versaoPlugin = '';
    var retornoF10 = '';
  var parametros = {
    chaveConta: chaveConta,
    userAgent: userAgent,
    versaoPlugin: versaoPlugin,
    retornoF10: retornoF10
  };
  $.post('/sinbc/nb/selecionaConta', parametros).done(function(data) {
    	var conta;
    for (i = 0; i < data.contas.length; i++) {
      if (data.contas[i].selecionada == true) {
    			conta = data.contas[i];
    			break;
    		}
    	}
    if (conta.nome != undefined) {
      $('#pcf1').html(conta.nome);
    	}
    $('#pcf2').html(conta.agencia);
    $('#pcf3').html(conta.tipo);
    $('#pcf4').html(conta.conta);
    $('#accountFilterModal').hide();
    	location.reload(true);
    });
}
