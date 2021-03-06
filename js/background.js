var appUrl = chrome.extension.getURL('../app/dest/index.html');

var appTabId = null;

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({
    url: appUrl
  }, function(tab) {
    appTabId = tab.id;
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {

  if (info.menuItemId === 'btmagd') {
    var openUrl = appUrl + '#/' + encodeURIComponent(info.selectionText);
    if (appTabId !== null) {
      chrome.tabs.update(appTabId, {
        url: openUrl,
        active: true
      });
    } else {
      chrome.tabs.create({
        url: openUrl
      }, function(tab) {
        appTabId = tab.id;
      });
    }
  }
});

chrome.tabs.onRemoved.addListener(function(tabId) {
  if (tabId === appTabId) {
    appTabId = null;
  }
});

chrome.contextMenus.create({
  "title": "使用btmagd搜索 \"%s\"",
  "contexts": ["selection"],
  "id": "btmagd"
});