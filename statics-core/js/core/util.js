define([ "jquery" ], function($) {

	var Util = {

		// Move o cursor para a posicao final do elemento.
		moveCursorToEnd : function(el) {
			var pos = $(el).val().length;
			el.each(function(index, elem) {
				if (elem.setSelectionRange) {
					elem.setSelectionRange(pos, pos);
				} else if (elem.createTextRange) {
					var range = elem.createTextRange();
					range.collapse(true);
					range.moveEnd('character', pos);
					range.moveStart('character', pos);
					range.select();
				}
			});
		},

		removeURLParam : function (key, sourceURL) {
		    var rtn = sourceURL.split("?")[0],
		        param,
		        params_arr = [],
		        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
		    if (queryString !== "") {
		        params_arr = queryString.split("&");
		        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
		            param = params_arr[i].split("=")[0];
		            if (param === key) {
		                params_arr.splice(i, 1);
		            }
		        }
		        if(params_arr.length != 0) {
		        	rtn = rtn + "?" + params_arr.join("&");
		        }
		    }
		    window.history.pushState('', document.title, rtn);
		},
		// Retorna o valor de um parametro da url.
		getUrlParameter : function(name) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regexS = "[\\?&]" + name + "=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(window.location.href);
			if (results === null) {
				return null;
			} else {
				return results[1];
			}
		},
		
		/**
		 * @author laio.pinheiro
		 * Retorna os parametros GET em um array de objetos
		 */
		getUrlParametersArray: function () {
			var url = window.location.href;
			var sizeUrl = window.location.href.length;
			var params = [];
			var num = 2;
			var indexObj = "";

			$.each(url.substr(url.lastIndexOf("?")+1 ,sizeUrl).split("&") ,function (index, value) {
				$.each(value.split("="), function (index, value) {
					if ((num % 2) == 0) {
						indexObj = value;
						num = 3;
					}else{
						var obj = {};
						obj[indexObj] = value;
						params.push(obj);
						num = 2;
						indexObj = "";
					}
				});
			});	
		},
		
		/**
		 * @author laio.pinheiro
		 * Retorna o device que esta sendo ultilizado
		 * TIPOS RETORNADOS:
	     * Webkit, IPad, IOS, Android, BlackBerry, WebOS, WindowsMobile, UnknownMobile 
		 * 18/06/2015
		 * @param callback    
		 */
		getDeviceType: function (callback) {
			var deviceType = "";
			var smallScreen = false;
			if(navigator.userAgent.indexOf("AppleWebKit") > 0) {
				deviceType = "Webkit";
			}
			if(navigator.userAgent.indexOf("ipad") > 0) {
				deviceType = "iPad";
			}
			if(navigator.userAgent.indexOf("iPhone") > 0 || navigator.userAgent.indexOf("iPod") > 0) {
				deviceType = "IOS";
			}
			if(navigator.userAgent.indexOf("Android") > 0) {
				deviceType = "Android";
			}
			if(navigator.userAgent.indexOf("AppleWebKit") > 0 && navigator.userAgent.indexOf("BlackBerry") > 0) {
				deviceType = "BlackBerry";
			}
			if(navigator.userAgent.indexOf("webOS") > 0) {
				deviceType = "webOS";
			}
			if(navigator.userAgent.indexOf("IEMobile") > 0) {
				deviceType = "IEMobile";
			}
			if(screen.width < 767 || ( (deviceType == "Android") && screen.width < 1000)) {
				smallScreen = true;
			}
			if((navigator.userAgent.indexOf("AppleWebKit") > 0) && smallScreen) {
				deviceType = "UnknownMobile";
			}
			callback(deviceType);
		},
		
		/**
		 * @author laio.pinheiro
		 * Retorna 'true' se o acesso estiver sendo feito apartir de um celular
		 * 18/06/2015
		 * @return boolean 
		 */
		isMobile: function () {
			var agent = "";
			var smallScreen = false;
			if(navigator.userAgent.indexOf("AppleWebKit") > 0) {
				agent = "Webkit";
			}
			if(navigator.userAgent.indexOf("ipad") > 0) {
				agent = "iPad";
			}
			if(navigator.userAgent.indexOf("iPhone") > 0 || navigator.userAgent.indexOf("iPod") > 0) {
				agent = "IOS";
			}
			if(navigator.userAgent.indexOf("Android") > 0) {
				agent = "Android";
			}
			if(navigator.userAgent.indexOf("AppleWebKit") > 0 && navigator.userAgent.indexOf("BlackBerry") > 0) {
				agent = "BlackBerry";
			}
			if(navigator.userAgent.indexOf("webOS") > 0) {
				agent = "webOS";
			}
			if(navigator.userAgent.indexOf("IEMobile") > 0) {
				agent = "IEMobile";
			}
			if(screen.width < 767 || ( (agent == "Android") && screen.width < 1000)) {
				smallScreen = true;
			}
			if((navigator.userAgent.indexOf("AppleWebKit") > 0) && smallScreen) {
				agent = "UnknownMobile";
			}

			if(agent == "IOS" || agent == "Android" || agent == "BlackBerry" || agent == "WebOS" || agent == "WindowsMobile" || agent == "UnknownMobile") {
				return true;
			} else {
				return false;
			}
		},
		
		/**
		 * @author laio.pinheiro
		 * Retorna 'true' se o acesso estiver sendo feito apartir de um tablet
		 * 18/06/2015
		 * @return boolean  
		 */
		isTablet: function () {
			if(this.isMobile() && screen.width > 767) {
				return true;
			}else if(navigator.userAgent.indexOf("iPad") > 0) {
				return true;
			} else {
				return false;
			}
		},
		
		reformataValor : function(chave) {
			var a = $(chave).val();
			var aa = a.split(',');
			if (aa.length>=2 && aa[0].length>=2 && aa[0].indexOf(0)=="0") {
				while (aa[0].length>1 && aa[0].indexOf('0') == 0) {
					aa[0] = aa[0].substring(1);
					if (aa[0].indexOf(".")==0) {
						aa[0] = aa[0].substring(1);
					}
				}
				aa[0] = aa[0] + ",";
				a = aa[0] + aa[1];
				if (aa[1].length==3)
				{
					a = a/10;
				}
				 $(chave).val(a);	
			}
		}
	};

	return Util;
});