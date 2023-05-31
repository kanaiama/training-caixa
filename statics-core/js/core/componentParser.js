define([ 'jquery' ], function($) {
	return {
        parse: function($element) {
            var $scope = $element || $('body');
            $(function() {
                $scope.find('[data-component]').each(function() {
                    if ($.data(this, 'processed')) {
						return;
					}
					$.data(this, 'processed', true);
					var $el = $(this);

					var component = $el.attr("data-component");
					if ((component === "logoff") && (/(ipad|android)/i.exec(window.navigator.userAgent))) {
						return true;
					} else if (window.mobilecheck() === false && (/Xs/.exec(component) === null)) {
						require(["statics-components/js/componentes/" + component + "/" + component], function(Comp){
                            new Comp($el, $el.data());
                        });
                    } else if (window.mobilecheck() === true) {
                        require([ 'statics-components/js/componentes/' + component + '/' + component ], function(Comp) {
                            new Comp($el, $el.data());
                        });
                    }
                });
            });
		}
	};
});
