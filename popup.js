document.addEventListener("DOMContentLoaded", function () {
    var toggleSwitch = document.getElementById("toggleSwitch");

    chrome.storage.sync.get("extensionState", function (data) {
        toggleSwitch.checked = data.extensionState || false;
        isToggleOn = toggleSwitch.checked; 
    });

    toggleSwitch.addEventListener("change", function () {
        isToggleOn = toggleSwitch.checked;
        chrome.storage.sync.set({ extensionState: toggleSwitch.checked });
    });
});
