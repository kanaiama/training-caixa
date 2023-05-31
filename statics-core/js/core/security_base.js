define(["jquery", "statics-core/js/lib/class", "statics-core/js/core/log", 'statics-core/js/gbuster/gbuster_base'],
function($, Class, log, GBusterBase) {
	
	var SecurityBase = Class.extend({
	
		init: function() {
			this.identifyPlugin();
		},
		
		identifyPlugin: function() {
			
			if(!GBusterBase.isTablet()) {
				if($("#divObjGB")) {
					log.info("Inicializando Plugin de Seguranca...");
					GBusterBase.initGB();
				} else {
					throw new Error("Div 'divObjGB' n\u00E3o encontrada...");					
				}
			}
		}
		
	});
	
	return SecurityBase;
	
});