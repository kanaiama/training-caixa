define(["jquery",'statics-core/js/gbuster/gbuster_base'], function($, GBusterBase) {
	return{		
		gerarIdMaquina: function(){
			if(GBusterBase.hasGBusterVersion() && GBusterBase.isWorking() && !GBusterBase.isTablet()){
				return identificador = GbPluginObj.Digest('') + GbPluginObj.Digest2('');
			}else{
				return "";
			}
		}
	};	
});
