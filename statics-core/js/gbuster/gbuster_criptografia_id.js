define(["jquery",'statics-core/js/gbuster/gbuster_base', "statics-core/js/core/log"], function($, GBusterBase, log) {
	return {
		EnviaLoginIDGB : function(agenciaGB, contaGB, tipoContaGB, usuarioGB, chaveServidor) {
			return this.generateId(agenciaGB, contaGB, tipoContaGB, usuarioGB, chaveServidor);
		},
		
		generateId : function(agenciaGB, contaGB, tipoContaGB, usuarioGB, chaveServidor) {
			try {
				// Tratamento especifico para Applet
				if (GBusterBase.isApplet() && GBusterBase.hasGBusterVersion()) {
					return $("#GbPluginObj")[0].Function10(1500, agenciaGB, contaGB, usuarioGB, tipoContaGB, chaveServidor);
				} else if(GBusterBase.hasGBusterVersion()) {
					// IE, FF, Chrome, iPad, Android
					return $("#GbPluginObj")[0].Function10( agenciaGB, contaGB, usuarioGB, tipoContaGB, chaveServidor);
				}
				return "";
			} catch(e) {
				throw new Error("Erro recuperando criptografia Gbuster: " + e);
			}
		},
		
		//funcao para criptografar a senha, e chamada pelo botao confirmarClick password
		criptografaSenha : function(aux) {
			var retornoF8 = "";				
			try {  
				retornoF8 = document.getElementById("GbPluginObj").Function8( document.getElementById("password").value, aux );				
				if (retornoF8 != "") {
					document.getElementById("password").value = retornoF8;	//caixa de texto da senha criptografada
					return retornoF8;
				}
			} catch (err) {
				 //sem tratamento
			}
		}
	};
});
