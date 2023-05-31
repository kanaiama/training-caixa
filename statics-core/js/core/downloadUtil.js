define([  'statics-core/js/core/mobileUtil' ], function(mobileUtil) {
	var downloadUtil = {
			saveFile: function(url, dataType) {
				var req = new XMLHttpRequest();
				req.open("GET", window.location.origin + url , true);
				req.responseType = "blob";
				req.onload = function (event) {
					if(!mobileUtil.isMobile()){
						downloadUtil.salvarDesktop(req.response, url.substring(url.lastIndexOf('/') + 1));
					}else{
						downloadUtil.convertBase64(req.response, dataType);
					}
				};
				req.send();
			},
			
			//Função de compartilhar um arquivo por ex.: application/pdf
			compartilharMobile: function(url, dataType) { 
				downloadUtil.saveFile(url, dataType); 
			},
			
			downloadMobile: function(url) {	
				//Passou apenas o caminho relativo
				if(url.substr(0, 1) == '/') {
					url = window.location.origin + url;
				}
		      if (window.Android != null) { 
		    	  downloadUtil.abrirArquivoAndroid(url);
		      } else {
		    	  downloadUtil.abrirArquivoIOS(url);
		      }       
		    },
			    
		    abrirArquivoIOS : function(url) {
		        var iframe = document.createElement("IFRAME");
		        iframe.setAttribute("src", "js-bridge:abrirURLExternamente:1:" + encodeURIComponent(url));
		        iframe.setAttribute("height", "1px");
		        iframe.setAttribute("width", "1px");
		        document.documentElement.appendChild(iframe);
		        iframe.parentNode.removeChild(iframe);
		        iframe = null;
		    },
		    abrirArquivoAndroid : function(url) {
		        if (Android.abrirURLExternamente != null){
		            Android.abrirURLExternamente(url);
		        }
		    },
			
			convertBase64 : function(blob, dataType){
			   var reader = new FileReader();
			   reader.readAsDataURL(blob);
			   reader.onload = function () {
				  downloadUtil.comprovanteMobile(reader.result.replace('data:' + dataType + ';base64,', ''), dataType);
			   };
			   reader.onerror = function (error) {
				 console.log('Error: ', error);
			   };
			},
			
			comprovanteMobile: function(data, dataType) {
				var streamBase64 = data;	
				var type = dataType.substring(dataType.lastIndexOf('/') + 1);
				if (window.Android != null) {
					window.Android.abrirComprovante(streamBase64,"pdf");
				} else {
					downloadUtil.abriComprovanteIOS("abrirComprovante", {data:"'" + streamBase64 + "'", extension:'pdf'});
				} 
			},
			abriComprovanteIOS: function(functionName, args, callback){

				var hasCallback = callback && typeof callback == "function";
				var callbackId = hasCallback ? this.callbacksCount++ : 0;
					
				if (hasCallback)
					this.callbacks[callbackId] = callback;
					
				var iframe = document.createElement("IFRAME");
				iframe.setAttribute("src", "js-bridge:" + functionName + ":" + callbackId+ ":" + encodeURIComponent(JSON.stringify(args)));
				iframe.setAttribute("height", "1px");
				iframe.setAttribute("width", "1px");
				document.documentElement.appendChild(iframe);
				iframe.parentNode.removeChild(iframe);
				iframe = null;
			},
			salvarDesktop : function(data, name){
				var link =document.createElement('a');
				link.href=window.URL.createObjectURL(data);
				link.download=name;
				link.click();
			},
		
	};
	
	return downloadUtil;
});
