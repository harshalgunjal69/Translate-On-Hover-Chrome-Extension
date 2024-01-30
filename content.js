let isToggleOn = false;

async function translateText(selectedText) {
    try {
        const response = await fetch("http://127.0.0.1:5000/translate", {
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

        if (!response.ok) {
            console.error("Fetch failed with status:", response.status);
            return;
        }

        const data = await response.json();
        console.log("Translating: ", data.translatedText);
    } catch (error) {
        console.error("Error during translation:", error);
    }
}

function getSelectedText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function translateOnHover(text) {
    translateText(text);
}

function handleSelectionChange() {
    var selectedText = getSelectedText();
    if (selectedText && isToggleOn) {
        console.log("Selected text:", selectedText);
        translateOnHover(selectedText);
    }
}

document.addEventListener("selectionchange", handleSelectionChange);

chrome.storage.sync.get("extensionState", function (data) {
    isToggleOn = data.extensionState || false;
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let key in changes) {
        if (key === "extensionState") {
            isToggleOn = changes[key].newValue || false;
        }
    }
});
