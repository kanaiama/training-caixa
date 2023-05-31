define(["jquery",'statics-core/js/gbuster/gbuster_base', "statics-core/js/core/log"], function($, GBusterBase, log) {
	return {
		EnviaLoginPluginGB : function(agenciaGB, contaGB, tipoContaGB, nomeUsuarioGB, chaveServidorGB) {
			return this.generateId(agenciaGB, contaGB, tipoContaGB, nomeUsuarioGB, chaveServidorGB);
		},
		
		generateId : function(agenciaGB, contaGB, tipoContaGB, nomeUsuarioGB, chaveServidorGB) {
			var dadosGBuster = new Array();
			try {
				if (!GBusterBase.isTablet() && GBusterBase.isWorking()) {
					var GbPluginObj;
			        var retornoF10 = "";
			        var versaoPlugin = "";
			        var i = 0;
			        if (contaGB.length >= 9) {			    
						contaGB = contaGB.substr(0,9);			
					} else {
						contaGB += this.calculaDV(agenciaGB, tipoContaGB, contaGB);        
					}
			        if (GBusterBase.identificaFF() && (GBusterBase.identificaVersaoFF() < 4)) { // Firefox 2 e 3
			        	GbPluginObj = new gbmzhcef();
	                    retornoF10 = GbPluginObj.Function10(agenciaGB, contaGB, nomeUsuarioGB, tipoContaGB, chaveServidorGB);
	                    versaoPlugin = GbPluginObj.Versao;
			        } else { 
			        	retornoF10 = $("#GbPluginObj")[0].Function10(agenciaGB, contaGB, nomeUsuarioGB, tipoContaGB, chaveServidorGB);
			        	versaoPlugin = $("#GbPluginObj")[0].Versao;
			        }
			        dadosGBuster[0] = retornoF10;
			        dadosGBuster[1] = versaoPlugin;
				} else if (GBusterBase.isTablet()) {
					log.info("Acesso Tablet - nao e necessario gerar o ID");
				} else {
					log.info("Acesso Applet com status invalido");
				}
		        return dadosGBuster;
			} catch(e) {
				throw new Error("Erro recuperando criptografia Gbuster: " + e);
			}
		},
		
		calculaDV : function(agenciaGB, tipoContaGB, contaGB) {
			var calcular = agenciaGB + tipoContaGB + contaGB;
			var soma = 0;
			var multiplicador = 2;
			for (i = 0; i < calcular.length; i++) {
				soma +=  calcular.substring((calcular.length-i-1),(calcular.length-i)) * multiplicador++; 
				if (multiplicador == '10') {
					multiplicador = 2;
				}
			}
			soma = soma%11;
			if (soma == '0' || soma == '1' ) {
				return '0';
			} else {
				return (11-soma);
			}			
		}

	};
});
