define(['jquery', 
        'statics-core/js/core/widgetBase', 
        'statics-core/js/core/loadContent', 
        'statics-core/js/core/componentParser',
        'statics-core/js/core/topic',
        'statics-core/js/core/ajax'],
function($, WidgetBase, loadContent, ComponentParser, Topic, AjaxNB){
	
	var PageBase = WidgetBase.extend({
		
		operacao : 0,
		
		init: function(el){
			
			this._super(el);
			
			this.createEvents();
			
			this.createSubscribers();
			
			this.createVariables();
			
			Topic("/components/updated").subscribe($.proxy(this.updateComponent, this));
			
		},
		
		updateComponent: function(element){
			this.createEvents(element);
			this.createVariables(element);
		},
		
		postPage: function(url, params){
			this.publish("/loadPage/begin");
			// assume o contexto atual como padrao se nenhum contexto for fornecido
			if (url.startsWith('/nb/')) {
				var context = '/' + AjaxNB.getContext();
				url = context + url;
			}
			this.ajax(url).type("html").post(params, $.proxy(this.pageSuccess, this), $.proxy(this.pageError, this));
		},
		showLoading: function(){
			window.loadingModal = true;
			$('.modalBgLoading').show();
		},
		hideLoading: function(){
			window.loadingModal = false;
			$('.modalBgLoading').fadeOut();
		},
		getPage: function(url){
			if (window.location.hash == ("#!" + url)) {
				$(window).hashchange();
				return;
			}
			this.publish("/loadPage/begin");
			this.ajax(url).clearQueue();
			this.setUrl(url);
			
			//this.ajax(url).type("html").get($.proxy(this.pageSuccess, this), $.proxy(this.pageError, this));
		},
		
		pageSuccess: function(data){
			loadContent.setPage(data);
			

			
			
			this.publish("/loadPage/end");
		},
		
		pageError: function(data){
			loadContent.setPage(data.responseText);
			this.publish("/loadPage/end");
		},
		
		setUrl: function(url) {
			loadContent.setUrl(url);
		},
		
		
		completeRight: function(str, c, qtd) {
			return this.complete(str, c, qtd, true);
		},
		
		
		completeLeft: function(str, c, qtd) {
			return this.complete(str, c, qtd, false);
		},
		
		complete: function(str, c, qtd, after) {
			if (qtd < 1) {
				return str;
			}
			var retorno;
			if (after) {
				retorno = str != null ? str : "";
			} else {
				retorno = "";
			}
			for (var i = 0; i < qtd - str.length; i++) {
				retorno = retorno + c;
			}
			if (!after) {
				retorno = retorno + str != null ? retorno + str : "";
			}
			return retorno.toString();
		},
		
		serializeObject: function(form){
		    var o = {};
		    var a = $(form).serializeArray();
		    $.each(a, function() {
		        if (o[this.name] !== undefined) {
		            if (!o[this.name].push) {
		                o[this.name] = [o[this.name]];
		            }
		            o[this.name].push(this.value || '');
		        } else {
		            o[this.name] = this.value || '';
		        }
		    });
		    return o;
		},
		
		retornarCarrossel: function() {
			window.location="/sinbc/nb/home";
		},
		
		cadastrarNovaTransacao: function() {
			//window.location=""
			console.log("Ainda precisa ser informado o caminho da tela para Cadastro Nova Transacao");
		},
		
		//Reconfigura a string de objeto serializado, para passar toda a informacao em apenas um valor da String
		reconfigSerialize: function(string){
			var index = 0;
			var valueReplaced = "";
			
			strArray = string.split("&");
			
			for (index in strArray) {
				valueReplaced += strArray[index]+";";
			}
			
			return valueReplaced.substr(0,(valueReplaced.length-1));
		},
		
		addFocus: function(id) {
			setTimeout(function() {
				$("#" + id).focus();
			}, 500);
		}
		
	});
	
	return PageBase;
	
});