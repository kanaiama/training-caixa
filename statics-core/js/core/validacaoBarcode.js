define(["jquery"], function($){
	
	var validacaoBarcode = {

		sLeft : function(sExpressao, iNumeros) {
			if (sExpressao.length >= iNumeros)
				return sExpressao.substring(0, iNumeros);
		},

		sRight : function(sExpressao, iNumeros) {
			if (sExpressao.length >= iNumeros)
				return sExpressao.substring(sExpressao.length - iNumeros,
						sExpressao.length);
		},

		sMid : function(sExpressao, iNumeros, iTamanho) {
			var aux = new String();
			if ((sExpressao.length >= iNumeros) && (iNumeros >= 0)
					&& (iTamanho > 0)) {
				iNumeros--;
				aux = sExpressao.substring(iNumeros, iNumeros + iTamanho);
			}
			return aux;
		},

		calculaDigitoMod10 : function(sValor) {
			mult = 2;
			soma = 0;
			str = new String();
			sValor = this.sZapDummy(sValor);

			for (t = sValor.length; t >= 1; t--) {
				str = (mult * parseInt(this.sMid(sValor, t, 1))) + str;
				mult--;
				if (mult < 1)
					mult = 2;
			}

			for (t = 1; t <= str.length; t++)
				soma = soma + parseInt(this.sMid(str, t, 1));
			soma = soma % 10;
			if (soma != 0)
				soma = 10 - soma;
			str = soma; //casting

			return str;
		},
		
		calculaDigitoMod11: function (Dado, NumDig, LimMult){
			var Mult, Soma, i, n;

			for(n=1; n<=NumDig; n++){
				Soma = 0;
				Mult = 2;
				for(i=Dado.length-1; i>=0; i--){
					Soma += (Mult * parseInt(Dado.charAt(i)));
					if(++Mult > LimMult) Mult = 2;
				}
				Dado += ((Soma * 10) % 11) % 10;
			}
		
			return Dado.substr(Dado.length-NumDig, NumDig);
		},

		calculaDigitoMod11_v4 : function(valor) {
			mult = 2;
			somaTotal = 0;
			for (j = valor.length; j > 0; j--) {
				soma = (mult * parseInt(valor.substring(j, j - 1), 10));
				somaTotal = somaTotal + soma;
				mult++;
				if (mult > 9)
					mult = 2;
			}
			resto = somaTotal % 11;

			if (resto == 0 || resto == 1) {
				dig = 0;
			} else {
				dig = 11 - resto;
			}

			return dig;
		},

		isNumber : function(sNumero, iDecimais) {
			var bRet;
			var i;
			bRet = true;
			if (iDecimais > 0) {
				if (sNumero.length < iDecimais + 2
						|| (sNumero.indexOf(".", 0) == -1 && sNumero.indexOf(
								",", 0) == -1))
					bRet = false;
			}
			if (bRet) {
				i = 0;
				while (i < sNumero.length && bRet) {
					if (iDecimais > 0) {
						if (i == sNumero.length - (iDecimais + 1)) {
							if (sNumero.charAt(i) != "."
									&& sNumero.charAt(i) != ",")
								bRet = false;
						} else {
							if (sNumero.charAt(i) < "0"
									|| sNumero.charAt(i) > "9")
								bRet = false;
						}
					} else {
						if (sNumero.charAt(i) < "0" || sNumero.charAt(i) > "9")
							bRet = false;
					}
					i++;
				}
			}
			return bRet;
		},

		sZapDummy : function(sStringNum) {
			var sAux = new String();
			for (t = 1; t <= sStringNum.length; t++)
				if (!isNaN(parseInt(this.sMid(sStringNum, t, 1))))
					sAux = sAux + this.sMid(sStringNum, t, 1);
			return sAux;
		},
		
		mod10: function(valor){
			val = valor.substring( 0 , valor.length - 1 );
			dig = valor.substring( valor.length - 1 , valor.length );
			str = new String;
			fator = 2;
			soma = 0;
			for(i = val.length; i > 0; i--){
				str = fator * parseInt(val.substring(i, i - 1)) + str;
				fator--;
				if(fator < 1) 
					fator = 2;
			}
			for(i = 0; i < str.length; i++) soma = soma + parseInt(str.charAt(i))
				soma = soma % 10;
			if(soma != 0) 
				soma = 10 - soma;
			str = soma; //aqui existe uma especie de "casting" (conversao)
			return str == dig;
		},

		isDate : function(sData) {
			var bRet;
			var i;
			bRet = true;
			if (sData.length != 10)
				bRet = false;
			if (bRet) {
				i = 0;
				while (i < sData.length && bRet) {
					if (i == 2 || i == 5) {
						if (sData.charAt(i) != "/")
							bRet = false;
					} else {
						if (!isNumber(sData.charAt(i), 0))
							bRet = false;
					}
					i++;
				}
			}
			if (bRet) {
				iDia = parseInt(sData.substring(0, 2), 10);
				iMes = parseInt(sData.substring(3, 5), 10);
				iAno = parseInt(sData.substring(6, 10), 10);
				if (iMes < 1 || iMes > 12)
					bRet = false;
				if (iAno < 1)
					bRet = false;
			}
			if (bRet) {
				if (iMes == 1 || iMes == 3 || iMes == 5 || iMes == 7
						|| iMes == 8 || iMes == 10 || iMes == 12) {
					if (iDia < 1 || iDia > 31)
						bRet = false;
				}
				if (iMes == 2) {
					if (isBissexto(iAno)) {
						if (iDia < 1 || iDia > 29)
							bRet = false;
					} else {
						if (iDia < 1 || iDia > 28)
							bRet = false;
					}
				}
				if (iMes == 4 || iMes == 6 || iMes == 9 || iMes == 11) {
					if (iDia < 1 || iDia > 30)
						bRet = false;
				}
			}
			return bRet;
		},
		
		calcDiasZero: function (DataDada){
			var DiasMes = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
			var Dia = parseInt(DataDada.substr(0,2),10);
			var Mes = parseInt(DataDada.substr(3,2),10);
			var Ano = parseInt(DataDada.substr(6,4),10);
			var Dias;

			Dias = Dia + (Ano*365) + parseInt(Ano/4) - parseInt(Ano/100) + parseInt(Ano/400) + 1;
			for(var i=0; i<(Mes-1); i++) {
				Dias += DiasMes[i];
			}
			return Dias;
		},
		

		dataDiaZero : function(DiasZero) {
			var DiasMes = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30,
					31, 30, 31);
			var d, p, Mes, Ano;
			var rDias = DiasZero;

			Ano = 0;
			p = true;
			while (p) {
				d = ((Ano % 4 != 0) || (Ano % 100 == 0)
						&& (Ano % 400 != 0)) ? 365 : 366;
				if ((rDias - d) <= 0) {
					p = false;
				} else {
					rDias -= d;
					Ano++;
				}
			}
			Mes = 0;
			p = true;
			while (p) {
				d = DiasMes[Mes];
				if ((Mes == 1)
						&& ((Ano % 4 != 0) || (Ano % 100 == 0)
								&& (Ano % 400 != 0)))
					d--;
				if ((rDias - d) <= 0) {
					p = false;
				} else {
					rDias -= d;
					Mes++;
				}
			}
			Mes++;

			return (this.strNum(rDias, 2) + "/" + this.strNum(Mes, 2)
					+ "/" + this.strNum(Ano, 4));
		},
		
		strNum : function(Dado, Larg) {
			var Result, sDado, i;

			sDado = Dado.toString();
			if (sDado.length >= Larg) {
				Result = sDado.substr(sDado.length - Larg, Larg);
			} else {
				Result = "";
				for (i = Larg - sDado.length; i > 0; i--) {
					Result = Result + "0";
				}
				Result = Result + sDado.toString();
			}
			return Result;
		}
	}

	return validacaoBarcode;
});