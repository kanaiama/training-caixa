(function (factory) {

    if (typeof define === 'function' && define.amd) { // AMD
        define(['jquery'], factory);
    }
    else if (typeof exports == "object" && typeof module == "object") { // CommonJS
        module.exports = factory(require('jquery'));
    }
    else { // Browser
        factory(jQuery);
    }
}) (function($, undefined) {

    $.fn.percircle = function(options) {
        // default options
        var defaultOptions = {
            animate: true
        };
        
        // extend with any provided options
        if (!options) options = {};
        $.extend(options, defaultOptions);
        
        var rotationMultiplier = 3.6;

        // for each element matching selector
        return this.each(function(){
            /*
               If it is about dynamic value update, ensure the filling of the bar will start from 0 degrees.
               Without this line, if it as about a dynamic update from a value > 50 to a value < 50, the bar
               filling will start from 180 degrees.
               However, this fix is not the best one, UX-wise, since user loses the gradual degredation of the bar.
               The way this should be best implemented is to perform a smooth animation from > 50deg back to the
               requested value, instead of first moving to 0deg and then "drawing" again.
             */
            if ($(this).hasClass('gt50')) $(this).removeClass('gt50');

            var percircle = $(this);
            var progressBarColor = '';

            // add percircle class for styling
            if (!percircle.hasClass('percircle')) percircle.addClass('percircle');
            // apply options
            if (typeof(percircle.attr('data-animate')) !== 'undefined') options.animate = percircle.attr('data-animate') == 'true';
            if (options.animate) percircle.addClass('animate');
            
            if (typeof(percircle.attr('data-progressBarColor')) !== 'undefined') {
                options.progressBarColor = percircle.attr('data-progressBarColor');
                progressBarColor = "style='border-color: "+ options.progressBarColor +"'";
                //removido efeito mouse over
                //changeTextColor($(this), options.progressBarColor);
            } else {
                if (typeof options.progressBarColor !== 'undefined'){
                    progressBarColor = "style='border-color: "+ options.progressBarColor +"'";
                   //removido efeito mouse over
                   //changeTextColor($(this), options.progressBarColor);
                }
            }

            var perdown = percircle.attr('data-perdown') || options.perdown;
            
            if(perdown) {
                getCountdown(percircle, options, progressBarColor);
            }
        });
    };
	
	// move to another file - functions
	var getCountdown = function(percircle, options, progressBarColor) {
		var secs = percircle.attr('data-secs') || options.secs;
		var timeUpText = percircle.attr('data-timeUpText') || options.timeUpText;
		var reset = percircle[0].hasAttribute('data-reset') || options.reset;
		
		var d = new Date(1990, 01, 01, 00, 0, 20, 00); // new Date(year, month, day, hours, minutes, seconds, milliseconds)

		var counter;

		if (reset) {
		  percircle.on("click", timerReset);
		}

		function timer() {
		  secs-=1;
		  d.setSeconds(d.getSeconds() - 1);

		  if (secs > 10) percircle.addClass('gt50');
		  if (secs < 10) percircle.removeClass('gt50');

		  timerUpdate();

		  if (secs <= 0) {
			timerStop();
			
			//preenche valor do componente passado por parametro para 'S' quando o tempo expira
			if(options.timeUpValueComponent){
				$("#" + options.timeUpValueComponent).val("S");
			}
			
			percircle.html('<span style="font-size: 20px; margin-top: 2px; font-weight:bold;">'+timeUpText+'</span>');
			
			//chama um metodo callback quando o tempo expira
			if(options.timeUpCallback){
				options.timeUpCallback();
			}
			
			return;
		  }
		}

		function timerStart() {
			counter = setInterval(timer, 1000);
		}

		function timerStop() {
		  clearInterval(counter);
		}

		function timerReset() {
		  timerStop();

		  secs = options.secs;
		  timerUpdate();

		  timerStart();
		}

		function timerUpdate() {
			var contadorText = getPadded(d.getMinutes()) + ":" + getPadded(d.getSeconds());
			var pin = percircle.attr('data-pin') || options.pin || 'no pin value provided';
			
			percircle.html('<span style="font-size: 18px;margin-top: 2px;font-weight:bold;">' + pin + '</span>');
			
			// add divs for structure
			$('<div class="slice"><div class="bar" '+progressBarColor+'></div><div class="fill" '+progressBarColor+'></div></div>').appendTo(percircle);

			var rotationDegrees = 18 * secs;  // temporary clockwise rotation value fixado em 1,2 que e o valor obtido para 360graus/5minutos
			$('.bar', percircle).css({
				'-webkit-transform' : 'rotate(' + rotationDegrees + 'deg)',
				'-moz-transform'    : 'rotate(' + rotationDegrees + 'deg)',
				'-ms-transform'     : 'rotate(' + rotationDegrees + 'deg)',
				'-o-transform'      : 'rotate(' + rotationDegrees + 'deg)',
				'transform'         : 'rotate(' + rotationDegrees + 'deg)'
			});
		}
		
		// Initialize timer
		timerStart();
	};
	
	// display a presentable format of current time
	var getPadded = function(val){
		return val < 10 ? ('0' + val) : val;
	};
});