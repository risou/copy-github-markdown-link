var getIssueTitle = function() {
    var title = $('h1.gh-header-title .js-issue-title');
    var issueId = $('h1.gh-header-title .gh-header-number');
    return title.text().trim() + ' ' + issueId.text().trim();
};

var getTitle = function() {
    var url = window.location.href;

    if (url.match(/\/issues\/[0-9]+/)) {
        return getIssueTitle();
    }
    if (url.match(/\/pull\/[0-9]+/)) {
        return getIssueTitle();
    }
    return '';
};

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    var res;
    if (request == 'getTitle') {
        res = getTitle();
    }
    sendResponse(res);
});
