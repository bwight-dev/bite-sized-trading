 # Bite-Sized Trading

A comprehensive trading education platform built with React Native and Node.js, designed to help users learn trading concepts through bite-sized, digestible lessons.

## Project Structure

```
bite-sized-trading/
├── mobile/              # React Native Expo app
├── backend/             # Node.js Express API
├── shared/              # Shared TypeScript types
```

### Components

- **Mobile App**: React Native application built with Expo, providing the user interface and learning experience
- **Backend API**: Node.js Express server handling data management and business logic
- **Shared Types**: Common TypeScript type definitions used across the project

## Getting Started

This project uses a monorepo structure with npm workspaces. To get started:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development servers:
   ```bash
   # Start the backend server
   npm run dev:backend

   # Start the mobile app
   npm run dev:mobile
   ```

## Development

- Mobile app development requires Expo CLI
- Backend development requires Node.js
- TypeScript is used throughout the project for type safety

## License

MIT