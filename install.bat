@echo off
REM MianLingoTranslate Installation Script for Windows

echo.
echo 🌐 MianLingoTranslate - Installation Script (Windows)
echo ==================================================
echo.

REM Check Node.js
echo ✓ Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

echo ✓ Node.js found: 
node --version
echo.

REM Check npm
echo ✓ Checking npm installation...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed
    pause
    exit /b 1
)

echo ✓ npm found: 
npm --version
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

REM Create .env.local if it doesn't exist
if not exist .env.local (
    echo 📝 Creating .env.local...
    (
        echo NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
        echo NEXT_PUBLIC_TRANSLATION_API=libre
        echo TRANSLATION_API_KEY=
    ) > .env.local
    echo ✓ .env.local created
) else (
    echo ✓ .env.local already exists
)
echo.

REM Build project
echo 🔨 Building project...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed
    pause
    exit /b 1
)
echo ✓ Build successful
echo.

echo ==================================================
echo ✅ Installation Complete!
echo.
echo 📋 Next steps:
echo    1. Run development server: npm run dev
echo    2. Open http://localhost:3000 in your browser
echo.
echo 📚 Documentation:
echo    - README.md - Project overview and features
echo    - DEPLOYMENT.md - Deployment instructions
echo    - CONTRIBUTING.md - Contributing guidelines
echo.
echo 🚀 Ready to use MianLingoTranslate!
echo.
pause
