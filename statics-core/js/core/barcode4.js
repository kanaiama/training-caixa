define(["jquery",
        "statics-core/js/core/validacaoBarcode",
        'statics-components/js/componentes/messageBox/messageBox',
        'statics-core/js/core/util'],function($, validacaoBarcode,Message, Util){
	
	var Barcode = {
		
		msg: new Message(),
			
		barcode1: "",
		barcode2: "",
		barcode3: "",
		barcode4: "",
		jump: true,
				
						
		inicialize: function(){
			this.barcode1 = $("#barcode1").val();
			this.barcode2 = $("#barcode2").val();
			this.barcode3 = $("#barcode3").val();
			this.barcode4 = $("#barcode4").val();
		
		},
		
		getBarcode: function(){
			this.inicialize();
			var barcode = "";
			barcode += this.barcode1;
			barcode += this.barcode2;
			barcode += this.barcode3;
			barcode += this.barcode4;
			
			return barcode;
		},
				
		validate: function(){
			this.inicialize();
			var valido = false;
			if(this.validateCod1() && this.validateCod2() && this.validateCod3() && this.validateCod4()){
				if(this.validateAll() && this.verificaSmid()){
					valido = true;
				}
			}
			
			return valido;						
		},
		
		validateCod1: function(){
			if (!this.verificaCod(this.barcode1,12)) {
				 this.msg.showMessageError("Valor do c\u00F3digo no campo 1 \u00E9 inv\u00E1lido.", "barcode1");
				 $("#barcode1").focus();
				
				 return false;
			}
			return true;
		},
		
		validateCod2: function(){
			if (!this.verificaCod(this.barcode2,12)) {
				this.msg.showMessageError("Valor do c\u00F3digo no campo 2 \u00E9 inv\u00E1lido.", "barcode2");
				$("#barcode2").focus();
				
				return false;
			}
			return true;				
		},
		
		validateCod3: function(){
			 if (!this.verificaCod(this.barcode3,12)) {
				this.msg.showMessageError("Valor do c\u00F3digo no campo 3 \u00E9 inv\u00E1lido.", "barcode3");
				$("#barcode3").focus();
				
				return false;
			}
			return true;
		},
		
		validateCod4: function(){
			 if (!this.verificaCod(this.barcode4,12)) {
				this.msg.showMessageError("Valor do c\u00F3digo no campo 4 \u00E9 inv\u00E1lido.", "barcode4");
				$("#barcode4").focus();
						
				return false;
			}
			return true;
		},
		
		validateAll: function(){
			if (parseFloat(this.cod1) == 0
                && parseFloat(this.cod2) == 0
                && parseFloat(this.cod3) == 0
                && parseFloat(this.cod4) == 0){
				
				this.msg.showMessageError("Valor do c\u00F3digo de barras \u00E9 inv\u00E1lido.", "barcode1");
				$("#barcode1").focus();
								
				return false;
			}
			return true;
		},
		
		verificaSmid: function(){
			var aux = validacaoBarcode.sLeft(this.barcode1,3)
					+ validacaoBarcode.sMid(this.barcode1,5,7)
					+ validacaoBarcode.sMid(this.barcode2,1,11)
					+ validacaoBarcode.sMid(this.barcode3,1,11)
					+ validacaoBarcode.sMid(this.barcode4,1,11);
					
			if ((validacaoBarcode.sMid(aux,3,1) == 6 )|| (validacaoBarcode.sMid(aux,3,1) == 7)) {
				if (validacaoBarcode.calculaDigitoMod10(aux) != validacaoBarcode.sMid(this.barcode1,4,1)) {
					
					this.msg.showMessageError("Valor do c\u00F3digo de barras \u00E9 inv\u00E1lido.", "barcode1");
					$("#barcode1").focus();
			
					return false;
				}
			} 
			else{
				if ((validacaoBarcode.sMid(aux,3,1) == 8 )|| (validacaoBarcode.sMid(aux,3,1) == 9)) {
					if (validacaoBarcode.calculaDigitoMod11_v4(aux) != validacaoBarcode.sMid(this.barcode1,4,1)) {
						
						this.msg.showMessageError("Valor do c\u00F3digo de barras \u00E9 inv\u00E1lido.", "barcode1");
						$("#barcode1").focus();
					
						return false;
					}
				}
			}
			return true;
		},
		
		verificaCod: function(sStr,iTam) {
				if(this.barcode1 != undefined 
						&& this.barcode1 != null){
					digitoVerif = this.barcode1;
					digitoVerif = digitoVerif.substr(2, 1);
					//se 8 ou 9 calcula mod11
					if(digitoVerif == "8" || digitoVerif == "9") {
					return ((validacaoBarcode.sZapDummy(sStr).length == iTam) && (sStr !="") && (sStr.length == iTam) && (validacaoBarcode.calculaDigitoMod11_v4(validacaoBarcode.sLeft(sStr,11)) == validacaoBarcode.sRight(sStr,1)));
					//demais: calcula mod10
					} else {
						return ((validacaoBarcode.sZapDummy(sStr).length == iTam) && (sStr !="") && (sStr.length == iTam) && (validacaoBarcode.calculaDigitoMod10(validacaoBarcode.sLeft(sStr,11)) == validacaoBarcode.sRight(sStr,1)));
					}
				}
		},
		
		jumpField: function(evt){
			if(this.isEmpty()){
				return true;
			}
			
			if(this.jump){
				var target = evt.currentTarget;
				var ultimo = false;
				
				if($("#"+target.name).val().length == target.maxLength){
			       for( var i = 1; i <= 4; i++){
			           ultimo = (i == 4) ? true : false;
			           if(!ultimo){
			        	   var temp = "barcode"+i;
			        	   if(target.name == temp){
			        		   temp = "barcode"+(i+1);
			        		   $("#"+temp).focus();
			        		   break;
			        	   }
			           }
			       }
			   }
			}
			
			return false;		
		},
		
		isEmpty: function(){
			var barcode = this.getBarcode();
			var valido = true;
			if(barcode != undefined && barcode != ""){
				valido = false;
			}
			return valido;
		},
		
		jumpFieldKeyPress: function(evt){
			this.jump = true;
			return;
		},
		
		jumpFieldBlur: function(evt){
			this.jump = false;
		},
		
		loadFocus: function(){
			for(var i=1; i<=4; i++){
				var field = $("#barcode" + i);
				var fieldLength = field.val().length;
				var fieldMaxLength = field.attr("maxlength");
				var isLastField = fieldMaxLength != fieldLength;
				if(isLastField){// se eh o ultimo campo preenchido.
					field.focus();// da foco no campo.
					Util.moveCursorToEnd(field);// move o cursor para o final do campo.
					break;
				}
			}
		}
		
	};
	
	return Barcode;

});