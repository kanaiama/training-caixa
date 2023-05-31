define(["statics-core/js/core/ajax"], 
function(AjaxNB){
	
	return {
		normalize: function(name, normalize){
			return normalize(name);
		},
		
		load: function(name, req, onload, config){
			new AjaxNB("nb/messages/all", AjaxNB.getContext(), "sinbc").parameter("context", AjaxNB.getContext()).asJson().get(function(data){
				var messages = {};
				if(data){
					for(var i = 0; i < data.length; i++){
						var m = data[i];
						messages[m.code] = m.text;
					}
				}
				
				onload(messages); 
				
			});
		}
	};
	
});