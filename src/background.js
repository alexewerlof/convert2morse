var child1 = chrome.contextMenus.create({
    "title": chrome.app.getDetails().name + ' "%s"',
    "contexts": ["selection"],
    "onclick": function(info) {
        alert(strToMorse(info.selectionText));
    }
});