let isToggleOn = false;

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.get("extensionState", function (data) {
        isToggleOn = data.extensionState || false;
        console.log("Extension state initialized:", isToggleOn);
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.getToggleState) {
        // Respond with the current toggle state
        sendResponse({ toggleState: isToggleOn });
        console.log("Toggle state sent in response:", isToggleOn);
    }

    return true;
});

