var xDualButton = {
  switch: function (button) {
    var buttons = Array.from(button.parentElement.children);
    if (!button.hasAttribute("active")) {
      buttons.forEach((button) => {
        button.toggleAttribute("active");
      });
    }
  },
};
