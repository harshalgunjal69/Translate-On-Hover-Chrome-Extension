async function translate(selectedText) {
    const res = await fetch("http://127.0.0.1:5000/translate", {
        method: "POST",
        body: JSON.stringify({
            q: `${selectedText}`,
            source: "auto",
            target: "en",
            format: "text",
            api_key: "",
        }),
        headers: { "Content-Type": "application/json" },
    });

    let data = await res.json()
    console.log(data.translatedText);
    
       
}

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

translate("Cómo estás");
