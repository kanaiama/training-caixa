define(["jquery", "statics-core/js/core/log"], function($, log) {
	return {
			
		// Internet Explorer
		isInternetExplorer: function() {
			return navigator.userAgent.indexOf("MSIE") > 0 ? true : navigator.userAgent.indexOf("Trident") > 0 ? true : false;
		},
		    
		// Firefox
		isFirefox: function() {
			return navigator.userAgent.indexOf("Firefox") > 0 ? true : false;
		},
		    
		// iPad & Android
		isTablet: function() {
			return (navigator.userAgent.indexOf("iPad") > 0 || navigator.userAgent.indexOf("Android") > 0) ? true : false;
		},
		
		// Win64 e Outros Dispositivos
		isApplet: function() {
			isApplet = false;
			if (navigator.userAgent.indexOf("Win64") > 0 && !this.isTablet())  {
				isApplet = true; 
			}
			return isApplet;
		},
		
		//Windows
		isWindows: function() {
			return navigator.userAgent.indexOf("Windows") > 0;
		},
		
		//Mac
		isMac: function() {
			return navigator.userAgent.indexOf("Macintosh") > 0;
		},
		
		//browser 64bits
		is64Bits: function() {
			return (navigator.userAgent.indexOf("x86_64") != -1 
				 || navigator.userAgent.indexOf("x86-64") != -1 
				 || navigator.userAgent.indexOf("x64_64") != -1 
				 || navigator.userAgent.indexOf("AMD64") != -1 
				 || navigator.userAgent.indexOf("amd64") != -1 
				 || navigator.userAgent.indexOf("x64;") != -1 
				 || navigator.userAgent.indexOf("WOW64") != -1 
				 || navigator.userAgent.indexOf("Win64") != -1);
		},
		
		identificaFF: function() {
	        if (this.isFirefox()) {
	            var posNomeFF_GB = this.posNomeFF();
	            var numFF_GB = this.identificaVersaoFF();			
				if (parseInt(numFF_GB) >= 2 && (navigator.userAgent.indexOf("Navigator") > 0)) {
                    return false; // Netscape
	            } else {
	                return true; // Firefox
	            }
	        } else {
	        	return false;
	        }
		},
		
		posNomeFF: function() {
			return navigator.userAgent.indexOf("Firefox");
		},
		
		identificaVersaoFF: function() {
			var posNomeFF_GB = this.posNomeFF();
	        return navigator.userAgent.substring((posNomeFF_GB+8),(posNomeFF_GB+10)).replace(".","").replace(" ","");
		},
		
		identificaIE: function() {
	        if (this.isInternetExplorer()) {
	            var posNomeIE_GB = this.posNomeIE();
	            var numIE_GB = this.identificaVersaoIE(2);
	            var num2IE_GB = this.identificaVersaoIE(3);
	            if (parseInt(numIE_GB) > 5 || num2IE_GB == "5.5") {
	                return true;
	            } else {
	                return false;
	            }
	        } else {
	        	return false;
	        }
		},
		
		posNomeIE: function() {
			return navigator.userAgent.indexOf("MSIE");
		},
		
		identificaVersaoIE: function(pos2) {
			var posNomeIE_GB = this.posNomeIE();
			pos2 = parseInt(pos2);
			if (pos2 === 2) {
				return navigator.userAgent.substring((posNomeIE_GB+5), pos2).replace(".","").replace(" ","");				
			} else if (pos2 === 3){
				return navigator.userAgent.substring((posNomeIE_GB+5), pos2);
			}
		},		

		/**
		 * Verificar se existe objeto e versao. 
		 * Se nao existir o objeto, mas for acesso Tablet retorna true
		 */
		hasGBusterVersion : function() {
			try {
				var versao;
				if($("#GbPluginObj")[0]) {
					if(this.isApplet()) {
						versao = $("#GbPluginObj")[0].getVersion();
					} else {	
						versao = $("#GbPluginObj")[0].Versao;
					}	
					if(versao != "" && versao != undefined && this.isInternetExplorer()) {
						$("#GbPluginObj")[0].Ativa();
						$("#GbPluginObj")[0].Atualiza();
						log.info("Plugin de Seguranca instanciado com sucesso!");
						return true;
					} else {
						return false;
					}
				} else if(this.isTablet()) {
					return true;
				} else {
					return false;
				}
			} catch(e) {
				log.error("Erro ao instanciar o Plugin de Seguranca...");
				return false;
			}

		},
		
		// CM3 - Problema com o Plugin
		isWorking : function() {
			if(this.isApplet()){
				var status;
				try {
					status = $("#GbPluginObj")[0].Status;
					if(status == -1 || status == 2 || status == 4) {
						return false;
					}	
				} catch(e) {
					log.error("Erro ao instanciar o Plugin de Seguranca da Applet...");
					return false;
				}
			}
			return true;
		},
		
		
		// Adiciona Objeto Gbuster no Documento se nao for Tablet (security_base.js)
		initGB : function() {
				$('body').append(this.getObjectGB());
		},
		
		getObjectGB : function() {
		    if (this.isInternetExplorer()) {
		    	return "<div id='objetosGBuster'  style='height:0'><OBJECT id='GbPluginObj' classid='CLSID:E37CB5F0-51F5-4395-A808-5FA49E399003' height='0' width='0' VIEWASTEXT></OBJECT></div>";
		    } else if(this.isApplet()) {
		    	return "<div id='objetosGBuster' style='height:0'><Applet id=\"GbPluginObj\" name=\"GbPluginObj\" archive=\"/src/main/webapp/gbas/gbas.jar\" code=\"br/com/gas/mid/GbAs.class\" height=\"1\" width=\"1\" MAYSCRIPT>\n" + 
				"<param value=\"eNoFwUeCgjAAAMAHeQCp8eAhdFhahNBurBLpPSL7+p0RWY2VJQlG3MupeTHZrMY59yy0M1Bqht9ERx/meaKaVxg6B/ZLrlEOOhmRMdwQ9VuO+7499Dd7aBxxNP9IMm2ZdALmgoSyAu6nUi/lsUDhcZapxUsHE2uKF6FKRUNsW2Fro0ZHXhuv0kknMXDhldOwy5C4Y5TxcfY0mwqekXp8gNwLwKKN8+1UNwp1hhFPkR3ASQRL3yd2lIyRaE4pd946IlG39kxa6izSC82qdyx/MSnqFLa1Gs5UVJ7V9n43BLBVR56/uWvg3Z4SnSUqyLwtALxtb7c1MGlCCsy9KlOOhX0hbZd37jWKnU/X632mfCBxLlhIhvQrlkfq58vawPv9H5cocak=\" name=\"seed\" />\n" +
				"<param name=\"statusChangeCallback\" value=\"jgbasCallbackFunction\" />\n" + 
				"</Applet></div>";
		    } else {
		    	return '<div id="objetosGBuster" style="height:0"><object id="GbPluginObj" type="application/gas-ibh-cef" width="0" height="0"></object></div>';
		    	
		    }
		}
			
	};
	    
});
