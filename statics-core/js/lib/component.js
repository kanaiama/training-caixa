define({
	
	load: function(name, req, onload, config){
		
		var defaultComponentName = name.split("/").pop();
		
		var cssName = "text!" + name + ".css";
		
		var htmlName = "text!" + name + ".html";
		
		var resourceUrl = req.toUrl(name);
		
		var indexOfLastSlash = resourceUrl.lastIndexOf("/");
		
		var folderName = resourceUrl.substr(0, indexOfLastSlash);
		
		req([cssName, htmlName], function(css, html){
			
			/**
			 * Verifica se no arquivo html de template ou no arquivo css
			 * é referenciado a palavra chave "this" nas url e a transforma no
			 * nome da pasta do componente. Assim um componente pode fazer uma chamada da forma
			 * <img src="this/img/img.jpg" e sera convertido para: <img src="pasta/do/componente/img/img.jpg">
			 */
			var regex = /this/igm;
			css = css.replace(regex, folderName);
			
			html = html.replace(regex, folderName); 
			
			onload({name:defaultComponentName, html: html, css:css});
		});
		
	},
	
	normalize: function(name, normalize){
		return normalize(name);
	}
	
});