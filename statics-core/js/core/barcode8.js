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
		barcode5: "",
		idDataVenc: "",
		idValor: "",		
		jump: true,
				
			
		inicialize: function(){
			this.barcode1 = $("#cdbar1").val() + $("#cdbar2").val();
			this.barcode2 = $("#cdbar3").val() + $("#cdbar4").val();
			this.barcode3 = $("#cdbar5").val() + $("#cdbar6").val();
			this.barcode4 = $("#cdbar7").val();
			this.barcode5 = $("#cdbar8").val();
		},
		
		getBarcode: function(){
			this.inicialize();
			var barcode = "";
			barcode += this.barcode1;
			barcode += this.barcode2;
			barcode += this.barcode3;
			barcode += this.barcode4;
			barcode += this.barcode5;
			
			return barcode;
		},
		
		
		validate: function(){
			this.inicialize();
			var valido = false;
			if(this.validatebarcode1() && this.validatebarcode2() && this.validatebarcode3() && this.validatebarcode4()	&& this.validatebarcode5()){
				if(this.validatebarcode1Mod10() && this.validatebarcode2Mod10() && this.validatebarcode3Mod10() && this.validatebarcode4barcode5DVGeral()){
					valido = true;
				}
			}
			
			return valido;
		},
		
		validatebarcode1: function(){
			if (this.barcode1 == "") {
				this.msg.showMessageError("Favor informar o valor do primeiro bloco do c\u00F3digo de barras.", "cdbar1");
				$("#cdbar1").focus();
			
				return false;
			}
			if (!validacaoBarcode.isNumber(this.barcode1,0)) {
				this.msg.showMessageError("O c\u00F3digo de barras deve ser inteiramente num\u00E9rico.", "cdbar1");
				$("#cdbar1").focus();
				
				return false;
			}
			if (this.barcode1.length != 10) {
				this.msg.showMessageError("O primeiro bloco do c\u00F3digo de barras deve conter exatamente 10 n\u00FAmeros.","cdbar1");
				$("#cdbar1").focus();
				return false;
			}
			return true;
		},
		
		validatebarcode2: function(){
			 if (this.barcode2 == "") {
				this.msg.showMessageError("Favor informar o valor do segundo bloco do c\u00F3digo de barras.","cdbar3");
				$("#cdbar3").focus();
			
				return false;
			}
			if (!validacaoBarcode.isNumber(this.barcode2,0)) {
				this.msg.showMessageError("O c\u00F3digo de barras deve ser inteiramente num\u00E9rico.", "cdbar3");
				$("#cdbar3").focus();

				return false;
			}
			if (this.barcode2.length != 11) {
				this.msg.showMessageError("O segundo bloco do c\u00F3digo de barras deve conter exatamente 11 n\u00FAmeros.","cdbar3");
				$("#cdbar3").focus();

				return false;
			}
			return true;
		},	
		
		validatebarcode3: function(){
			if (this.barcode3 == "") {
				this.msg.showMessageError("Favor infomar o valor do terceiro bloco do c\u00F3digo de barras.", "cdbar5" );
				$("#cdbar5").focus();
				
				return false;
			}
			if (!validacaoBarcode.isNumber(this.barcode3,0)) {
				this.msg.showMessageError("O c\u00F3digo de barras deve ser inteiramente num\u00E9rico.", "cdbar5");
				$("#cdbar5").focus();
				
				return false;
			}
			if (this.barcode3.length != 11) {
				this.msg.showMessageError("O terceiro bloco do c\u00F3digo de barras deve conter exatamente 11 n\u00FAmeros.", "cdbar5" );
				$("#cdbar5").focus();
				
				return false;
			}
			return true;
		},
		
		validatebarcode4: function(){
			if (!validacaoBarcode.isNumber(this.barcode4,0)) {
				this.msg.showMessageError("O quarto bloco do c\u00F3digo de barras deve ser num\u00E9rico ou estar vazio.", "cdbar7");
				$("#cdbar7").focus();
				
				return false;
			}
			return true;
		},
		
		validatebarcode5: function(){
			if (!validacaoBarcode.isNumber(this.barcode5,0)) {
				this.msg.showMessageError("O quinto campo do c\u00F3digo de barras deve ser num\u00E9rico ou estar vazio.", "cdbar8");
				$("#cdbar8").focus();
				
				return false;
			}
			return true;				
		},
		
		//Funcao comum a todos
		
		validatebarcode1Mod10: function () {
			if (!validacaoBarcode.mod10(this.barcode1)) {
				this.msg.showMessageError("O d\u00EDgito verificador do primeiro campo do c\u00F3digo de barras est\u00E1 inv\u00E1lido.","cdbar1");
				$("#cdbar1").focus();
			
				return false;
			}
			return true;
		},
		
		validatebarcode2Mod10: function () {
			if (!validacaoBarcode.mod10(this.barcode2)){
					this.msg.showMessageError("O d\u00EDgito verificador do segundo campo do c\u00F3digo de barras est\u00E1 inv\u00E1lido.", "cdbar3");
					$("#cdbar3").focus();
					
					return false;
			}
			return true;
		},
		
		validatebarcode3Mod10: function () {
			if (!validacaoBarcode.mod10(this.barcode3)){
				this.msg.showMessageError("O d\u00EDgito verificador do terceiro campo do c\u00F3digo de barras est\u00E1 inv\u00E1lido.","cdbar5");
				$("#cdbar5").focus();
			
				return false;
			}
			return true;
		},
					
		validatebarcode4barcode5DVGeral: function(){
			var aux = "00000000000000" + this.barcode5;
			this.barcode5 = aux.substring(aux.length - 14, aux.length);
			str = this.barcode1.substring(0,4)
				+ this.barcode5
				+ this.barcode1.substring(4, 9)
				+ this.barcode2.substring(0,10)
				+ this.barcode3.substring(0,10);
			dig = validacaoBarcode.calculaDigitoMod11(str,1,9);
			if(dig == 0 || dig == 1 || dig > 9) dig = 1;
			if(dig != this.barcode4) {
				this.msg.showMessageError("C\u00F3digo de barras inv\u00E1lido! Favor inform\u00E1-lo corretamente.", "cdbar1");
				$("#cdbar1").focus();	
				
				return false;
			}
		
			return true;
		},
				
		jumpField: function(evt){
			if(this.isEmpty()){
				return true;
			}
			if(this.jump){
				var target = evt.currentTarget;
				var ultimo = false;
			    if($("#"+target.name).val().length == target.maxLength){
			       for( var i = 1; i <= 8; i++){
			           ultimo = (i == 8) ? true : false;
			           if(ultimo && this.idDataVenc != "" && this.idValor != ""){
			    		   this.getValorEdataVencimento();
			           }	
			           if(!ultimo){
			        	   var temp = "cdbar"+i;
			        	   if(target.name == temp){
			        		   temp = "cdbar"+(i+1);
			        		   $("#"+temp).focus();
			        		   break;
			        	   }
			           }
			       }
			   }
			}
			return false;
		
		},
		
		getValorEdataVencimento: function(){
			n = '00000000000000' + this.$("#cdbar8").val();
		    len = n.length;
		    n = n.substring(len-14, len);
		    len = n.length;

		    if (!validacaoBarcode.isNumber(n,0)) {
		    	this.msg.showMessageError("O quinto campo do c\u00F3digo de barras deve ser num\u00E9rico.", "cdbar8");
		    	$("#cdbar8").focus();
		        return;
		    }

		    if (n * 1 != 0) {
		        var i, d, fator_venc;
		        d = n.substr(12, 2);
		        i = n.substr(0, 12);

		        //verifica fator de vencimento
		        fator_venc = n.substr(0, 1);

		        if (fator_venc == 0) {
		            i = n.substr(0, 12);
		        } else {
		            i = n.substr(4, 8);
		            f = n.substr(0, 4);
		            
		            this.idDataVenc = validacaoBarcode.dataDiaZero(validacaoBarcode.calcDiasZero('07/10/1997') + parseInt(f, 10));
		            
		        }

		        d = n.substr(12, 2);
		        
		        this.idValor = (parseFloat(i) + "," + d);
		     }
		    
	
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
			for(var i=1; i<=8; i++){
				var field = $("#cdbar" + i);
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