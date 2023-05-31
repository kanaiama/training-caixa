
define(["jquery", 
         'warsaw.wrapper',
         'warsaw.agent',
		 'warsaw-json',
		 'warsaw-platform-detect',
		 'warsaw-swfobject',
		 'warsaw-typedarray',
		 'warsaw-web_socket',
        "statics-core/js/core/log"], function($, wsWapper, wsAgent, 
     			warsawjson, warsawplatformdetect, warsawswfobject, warsawtypedarray, warsawwebsocket, log) {
	return {
		EnviaContaSelPluginWS : function(agenciaGB, contaGB, tipoContaGB, nomeUsuarioGB, chaveServidorGB) {
			return this.generateId(agenciaGB, contaGB, tipoContaGB, nomeUsuarioGB, chaveServidorGB);
		},
		
		
		
		generateId : function(cWS){
			contaWS = cWS;
			
			try{
				var wsWrapper = new WarsawWrapper($("#siglaWS").val(), $("#seedWS").val(), $("#idWS").val());
				
				wsWrapper.F10(data.contaSelecionada.agencia, 
								contaAux,  
								data.contaSelecionada.cpf, 
								data.contaSelecionada.tipo, 
								$("#idWS").val(),
								$('#f10CmdWS').val(),
								successF10SelecionaContas, 
								errorF10SelecionaContas);
			} catch (e) {
				$("#warsawErro").val("wsWrapper.IsInstalled :"+err);
				loginWS.putWarsawStatusCarga(messages["warsaw.ERROR_WSWRAPPER"]);
				loginWS.sendReqAfterWarsaw();
			}
		},
		
successF10SelecionaContas : function(dados) {
document.getElementsByName("warsawF10Client")[0].value = dados;


var oInput = document.createElement("input");
oInput.setAttribute('name', 'retornoF10');
oInput.setAttribute('type', 'hidden');
oInput.setAttribute('value', dados); 

for(i = 0; i < document.forms.length; i++){
	if(document.forms[i].name == 'frmMinhasContas'){
	    break;
  }
}
if(i == document.forms.length){
	document.forms[document.forms.length-1].appendChild(oInput);
}else{
	document.forms[i].appendChild(oInput);
}
$.Topic("/contas/novaContaSelecionada").publish();	

},


errorF10SelecionaContas : function(msg) { 

document.getElementsByName("warsawF10Client")[0].value = "";

var oInput = document.createElement("input");
oInput.setAttribute('name', 'retornoF10');
oInput.setAttribute('type', 'hidden');
oInput.setAttribute('value', ""); 

for(i = 0; i < document.forms.length; i++){
	if(document.forms[i].name == 'frmMinhasContas'){
	    break;
  }
}
if(i == document.forms.length){
	document.forms[document.forms.length-1].appendChild(oInput);
}else{
	document.forms[i].appendChild(oInput);
}


document.getElementsByName("errorF10Client")[0].value = "errorF10Client :"+contactSupportF10SelecionaContas(2008)+" erro:"+msg;
//$.Topic("/contas/novaContaSelecionada").publish();

},

contactSupportF10SelecionaContas:function(num) {
return "Por favor contate o suporte. C\u00F3digo de erro " + num + ".";
}


	};
});

var contaWS = null;

