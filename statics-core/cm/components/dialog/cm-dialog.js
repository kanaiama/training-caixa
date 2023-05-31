window.addEventListener("load", function () {
  startDialogs();
});

function startDialogs() {
  const dialogs = document.querySelectorAll("[data-name=cm-dialog]");
  dialogs.forEach(function (dialog) {
    startDialog(dialog);
  });
}

function startDialog(dialog) {
  dialog.dataset.visible = "false";
  createDialogWrapper(dialog);
  createOverlay();
  setButtonsClose(dialog);
  setTabs(dialog);
}

function setTabs(dialog) {
  const nav = dialog.querySelector("nav");
  if (nav) {
    const tabs = nav.querySelectorAll("button");
    const tabsContent = dialog.querySelectorAll("[tab-content]");
    setHeaderWithNav(dialog);
    tabs.forEach(function (tab) {
      tabProcess(tab, tabsContent);
    });
  }
}

function tabProcess(tab, tabsContent) {
  if (tab.getAttribute("tab-active") !== null) {
    setAllActiveTabsContent(tabsContent, tab);
  }
  tab.addEventListener("click", function (event) {
    const el = event.target;
    const isActive = el.getAttribute("tab-active");
    if (isActive === null) {
      setTabActive(el);
    }
  });
}

function setTabActive(tab) {
  const dialog = tab.parentElement.parentElement.parentElement;
  const tabs = dialog.querySelectorAll("[tab-name]");
  const tabsContent = dialog.querySelectorAll("[tab-content]");
  setAllActiveTabs(tabs, tab);
  setAllActiveTabsContent(tabsContent, tab);
}

function setAllActiveTabs(tabs, targetTab) {
  const targetName = targetTab.getAttribute("tab-name");
  tabs.forEach(function (tab) {
    tab.getAttribute("tab-name") === targetName
      ? tab.setAttribute("tab-active", "")
      : tab.removeAttribute("tab-active");
  });
}

function setAllActiveTabsContent(tabsContent, targetTab) {
  const targetName = targetTab.getAttribute("tab-name");
  tabsContent.forEach(function (tabContent) {
    tabContent.getAttribute("tab-content") === targetName
      ? tabContent.setAttribute("active", "")
      : tabContent.removeAttribute("active");
  });
}

function createDialogWrapper(dialog) {
  const divConteudo = document.getElementById("conteudo");
  const dialogWrapper = document.createElement("div");
  dialogWrapper.dataset.name = "cm-dialog-wrapper";
  dialogWrapper.appendChild(dialog);
  divConteudo.appendChild(dialogWrapper);
}

function createOverlay() {
  if (document.querySelector("[cm-overlay]") === null) {
    const divConteudo = document.getElementById("conteudo");
    const overlay = document.createElement("div");
    overlay.dataset.name = "cm-overlay";
    overlay.dataset.visible = "false";
    overlay.addEventListener("click", function () {
      closeDialog();
    });
    divConteudo.appendChild(overlay);
  }
}

function showDialog(dialog) {
  const dialogWrapper =
    typeof dialog === "string"
      ? document.getElementById(dialog).parentElement
      : dialog.parentElement;
  dialogWrapper.dataset.visible = "true";
  setTimeout(function () {
    dialogWrapper.classList.add("visible");
  });
  showOverlay();
}

function closeDialog() {
  const dialogWrappers = document.querySelectorAll(
    "[data-name=cm-dialog-wrapper]"
  );
  dialogWrappers.forEach((dialogWrapper) => {
    dialogWrapper.classList.remove("visible");
    setTimeout(function () {
      dialogWrapper.dataset.visible = "false";
    }, 400);
  });
  closeOverlay();
}

function changeDialog(dialog) {
  this.closeDialog();
  setTimeout(function () {
    this.showDialog(dialog);
  }, 400);
}

function showOverlay() {
  const overlay = getOverlayElement();
  overlay.dataset.visible = "true";
  setTimeout(function () {
    overlay.classList.add("visible");
  });
}

function closeOverlay() {
  const overlay = getOverlayElement();
  overlay.classList.remove("visible");
  setTimeout(function () {
    overlay.dataset.visible = "false";
  }, 400);
}

function getOverlayElement() {
  return document.body.querySelector("[data-name=cm-overlay]");
}

function setButtonsClose(dialog) {
  const buttonsClose = dialog.querySelectorAll("[cm-close]");
  buttonsClose.forEach(function (button) {
    button.addEventListener("click", function () {
      closeDialog(dialog);
    });
  });
}

function setHeaderWithNav(dialog) {
  const header = dialog.querySelector("header");
  header.classList.add("cm-dialog-header-with-nav");
}
