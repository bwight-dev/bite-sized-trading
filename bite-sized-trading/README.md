# Bite-Sized Trading App

## Overview
The Bite-Sized Trading app is a mobile application built with React Native for the frontend and Node.js for the backend. This project aims to provide a seamless trading experience for users, allowing them to manage their portfolios, execute trades, and authenticate securely.

## Project Structure
The project is organized into two main directories: `frontend` and `backend`.

### Frontend
The frontend is built using React Native and follows a modular structure:

- **src/assets**: Contains font and image files used in the application.
- **src/components**: Contains reusable components.
  - **common**: Common components used throughout the application.
  - **trading**: Trading-specific components.
- **src/screens**: Contains the main screens of the application.
  - **Home**: The home screen component.
  - **Login**: The login screen component.
  - **Portfolio**: The portfolio management screen component.
  - **Trade**: The trade execution screen component.
- **src/navigation**: Sets up the navigation for the application.
- **src/services**: Contains API and authentication service functions.
- **src/store**: Contains Redux store setup, actions, and reducers.
- **src/utils**: Contains utility functions.
- **src/types**: Contains TypeScript types and interfaces.

### Backend
The backend is built using Node.js and follows a structured approach:

- **src/api**: Contains the API logic.
  - **controllers**: Handles requests and responses.
  - **middlewares**: Contains middleware functions for authentication and error handling.
  - **routes**: Sets up API routes for authentication and trading.
- **src/config**: Contains configuration settings for the backend.
- **src/models**: Defines data models for the application.
- **src/services**: Contains business logic for authentication and trading.
- **src/utils**: Contains utility functions.
- **src/types**: Contains TypeScript types and interfaces.
- **server.ts**: The entry point for the backend server.

## Getting Started
To get started with the Bite-Sized Trading app, follow these steps:

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd bite-sized-trading
   ```

2. **Install dependencies**:
   - For the frontend:
     ```
     cd frontend
     npm install
     ```
   - For the backend:
     ```
     cd backend
     npm install
     ```

3. **Run the application**:
   - Start the backend server:
     ```
     cd backend
     npm start
     ```
   - Start the frontend application:
     ```
     cd frontend
     npm start
     ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.