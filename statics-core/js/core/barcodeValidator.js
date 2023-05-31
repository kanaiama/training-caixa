define(["jquery.ui",
        "statics-core/js/core/systemMessages"],
function($, MESSAGE){
	
	var barcodeValidator = {
			
			el : [],
			
			fullCheck : false,
			
			//Informa o estado da validacao do codigo de barras
			validBarCod:true,
			
			//Tipo de Input MANUAL/LEITOR
			barcodeTypeInput:"",
			
			//Informacao inserida com Ctrl+V do hardware leitor de codigo de barras
			pastDataValue:false,
	        
			//Parametros de retorno
			barcode4ParamsRet: [],
			barcode8ParamsRet: [],
			
			//Necessario para obtencao dos dados do codigo de barras para o funcional
			barcode4:false,
			barcode8:false,
			
			//Informa se devera ser usado o evento userChangeField quando o componente estiver configurado como leitura 
			//de codigo de barras
			barcodeLeitorUserChangeField:false,
	
			//Codigo que contem a data de vencimento e o valor impresso no codigo de barras
			barcode8DataVlField8:"",
			
			//Codigo que contem o valor de segmento
			barcode4DataField1:"",
			
			//Codigo que contem o valor de convenio
			barcode4DataField2:"",
			
			showMessageValidatorLeitor:false,
			
			//bloqueto
			isBarcode4 : function(input){
				var result = false;
				
				if(input == "8"){
					result = true;
				}
				
				return result;
			},
			
			//concessionaria
			isBarcode8 : function(input){
				var result = false;
				
				if((input >= "0" && input <= "7") || (input == "9")){
					result = true;
				}
				
				return result;
			},
			
			avoidedKeysUp : function(event){
				var result = false;
				var key = event.keyCode;
				var BACK_TAB = 16;
				var LEFT = 37;
				var RIGHT = 39;
				var SHIFT = 9;
				
				if((key != SHIFT) && (key != BACK_TAB) && (key != LEFT) && (key != RIGHT)){
					result = true;
				}
				
				return result;
			},
			
			fieldCheck : function(event, element){
				this.el = $(element);
				
				var field = event.target.id;
				
				switch(field){
					case "barcode4-field1":
						return this.barcode4Field1Validator();
					case "barcode4-field2":
						return this.barcode4Field2Validator();
					case "barcode4-field3":
						return this.barcode4Field3Validator();
					case "barcode4-field4":
						return this.barcode4Field4Validator();
						
					case "barcode8-field1":
						return this.barcode8Field1Validator();
					case "barcode8-field2":
						return this.barcode8Field2Validator();
					case "barcode8-field3":
						return this.barcode8Field3Validator();
					case "barcode8-field4":
						return this.barcode8Field4Validator();
					case "barcode8-field5":
						return this.barcode8Field5Validator();
					case "barcode8-field6":
						return this.barcode8Field6Validator();
					case "barcode8-field7":
						return this.barcode8Field7Validator();
					case "barcode8-field8":
						return this.barcode8Field8Validator();
					default:
						break;
				}
				
			},
			
			barcode4Field1Validator : function(){
				var result = false;
				var value = this.el.find("#barcode4-field1").val();
				
				if((value.charAt(0) == 8) && (value.charAt(1) != 8) && (!this.isEmpty(value))){
					if(this.isModulo10forBarcode4()){
						this.hideMessages();
						result = this.modulo10(value, value.substr(11,1));
					}else if(this.isModulo11forBarcode4()){
						this.hideMessages();
						result = this.modulo11(value, value.substr(11,1));
					}else{
						result = false;
					}
				} 
				
				if(value.length != 12){
					result = false;
				}
				
				if(result == false){
					this.barcode4DataField1 = "";
					this.hideMessages();
					this.showMessage("error", MESSAGE.MA698);
					if(this.fullCheck){
						this.el.find("#barcode4-field1").focus();
					}
				} else if (result == true) {
					this.barcode4DataField1 = value;
				}
				
				return result;
			},
			
			barcode4Field2Validator : function(){
				var result = false;
				var value = this.el.find("#barcode4-field2").val();
				
				if(!this.isEmpty(value)){
					if(this.isModulo10forBarcode4()){
						this.hideMessages();
						result = this.modulo10(value, value.substr(11,1));
					}else if(this.isModulo11forBarcode4()){
						this.hideMessages();
						result = this.modulo11();
					}else{
						result = false;
					}
				}
				
				if(value.length != 12){
					result = false;
				}
					
				if(result == false){						
					this.barcode4DataField2 = "";
					this.hideMessages();
					this.showMessage("error", MESSAGE.MA699);
					if(this.fullCheck){
						this.el.find("#barcode4-field2").focus();
					}
				} else if (result == true) {
					this.barcode4DataField2 =  value;
				}
					
				return result;
			},
			
			barcode4Field3Validator : function(){
				var result = false;
				var value = this.el.find("#barcode4-field3").val();
				
				if(!this.isEmpty(value)){
					if(this.isModulo10forBarcode4()){
						this.hideMessages();
						result = this.modulo10(value, value.substr(11,1));
					}else if(this.isModulo11forBarcode4()){
						this.hideMessages();
						result = this.modulo11();
					}else{
						result = false;
					}
				}
			
				if(value.length != 12){
					result = false;
				}
				
				if(result == false){
					this.hideMessages();
					this.showMessage("error", MESSAGE.MA700);
					if(this.fullCheck){
						this.el.find("#barcode4-field3").focus();
					}
				}
				
				return result;
			},		
			
			barcode4Field4Validator : function(){
				var result = false;
				var value = this.el.find("#barcode4-field4").val();
				
				if(!this.isEmpty(value)){
					if(this.isModulo10forBarcode4()){
						this.hideMessages();
						result = this.modulo10(value, value.substr(11,1));
					}else if(this.isModulo11forBarcode4()){
						this.hideMessages();
						result = this.modulo11();
					}else{
						result = false;
					}
				}
				
				if(value.length != 12){
					result = false;
				}
					
				if(result == false){
					this.hideMessages();
					this.showMessage("error", MESSAGE.MA701);
					if(this.fullCheck){
						this.el.find("#barcode4-field4").focus();
					}
				}
				
				return result;
			},			
			
			barcode4FullValidator : function(element, barcodeList) {
				this.el = $(element);
				var fullValue = "";
				this.fullCheck = true;
				if(this.barcode4Field1Validator() &&
				this.barcode4Field2Validator() &&
				this.barcode4Field3Validator() &&
				this.barcode4Field4Validator()){
					
					this.hideMessages();
					this.showMessage("success", "C\u00F3digo de Barras v\u00E1lido.");
					for(i = 0; i < barcodeList.length; i++){
						fullValue = fullValue + this.el.find("#" + barcodeList[i].id).val();
					}
				}
				return fullValue;
			},
			

			barcode8Field1Validator : function(){
				var result = true;
				this.hideMessages();
				return result;
			},						

			barcode8Field2Validator : function(){
				var result = false;
				var value = this.el.find("#barcode8-field1").val() + this.el.find("#barcode8-field2").val();				
				result = this.modulo10(value, value.substr(9,1));
				
				if(value.length != 10){
					result = false;
				}
				
				this.hideMessages();
				if(result == false){
					this.showMessage("error", MESSAGE.MA116);
				}
				
				return result;
			},	
			
			barcode8Field3Validator : function(){
				var result = true;
				this.hideMessages();
				return result;
			},
			
			barcode8Field4Validator : function(){
				var result = false;
				var value = this.el.find("#barcode8-field3").val() + this.el.find("#barcode8-field4").val();	
				
				result = this.modulo10(value, value.substr(10,1));
				
				if(value.length != 11){
					result = false;
				}
				this.hideMessages();
				if(result == false){
					this.showMessage("error", MESSAGE.MA116);
				}
				
				return result;
			},			
			
			barcode8Field5Validator : function(){
				var result = true;
				this.hideMessages();
				return result;
			},			
			
			barcode8Field6Validator : function(){
				var result = false;
				var value = this.el.find("#barcode8-field5").val() + this.el.find("#barcode8-field6").val();
				
				result = this.modulo10(value, value.substr(10,1));

				if(value.length != 11){
					result = false;
				}
				
				this.hideMessages();
				
				if(result == false){
					this.showMessage("error", MESSAGE.MA116);
				}
				
				return result;
			},	
			
			barcode8Field7Validator : function(){
				var result = false;
				var value = "";
				var barcodeList = document.getElementsByClassName("barcode8Class");
				
				if(this.el.find("#barcode8-field8").val().length == 14){
					//3 digitos do codigo do Banco (341);
					value = this.el.find("#barcode8-field1").val().substr(0,3);
					//1 digito com o codigo da moeda (3);
					value = value + this.el.find("#barcode8-field1").val().substr(3,1);
					//4 digitos do fator de vencimento;
					value = value + this.el.find("#barcode8-field8").val().substr(0,4);
					//10 digitos do valor do titulo;
					value = value + this.el.find("#barcode8-field8").val().substr(4,10);
					//3 digitos da carteira;
					value = value + this.el.find("#barcode8-field1").val().substr(4,1);
					value = value + this.el.find("#barcode8-field2").val().substr(0,2);
					//9 digitos do Nosso Numero mais seu proprio DAC;
					value = value + this.el.find("#barcode8-field2").val().substr(2,2);
					value = value + this.el.find("#barcode8-field3").val().substr(0,5);
					value = value + this.el.find("#barcode8-field4").val().substr(0,2);
					//4 digitos da agencia;
					value = value + this.el.find("#barcode8-field4").val().substr(2,3);
					value = value + this.el.find("#barcode8-field5").val().substr(0,1);
					//6 digitos da conta corrente, com seu proprio DAC;
					value = value + this.el.find("#barcode8-field5").val().substr(1,4);
					value = value + this.el.find("#barcode8-field6").val().substr(0,2);
					//3 digitos nao utilizados e composto por zeros (000).
					value = value + this.el.find("#barcode8-field6").val().substr(2,3);
					
					result = this.modulo11(value, this.el.find("#barcode8-field7").val());
					
					this.hideMessages();
					
					if(result == false){
						this.showMessage("error", MESSAGE.MA116);
					}
				}else{
					result = true;
				}
					
				return result;
			},	
			
			barcode8Field8Validator : function(){
				var result = false;
				var value = "";
				
				value = this.el.find("#barcode8-field8").val();
				
				if(value.length == 14){
					result = this.barcode8Field7Validator();
					this.barcode8DataVlField8 = value;
				}
					
				return result;
			},	
			
			barcode8FullValidator : function(element, barcodeList) {
				var fullValue = "";
				this.el = $(element);
				this.fullCheck = true;
				if(this.barcode8Field1Validator() &&
				this.barcode8Field2Validator() &&
				this.barcode8Field3Validator() &&
				this.barcode8Field4Validator() &&
				this.barcode8Field5Validator() &&
				this.barcode8Field6Validator() &&
				this.barcode8Field7Validator() &&
				this.barcode8Field8Validator()){
					
					this.hideMessages();
					this.showMessage("success", "C\u00F3digo de Barras v\u00E1lido.");
					for(i = 0; i < barcodeList.length; i++){
						fullValue = fullValue + this.el.find("#" + barcodeList[i].id).val();
					}
				}
				
				return fullValue;
			},			
			
			isModulo10forBarcode4 : function() {
				var valueBarcode4 = this.el.find("#barcode4-field1").val();

				var result = false;
				
				if(valueBarcode4.charAt(2) == 6 || valueBarcode4.charAt(2) == 7){ 
					result = true;
				}
				
				return result;
			},
			
			isModulo11forBarcode4 : function() {
				var valueBarcode4 = document.getElementById("barcode4-field1").value;

				var result = false;
				
				if(valueBarcode4.charAt(2) == 8 || valueBarcode4.charAt(2) == 9){ 
					result = true;
				}
				
				return result;
			},
			
			modulo10 : function(value, checkDigit) {
				var result = false;
				var sum = 0;
				var mult = 2;
				var aux = "";
				
				if(!this.isEmpty(value)){
					for(var i = (value.length - 2); i >= 0; i--){
						aux = aux + parseInt(value.charAt(i) * mult);
						if(mult == 2){
							mult = 1;
						}else{
							mult = 2;
						}
					}
	
					for(var i = 0; i < aux.length; i++){
						sum = sum + parseInt(aux.charAt(i));
					}
					
					sum = sum % 10;
					sum = 10 - sum;
					if(sum == 10){
						sum = 0;
					}
					
					if(sum == checkDigit){
						result = true;
					}
				}else{
					result = false;
				}
				
				return result;
			},

			modulo11 : function(value, checkDigit) {
				var mod11List = [];
				var result = false;
				var sum = 0;
				var mult = 2;
				var aux = "";
				
				for(var i = (value.length - 1); i >= 0; i--){
					mod11List.push(parseInt(value.charAt(i) * mult));
					if(mult == 9){
						mult = 2;
						continue;
					}
					mult ++;
				}

				for(var i = 0; i < mod11List.length; i++){
					sum = sum + parseInt(mod11List[i]);
				}
				
				sum = sum % 11;
				
				if((sum == 0) || (sum == 1) || (sum >= 10)){
					sum = 1;
				}else{
					sum = 11 - sum;
				}
				
				if(sum == checkDigit){
					result = true;
				}
				return result;
			},

			showMessage : function(type, message){
				this.hideMessages();
				if(type == "error"){
					
					this.validBarCod = false;
					this.el.find("#error-message").css("display", "");
					this.el.find("#error-message").html(message);
					this.barcode4ParamsRet = [];
					this.barcode8ParamsRet = [];
					
				}else if(type == "success"){
					
					this.validBarCod = true;
					this.el.find("#success-message").css("display", "");
					this.el.find("#success-message").html(message);
					
					  if (this.barcode8) {
						  this.formatDtParamsbarcode8ParamsRet();
					  } else if (this.barcode4) {
						  this.formatDtParamsbarcode4ParamsRet();
					  }
				}
				
			},
			
			hideMessages : function(){
				if (this.showMessageValidatorLeitor == false){  
					$("#success-message").css("display", "none");
					$("#error-message").css("display", "none");
				}
			},
			
			onlyNumbers: function(evt, barcodeType, element){
				this.el = $(element);
				var e = evt || window.event;
			    var key = e.keyCode || e.which;
			    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
			    key >= 48 && key <= 57 ||
			    key >= 96 && key <= 105 ||
			    key == 8 || key == 9 || key == 13 ||
			    key == 35 || key == 36 ||
			    key == 37 || key == 39 ||
			    key == 46 || key == 45) {
			    	this.hideMessages();
			    }
			    else {
			    	if(barcodeType != "default"){
			    		this.showMessage("error", MESSAGE.MA515);
			    	}
		    		e.returnValue = false;
		    		if (e.preventDefault) e.preventDefault();
			    }
			},
			
			//Evento para aceitar entrada de codigo de barras
			onlyCtrlV: function(evt, barcodeType, element){
				this.el = $(element);
				var e = evt || window.event;
			    var key = e.keyCode || e.which;
			    var ctrlDown = evt.ctrlKey||evt.metaKey;
			    
			    if ((ctrlDown && key == 86)) {
			    	
			       this.hideMessages();
			       
			          if (key != 86) {
			        	  var vl 							= this.el.find("#barcodeLeitor");
			        	  var visibleBarcodeLeitor 			= vl.is(":visible");
			        	  
			        	  if (visibleBarcodeLeitor) {
			        		  this.barcodeLeitorUserChangeField = false;  
			        	  } else {
			        		  this.barcodeLeitorUserChangeField = true;
			        	  }
			        	  
			        	  
			          }
			       
			    } else {
		    		e.returnValue = false;
		    		if (e.preventDefault) e.preventDefault();
			    }
			},
			
			//Inicializa algumas validacoes no evento de keyDown
			validAccordToInput: function(evt, barcodeType, element) {
				this.el 				 = $(element);
				var vl  				 = this.el.find("#barcodeLeitor");
				var visibleBarcodeLeitor = vl.is(":visible");
				this.pastDataValue 		 = false;
				
				if (this.barcodeTypeInput == "LEITOR" && visibleBarcodeLeitor ) {
					
					this.onlyCtrlV (evt, barcodeType, element);
					
				} else {
					
					this.onlyNumbers (evt, barcodeType, element);
					
				}
				
			},
			
			isEmpty : function(value) {
				var result = false;
				
				if(value == ""){
					result = true;
				}
				
				return result;
			},
			
			StrNum: function(Dado, Larg){
				var Result; 
				var sDado;
				var i;

			 	sDado = Dado.toString();
			 	if (sDado.length >= Larg) {
			 		Result = sDado.substr(sDado.length - Larg,Larg);
			 	} else {
			 		Result = "";
			 		
			 		for (i=Larg-sDado.length; i>0; i--){
			 			Result = Result + "0";
			 		}
			 		Result = Result + sDado.toString();
			   }
			 	return Result;
			 },
			 
		   //Retorna a quantidade de Dias entre a DataDada (DD/MM/AAAA) e a Data Zero.    
		   calcDiasZero: function(dataDada){
				 var DiasMes = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
				 var Dia = parseInt(dataDada.substr(0,2),10);
				 var Mes = parseInt(dataDada.substr(3,2),10);
				 var Ano = parseInt(dataDada.substr(6,4),10);
				 var Dias;

				 Dias = Dia + (Ano*365) + parseInt(Ano/4) - parseInt(Ano/100) + parseInt(Ano/400) + 1;
				 
				 for(var i=0; i<(Mes-1); i++) {
					 Dias += DiasMes[i];
				 }
				 
				 return Dias;
			 },
			 
			dataDiaZero: function(diasZero) {
				var DiasMes = new Array(31,29,31,30,31,30,31,31,30,31,30,31);
				var d; 
				var p;
				var Mes; 
				var Ano;
				var rDias=diasZero;
				  
				  Ano=0;
				  p=true;
				  
				  while(p){
				    d = ((Ano%4 != 0) || (Ano%100 == 0) && (Ano%400 != 0))?365:366;
				    if ((rDias - d) <= 0) {
				      p = false;
				    } else {
				      rDias -= d;
				      Ano++;
				    }
				  }
				  
				  Mes=0;
				  p =true;
				  
				  while(p) {
				    
					d = DiasMes[Mes];
				    
					if ((Mes == 1) && ((Ano%4 != 0) || (Ano%100 == 0) && (Ano%400 != 0))) d--;
				      if ((rDias - d) <= 0) {
				        p = false;
				      } else {
				        rDias -= d;
				        Mes++;
				      }
				  }
				  
				  Mes++;
				  
				  return (this.StrNum(rDias, 2) + "/" + this.StrNum(Mes, 2) + "/" + this.StrNum(Ano, 4));
			},
			
			//Metodo para obter o dia de vencimento e o valor impresso no codigo de barras barcod8
			//Chamado internamente ao metodo showMessage
			formatDtParamsbarcode8ParamsRet: function(){
				
				var dataVencimento = "";
				var valorPagamento = "";
				
				if (this.validBarCod) {
					var dtField5 	= this.barcode8DataVlField8;
					var n        	= '00000000000000' + dtField5;
					var len      	= n.length;
					var fator_venc  = "";
					
					n 				= n.substring(len-14, len);
				    len 			= n.length;
					
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
					            dataVencimento = this.dataDiaZero(this.calcDiasZero('07/10/1997') + parseInt(f, 10));
					        }
					       
					       d 				= n.substr(12, 2);
					       valorPagamento 	= parseFloat(i) + "," + d;
					 } 
					 
					 this.barcode8ParamsRet[0] = dataVencimento;
					 this.barcode8ParamsRet[1] = valorPagamento;
				}
			},
			
			//Metodo para obter o segmento e o convenio de barcode4
			//Chamado internamente ao metodo showMessage
			formatDtParamsbarcode4ParamsRet: function(){
				
				var segmento = "";
				var convenio = "";
				var dtField1 = this.barcode4DataField1;
				var dtField2 = this.barcode4DataField2;
				segmento 	 = dtField1.charAt(1);
				convenio     = dtField2.substr(4,4); 
				
				this.barcode4ParamsRet[0] = segmento;
				this.barcode4ParamsRet[1] = convenio;
				
			}
	}
	
	return barcodeValidator;
	
});