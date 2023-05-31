var xQuestions = {
  reset: function (group) {
    this.setInputValue(group, "");
    this.resetButtons(group);
    this.removeGroupSelected(group);
  },

  select: function (button, value) {
    this.resetButtons(button.parentElement);
    this.setActiveButton(button);
    this.setInputValue(button.parentElement, value);
    this.setGroupSelected(button.parentElement);
  },

  resetButtons: function (group) {
    Array.from(group.children).forEach((button) => {
      button.removeAttribute("active");
    });
  },

  setActiveButton: function (button) {
    button.toggleAttribute("active");
  },

  setInputValue: function (group, value) {
    var input = group.querySelector("input");
    input.value = value;
  },

  setGroupSelected: function (group) {
    if (!group.hasAttribute("selected")) {
      group.toggleAttribute("selected");
    }
  },
  
  removeGroupSelected: function (group) {
    group.removeAttribute("selected");
  }
};
