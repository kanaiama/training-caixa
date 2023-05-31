//Message Box
$(document).ready(function(){
    $('#tpPessoaFisica, #tpPessoaJuridica, #tpGov').click(function(){
    	$('.selectedOption').css("display","block");
    	//$('.messageBox').fadeOut(500);
	});
});

//Buttons Rounded Borders
$(function(){
	
	setTimeout(function(){
		$('button').corner('3px');
		$('.roundCorners').corner('10px');
	}, 500);
	
});

//Modal Button Logout
$(function (){
	$(".logout").click(function(){
		openContentCenter('#openLogout');
		
	});
	$("#cboxClose").click(function(){
		$('#openLogout').hide();
		$('.opacity').hide();
	});
});


//Opacity Modal Home
function openContentCenter(nameDivCenter) {
	height=$(window).height();
	width=$(window).width();
	$(nameDivCenter).css("top", (height - $(nameDivCenter).height())/2 + "px");
	$(nameDivCenter).css("left", (width - $(nameDivCenter).width())/2 + "px");
	$(".opacity").css("z-index", "9999");
	$(".opacity").show();
	$(nameDivCenter).show();
} 


//Modal Login
function openContent(linkComp, nameDiv) {
	var linkOffset = $(nameDiv).offset();
	linkOffset.top = $(linkComp).offset().top - $(nameDiv).height() + 150
	linkOffset.left = $(linkComp).offset().left - ($(nameDiv).width() /2)
	$(nameDiv).show();
	$(nameDiv).offset(linkOffset);
}

document.write("<style>");
	for (i=1; i<=5; i++) {
      document.write(".menu" + i + " {                                                      ");
      document.write("    background: url('../img/bkgBarraBranca" + i + ".gif') no-repeat;  ");
      document.write("}                                                                     ");
      document.write(".menu" + i + ":hover {                                                ");
      document.write("    background: url('../img/bkgBarraLaranja" + i + ".gif') no-repeat; ");
      document.write("}                                                                     ");
      document.write(".selected" + i + " {                                                  ");
      document.write("    background: url('../img/bkgBarraLaranja" + i + ".gif') no-repeat; "); 
      document.write("}                                                                     "); 
	}
 document.write("</style>")

	function show(id) {

    var menu = document.getElementById("content" + id);
    var it = document.getElementById("item" + id);

    for (var i = 1; i<=5; i++) {
        //esconde todos os menus
        document.getElementById('content'+i).style.display='none';
        //volta o css de todos para o normal (nao selecionados)
	    document.getElementById('item'+i).className='menu | menu' + i;
    }

    //exibe o menu selecionado
    menu.style.display='block';
    //altera o css do menu selecionado
    it.className = 'selected | selected' + id;
}

 
	$.generateTabIndex = function(options) {
		var firstPageItem = 'auto-tab-index-first-item';
		var indexableOn = 'auto-tab-index-on';
		var indexableOff = 'auto-tab-index-off';
		var manualIndex = 'tab-index-manual:';

		if($.browser.msie && $.browser.version == "7.0"){
			if(options && options.contextElement){
				options = $.extend({
					tabStep: 1,
					containerInitial: 100
				}, options);
				
				var index = parseInt(options.containerInitial);

				try{
					var $items = $("select:visible, button:visible, a:visible, ."+indexableOn+":visible", $(options.contextElement));
					if($items){
						$items.each(function () {
							var $this = $(this);
							if($this.hasClass(indexableOff)) 
								$this.attr("tabindex", -1);
							else
								$this.attr("tabindex", index += options.tabStep);
						});
					}
				}catch(e){
					
				}
			}else{
				var options = {
					tabStep: 10,
					containerInitial: 100,
					pageInitial: 5000
				};
				
				var keys = Object.keys(manualIndexElements).map(function(i){
						return parseInt(i);
					}).sort(function(a, b){
						  return (a > b)?1:(a<b)?-1:0;
					});
				if(typeof(keys) != undefined && keys.length > 0){
					index = parseInt(manualIndexElements[keys[0]].attr("tabindex"));
					for(var i=1;i<keys.length; i++){
						index = parseInt(index) + 10;
						manualIndexElements[keys[i]].attr("tabindex", index);
					}
				}
			}
		}
	};
	
//Internal Button Search

	$(document).ready(function(){
	    $('.searchBtIntClose').click(function(){
	    	$('.searchBtIntOpen').css("display","block");
	    	$('.searchBtIntClose').css("display","none");
	    	$('.boxSearch').css("display","block");
	    	$('.link').css("display","none");
	    	$('body').attr("class","internalSearch");
		});
	    
	    $('.searchBtIntOpen').click(function(){
	    	$('.searchBtIntOpen').css("display","none");
	    	$('.searchBtIntClose').css("display","block");
	    	$('.boxSearch').css("display","none");
	    	$('body').attr("class","internal");
		});
	    
	});
	
	
	//TABELAS
	function removeClassName (elem, className) {
		elem.className = elem.className.replace(className, "").trim();
		}
		function addCSSClass (elem, className) {
		removeClassName (elem, className);
		elem.className = (elem.className + " " + className).trim();
		}
		String.prototype.trim = function() {
		return this.replace( /^\s+|\s+$/, "" );
		}
		function stripedTable() {
		if (document.getElementById && document.getElementsByTagName) {
		var allTables = document.getElementsByTagName('table');
		if (!allTables) { return; 
		}
		for (var i = 0; i < allTables.length; i++) {
		if (allTables[i].className.match(/[\w\s ]*tables[\w\s ]*/)) {
		var trs = allTables[i].getElementsByTagName("tr");
		for (var j = 0; j < trs.length; j++) {
		removeClassName(trs[j], 'alternateRow');
		addCSSClass(trs[j], 'normalRow');
		}
		for (var k = 0; k < trs.length; k += 2) {
		removeClassName(trs[k], 'normalRow');
		addCSSClass(trs[k], 'alternateRow');}}}}}
		window.onload = function() { stripedTable(); 
		}
		
		$(document).ready(function () {  
	    $('#extrato tr td:first-child:odd').addClass ('borderLeft');
		$('#extrato tr td:last-child:odd').addClass ('borderRight');
		$('#investiment tr td:first-child:odd').addClass ('borderLeft');
		$('#investiment tr td:last-child:odd').addClass ('borderRight');
		$('#cadMaq tr td:first-child:odd').addClass ('borderLeft');
		$('#cadMaq tr td:last-child:odd').addClass ('borderRight');
		});	
		
		
	//Refresh Balance		
		
		$(document).ready(function(){
			
			$('#refreshBalance').click(function(){
				$("#totalBalance").show();
			});

		});