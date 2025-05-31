 # Bite-Sized Trading

A mobile-first trading education platform that transforms complex trading knowledge into engaging, TikTok-style microlearning content.

## Features

- 📚 AI-generated bite-sized trading lessons
- 📱 Mobile-first design with smooth animations
- 📖 PDF/EPUB processing and content extraction
- 🎯 Interactive quizzes and progress tracking
- 🔄 Real-time learning progress synchronization

## Tech Stack

- **Frontend**: React Native with TypeScript and Expo
- **Backend**: Node.js + Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **AI Integration**: OpenAI GPT-4 API
- **Styling**: NativeWind (Tailwind for React Native)
- **State Management**: Zustand
- **Authentication**: Clerk/JWT
- **Animations**: React Native Reanimated 3

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Expo CLI
- OpenAI API key

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bite-sized-trading.git
   cd bite-sized-trading
   ```

2. Install dependencies:
   ```bash
   npm run install:all
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both `mobile` and `backend` directories
   - Fill in required environment variables

4. Start development servers:
   ```bash
   npm run dev
   ```

## Project Structure
