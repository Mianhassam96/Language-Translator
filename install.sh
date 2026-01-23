#!/bin/bash

# MianLingoTranslate Installation Script
# This script automates the setup of the project

echo "🌐 MianLingoTranslate - Installation Script"
echo "==========================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✓ Node.js $NODE_VERSION found"
echo ""

# Check npm
echo "✓ Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✓ npm $NPM_VERSION found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✓ Dependencies installed"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local..."
    cat > .env.local << EOF
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_TRANSLATION_API=libre
TRANSLATION_API_KEY=
EOF
    echo "✓ .env.local created"
else
    echo "✓ .env.local already exists"
fi
echo ""

# Build project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi
echo "✓ Build successful"
echo ""

echo "==========================================="
echo "✅ Installation Complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Run development server: npm run dev"
echo "   2. Open http://localhost:3000 in your browser"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Project overview and features"
echo "   - DEPLOYMENT.md - Deployment instructions"
echo "   - CONTRIBUTING.md - Contributing guidelines"
echo ""
echo "🚀 Ready to use MianLingoTranslate!"
