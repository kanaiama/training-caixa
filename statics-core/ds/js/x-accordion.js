var xAccordion = {
  toggle: function (button) {
    var accordion = button.parentElement;
    accordion.hasAttribute("active")
      ? accordion.removeAttribute("active")
      : accordion.toggleAttribute("active");
  },
};
