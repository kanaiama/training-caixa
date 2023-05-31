define(["jquery"], function($){
	return{ 
		validaCpf: function(val){
	        value = jQuery.trim(val);
	        cpf = val.replace(/\.|-|\//gi,'');
	        while(cpf.length < 11) cpf = "0"+ cpf;
	        var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
	        var a = [];
	        var b = new Number;
	        var c = 11;
	        
	        for (i=0; i<11; i++){
	            a[i] = cpf.charAt(i);
	            if (i < 9) b += (a[i] * --c);
	        }
	        
	        if ((x = b % 11) < 2) { 
	        	a[9] = 0 
	        } else { 
	        	a[9] = 11-x 
	        }
	        b = 0;
	        c = 11;
	        
	        for (y=0; y<10; y++) b += (a[y] * c--);

	        if ((x = b % 11) < 2) {
	        	a[10] = 0; 
	        } else { 
	        	a[10] = 11-x; 
	        }
	        if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) 
	        	return false;
	        
	        return true;		
		},

		/*
		* Metodo usado para verificar se o cnpj digitado e valido
		* @param int cnpj
		* @return boolean 'retorna TRUE para cnpj valido e FALSE para invalido'
		*/
		validaCnpj: function(s) {
			var value = jQuery.trim(s);
	        var s = value.replace(/\.|-|\//gi,'');
	        while(s.length < 12) s = "0"+ s;
			var i;
			var c = s.substr(0,12);
			var dv = s.substr(12,2);
			var d1 = 0;
			
			for (i = 0; i < 12; i++){
				d1 += c.charAt(11-i)*(2+(i % 8));
			}

			if (d1 == 0) {
				return false;
			}

			d1 = 11 - (d1 % 11);

			if (d1 > 9) d1 = 0;
			if (dv.charAt(0) != d1){
				return false;
			}

			d1 *= 2;

			for (i = 0; i < 12; i++){
				d1 += c.charAt(11-i)*(2+((i+1) % 8));
			}

			d1 = 11 - (d1 % 11);

			if (d1 > 9) d1 = 0;
			if (dv.charAt(1) != d1){
				return false;
			}

			return true;
		},
	
		calculaDigitoMod11: function(dado, numDig, limMult) {
			var mult, soma, i, n;
	
			for(n = 1; n <= numDig; n++) {
				soma = 0;
				mult = 2;
				for(i = dado.length-1; i>=0; i--) {
					soma += (mult * parseInt(dado.charAt(i)));
					if(++mult > limMult) mult = 2;
				}
				dado += ((soma * 10) % 11) % 10;
			}
			return dado.substr(dado.length-numDig, numDig);
		},
		
		/*Valida renavam
		 * return 0 -> renavam invalido
		 * return 1 -> revavam ok
		 * return 2 -> digito verificador invalido */
		isRenavam : function(str){
			str = str.replace("-", "");
			if(str.length < 9){
				return 0;
			}else {
				while (str.length < 11){
					str = "0" + str;
				}
			}			
			regex = new RegExp("[0-9]{11}", "");
			if(!str.match(regex)){
				return 0;			
			}
			if(str == "00000000000"){
				return 0;
			}
			var renavamSemDigito = str.substring(0, 10);
			var renavamReversoSemDigito = renavamSemDigito.split('').reverse().join('');		 
			var soma = 0;	
			for (var i = 0; i < 8; i++) {
				 var algarismo = renavamReversoSemDigito.substring(i, i + 1);
				 var multiplicador = i + 2;
				 soma += (algarismo * multiplicador);
			}		  
			soma += (renavamReversoSemDigito.charAt(8) * 2);
			soma += (renavamReversoSemDigito.charAt(9) * 3);	
			var mod11 = soma % 11;		 
			var ultimoDigitoCalculado = 11 - mod11;	
			ultimoDigitoCalculado = (ultimoDigitoCalculado >= 10 ? 0 : ultimoDigitoCalculado);		
			var digitoRealInformado = str.substring(str.length - 1, str.length);		 
			if (ultimoDigitoCalculado == digitoRealInformado) {
				return 1;
			} else {
				return 2;
			}
		},
		
		isDDD : function(str){
			if(str.length < 2){
				return false;
			}else if(!str.match(/^[1-9][1-9]/)){
				return false;
			}			
			var x = str;
			if( !(x >= 11 && x < 20) && x != 21 && x != 22 && x != 24
					&& x != 27 && x != 28 && !(x >= 31 && x < 36)
					&& x != 37 && x != 38 && !(x >= 41 && x < 50)
					&& x != 51 && x != 53 && x != 54 && x != 55
					&& !(x >= 61 && x < 70) && x != 71 && x != 73
					&& x != 74 && x != 75 && x != 77 && x != 79
					&& ( !(x >= 81 && x < 100) || (x == 90) ) ){
				return false;
			}
			return true;
		},

		formataValor: function(valor){
			var texto = valor;
			if (typeof Intl == 'object' && Intl && typeof Intl.NumberFormat == 'function') {
				const formatter = new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				});
				texto = formatter.format(valor);
			} else {
				texto = valor.toLocaleString();
			}
			return texto;
		},
		
		filtraTexto: function(dado) {
			var r = '';
			var asc1 = new String();
			var asc2 = new String();
			asc1 = 'áàãäâÁÀÃÄÂéèêëÉÈÊËìíîïÌÍÎÏòóôõöÒÓÔÕÖùúûuÙÚÛUýÝçÇñÑ?';
			asc2 = 'AAAAAAAAAAEEEEEEEEIIIIIIIIOOOOOOOOOOUUUUUUUUYYCCNN?';
			for(i=0;i<=dado.length-1;i++) {
				c = dado.charAt(i);
				for(j=0;j<=asc1.length-1;j++)
				if(dado.charAt(i) == asc1.charAt(j))
					c = asc2.charAt(j);
					if((c<'0' || c>'9') && (c<'A' || c>'Z') && (c<'a' || c>'z') && (c != ' ') && (c != ',') && (c != '.') && (c != '/'))
					{
						return "";
					}
					r = r + c;
				}
			return r.toUpperCase();
		},
		
		upperCaseAndRemoveEspecialcharacters: function(dado) {
			var r = '';
			var asc1 = new String();
			var asc2 = new String();
			asc1 = 'áàãäâÁÀÃÄÂéèêëÉÈÊËìíîïÌÍÎÏòóôõöÒÓÔÕÖùúûuÙÚÛUýÝçÇñÑ?/,.';
			asc2 = 'AAAAAAAAAAEEEEEEEEIIIIIIIIOOOOOOOOOOUUUUUUUUYYCCNN?/,.';
			for(i=0;i<=dado.length-1;i++) {
				c = dado.charAt(i);
				for(j=0;j<=asc1.length-1;j++)
				if(dado.charAt(i) == asc1.charAt(j))
					c = asc2.charAt(j);
					if((c<'0' || c>'9') && (c<'A' || c>'Z') && (c<'a' || c>'z') && (c != ' ') || (c == ',') || (c == '.') || (c == '/')) {
						return r;
					}
					r = r + c;
				}
			return r.toUpperCase();
		},
		
		//valida o formato da data
		validaFomatoData: function (input) {
			if(input.attr('type') == 'date'){
				//validar tipo date
			} else {
				if(!input.val().match(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/[12][0-9]{3}$/)){
					return false;
				}
			}
			
			return true;
		},
		//compara a data informada com a data Atual
		validaDataMaiorQueDataAtual: function(input) {
			var data;
			if(input.attr('type') != 'date'){
				var dataSplit = input.val().split("/");
				data = dataSplit[2] + "-" + dataSplit[1] + "-" + dataSplit[0];
			} else {
				data = input.val();
			}
			
			var dataAtual = new Date();
			
			var dd = dataAtual.getDate();
			var mm = dataAtual.getMonth() + 1;
			var yyyy = dataAtual.getFullYear();
			
			dd = dd.toString();
			if (dd.length < 2) {
				dd = "0" + dd;
			}
			
			mm = mm.toString();
			if (mm.length < 2) {
				mm = "0" + mm;
			}
			
			var dataHoje = yyyy + "-" + mm + "-" + dd;
			var data1 = new Date(data+'T00:00:00.000Z');
			var data2 = new Date(dataHoje+'T00:00:00.000Z');
			
			if(data1.getTime() > data2.getTime()){
				return true;
			}
			
			return false;
		},
		
		//compara a data informada se for maior ou igual com a data Atual 
		validaDataMaiorIgualDataAtual: function(input) {
			var data;
			var dataSplit = input.split("/");
			data = dataSplit[2] + "-" + dataSplit[1] + "-" + dataSplit[0];
			
			var dataAtual = new Date();
			
			var dd = dataAtual.getDate();
			var mm = dataAtual.getMonth() + 1;
			var yyyy = dataAtual.getFullYear();
			
			dd = dd.toString();
			if (dd.length < 2) {
				dd = "0" + dd;
			}
			
			mm = mm.toString();
			if (mm.length < 2) {
				mm = "0" + mm;
			}
			
			var dataHoje = yyyy + "-" + mm + "-" + dd;
			var data1 = new Date(data+'T00:00:00.000Z');
			var data2 = new Date(dataHoje+'T00:00:00.000Z');
			
			if(data1.getTime() >= data2.getTime()){
				return true;
			}
			
			return false;
		},
		
		/**
		 * valida se o input de uma data e maior que a data atual
		 * input - string no formatdo 'dd/mm/aaaa'
		 */
		isDataMaiorAtualDoisDias: function(input) {
			var data;
			var dataSplit = input.split("/");
			data = dataSplit[2] + "-" + dataSplit[1] + "-" + dataSplit[0];
			
			var dataAtual = new Date();
			
			var dd = dataAtual.getDate();
			var mm = dataAtual.getMonth() + 1;
			var yyyy = dataAtual.getFullYear();
			
			dd = dd.toString();
			if (dd.length < 2) {
				dd = "0" + dd;
			}
			
			mm = mm.toString();
			if (mm.length < 2) {
				mm = "0" + mm;
			}
			
			var dataHoje = yyyy + "-" + mm + "-" + dd;
			var data1 = new Date(data+'T00:00:00.000Z');
			var data2 = new Date(dataHoje+'T00:00:00.000Z');
			
			if(data1.getTime() > (data2.getTime() + 86400000)){
				return true;
			}
			
			return false;
		},
		
		/**
		 * valida se o input de uma data e maior que a data atual + 1 dia
		 * input - string no formatdo 'dd/mm/aaaa'
		 */
		isDataMaiorAtualUmDia: function(input) {
			var data;
			var dataSplit = input.split("/");
			data = dataSplit[2] + "-" + dataSplit[1] + "-" + dataSplit[0];

			var dataAtual = new Date();

			var dd = dataAtual.getDate();
			var mm = dataAtual.getMonth() + 1;
			var yyyy = dataAtual.getFullYear();

			dd = dd.toString();
			if (dd.length < 2) {
				dd = "0" + dd;
			}

			mm = mm.toString();
			if (mm.length < 2) {
				mm = "0" + mm;
			}

			var dataHoje = yyyy + "-" + mm + "-" + dd;
			var data1 = new Date(data + 'T00:00:00.000Z');
			var data2 = new Date(dataHoje + 'T00:00:00.000Z');

			if (data1.getTime() > (data2.getTime() + 43200000)) {
				return true;
			}

			return false;
		},
		
		/**
		 * valida se o input de uma data e maior que a data atual
		 * input - string no formatdo 'dd/mm/aaaa'
		 */
		isDataMaiorAtual: function(input) {
			var data;
			var dataSplit = input.split("/");	
			data = dataSplit[2] + "-" + dataSplit[1] + "-" + dataSplit[0];
			
			var dataAtual = new Date();
			
			var dd = dataAtual.getDate();
			var mm = dataAtual.getMonth() + 1;
			var yyyy = dataAtual.getFullYear();
			
			dd = dd.toString();
			if (dd.length < 2) {
				dd = "0" + dd;
			}
			
			mm = mm.toString();
			if (mm.length < 2) {
				mm = "0" + mm;
			}
			
			var dataHoje = yyyy + "-" + mm + "-" + dd;
			var data1 = new Date(data+'T00:00:00.000Z');
			var data2 = new Date(dataHoje+'T00:00:00.000Z');
			
			if(data1.getTime() > data2.getTime()){
				return true;
			}
			
			return false;
		},
		
		//Verific se a data informada e menor que a data atual
		validaDataMenorQueDataAtual: function (input) {
			var data;
			if(input.attr('type') != 'date'){
				var dataSplit = input.val().split("/");
				data = dataSplit[2] + "-" + dataSplit[1] + "-" + dataSplit[0];
			} else {
				data = input.val();
			}
			
			var dataAtual = new Date();
			
			var dd = dataAtual.getDate();
			var mm = dataAtual.getMonth() + 1;
			var yyyy = dataAtual.getFullYear();
			
			dd = dd.toString();
			if (dd.length < 2) {
				dd = "0" + dd;
			}
			
			mm = mm.toString();
			if (mm.length < 2) {
				mm = "0" + mm;
			}
			
			var dataHoje = yyyy + "-" + mm + "-" + dd;
			var data1 = new Date(data+'T00:00:00.000Z');
			var data2 = new Date(dataHoje+'T00:00:00.000Z');
			
			if(data1.getTime() < data2.getTime()){
				return true;
			}
			
			return false;
		},
		
		//Verific se a data informada e maior doze meses que a data atual
		validaDataMaiorQueDozeMeses : function (input) {
			var data;
			if(input.attr('type') != 'date'){
				var dataSplit = input.val().split("/");
				data = dataSplit[2] + "-" + dataSplit[1] + "-" + dataSplit[0];
			} else {
				data = input.val();
			}
			
			var dataAtual = new Date();
			
			var dd = dataAtual.getDate();
			var mm = dataAtual.getMonth() + 1;
			var yyyy = dataAtual.getFullYear() + 1;
			
			dd = dd.toString();
			if (dd.length < 2) {
				dd = "0" + dd;
			}
			
			mm = mm.toString();
			if (mm.length < 2) {
				mm = "0" + mm;
			}
			
			var dataDozeMeses = yyyy + "-" + mm + "-" + dd;
			
			if(new Date(data+'T00:00:00.000Z').getTime() > new Date(dataDozeMeses+'T00:00:00.000Z').getTime()){
				return true;
			}
			
			return false;
		},
		
		//Verifica se a primeira data e maior que a segunda
		validaDataInicialMaiorQueDataFinal: function (dataInicial, dataFinal){
			var dataSplitInicial = dataInicial.split("/");
			var dataSplitFinal = dataFinal.split("/");

			dataInicial = dataSplitInicial[2] + "-" + dataSplitInicial[1] + "-" + dataSplitInicial[0];
			dataFinal = dataSplitFinal[2] + "-" + dataSplitFinal[1] + "-" + dataSplitFinal[0];
			var teste1 = new Date(dataInicial+'T00:00:00.000Z').getTime();
			var teste2 = new Date(dataFinal+'T00:00:00.000Z').getTime();
			
			if (teste1 > teste2){
				return false;
			}
			
			return true;
		},
		
		/**
		 * calcula e devolve a diferenca entre as datas (final - inicial) 
		 * em milisegundos
		 */
		diferencaDataFinalInicial: function (dataInicial, dataFinal){
			var dataSplitInicial = dataInicial.split("/");
			var dataSplitFinal = dataFinal.split("/");

			dataInicial = dataSplitInicial[2] + "-" + dataSplitInicial[1] + "-" + dataSplitInicial[0];
			dataFinal = dataSplitFinal[2] + "-" + dataSplitFinal[1] + "-" + dataSplitFinal[0];
			var teste1 = new Date(dataInicial+'T00:00:00.000Z').getTime();
			var teste2 = new Date(dataFinal+'T00:00:00.000Z').getTime();
			
			return teste2 - teste1;
		},
		
		/**
		 * calcula e devolve a soma entre uma data e x dias (data + dias) 
		 * em milisegundos
		 */
		somaDataDiasMilisegundos: function (dataInicial, dias){
			var dataSplitInicial = dataInicial.split("/");
			var diasMilisegundos = dias * 86400000;

			dataInicial = dataSplitInicial[2] + "-" + dataSplitInicial[1] + "-" + dataSplitInicial[0];
			var teste1 = new Date(dataInicial+'T23:59:59.000Z').getTime(); // final do dia
			
			return teste1 + diasMilisegundos;
		},
		
		/**
		 * formata um objeto javascript Date em uma data padrao dd/mm/yyyy
		 */
		dataFormatada: function(data){
            var  dia  = data.getDate().toString(),
                 diaF = (dia.length == 1) ? '0'+dia : dia,
                 mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
                 mesF = (mes.length == 1) ? '0'+mes : mes,
                 anoF = data.getFullYear();
             return diaF+"/"+mesF+"/"+anoF;
         },
		
		//verifica se a data informada e igual a data atual
		validaDataIgualADataAtual: function (input) {
			var data;
			if(input.attr('type') != 'date'){
				var dataSplit = input.val().split("/");
				data = parseInt(dataSplit[2] + dataSplit[1] + dataSplit[0]);
			} else {
				var dataSplit = input.val().split("-");
				data = parseInt(dataSplit[0] + dataSplit[1] + dataSplit[2]);
			}
			
			if(parseInt($.format.date(new Date(), 'yyyyMMdd')) == data){
				return true;
			}
			
			return false;
		},
		checaDDDNonoDigitoObrigatorio : function(ddd){
			ddd = Number(ddd); // converte ddd para numero
			//Lista com os DDD que sao obrigatorios o uso do nono digito
			//Adicione um novo DDD se necessario
			var listaDDD = [71]; 
			
			//Verifica se o DDD informado esta na lista dos obrigatorios
			if($.inArray(ddd, listaDDD) != -1){
				return true;
			}else{
				return false;
			}
			
		},
		
		/*
		* Objetivo: Formata a data utilizando padrao dd/mm/yyyy se a mesma for valida.
		* Entrada: Data em formato texto utilizando os seguintes padroes de formatacao (dd/mm/yyyy ou yyyy-mm-dd)
		* Saida: Data validada no formato dd/mm/yyyy ou null caso exista algum problema.
		*/
		formataDataPadrao : function ( strDate ){
			var dd, mm, yyyy, arrayDate, newDate;
			var reg1 = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
			var reg2 = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
			if (reg1.test(strDate)){
				arrayDate = strDate.split('/');
				dd = parseInt(arrayDate[0],10);
				mm = parseInt(arrayDate[1],10);
				yyyy = parseInt(arrayDate[2],10);
		        newDate = new Date(yyyy, mm - 1, dd);
			    if ((newDate.getFullYear() == yyyy) && (newDate.getMonth() == (mm - 1)) && (newDate.getDate() == dd)){
			    	return strDate;
			    }
			}else if (reg2.test(strDate)){
				arrayDate = strDate.split('-');
				yyyy = parseInt(arrayDate[0],10);
				mm = parseInt(arrayDate[1],10);
				dd = parseInt(arrayDate[2],10);
				newDate = new Date(yyyy, mm - 1, dd);
				if ((newDate.getFullYear() == yyyy) && (newDate.getMonth() == (mm - 1)) && (newDate.getDate() == dd)){
					return dd +'/'+ mm +'/'+ yyyy;
				}
			}
			return null;
		},
		
		/*
		* Objetivo: Retornar objeto Date javascript.
		* Entrada: Data em formato texto utilizando os seguintes padroes de formatacao (dd/mm/yyyy ou yyyy-mm-dd)
		* Saida: Objeto Date ou null se existir algum problema.
		*/
		getData : function( strDate ){
			var dd, mm, yyyy, arrayDate, newDate;
			var reg1 = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
			var reg2 = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
			if (reg1.test(strDate)){
				arrayDate = strDate.split('/');
				dd = parseInt(arrayDate[0],10);
				mm = parseInt(arrayDate[1],10);
				yyyy = parseInt(arrayDate[2],10);
		        newDate = new Date(yyyy, mm - 1, dd);
			    if ((newDate.getFullYear() == yyyy) && (newDate.getMonth() == (mm - 1)) && (newDate.getDate() == dd)){
			    	return newDate;
			    }
			}else if (reg2.test(strDate)){
				arrayDate = strDate.split('-');
				yyyy = parseInt(arrayDate[0],10);
				mm = parseInt(arrayDate[1],10);
				dd = parseInt(arrayDate[2],10);
				newDate = new Date(yyyy, mm - 1, dd);
				if ((newDate.getFullYear() == yyyy) && (newDate.getMonth() == (mm - 1)) && (newDate.getDate() == dd)){
					return newDate;
				}
			}
			return null;
		},
		
		dataAtualFormatada: function(){
            var data = new Date(),
                dia  = data.getDate().toString(),
                diaF = (dia.length == 1) ? '0'+dia : dia,
                mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
                mesF = (mes.length == 1) ? '0'+mes : mes,
                anoF = data.getFullYear();
            return diaF+"/"+mesF+"/"+anoF;
        },
		
		validaNossoNumero: function (nossoNumeroImput){
			var indiceMultiplicador = [2, 3, 4, 5, 6, 7, 8, 9];
			var lengthNosssoNumero = nossoNumeroImput.length;
			var posicaoIndice = 0;
			var resultadoMultiplicacao = 0;
			for (var i = 0; i < nossoNumeroImput.length; i++) {
				if (posicaoIndice == indiceMultiplicador.length) {
					posicaoIndice = 0;
				}
				resultadoMultiplicacao += (nossoNumeroImput.substring(lengthNosssoNumero - 1, lengthNosssoNumero) * indiceMultiplicador[posicaoIndice]);
				lengthNosssoNumero--;
				posicaoIndice++;
			}
			
			var dv = 11 - (resultadoMultiplicacao % 11);
			
			return (dv > 9) ? 0 : dv;
		},
		
		validaNonoDigito: function(ddd, telefone, tipo) {
	      var dddNoveDigitosAgosto = ['11','12','13','14','15','16','17','18','19'];
	      var dddNoveDigitosSetembro = ['21','22','24','27','28'];
	      var dddNoveDigitosNovembro = ['91','93','94','92','97','95','96','98','99'];
	      var dddNoveDigitosDezembro = ['31','32','33','34','35','37','38','71','73','74','75','77','79','81','87','82','83','84','85','88','86','89'];
	      var dddNoveDigitosDezembro2016 = ['41','42','43','44','45','46','47','48','49','51','53','54','55','61','62','64','63','65','66','67','68','69'];
	      var digitosTelefoneFixo = ['2','3','4','5']; 
	      var dddFormatado = $.trim(ddd.value);
	      var telefoneFormatado = $.trim(telefone.value).replace("-","");
	      var valida = false;
	      var dataDezembro2016 = "2016-12-01"
	      var data = new Date();      
	      var dia = data.getDate();
	      if(dia < 10){
	          dia = "0" + dia;
	      }
	      var mes = (data.getMonth()+1);
	      if(mes < 10){
	          mes = "0" + mes;
	      }
	      var ano = data.getFullYear();
	      var dataAtual =  ano + '-' + mes + '-' + dia;
	      if(dddFormatado.length == 3){
	          var dddFormatado = dddFormatado.substr(1,2);
	      }
	      if(tipo == "movel"){
	          valida = true;
	      } else if ($.inArray(telefoneFormatado.substr(0,1),digitosTelefoneFixo) == -1) {
	          valida = true;
	      }
	      if(valida){
	          if((($.inArray(dddFormatado,dddNoveDigitosAgosto) != -1) || ($.inArray(dddFormatado,dddNoveDigitosSetembro) != -1) || ($.inArray(dddFormatado,dddNoveDigitosNovembro) != -1) || ($.inArray(dddFormatado,dddNoveDigitosDezembro) != -1) || (dataAtual > dataDezembro2016 && $.inArray(dddFormatado,dddNoveDigitosDezembro2016) != -1)) 
	                  && telefoneFormatado.length <= 8) {     
	              telefone.focus();
	              //setAcessoLiberado();
	              return false;
	          }
	          if((($.inArray(dddFormatado,dddNoveDigitosAgosto) == -1) && ($.inArray(dddFormatado,dddNoveDigitosSetembro) == -1) && ($.inArray(dddFormatado,dddNoveDigitosNovembro) == -1) && ($.inArray(dddFormatado,dddNoveDigitosDezembro) == -1)  && (dataAtual < dataDezembro2016 && $.inArray(dddFormatado,dddNoveDigitosDezembro2016) != -1)) 
	                  && ((telefoneFormatado.length == 9) || (telefoneFormatado.length < 8))){
	              telefone.focus();
	              //setAcessoLiberado();
	              return false;
	          }
	      }
	      return true;
		},
		
		getNomeMes: function (){
			var nomesMeses = [
				"Janeiro",
				"Fevereiro",
				"Março",
				"Abril",
				"Maio",
				"Junho",
				"Julho",
				"Agosto",
				"Setembro",
				"Outubro",
				"Novembro",
				"Dezembro"
			];
			
			return nomesMeses;
		},
		
		/**
		 * metodo responsável pela validacao do campo de input de chave paga o pagamento pix
		 */
		validaConsultaChavePix : function(jqueryInput) {
			jqueryInput.val(jqueryInput.val().trim());
			var valorChave = jqueryInput.val();
			var ValidacaoUtils = this;
			$("#valorChaveHistorico").val(jqueryInput.val());
			
			if(valorChave.length < 19 && !valorChave.includes("@")){
				valorChave = valorChave.replace(/[^\d]/g,'');
			}
			
			// VALIDA TELEFONE
			// CHAVE ALEATORIA
			// CHAVE EMAIL
			if (/^\+[1-9][0-9]\d{1,14}$/.test(valorChave) ||
				/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(valorChave) ||
				/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(jqueryInput.val())) {
				jqueryInput.val(valorChave);
				return true;
			}
			
			// CPF
			if (/^[0-9]{11}$/.test(valorChave)) {
				if(ValidacaoUtils.validaCpf(valorChave)){
					jqueryInput.val(valorChave);
					return true;
				}
			}
			
			// CNPJ
			if (/^[0-9]{14}$/.test(valorChave)) {
				if(ValidacaoUtils.validaCnpj(valorChave)){
					jqueryInput.val(valorChave);
					return true;
				}
			}
			
			// valida CPF e CNPJ caso valor seja menor que 11 ou 14 digitos completando zeros a esquerda
			if (/^[0-9]{3,11}$/.test(valorChave) ||
				/^[0-9]{3,14}$/.test(valorChave)) {
				var valorComZeros = ("00000000000" + valorChave).slice(-11);	
					
				if(ValidacaoUtils.validaCpf(valorComZeros)){
					jqueryInput.val(valorComZeros);
					return true;
				}
				
				valorComZeros = ("00000000000000" + valorChave).slice(-14);
				
				if(ValidacaoUtils.validaCnpj(valorComZeros)){
					jqueryInput.val(valorComZeros);
					return true;
				}
				
				// assume que possa ser um numero celular
				if (jqueryInput.val().length == 11){
					jqueryInput.val("+55" + valorChave);
				} else {
					jqueryInput.val("+" + valorChave);
				}
				
				return true;
			}
			
			return false;
		}
		
	}
});
