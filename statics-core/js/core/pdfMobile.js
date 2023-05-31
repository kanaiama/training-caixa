define([ "statics-core/js/lib/pdfmake",
		 "statics-core/js/lib/jspdf.min",
		 "statics-core/js/lib/html2canvas",
		 "jquery"], function(PdfMake, { jsPDF }, X, $) {

	var PdfMobile = {

		printPdfMobile : function(i, its) {
			
			for(var cont = 0; cont < its.length; cont++) {
				
				$(its[cont]).hide();
			}
			
			html2canvas(i, {
				onrendered: function(canvas) {
					var imgWidth = 190;
					var imageData = canvas.toDataURL({format: 'image/JPG',quality: 0.5});
					var width = canvas.width;
					var docDefinition = {
						pageSize: {width: window.document.body.offsetWidth + 100, height: 'auto'},
						content: [{image: imageData}]
					}
		
					PdfMake.createPdf(docDefinition).getBase64(
							function(encodedString) {
								PdfMobile.comprovanteMobile(encodedString);
							}
					);
					
					for(var cont2 = 0; cont2 < its.length; cont2++) {
						
						$(its[cont2]).show();
					}
				}
			});
		},
	
		comprovanteMobile : function(data) {
			var streamBase64 = data;

			if (window.Android != null) {
				
				window.Android.abrirComprovante(streamBase64,"pdf");
			} else {
				
				PdfMobile.abriComprovanteIOS("abrirComprovante", {
				data : String(streamBase64),
				extension : 'pdf'});
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
		}

	};

	return PdfMobile;
});