define([ "statics-core/js/core/log"], function(log) {
	var mobileUtil = {

		isAndroid: function() {
			return navigator.userAgent.match(/Android/i) == 'Android' ;
		},

		isBlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i) == 'BlackBerry';
		},

		isiPhone: function() {
			return (navigator.userAgent.match(/iPhone/i)  == 'iPhone' ||  navigator.userAgent.match(/iPod/i)  == 'iPod');
		},

		isiPad: function() {
			var d = window.navigator.userAgent.match(/iPad/i) == 'iPad'; 
			return d;
		},

		isOpera: function() {
			return navigator.userAgent.match(/Opera Mini/i) == 'Opera Mini';
		},

		isWindowsPhone: function() {
			return (navigator.userAgent.match(/IEMobile/i) == 'IEMobile' || navigator.userAgent.match(/WPDesktop/i) == 'WPDesktop');
		},

		isOldAndroid: function(){
			var deviceAgent = navigator.userAgent.toLowerCase();
		    var agentIndex = deviceAgent.indexOf('android');
		    if (agentIndex != -1) {
		       var androidversion = parseFloat(deviceAgent.match(/android\s+([\d\.]+)/)[1]);
		       if (androidversion < 4.4){
		    	   log.info("isOldAndroid: " + true);
		           return true;
		       }else{
		    	   log.info("isOldAndroid: " + false);		    	   
		    	   return false;
		       }
		    }else{
		    	   log.info("isOldAndroid: not android return false");
		    	   return false;
		    }
		},		
		
		isMobile: function() {
			var mobile = (this.isAndroid() || this.isBlackBerry() || this.isiPhone() || this.isOpera() || this.isWindowsPhone()|| this.isiPad());
			log.info("isMobile: " + mobile);
			
			return mobile;
		}
	};
	
	return mobileUtil;
});
