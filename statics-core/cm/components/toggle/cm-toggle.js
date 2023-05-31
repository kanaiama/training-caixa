window.addEventListener("load", () => {
  startToggles();
});

function startToggles() {
  const toggles = document.querySelectorAll("[data-name=cm-toggle]");
  toggles.forEach(toggle => startToggle(toggle));
}

function startToggle(toggle) {
  startToggleSwitch(toggle);
  startDataBind(toggle);
  startItemsClick(toggle);
}

function startToggleSwitch(toggle) {
  toggleSwitch = toggle.querySelector("[data-name=cm-toggle-switch]");
  toggleSwitch.setAttribute("tabindex", 0);
  toggleSwitch.setAttribute("onclick", "toggleChange(this)");
}

function toggleChange(toggleChild) {
  const toggle = toggleChild.parentElement;
  toggle.dataset.active = toggle.dataset.active === "false" ? true : false;
  bindChange(toggle);
}

function startDataBind(toggle) {
  const bindName = getBindName(toggle);
  bindName
    ? startToggleDataBind(toggle, bindName)
    : setDataActive(toggle, false);
}

function startToggleDataBind(toggle, bindName) {
  window[bindName].isStarted = true;
  setDataActive(toggle, window[bindName].value);
}

function startItemsClick(toggle) {
  items = toggle.querySelectorAll("[data-name=cm-toggle-item]");
  items[0].setAttribute("onclick", "activeItem(this, 'disableToggleItem')");
  items[1].setAttribute("onclick", "activeItem(this, 'activeToggleItem')");
}

function activeItem(toggleItem, item) {
  const active = toggleItem.parentElement.dataset.active;
  if (
    (active === "false" && item === "activeToggleItem") ||
    (active === "true" && item === "disableToggleItem")
  ) {
    toggleChange(toggleItem);
  }
}

function bindChange(toggle) {
  const bindName = getBindName(toggle);
  if (bindName) {
    window[bindName].value = !window[bindName].value;
    window[bindName].change();
  }
}

function getBindName(toggle) {
  return toggle.dataset.bind;
}

function setDataActive(toggle, value) {
  toggle.dataset.active = value;
}
