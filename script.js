// DOM Elements
const fromText = document.querySelector(".from-text"),
    toText = document.querySelector(".to-text"),
    exchangeIcon = document.querySelector(".exchange"),
    selectTags = document.querySelectorAll("select"),
    icons = document.querySelectorAll(".row i"),
    translateBtn = document.getElementById("translateBtn"),
    clearBtn = document.getElementById("clearBtn"),
    errorMsg = document.getElementById("errorMsg"),
    charCount = document.getElementById("charCount"),
    charLimit = 500;

// Populate language dropdowns
selectTags.forEach((tag, id) => {
    for (let countryCode in countries) {
        let selected = id == 0 ? countryCode == "en-GB" ? "selected" : "" : countryCode == "ur-UR" ? "selected" : "";
        let option = `<option ${selected} value="${countryCode}">${countries[countryCode]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

// Character counter
fromText.addEventListener("input", () => {
    const count = fromText.value.length;
    charCount.textContent = Math.min(count, charLimit);
    
    if (count > charLimit) {
        fromText.value = fromText.value.substring(0, charLimit);
    }
});

// Clear button functionality
clearBtn.addEventListener("click", () => {
    fromText.value = "";
    toText.value = "";
    charCount.textContent = "0";
    hideError();
});

// Exchange languages
exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value,
        tempLang = selectTags[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTags[0].value = selectTags[1].value;
    selectTags[1].value = tempLang;
    charCount.textContent = fromText.value.length;
});

// Clear translation when input is empty
fromText.addEventListener("keyup", () => {
    if (!fromText.value) {
        toText.value = "";
        hideError();
    }
});

// Debounce function to limit API calls
let debounceTimer;
function debounceTranslate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        performTranslation();
    }, 500);
}

// Add enter key support
fromText.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
        performTranslation();
    }
});

// Perform translation
function performTranslation() {
    let text = fromText.value.trim(),
        translateFrom = selectTags[0].value,
        translateTo = selectTags[1].value;
    
    if (!text) return;
    
    hideError();
    showLoading(true);
    toText.setAttribute("placeholder", "Translating...");
    
    let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`;
    
    fetch(apiUrl)
        .then(res => {
            if (!res.ok) throw new Error("Network error");
            return res.json();
        })
        .then(data => {
            if (data.responseStatus === 400) {
                showError("Invalid language pair selected");
                toText.value = "";
            } else if (!data.responseData || !data.responseData.translatedText) {
                showError("Translation not available");
                toText.value = "";
            } else {
                toText.value = data.responseData.translatedText;
                // Try to get better translation from matches if available
                if (data.matches && data.matches.length > 0) {
                    for (let match of data.matches) {
                        if (match.id === 0) {
                            toText.value = match.translation;
                            break;
                        }
                    }
                }
            }
        })
        .catch(error => {
            console.error("Translation error:", error);
            showError("Failed to translate. Please check your connection and try again.");
            toText.value = "";
        })
        .finally(() => {
            showLoading(false);
            toText.setAttribute("placeholder", "Translation");
        });
}

// Translate button click
translateBtn.addEventListener("click", performTranslation);

// Icon click handler
icons.forEach(icon => {
    icon.addEventListener("click", handleIconClick);
    icon.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleIconClick.call(icon);
        }
    });
});

function handleIconClick(event) {
    const target = event.target;
    const action = target.getAttribute("data-action");
    const lang = target.getAttribute("data-lang");
    
    if (!action || !lang) return;
    
    if (action === "copy") {
        handleCopy(lang);
    } else if (action === "speak") {
        handleSpeak(lang);
    }
}

// Copy to clipboard
function handleCopy(lang) {
    const textToCopy = lang === "from" ? fromText.value : toText.value;
    
    if (!textToCopy) {
        showError("Nothing to copy");
        return;
    }
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            showError("Copied to clipboard", "success");
            setTimeout(hideError, 2000);
        })
        .catch(() => {
            showError("Failed to copy text");
        });
}

// Text to speech
function handleSpeak(lang) {
    const textToSpeak = lang === "from" ? fromText.value : toText.value;
    const langToUse = lang === "from" ? selectTags[0].value : selectTags[1].value;
    
    if (!textToSpeak) {
        showError("Nothing to speak");
        return;
    }
    
    // Cancel any ongoing speech
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
    
    // Split text into manageable chunks
    const CHUNK_LENGTH = 150;
    const chunks = [];
    
    for (let i = 0; i < textToSpeak.length; i += CHUNK_LENGTH) {
        chunks.push(textToSpeak.slice(i, i + CHUNK_LENGTH));
    }
    
    // Speak each chunk
    chunks.forEach((chunk, index) => {
        const utterance = new SpeechSynthesisUtterance(chunk);
        utterance.lang = langToUse;
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        if (index === chunks.length - 1) {
            utterance.onend = () => {
                showError("Speech completed", "success");
                setTimeout(hideError, 1500);
            };
        }
        
        speechSynthesis.speak(utterance);
    });
}

// Error and success messages
function showError(message, type = "error") {
    errorMsg.textContent = message;
    errorMsg.classList.add("show");
    if (type === "success") {
        errorMsg.style.color = "#388e3c";
        errorMsg.style.background = "#e8f5e9";
        errorMsg.style.borderLeftColor = "#388e3c";
    } else {
        errorMsg.style.color = "#d32f2f";
        errorMsg.style.background = "#ffebee";
        errorMsg.style.borderLeftColor = "#d32f2f";
    }
}

function hideError() {
    errorMsg.classList.remove("show");
}

// Loading state
function showLoading(isLoading) {
    translateBtn.disabled = isLoading;
    if (isLoading) {
        translateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Translating...';
    } else {
        translateBtn.innerHTML = 'Translate Text';
    }
}
