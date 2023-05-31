(function (factory) {
    if (typeof define === "function" && define.amd) {
         define(["jquery"], factory);
    } else {
        factory(window.jQuery || window.Zepto);
    }
}(function ($) {



    DataList = function (select, options) {
        var that = this;

        this.options = options;
        this.$select = $(select);
        this.$input = $('<input type="text" autocomplete="off">');
        this.$list = $('<ul class="es-list-scroll">');
        this.$oldMatches = null;
        this.utility = new DataListUtility(this);

        if (['focus', 'manual'].indexOf(this.options.trigger) < 0)
            this.options.trigger = 'focus';
        if (['default', 'fade', 'slide'].indexOf(this.options.effects) < 0)
            this.options.effects = 'default';
        if (isNaN(this.options.duration) && ['fast', 'slow'].indexOf(this.options.duration) < 0)
            this.options.duration = 'fast';


        this.$select.replaceWith(this.$input);
        this.$list.appendTo(this.options.appendTo || this.$input.parent());


        this.utility.initialize();
        this.utility.initializeList();
        this.utility.initializeInput();
        this.utility.trigger('created');
    }
    DataList.DEFAULTS = {filter: true, effects: 'default', duration: 'fast', trigger: 'focus'};
    DataList.prototype.filter = function () {
        var hiddens = 0;
        var search = this.utility.removeAcentosLowerCase(this.$input.val()).trim();

        if (!this.changeMatches(search)) return;

        this.$list.find('li').addClass('es-visible').show();
        if (this.options.filter) {
            hiddens = this.$list.find('li').filter(function (i, li) {
                return DataListUtility.prototype.removeAcentosLowerCase($(li).text()).indexOf(search) < 0;
            }).hide().removeClass('es-visible').length;
            if ((this.$list.find('li').length - 1) == hiddens)
                this.hide();
        }
    };
    DataList.prototype.changeMatches = function (search) {
        var newMatches = [];
        if (this.options.filter && search.trim() != "") {
            newMatches = this.$list.find('li').filter(function (i, li) {
                return DataListUtility.prototype.removeAcentosLowerCase($(li).text()).indexOf(search) < 0;
            });
        } else {
            newMatches = this.$list.find('li');
        }
        var change = false;
        if (this.$oldMatches == null || this.$oldMatches.length != newMatches.length){
            change = true;
        } else {
            for (var iC = 0; iC < newMatches.length; iC++) {
                const elA = newMatches[iC];
                const elB = this.$oldMatches[iC];
                if (elA != elB) {
                    change = true;
                    break;
                }
            }

        }
        if (change) {
            this.$oldMatches = newMatches;
        }
        return change;
    };
    DataList.prototype.show = function () {
        this.$list.css({
            top: this.$input.position().top + this.$input.outerHeight() - 1,
            left: this.$input.position().left,
            width: this.$input.outerWidth()
        });

        if (this.$list.find('li.es-visible').length > 0) {
            var fns = {default: 'show', fade: 'fadeIn', slide: 'slideDown'};
            var fn = fns[this.options.effects];

            this.utility.trigger('show');
            this.$input.addClass('open');
            this.$list[fn](this.options.duration, $.proxy(this.utility.trigger, this.utility, 'shown'));
        }
    };
    DataList.prototype.hide = function () {
        var fns = {default: 'hide', fade: 'fadeOut', slide: 'slideUp'};
        var fn = fns[this.options.effects];

        this.utility.trigger('hide');
        this.$input.removeClass('open');
        this.$list[fn](this.options.duration, $.proxy(this.utility.trigger, this.utility, 'hidden'));
    };
    DataList.prototype.select = function ($li) {
        if (!this.$list.has($li) || !$li.is('li.es-visible:not([disabled])'))
            return;
        this.$input.val($li.text());
        if (this.options.filter)
            this.hide();
        this.filter();
        this.utility.trigger('select', $li);
    };
    DataList.prototype.add = function (text, index, attrs, data) {
        var $li = $('<li>').html(text);
        var $option = $('<option>').text(text);
        var last = this.$list.find('li').length;

        if (isNaN(index))
            index = last;
        else
            index = Math.min(Math.max(0, index), last);
        if (index == 0) {
            this.$list.prepend($li);
            this.$select.prepend($option);
        } else {
            this.$list.find('li').eq(index - 1).after($li);
            this.$select.find('option').eq(index - 1).after($option);
        }
        this.utility.setAttributes($li, attrs, data);
        this.utility.setAttributes($option, attrs, data);
        this.filter();
    };
    DataList.prototype.remove = function (index) {
        var last = this.$list.find('li').length;

        if (isNaN(index))
            index = last;
        else
            index = Math.min(Math.max(0, index), last - 1);
        this.$list.find('li').eq(index).remove();
        this.$select.find('option').eq(index).remove();
        this.filter();
    };
    DataList.prototype.clear = function () {
        this.$list.find('li').remove();
        this.$select.find('option').remove();
        this.filter();
    };
    DataList.prototype.destroy = function () {
        this.$list.off('mousemove mousedown mouseup');
        this.$input.off('focus blur input keydown');
        this.$input.replaceWith(this.$select);
        this.$list.remove();
        this.$select.removeData('editable-select');
    };


    DataListUtility = function (es) {
        this.es = es;
    }
    DataListUtility.prototype.initialize = function () {
        var that = this;
        that.setAttributes(that.es.$input, that.es.$select[0].attributes, that.es.$select.data());
        that.es.$input.addClass('es-input').data('editable-select', that.es);
        that.es.$select.find('option').each(function (i, option) {
            var $option = $(option).remove();
            that.es.add($option.text(), i, option.attributes, $option.data());
            if ($option.attr('selected'))
                that.es.$input.val($option.text());
        });
        that.es.filter();
    };
    DataListUtility.prototype.initializeList = function () {
        var that = this;
        that.es.$list
                .on('mousemove', 'li:not([disabled])', function () {
                    that.es.$list.find('.selected').removeClass('selected');
                    $(this).addClass('selected');
                })
                .on('mousedown', 'li', function (e) {
                    if ($(this).is('[disabled]'))
                        e.preventDefault();
                    else
                        that.es.select($(this));
                })
                .on('mouseup', function () {
                    that.es.$list.find('li.selected').removeClass('selected');
                });
    };
    DataListUtility.prototype.initializeInput = function () {
        var that = this;
        switch (this.es.options.trigger) {
            default:
            case 'focus':
                that.es.$input
                        .on('focus', $.proxy(that.es.show, that.es))
                        .on('blur', $.proxy(that.es.hide, that.es));
                break;
            case 'manual':
                break;
        }
        that.es.$input.on('input keydown', function (e) {
            switch (e.keyCode) {
                case 38: // Up
                    var visibles = that.es.$list.find('li.es-visible:not([disabled])');
                    var selectedIndex = visibles.index(visibles.filter('li.selected'));
                    that.highlight(selectedIndex - 1);
                    e.preventDefault();
                    break;
                case 40: // Down
                    var visibles = that.es.$list.find('li.es-visible:not([disabled])');
                    var selectedIndex = visibles.index(visibles.filter('li.selected'));
                    that.highlight(selectedIndex + 1);
                    e.preventDefault();
                    break;
                case 13: // Enter
                    if (that.es.$list.is(':visible')) {
                        that.es.select(that.es.$list.find('li.selected'));
                        e.preventDefault();
                    }
                    break;
                case 9:  // Tab
                case 27: // Esc
                    that.es.hide();
                    break;
                default:
                    that.es.filter();
                    that.highlight(0);
                    break;
            }
        });
    };
    DataListUtility.prototype.highlight = function (index) {
        var that = this;
        that.es.show();
        setTimeout(function () {
            var visibles = that.es.$list.find('li.es-visible');
            var oldSelected = that.es.$list.find('li.selected').removeClass('selected');
            var oldSelectedIndex = visibles.index(oldSelected);

            if (visibles.length > 0) {
                var selectedIndex = (visibles.length + index) % visibles.length;
                var selected = visibles.eq(selectedIndex);
                var top = selected.position().top;

                selected.addClass('selected');
                if (selectedIndex < oldSelectedIndex && top < 0)
                    that.es.$list.scrollTop(that.es.$list.scrollTop() + top);
                if (selectedIndex > oldSelectedIndex && top + selected.outerHeight() > that.es.$list.outerHeight())
                    that.es.$list.scrollTop(that.es.$list.scrollTop() + selected.outerHeight() + 2 * (top - that.es.$list.outerHeight()));
            }
        });
    };
    DataListUtility.prototype.setAttributes = function ($element, attrs, data) {
        $.each(attrs || {}, function (i, attr) {
            $element.attr(attr.name, attr.value);
        });
        $element.data(data);
    };
    DataListUtility.prototype.trigger = function (event) {
        var params = Array.prototype.slice.call(arguments, 1);
        var args = [event + '.editable-select'];
        args.push(params);
        this.es.$select.trigger.apply(this.es.$select, args);
        this.es.$input.trigger.apply(this.es.$input, args);
    };

    DataListUtility.prototype.removeAcentosLowerCase = function(str) {
        var r=str.toLowerCase();
        r = r.replace(new RegExp(/[àáâãäå]/g),"a");
        r = r.replace(new RegExp(/æ/g),"ae");
        r = r.replace(new RegExp(/ç/g),"c");
        r = r.replace(new RegExp(/[èéêë]/g),"e");
        r = r.replace(new RegExp(/[ìíîï]/g),"i");
        r = r.replace(new RegExp(/ñ/g),"n");                
        r = r.replace(new RegExp(/[òóôõö]/g),"o");
        r = r.replace(new RegExp(/œ/g),"oe");
        r = r.replace(new RegExp(/[ùúûü]/g),"u");
        r = r.replace(new RegExp(/[ýÿ]/g),"y");
        return r;
    };

    DataListUtility.prototype.acertaCampo = function (id) { 
        if ($("#" + id[0].id).val() == "") {
            $("#" + id[0].id + "_edit").val("");
        }
    }

    Plugin = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('editable-select');
            var options = $.extend({}, DataList.DEFAULTS, $this.data(), typeof option == 'object' && option);

            if (!data)
                data = new DataList(this, options);
            if (typeof option == 'string')
                data[option].apply(data, args);
        });
    }
    $.fn.dataList = Plugin;
    $.fn.dataList.Constructor = DataList;

}));
