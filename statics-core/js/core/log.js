define([], function(){
	
	
	var logActivated = false;
	
	var logFunction = function(){};
	
	if(logActivated){
		
		logFunction = function(level, text){
			var e = new Error();
			
			var prefix = "";
			if(e.stack){
				/**
				 * TODO: Melhorar esta implementacao para nao pegar o terceiro elemeto da stack fixo e sim o primeiro antes do arquivo log.js
				 */
				var stack = e.stack.split("\n");
				var regexFileName = /js.*\.js/;
				var regexLineNumber = /:(\d+):/;
				if(regexLineNumber.exec(stack[3]) != null){
					prefix = level + " [" + regexFileName.exec(stack[3])[0] + " Linha: " + regexLineNumber.exec(stack[3])[1] + "]: ";
				}else{
					prefix = level + " [" + regexFileName.exec(stack[3])[0] + "]: ";
				}
			}
			
			// IE
			if(typeof console !== "undefined") 
				console.log(new Date().toLocaleTimeString() + " " + prefix + text);
		};
	} // se log nao estiver ativado retorna funcao vazia
	
	
	return {
		debug: function(text){
			logFunction("DEBUG",  text);
		},
		
		info: function(text){
			logFunction("INFO",  text);
		},
		
		warn: function(text){
			logFunction("WARN", text);
		},
		
		error: function(text){
			logFunction("ERROR", text);
		},
		
		fatal: function(text){
			logFunction("FATAL", text);
		}
	};
});
