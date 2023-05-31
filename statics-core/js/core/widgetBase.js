define(
  [
    'statics-core/js/lib/class',
    'jquery',
    'statics-core/js/core/topic',
    'statics-core/js/core/ajax',
    'statics-core/js/core/security_base'
  ],
  function(Class, $, Topic, AjaxNB, SecurityBase) {
    var WidgetBase = Class.extend({
      init: function(el) {
        if (!el) {
          throw new Error('Elemento e obrigatorio para criar o componente');
        }

        this.$el = $(el);
      },

      createEvents: function(id) {
        var idOnly = !!id;

        if (this.events && this.events['load'] && !idOnly) {
          var _this = this;
          $(function() {
            var funcName = _this.events['load'];
            if (_this[funcName]) {
              _this[funcName].call(_this);
            }
          });
        }

        if (this.events) {
          for (var i in this.events) {
            if (i.indexOf(' ') >= 0) {
              var evts = i.split(' ');
              if (evts[1] === 'window' && !idOnly) {
                $(window).on(evts[0], $.proxy(this, this.events[i]));
              } else {
                if (!idOnly || evts[1] === '#' + id) {
                  $(evts[1]).on(evts[0], $.proxy(this, this.events[i]));
                }
              }
            }
          }
        }
      },

      createSubscribers: function() {
        if (this.events) {
          for (var i in this.events) {
            if (i.indexOf(' ') < 0) {
              Topic(i).subscribe($.proxy(this, this.events[i]));
            }
          }
        }
      },

      publish: function(topic) {
        var t = Topic(topic);
        t.publish.apply(t, Array.prototype.slice.call(arguments, 1));
      },

      ajax: function(url) {
        return new AjaxNB(url);
      },

      securityBase: function() {
        return new SecurityBase();
      },

      ajaxComp: function(uri) {
        return new AjaxNB(uri, AjaxNB.getContext(), 'sinbc');
        //			return new AjaxNB("/" + location.pathname.match(/(\w|-)+/g)[0] + "/" + uri.replace("/nb","nb"));
      },

      hasHash: function(content) {
        var validHashRegex = /^#/;
        return validHashRegex.test(content.charAt(content.length - 1));
      },

      createVariables: function(id) {
        if (id) {
          this['$' + id] = this.$el.find('#' + id);
        } else {
          var _me = this;
          this.$el.find('[id]').each(function() {
            _me['$' + this.id] = $(this);
          });
        }
      }
    });

    return WidgetBase;
  }
);
