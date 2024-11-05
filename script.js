const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
exchageIcon = document.querySelector(".exchange"),
selectTag = document.querySelectorAll("select"),
icons = document.querySelectorAll(".row i");
translateBtn = document.querySelector("button"),

selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "ur-UR" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

exchageIcon.addEventListener("click", () => {
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

fromText.addEventListener("keyup", () => {
    if(!fromText.value) {
        toText.value = "";
    }
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim(),
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText.value = data.translation;
            }
        });
        toText.setAttribute("placeholder", "Translation");
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if (!fromText.value && !toText.value) return;
        
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let textToSpeak = target.id === "from" ? fromText.value : toText.value;
            let langToUse = target.id === "from" ? selectTag[0].value : selectTag[1].value;
            
            // Stop any ongoing speech before starting a new one
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }
            
            // Function to split text into manageable chunks
            function speakChunks(text, lang) {
                const CHUNK_LENGTH = 150; // Adjust chunk size as needed
                let utterance = new SpeechSynthesisUtterance();
                utterance.lang = lang;

                for (let i = 0; i < text.length; i += CHUNK_LENGTH) {
                    let chunk = text.slice(i, i + CHUNK_LENGTH);
                    let chunkUtterance = new SpeechSynthesisUtterance(chunk);
                    chunkUtterance.lang = lang;
                    speechSynthesis.speak(chunkUtterance);
                }
            }
            
            // Speak the text in chunks
            speakChunks(textToSpeak, langToUse);
        }
    });
});
