(function($){
	var BreadCrumb = {
			currUrl: 1,
			_crumbs: null,
			_load: function(id, url){
				this.id = id;
				this.url(url);
			},
			_loadPath: function(id, path){
				this.id = id;
				this.update(path);
			},
			url: function(url){
				this.currUrl = url;
				this.update();
			},
			update: function(path){
				var _this = this;
				var $dl = $("#"+this.id);
				
				this._eatCrumbs($dl);
				
				if(path){
					this._crumbs = path;
					var itemCrumb1 = $('#carousel-internas div ul li a:contains("' + this._crumbs[0] + '")')[0];
					if (this._crumbs.length == 3 && itemCrumb1) {
						this.pathAutomatico = true;
					} else {
						this.pathAutomatico = false;
					}
				} else {
					this._crumbs = $.menuNovoIB.findBreadcrumbByUrl(this.currUrl).split(' > ');
					this.pathAutomatico = true;
				}
				
				for(var i=0; i < this._crumbs.length; i++){
					this._appendItem($dl, i+2, (i+1) == this._crumbs.length, this._crumbs[i].item, this._crumbs[i].url);
				}
			},
			_eatCrumbs: function($dl){
				$('dd',$dl).remove();
				this._appendItem($dl, 1, false, "Início", "siwinCtrl");
			},
			_appendItem: function($dl, index, isLast, value, url){
				var $dd = $('<dd>');
				if(!isLast){
					var fatherIndex = parseInt($dl.attr("tabindex"), 10);
					if(isNaN(fatherIndex)) fatherIndex = 0;
					if(url){
						var $a = $('<a>');
						$a.attr("href", url);
						$a.attr("tabindex", fatherIndex + index);
						$a.attr("title", value);
						$a.text(value);
						$dd.append($a);
					}else if ((((this._crumbs[index] == "Gerenciar Acesso") && (index == 3)) || index == 2) && this.pathAutomatico){
						var link = "<a href=\"#\" title='" + value + "' tabindex='" + (fatherIndex + index) + "'>" + value +"</a>";
						$dd.append(link);
						var _this = this;
						$("a", $dd).click(function(){
							if(typeof(abrirItemBreadcrumb) != "undefined") abrirItemBreadcrumb(_this._crumbs, index - 2);
						});
					} else {
						$dd.append(value);
					}
				} else {
					$dd.text(value);
					$dd.attr("title", value);
					$dd.css('background', 'none');
					$dd.css('font-style', 'italic');
				
					
				}
				$dl.append($dd);
			}
	};
	
	$.breadcrumb = function(id, url){
		var breadcrumb = Object.create(BreadCrumb);
		breadcrumb._load(id, url);
		return breadcrumb;
	};
	$.breadcrumbPath = function(id, path){
		var breadcrumb = Object.create(BreadCrumb);
		breadcrumb._loadPath(id, path);
		return breadcrumb;
	}
})(jQuery);