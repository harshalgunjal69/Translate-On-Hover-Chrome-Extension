let isToggleOn = false;
let isTranslationInProgress = false;
let translationTimeout;

function translateText(selectedText, callback) {
    fetch("https://translate.terraprint.co/translate", {
        method: "POST",
        body: JSON.stringify({
            q: selectedText,
            source: "auto",
            target: "en",
            format: "text",
            api_key: "",
        }),
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => {
            if (!response.ok) {
                console.error("Fetch failed with status:", response.status);
                throw new Error("Translation failed");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Translating: ", data.translatedText);
            callback(data.translatedText);
        })
        .catch((error) => {
            console.error("Error during translation:", error);
        });
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

function replaceSelectedTextWithNode(translatedText) {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);

        // Check if the translated text is already present
        if (range.toString() !== translatedText) {
            range.deleteContents();

            // Create a new text node with the translated text
            var newText = document.createTextNode(translatedText);
            range.insertNode(newText);

            // Move the selection to the end of the newly inserted text node
            range.setEndAfter(newText);
            range.setStartAfter(newText);

            // Collapse the range and clear the selection
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
}

function translateOnHover() {
    var selectedText = getSelectedText();
    if (selectedText && isToggleOn) {
        console.log("Selected text:", selectedText);
        if (!isTranslationInProgress) {
            isTranslationInProgress = true;

            translateText(selectedText, function (translatedText) {
                replaceSelectedTextWithNode(translatedText);
                isTranslationInProgress = false;
            });
        }
    }
}

function handleSelectionChange() {
    clearTimeout(translationTimeout);

    // Delay the translation to prevent flickering and allow selection to stabilize
    translationTimeout = setTimeout(translateOnHover, 3000);
}

document.addEventListener("selectionchange", handleSelectionChange);

chrome.storage.sync.get("extensionState", function (data) {
    isToggleOn = data.extensionState || false;
});

chrome.storage.onChanged.addListener(function (changes) {
    if (changes.extensionState) {
        isToggleOn = changes.extensionState.newValue || false;
    }
});
