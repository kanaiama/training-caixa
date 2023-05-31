
define([], function() {
	var saibaMais = {

		perguntasRespostas : new Array(),

		pergunta1  : "1. O que \u00C9?",
		pergunta2  : "2. Como funciona?",
		pergunta3  : "3. Para que serve?",
		pergunta4  : "4. Quem deve usar?",
		pergunta5  : "5. Como saberei da necessidade de cadastrar o computador?",
        
		resposta1 : "\u00C9 uma ferramenta criada para dar mais seguran\u00E7aa para os usu\u00E1rios do Internet Banking CAIXA. Com ela, voc\u00EA acessa sua conta e faz transa\u00E7\u00F5es banc\u00E1rias com adicionais de seguran\u00E7a, por meio de cadastramento do computador que est\u00E1 utilizando. <a href='#' onclick='abreSaibaMaisCadMaq(1);' title='Saiba Mais'>Saiba Mais</a>.",
		
		resposta2  : "Ao entrar no Internet Banking CAIXA, voc\u00EA vai cadastrar o computador que est\u00E1 utilizando. Esse equipamento ter\u00E1 um apelido e o tempo de cadastramento determinados pelo usu\u00E1rio, que poder\u00E1 ser para um \u00FAnico acesso ou por tempo indeterminado. " + 
				"<br>Uma vez cadastrado o computador, voc\u00EA estar\u00E1 pronto para utilizar o Internet Banking com uma seguran\u00E7a adicional, al\u00E9m daquelas j\u00E1 existentes. <a href='#' onclick='abreSaibaMaisCadMaq(2);' title='Saiba Mais'>Saiba Mais</a>.",

		resposta3  : "Adicionar mais seguran\u00E7a aos seus acessos ao Internet Banking CAIXA. <a href='#' onclick='abreSaibaMaisCadMaq(3);'>Saiba Mais</a>.",

		resposta4  : "Todo usu\u00E1rio que acesse o Internet Banking CAIXA de um computador que utiliza o sistema operacional Windows, com navegadores Internet Explorer ou Firefox. <a href='#' onclick='abreSaibaMaisCadMaq(4);' title='Saiba Mais'>Saiba Mais</a>.",

		resposta5  : "N\u00E3o precisa se preocupar. Assim que o Internet Banking CAIXA verificar que o seu acesso est\u00E1 partindo de um computador com as configura\u00E7\u00F5es exigidas, ele lhe orientar\u00E1 a fazer seu cadastramento. Caso seja necess\u00E1rio, o Banking far\u00E1 a instala\u00E7\u00E3o da ferramenta que permitir\u00E1 o cadastramento do computador, o que ocorre em alguns segundos, permitindo a voc\u00EA realizar suas consultas e transa\u00E7\u00F5es banc\u00E1rias com seguran\u00E7a. <a href='#' onclick='abreSaibaMaisCadMaq(5);' title='Saiba Mais'>Saiba Mais</a>.",
		
		popularPerguntasRespostas: function(){
			this.perguntasRespostas[0]=[this.pergunta1, this.resposta1, false];
			this.perguntasRespostas[1]=[this.pergunta2, this.resposta2, false];
			this.perguntasRespostas[2]=[this.pergunta3, this.resposta3, false];
			this.perguntasRespostas[3]=[this.pergunta4, this.resposta4, false];
			this.perguntasRespostas[4]=[this.pergunta5, this.resposta5, false];
		},
		
		atualizarPerguntasRespostas: function (array, indice, abrir){
			if(indice >= 0 && indice < array.length){
				for(var ind = 0; ind < array.length; ind++){
					array[ind][2] = ind == indice ? abrir : false;
				}
			}
			divPerguntasRespostas = window.parent.document.getElementById("div_perguntas_respostas");
			var str = '<br><table width="725" border="0" cellpadding="0" cellspacing="0" class="txtDicas">\n';
			
			str += '<tr>' +
				'  <td width="6"><img src="/siwin-static/img/sep/iltCantoSuperiorEsq.gif" width="6" height="6"></td>' +
				'  <td colspan="2" background="/siwin-static/img/sep/iltSuperior.gif"><img src="/siwin-static/img/sep/iltSuperior.gif" width="6" height="6"></td>' +
				'  <td width="6"><img src="/siwin-static/img/sep/iltCantoSuperiorDir.gif" width="6" height="6"></td>' +
				'</tr>' +
				'<tr> ' +
				'  <td background="/siwin-static/img/sep/iltEsq.gif">&nbsp;</td>' +
				'  <td bgcolor="#F1F1F1"><img src="/siwin-static/img/fig/titSaibaCadastramentoComp.gif" width="570" height="28" hspace="3"></td>' +
				'  <td bgcolor="#F1F1F1">&nbsp;</td>' +
				'  <td background="/siwin-static/img/sep/iltDir.gif">&nbsp;</td>' +
				'</tr>' +
				'<tr> ' +
				'  <td><img src="/siwin-static/img/sep/iltEsqSeparador.gif" width="6" height="13"></td>' +
				'  <td colspan="2" background="/siwin-static/img/sep/iltSeparador.gif"><img src="/siwin-static/img/sep/iltSeparador.gif" width="3" height="13"></td>' +
				'  <td><img src="/siwin-static/img/sep/iltDirSeparador.gif" width="6" height="13"></td>' +
				'</tr>';
		
			for (var i = 0; i < array.length; i++) {
				titulo = array[i][0];
				str += '<tr>\n' +        
					'<td background="/siwin-static/img/sep/iltEsq.gif"><img src="/siwin-static/img/sep/iltEsq.gif"></td>\n' +
					'<td class="txtQuestao"><strong>' + array[i][0] + '</strong></td>\n' +
					'<td valign="top" bgcolor="#f1f1f1">\n' +
					'<a href="#" title="' + titulo + '" onclick="atualizarPerguntasRespostas(perguntasRespostas,' + i + ', ' + (array[i][2] ? false : true) + ')">' +
					(array[i][2] ? '<span class="botao_seta_baixo"></span>' : '<span class="botao_seta_dir"></span>') + '</a>\n' +
					'</td>\n' +
					'<td background="/siwin-static/img/sep/iltDir.gif"><img src="/siwin-static/img/sep/iltDir.gif"></td>\n' +
					'</tr>\n';

				if (array[i][2]) {
					str += '<tr>\n' +
					'    <td background="/siwin-static/img/sep/iltEsq.gif">&nbsp;</td>\n' +
					'    <td colspan=2 bgcolor="#f1f1f1" class="txtInfo2">' + array[i][1] + '<br></td>\n' +
					'    <td background="/siwin-static/img/sep/iltDir.gif">&nbsp;</td>\n' +
					'</tr>\n';
				}
		
				if (i < array.length - 1) {
					str +='<tr>\n' +
					'    <td><img src="/siwin-static/img/sep/iltEsqSeparador.gif" width="6" height="13"></td>\n' +
					'    <td colspan="2" background="/siwin-static/img/sep/iltSeparador.gif"><img src="/siwin-static/img/sep/iltSeparador.gif" width="3" height="13"></td>\n' +
					'    <td><img src="/siwin-static/img/sep/iltDirSeparador.gif" width="6" height="13"></td>\n' +
					'</tr>\n';
				} else {
					str +='<tr>\n' +
					'    <td colspan="4"><img src="/siwin-static/img/sep/iltEsqSeparador.gif" width="1" height="5"></td>\n' +
					'</tr>\n';
				}
			}
			str+='</table></div>'
		
			divPerguntasRespostas.innerHTML = str;
		}

	};
	
	saibaMais.popularPerguntasRespostas();
	
	return saibaMais;
    
});
