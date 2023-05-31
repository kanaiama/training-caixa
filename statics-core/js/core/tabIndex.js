function indexadorTab() {
	var tabIndexController = 1;
	var selectors = getSelectors();
		
	$(".breadCrumb a").each(function(i,elem) {
		$(elem).attr("tabindex","");
	});
	
	$(selectors).each(function(i, elem) {
		var $elem = $(elem); 
		
		if($elem.attr("tabindex") != -1){
			$elem.removeAttr("tabindex");
		}
		
		// verifica os elementos que nao contem a classe
		// tabindexNone. Elementos que contem esta classe nao sao aplicados tabindex
		if (!$elem.hasClass("tabindexNone") && $elem.is(":visible") && $elem.attr("tabindex") !== undefined) {
			
			// verifica se o elemento pertence ao carrossel principal ou interno.
			if ($elem.hasClass("categoriaIcone") || $elem.hasClass("categoriaInterno")) {
				$elem.attr("tabindex", tabIndexController);

				// O atributo tabindex dos elementos do
				// carrossel sao aplicados com um
				// intervalo de 100 para que possa ser
				// aplicado tabindex nos submenus em outro momento
				tabIndexController += 100;
			} else{
				$elem.attr("tabindex", tabIndexController);
				tabIndexController++;
			}
			
		}
	});
	
	$(".rodapePrincipal a").each(function(i, elem) {
		if(elem != undefined) {
			$(elem).attr("tabindex", "");
			elem.tabIndex = tabIndexController;
			tabIndexController++;
		}
	});
}

// Funcao responsavel por obter os elementos que serao aplicados o atributo
// tabindex
function getSelectors(){
	var selectors = ".tabindexDV, input[type!=hidden]:visible, a, input, button, select";
	
	//verifica se o carrossel interno esta visivel
	if($(".escondeCarousel").data("visible") === "true"){
		//adiciona os itens do carrossel interno na lista de seletores
		selectors += ", .categoriaInterno";
	} else{
		//adiciona os itens do carrossel principal na lista de seletores
		selectors += ", .categoriaIcone";
	}
	
	return selectors;
}
