MultiMian Language Translator 🌐

MultiMian Language Translator is a user-friendly, responsive language translation web application. It provides real-time translation, text-to-speech, and quick copy functionalities, enabling users to switch languages and listen to translations with ease.

Features

    Instant Translation: Translate text between multiple languages using the MyMemory Translation API.
    Language Swap: Quickly swap the text and language selections between input and output fields.
    Text-to-Speech (TTS): Listen to your input or translated text in the selected language with browser-based TTS.
    Copy to Clipboard: Easily copy your translated or input text with a single click.
    Responsive Design: Compatible with both desktop and mobile screens for easy access on any device.


Installation

    Clone the repository:

    bash

git clone https://github.com/Mianhassam96/Language-Translator.git

Navigate to the project directory:

bash

    cd Language-Translator

    Open the index.html file in your browser to start using the translator.

Usage

    Select Languages: Choose the languages you want to translate between using the dropdowns.
    Enter Text: Type or paste your text into the input box.
    Translate: Click the Translate button to view the translated text.
    Listen to the Translation: Click the speaker icon to hear the text-to-speech version of your input or translated text.
    Copy Text: Click the copy icon to save the text to your clipboard.

Technologies

    HTML, CSS, and JavaScript for the front-end.
    MyMemory Translation API for translation data.
    SpeechSynthesis API for text-to-speech functionality.

Code Overview

The core functionalities are implemented in JavaScript:

    Language Selection: Dropdown menus populate dynamically with language options.
    Swap Functionality: A quick language swap button exchanges text and language selections between fields.
    Translation Request: Fetches translations using MyMemory's API and displays them in real time.
    Text-to-Speech: Text is spoken in chunks if it exceeds a certain length, ensuring smooth playback.

Contributing

Contributions are welcome! Here’s how you can help:

    Fork the repository.
    Create a new branch:

    bash

git checkout -b feature/AmazingFeature

Make your changes and commit them.
Push to the branch:

bash

    git push origin feature/AmazingFeature

    Open a Pull Request.

License

This project is licensed under the MIT License - see the LICENSE file for details.

Live preview : https://language-translator-blond.vercel.app/ 

