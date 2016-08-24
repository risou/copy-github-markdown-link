chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        if (tab.url && tab.url.indexOf('https://github.com/') != -1) {
            chrome.pageAction.show(tabId);
        } else {
            chrome.pageAction.hide(tabId);
        }
    }
});

chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, "getTitle", function(res) {
        var title = res;

        var copyForm = document.createElement("textarea");
        copyForm.textContent = '[' + title + '](' + tab.url + ')';

        var body = document.getElementsByTagName("body")[0];
        body.appendChild(copyForm);

        copyForm.select();
        document.execCommand('copy');

        document.body.removeChild(copyForm);
    });
});
