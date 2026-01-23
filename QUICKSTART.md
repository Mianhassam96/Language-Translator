# 🚀 Quick Start Guide

## Get Started in 5 Minutes

### Step 1: Prerequisites
- Install [Node.js 18+](https://nodejs.org/)
- Install a code editor (VS Code recommended)

### Step 2: Install Dependencies

**Windows:**
```bash
npm install
```

**macOS/Linux:**
```bash
npm install
```

Or use the installation script:
- **Windows**: Double-click `install.bat`
- **macOS/Linux**: Run `bash install.sh`

### Step 3: Start Development Server

```bash
npm run dev
```

### Step 4: Open in Browser

Navigate to: **http://localhost:3000**

### Step 5: Start Translating! 🎉

1. Select source language (or auto-detect)
2. Select target language
3. Enter text to translate
4. Choose tone (Formal/Casual/Professional)
5. Click **Translate**

## ⚙️ Configuration

The app works out of the box with LibreTranslate (free).

To use a custom API:
1. Edit `.env.local`
2. Set your API credentials
3. Restart the dev server

## 📚 Useful Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🎯 Features Overview

- **50+ Languages** - Translate between major world languages
- **Multiple Tones** - Formal, Casual, Professional translations
- **Text-to-Speech** - Listen to translations
- **Dark Mode** - Easy on the eyes
- **Responsive** - Works on mobile, tablet, desktop
- **History & Favorites** - Save your translations
- **No Sign-up** - Start translating immediately

## 🔗 Important Links

- 📖 [Full Documentation](./README.md)
- 🚀 [Deployment Guide](./DEPLOYMENT.md)
- 🤝 [Contributing](./CONTRIBUTING.md)
- 📝 [License](./LICENSE)

## 💡 Tips

- **Auto-Detect**: Leave source language as "Auto" to detect automatically
- **Keyboard Shortcut**: Use `Ctrl+Enter` to translate (web only)
- **Copy**: Click copy icon to copy translation
- **Listen**: Click speaker icon to hear pronunciation
- **Dark Mode**: Toggle theme in header

## ❓ Troubleshooting

### Port Already in Use
If port 3000 is in use:
```bash
npm run dev -- -p 3001
```

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### API Not Working
- Check internet connection
- Ensure `.env.local` is configured
- Try refreshing the page

## 📞 Need Help?

- Check [README.md](./README.md) for detailed documentation
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
- Open an issue on GitHub

---

**Congratulations!** 🎉 You're now ready to use MianLingoTranslate!

**Smarter. Speak Globally. 🌍**
