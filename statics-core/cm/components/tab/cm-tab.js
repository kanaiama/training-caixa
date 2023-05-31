window.addEventListener("load", function () {
    cmtab_startTabs();
});

function cmtab_startTabs() {
    const dialogs = document.querySelectorAll("[data-name=cm-tabs]");
    dialogs.forEach(function (dialog) {
        cmtab_startTab(dialog);
    });
}

function cmtab_startTab(dialog) {
    const nav = dialog.querySelector("nav");
    if (nav) {
        const tabs = nav.querySelectorAll("button");
        const tabsContent = dialog.querySelectorAll("[tab-content]");
        cmtab_setHeaderWithNav(dialog);
        tabs.forEach(function (tab) {
        cmtab_tabProcess(tab, tabsContent);
        });
    }
}

function cmtab_tabProcess(tab, tabsContent) {
    if (tab.getAttribute("tab-active") !== null) {
        cmtab_setAllActiveTabsContent(tabsContent, tab);
    }
    tab.addEventListener("click", function (event) {
        const el = event.target;
        const isActive = el.getAttribute("tab-active");
        if (isActive === null) {
        cmtab_setTabActive(el);
        }
    });
}

function cmtab_setTabActive(tab) {
    const dialog = tab.parentElement.parentElement.parentElement;
    const tabs = dialog.querySelectorAll("[tab-name]");
    const tabsContent = dialog.querySelectorAll("[tab-content]");
    cmtab_setAllActiveTabs(tabs, tab);
    cmtab_setAllActiveTabsContent(tabsContent, tab);
}

function cmtab_setAllActiveTabs(tabs, targetTab) {
    const targetName = targetTab.getAttribute("tab-name");
    tabs.forEach(function (tab) {
        tab.getAttribute("tab-name") === targetName
        ? tab.setAttribute("tab-active", "")
        : tab.removeAttribute("tab-active");
    });
}

function cmtab_setAllActiveTabsContent(tabsContent, targetTab) {
    const targetName = targetTab.getAttribute("tab-name");
    tabsContent.forEach(function (tabContent) {
        tabContent.getAttribute("tab-content") === targetName
        ? tabContent.setAttribute("active", "")
        : tabContent.removeAttribute("active");
    });
}

function cmtab_setHeaderWithNav(dialog) {
    const header = dialog.querySelector("header");
    header.classList.add("cm-dialog-header-with-nav");
}