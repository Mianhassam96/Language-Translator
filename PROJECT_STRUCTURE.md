# Project Structure

```
MianLingoTranslate/
├── 📄 package.json                 # Project dependencies & scripts
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 next.config.js              # Next.js configuration
├── 📄 tailwind.config.ts          # Tailwind CSS configuration
├── 📄 postcss.config.js           # PostCSS configuration
├── 📄 .eslintrc.json              # ESLint configuration
├── 📄 .env.local                  # Environment variables (local)
├── 📄 .gitignore                  # Git ignore rules
├── 📄 README.md                   # Project documentation
├── 📄 QUICKSTART.md               # 5-minute quick start guide
├── 📄 DEPLOYMENT.md               # Deployment & setup guide
├── 📄 CONTRIBUTING.md             # Contributing guidelines
├── 📄 LICENSE                     # MIT License
├── 📄 install.sh                  # Installation script (Unix)
├── 📄 install.bat                 # Installation script (Windows)
│
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📄 layout.tsx          # Root layout with metadata
│   │   ├── 📄 page.tsx            # Main translation page
│   │   ├── 📄 globals.css         # Global styles & utilities
│   │   └── 📁 api/                # API routes (future expansion)
│   │
│   ├── 📁 components/             # Reusable React components
│   │   ├── 📄 Header.tsx          # App header with theme toggle
│   │   ├── 📄 LanguagePairSelector.tsx  # Source/target language picker
│   │   ├── 📄 LanguageSelector.tsx      # Dropdown language selector
│   │   ├── 📄 TranslationInput.tsx      # Input textarea with controls
│   │   ├── 📄 TranslationOutput.tsx     # Output display with controls
│   │   ├── 📄 ToneSelector.tsx    # Formal/Casual/Professional selector
│   │   ├── 📄 CharacterCounter.tsx      # Character count progress
│   │   └── 📄 Providers.tsx       # Client-side providers & setup
│   │
│   ├── 📁 hooks/                  # Custom React hooks
│   │   ├── 📄 useTheme.ts         # Dark/light mode management
│   │   └── 📄 useTranslation.ts   # Translation API logic
│   │
│   ├── 📁 lib/                    # Utility functions & helpers
│   │   ├── 📄 api.ts              # API calls to LibreTranslate
│   │   ├── 📄 constants.ts        # Languages, tones, limits
│   │   └── 📄 storage.ts          # LocalStorage utilities
│   │
│   ├── 📁 types/                  # TypeScript type definitions
│   │   └── 📄 index.ts            # Core types & interfaces
│   │
│   └── 📁 utils/                  # General utility functions
│       └── 📄 (future utilities)
│
├── 📁 public/                     # Static assets
│   ├── 📄 favicon.ico             # Website favicon
│   ├── 📄 robots.txt              # SEO robots file
│   └── 📄 (other static assets)
│
└── 📁 .next/                      # Next.js build output (generated)
```

## 📊 Component Hierarchy

```
App (page.tsx)
├── Header
│   ├── Logo & Brand
│   └── Theme Toggle + Links
│
└── Main Container
    ├── Hero Section
    │
    ├── Main Content (2 columns on desktop)
    │   ├── LanguagePairSelector
    │   │   ├── LanguageSelector (Source)
    │   │   ├── Swap Button
    │   │   └── LanguageSelector (Target)
    │   │
    │   ├── ToneSelector
    │   │   ├── Formal Button
    │   │   ├── Casual Button
    │   │   └── Professional Button
    │   │
    │   ├── Translation Grid (2 columns)
    │   │   ├── TranslationInput
    │   │   │   ├── Textarea
    │   │   │   ├── CharacterCounter
    │   │   │   └── Action Buttons (Copy, Speak, Clear)
    │   │   │
    │   │   └── TranslationOutput
    │   │       ├── Output Display
    │   │       └── Action Buttons (Copy, Speak)
    │   │
    │   └── Translate Button
    │
    └── Sidebar (1 column on desktop)
        ├── Quick Actions
        │   ├── History Button
        │   └── Favorites Button
        │
        └── Features List
```

## 🔄 Data Flow

```
User Input → TranslationInput (Component)
    ↓
onChange Handler → State Update
    ↓
Character Counter Update → Display
    ↓
User Clicks "Translate" → handleTranslate()
    ↓
useTranslation Hook → API Call
    ↓
LibreTranslate API → Translation Result
    ↓
TranslationOutput (Component) → Display Result
    ↓
Save to History → LocalStorage
```

## 🎯 Key Files Explained

### `app/page.tsx`
Main page component with:
- State management (input, output, languages, tone)
- Translation logic
- UI composition

### `lib/api.ts`
API integration:
- `translateText()` - Main translation function
- `detectLanguage()` - Auto-detection
- Error handling & fallbacks

### `lib/constants.ts`
Configuration:
- `SUPPORTED_LANGUAGES` - 50+ languages with flags
- `TONE_OPTIONS` - Translation tones
- `MAX_CHARACTER_LIMIT` - Input limit

### `lib/storage.ts`
LocalStorage management:
- History saving/loading
- Favorites management
- Theme persistence

### `app/globals.css`
Global styles:
- Tailwind directives
- Custom utilities
- Animation definitions

## 📦 Dependencies

```json
{
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "next": "14.0.0",
  "lucide-react": "0.292.0",
  "typescript": "5.3.0",
  "tailwindcss": "3.3.0"
}
```

## 🗂️ File Naming Conventions

- **Components**: PascalCase (e.g., `Header.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useTheme.ts`)
- **Utilities**: camelCase (e.g., `api.ts`)
- **Types**: PascalCase with `d.ts` or in `types/` (e.g., `index.ts`)

## 📝 Important Notes

1. **All components are client-side** (`'use client'` directive)
2. **Styling**: Primarily Tailwind CSS with custom utilities
3. **API**: Uses LibreTranslate (free) by default
4. **Storage**: Browser LocalStorage for history/favorites
5. **Theme**: System preference detection with manual override

---

**Last Updated**: January 2024
