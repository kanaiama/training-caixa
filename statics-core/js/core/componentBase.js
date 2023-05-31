define(['statics-core/js/core/widgetBase', 'mustache', 'jquery'], function(
  WidgetBase,
  mustache,
  $
) {
  var ComponentBase = WidgetBase.extend({
    data: {},

    init: function(el, options) {
      this._super(el);

      this.options = {};

      if (this.defaults) {
        this.options = this.defaults.constructor();
        for (var attr in this.defaults) {
          if (this.defaults.hasOwnProperty(attr))
            this.options[attr] = this.defaults[attr];
        }
      }

      if (options) {
        this.options = $.extend(this.options, options);
      }

      /* 
			 * Obtem o segmento de acesso do usuario para 
			 * renderizar o estilo dinamico dos componentes.
			 */
      if (this.component) {
        var type = '';
        var $scope = $('body');
        $scope.find('[data-type-access]').each(function() {
          var $el = $(this);
          type = $el.attr('data-type-access');
          return;
        });

        if (type !== '') {
          this.options.typeClass = type;
        }
        this.compiledTemplate = mustache.compile(this.component.html);
      }

      if (this.preRender) {
        this.preRender();
      }

      this.render();

      var compName = this.getComponentName();

      if (this.component && this.hasCssPage(compName)) {
        var ss1 = document.createElement('style');
        ss1.setAttribute('type', 'text/css');

        if (compName !== undefined && compName !== '') {
          ss1.setAttribute('name', compName);
        }

        var hh1 = document.getElementsByTagName('head')[0];
        hh1.appendChild(ss1);
        if (ss1.styleSheet) {
          // IE
          ss1.styleSheet.cssText = this.component.css;
        } else {
          // the world
          var tt1 = document.createTextNode(this.component.css);
          ss1.appendChild(tt1);
        }
      }

      if (this.posRender) {
        this.posRender();
      }
      document.onload = indexadorTab();
      setTimeout(indexadorTab, 5000);
    },
    getComponentName: function() {
      return this.options.component || this.component.name || this.options.name;
    },
    hasCssPage: function(compName) {
      return (
        compName === undefined ||
        (compName !== undefined &&
          compName !== '' &&
          document.getElementsByName(compName).length == 0)
      );
    },
    reset: function() {
      this.$el.empty();

      if (this.preRender) {
        this.preRender();
      }

      this.render();

      if (this.posRender) {
        this.posRender();
      }
    },
    mustacheRender: function(html, data) {
      return mustache.render(html, data);
    },
    render: function() {
      var data = this.options;

      if (this.data) {
        data = $.extend(this.options, this.data);
      }
      var promise = undefined;
      if (this.component) {
        promise = this.$el
          .html(this.mustacheRender(this.component.html, data))
          .promise();
        promise.done(
          $.proxy(function() {
            //main.js escuta esse evento
            this.publish('/component/rendered');
          }, this)
        );
      }

      this.createVariables();

      this.createEvents();
      this.createSubscribers();

      if (promise !== undefined) {
        return promise;
      }
    }
  });

  return ComponentBase;
});
