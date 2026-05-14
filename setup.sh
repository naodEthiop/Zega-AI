#!/bin/bash

# Zega AI Admin Dashboard - Quick Start Script
# This script sets up the development environment for local development

set -e

echo "🚀 Zega AI Admin Dashboard - Quick Start Setup"
echo "=============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 not found. Please install Python 3.10+${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Python $(python3 --version | cut -d' ' -f2)${NC}"

# Check Node
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node 18+${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node $(node --version)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found. Please install npm${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm --version)${NC}"

echo ""
echo "🔧 Setting up Backend..."
echo "------------------------"

# Backend setup
cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
else
    echo "Virtual environment already exists"
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -q -r requirements.txt

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please update backend/.env with your Supabase credentials${NC}"
else
    echo -e "${GREEN}✅ .env file exists${NC}"
fi

cd ..

echo ""
echo "📦 Setting up Frontend..."
echo "------------------------"

cd frontend

# Install dependencies
echo "Installing npm dependencies..."
npm install -q

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo -e "${GREEN}✅ Frontend .env created${NC}"
else
    echo -e "${GREEN}✅ .env file exists${NC}"
fi

cd ..

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "📝 Next Steps:"
echo "1. Update credentials in backend/.env"
echo "2. Set up Supabase project and run migrations"
echo "3. Start backend: cd backend && source venv/bin/activate && python -m uvicorn main:app --reload"
echo "4. Start frontend: cd frontend && npm run dev"
echo "5. Open http://localhost:5173 in your browser"
echo ""
echo "📚 Documentation:"
echo "- Setup Guide: SETUP_GUIDE.md"
echo "- Quick Start: README_NEW.md"
echo "- API Docs: http://localhost:8000/docs"
echo ""
