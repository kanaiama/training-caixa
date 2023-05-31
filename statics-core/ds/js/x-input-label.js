var xInputLabel = {
  setError: function (element, isError) {
    var input = element.querySelector("input");
    var error = element.querySelector(".x-input-error");
    input.removeAttribute("error");
    if (isError) {
      input.toggleAttribute("error");
      error.style.display = "block";
    } else {
      error.style.display = "none";
    }
  },

  hasError: function (element) {
    var input = element.querySelector("input");
    return (
      input.hasAttribute("required") &&
      (input.hasAttribute("error") || !input.value)
    );
  },

  checkMultipleErrors: function (elements) {
    return !!elements.find((element) => this.hasError(element));
  },
};
