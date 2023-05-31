
$(document).ready(function(){
	replace_message_alert();	
	$(document).ajaxComplete(function() { // altera mensagens de erro padrao de retorno do servidor apos evento ajaxComplete
		replace_message_alert();
	});
});
function replace_message_alert() { // altera mensagens de erro padrao de retorno do servidor
	$('.message_alert').length>0 ? $('.message_alert')[0].innerHTML = function() {
		switch($('.message_alert').text().trim()) {
			case '2001 - DOCUMENTO N\u00C3O LOCALIZADO':
				return 'Desculpe, n\u00E3o localizamos contas FGTS inativas para seu CPF. Consulte seu FGTS pelo site Caixa <a href="www.contasinativas.caixa.gov.br" target=_blank >www.contasinativas.caixa.gov.br</a>';
			case '2002 - DOCUMENTO INFORMADO COM SAQUE EFETIVADO':
				return 'Para seu CPF, o saque ou cr\u00E9dito em conta j\u00E1 foi realizado. Verifique no extrato se houve cr\u00E9dito em sua conta.';
			case '2099 - ERRO DE ACESSO AO DB2':
				return 'Desculpe, n\u00E3o foi poss\u00EDvel acessar a base de dados, tente consultar novamente mais tarde.';
			default:
				return $('.message_alert').text();
		}
	}():null;
	$('.painelErros').length>0 ? $('.painelErros')[0].innerHTML = function() {
		switch($('.painelErros').text().trim()) {
			case 'X5 - Usu\u00E1rio n\u00E3o cadastrado.':
				return 'Usu\u00E1rio n\u00E3o cadastrado.';

			default:
				return $('.painelErros').text();
		}
	}():null;
}
