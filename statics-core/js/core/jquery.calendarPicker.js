jQuery.fn.calendarPicker = function(options) {
	// --------------------------  start default option values --------------------------
	if (!options.date) {
		options.date = new Date();
	}

	if (typeof (options.years) == "undefined")
		options.years = 1;

	if (typeof (options.months) == "undefined")
		options.months = 3;

	if (typeof (options.days) == "undefined")
		options.days = 4;

	if (typeof (options.showDayArrows) == "undefined")
		options.showDayArrows = true;

	if (typeof (options.useWheel) == "undefined")
		options.useWheel = true;

	if (typeof (options.callbackDelay) == "undefined")
		options.callbackDelay = 500;

	if (typeof (options.monthNames) == "undefined")
		options.monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
				"Aug", "Sep", "Oct", "Nov", "Dec" ];

	if (typeof (options.dayNames) == "undefined")
		options.dayNames = [ "D", "S", "T", "Q", "Q", "S", "S" ];

	// --------------------------  end default option values --------------------------

	var calendar = {
		currentDate : options.date
	};
	calendar.options = options;

	//build the calendar on the first element in the set of matched elements.
	var theDiv = this.eq(0);//$(this);
	theDiv.addClass("calBox");

	//empty the div
	theDiv.empty();

	var divYears = $("<div>").addClass("calYear");
	var divMonths = $("<div>").addClass("calMonth");
	var divDays = $("<div>").addClass("calDay");
	var divDayWeek = $("<div>").addClass("calDayWeek");

	theDiv.append(divYears).append(divMonths).append(divDays).append(divDayWeek);

	calendar.changeDate = function(date) {
		calendar.currentDate = date;

		var fillYears = function(date) {
			var year = date.getFullYear();
			var t = new Date();
			divYears.empty();
			var nc = options.years * 30 + 1;
			var w = parseInt((theDiv.width() - 4 - (nc) * 4) / nc) + "px";
			for (var i = year - options.years; i <= year + options.years; i++) {
				var d = new Date(date);
				d.setFullYear(i);
				var span = $("<span>").addClass("calElementYear").attr(
						"millis", d.getTime()).html(i).css("width", w);
				if (d.getYear() == t.getYear())
					span.addClass("today");
				if (d.getYear() == calendar.currentDate.getYear())
					span.addClass("selected");
				divYears.append(span);
			}
		}

		var fillMonths = function(date) {
			var month = date.getMonth();
			var t = new Date();
			divMonths.empty();
			var oldday = date.getDay();
			var nc = options.months * 2 + 2;

			for (var i = -options.months; i <= options.months; i++) {
				var d = new Date(date);
				var oldday = d.getDate();
				d.setMonth(month + i);

				if (d.getDate() != oldday) {
					d.setMonth(d.getMonth() - 1);
					d.setDate(28);
				}

				var mesText = "";
				var controlStyle = "";
				if (i == (options.months - 1)) {
					mesText = options.monthNames[d.getMonth()]
							+ "&nbsp;/&nbsp;" + (d.getYear() + 1900);
					controlStyle = "selected";
				} else {
					if (i == (options.months - 2))
						controlStyle = "calElement prev";

					if (i == (options.months))
						controlStyle = "calElement next";
				}
				var span = $("<span>").addClass(
						"calElementYear" + " " + controlStyle).attr("millis",
						d.getTime()).html(mesText);

				divMonths.append(span);

			}
		}

		var fillDays = function(date) {
			var dayStyle;
			var dayWeekText = "";
			var spanDayWeek = "";
			var dayStyleChange = false;
			var day = date.getDate();
			var t = new Date();
			divDays.empty();
			divDayWeek.empty();
			var nc = options.days * 3 + 2;
			var w = parseInt((theDiv.width() - 4
					- (options.showDayArrows ? 12 : 0) - (nc) * 4)
					/ (nc - (options.showDayArrows ? 2 : 0)))
					+ "px";
			for (var i = -options.days; i <= options.days; i++) {
				var d = new Date(date);
				d.setDate(day + i)
				if (dayStyleChange == false) {
					var span = $("<span>").addClass("calElement").attr(
							"millis", d.getTime())
					span.addClass("calElement1");
					if (i == -options.days && options.showDayArrows) {
						span.addClass("prev");
					} else if (i == options.days && options.showDayArrows) {
						span.addClass("next");
					} else {
						span.html(
								"<span class=weekLetter>"
										+ options.dayNames[d.getDay()]
										+ "</span><br><span class=dayNumber>"
										+ d.getDate() + "</span>").css("width",
								45);
						span.addClass("calElementBorder");
//						if (d.getDate() == 3)
//							span.addClass("calElementHoliday");
						if (d.getDay() == 6)
							span.addClass("calElementCoinBorder");
						if (d.getYear() == t.getYear()
								&& d.getMonth() == t.getMonth()
								&& d.getDate() == t.getDate())
							span.addClass("today");
						if (d.getYear() == calendar.currentDate.getYear()
								&& d.getMonth() == calendar.currentDate
										.getMonth()
								&& d.getDate() == calendar.currentDate
										.getDate()){
							span.addClass("selected");
							dayWeekText = options.dayNamesFull[d.getDay()]  + ",&nbsp;" + d.getDate() + "&nbsp;de&nbsp;" + options.monthNames[d.getMonth()];
							spanDayWeek = $("<span>").addClass("calElementYear").attr("millis",	d.getTime()).html(dayWeekText);
						}
					}
					dayStyleChange = true;

				} else {
					var span = $("<span>").addClass("calElement").attr(
							"millis", d.getTime())
					if (i == -options.days && options.showDayArrows) {
						span.addClass("prev");

					} else if (i == options.days && options.showDayArrows) {
						span.addClass("next");
					} else {
						span.html(
								"<span class=weekLetter>"
										+ options.dayNames[d.getDay()]
										+ "</span><br><span class=dayNumber "
										+ dayStyle + ">" + d.getDate()
										+ "</span>").css("width", 45);
						span.addClass("calElementBorder");
						if (d.getDay() === 6)
							span.addClass("calElementCoinBorder");
						if (d.getYear() == calendar.currentDate.getYear()
								&& d.getMonth() == calendar.currentDate
										.getMonth()
								&& d.getDate() == calendar.currentDate
										.getDate()){
							span.addClass("selected");
							dayWeekText = options.dayNamesFull[d.getDay()]  + ",&nbsp;" + d.getDate() + "&nbsp;de&nbsp;" + options.monthNames[d.getMonth()];
							spanDayWeek = $("<span>").addClass("calElementYear").attr("millis",	d.getTime()).html(dayWeekText);
						}
					}
					dayStyleChange = false;
				}
				divDays.append(span);

				//var extnve = options.weekNamesFull[d.getDay()] + ",&nbsp;" + d.getDay() + "&nbsp;de&nbsp;" (d.getYear() + 1900);
				//span.html(extnve);
				//span.html(options.weekNamesFull[d.getDay()] + ",&nbsp;" + d.getDay() + "&nbsp;de&nbsp;" (d.getYear() + 1900)); 			
			}
			divDayWeek.append(spanDayWeek);

		}

		var deferredCallBack = function() {
			if (typeof (options.callback) == "function") {
				if (calendar.timer)
					clearTimeout(calendar.timer);

				calendar.timer = setTimeout(function() {
					options.callback(calendar);
				}, options.callbackDelay);
			}
		}

		//    fillYears(date);
		fillMonths(date);
		fillDays(date);

		deferredCallBack();

	}

	theDiv.click(function(ev) {
		var el = $(ev.target).closest(".calElement");
		if (el.hasClass("calElement")) {
			calendar.changeDate(new Date(parseInt(el.attr("millis"))));
		}
	});

	//if mousewheel
	if ($.event.special.mousewheel && options.useWheel) {
		divYears.mousewheel(function(event, delta) {
			var d = new Date(calendar.currentDate.getTime());
			d.setFullYear(d.getFullYear() + delta);
			calendar.changeDate(d);
			return false;
		});
		divMonths.mousewheel(function(event, delta) {
			var d = new Date(calendar.currentDate.getTime());
			d.setMonth(d.getMonth() + delta);
			calendar.changeDate(d);
			return false;
		});
		divDays.mousewheel(function(event, delta) {
			var d = new Date(calendar.currentDate.getTime());
			d.setDate(d.getDate() + delta);
			calendar.changeDate(d);
			return false;
		});
	}

	calendar.changeDate(options.date);

	return calendar;
};