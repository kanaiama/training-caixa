var xSwitch = {
    toggle: function (element) {
        hiddenInput = element.querySelector("input");
        if(element.hasAttribute("active")) {
            hiddenInput.value = "false";
            element.removeAttribute("active");
        } else {
            hiddenInput.value = "true";
            element.toggleAttribute("active");
        }
    }
}