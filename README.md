# MianLingoTranslate 🌐

**Smarter. Speak Globally.**

A modern, production-ready AI-powered language translation platform built with Next.js, TypeScript, and Tailwind CSS. Designed for students, developers, freelancers, and businesses.

## 🚀 Features

### Core Features
- **🔤 Text Translation** - Translate text between 50+ languages
- **🎯 Language Auto-Detection** - Automatically detect source language
- **⚡ Fast & Accurate** - Powered by LibreTranslate API
- **🔄 Swap Languages** - Instantly swap source and target languages
- **📋 Character Counter** - Real-time character count with 5000-character limit
- **🎨 Multiple Tones** - Translate with Formal, Casual, or Professional tone
- **🔊 Text-to-Speech** - Listen to translations with native pronunciation
- **📋 Copy to Clipboard** - One-click copy functionality
- **🗑️ Clear Input** - Quick clear button to reset text

### Advanced Features
- **📚 Translation History** - View recent translations (local storage)
- **❤️ Favorites** - Save and manage favorite translations
- **🌙 Dark/Light Mode** - Toggle between themes with system preference detection
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile
- **♿ Accessible** - WCAG compliant with keyboard navigation




## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Translation API**: LibreTranslate (Free, Open-Source)
- **Storage**: Browser LocalStorage

## 📋 Project Structure

```
src/
├── app/                          # Next.js app directory
├── components/                   # Reusable React components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions & API calls
├── types/                        # TypeScript types
└── utils/                        # General utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn installed

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production
```bash
npm run build
npm run start
```

## 📚 Usage Guide

1. **Select Languages** - Choose source and target languages
2. **Enter Text** - Type or paste text (up to 5000 characters)
3. **Select Tone** - Choose translation tone (Formal/Casual/Professional)
4. **Translate** - Click Translate button
5. **Listen & Copy** - Use speaker icon and copy button

## 🔐 Security & Privacy

- ✅ No server-side storage of translations
- ✅ All data stays in browser
- ✅ No personal data collection
- ✅ Privacy-focused architecture

## 📈 Performance

- Page Load: < 2s
- Translation Time: 1-3s
- Bundle Size: ~150KB (gzipped)

## 🤝 Contributing

Contributions welcome! Please fork and submit a pull request.

## 📝 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

**MultiMian** - AI-Powered Translation Platform

---

**Made with ❤️ | Smarter. Speak Globally. 🌍**
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

