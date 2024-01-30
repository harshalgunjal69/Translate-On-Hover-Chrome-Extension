import { PythonShell } from "python-shell";



document.addEventListener("DOMContentLoaded", function () {
    var toggleSwitch = document.getElementById("toggleSwitch");

    // Set initial state based on saved value
    chrome.storage.sync.get("extensionState", function (data) {
        toggleSwitch.checked = data.extensionState || false;
    });

    // Toggle the extension state when the switch is changed
    toggleSwitch.addEventListener("change", function () {
        chrome.storage.sync.set({ extensionState: toggleSwitch.checked });
    });
});
