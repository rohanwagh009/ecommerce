# MERN JWT Authentication Application

This is a MERN stack application that implements JWT authentication. The application consists of a server built with Express and MongoDB, and a client built with React.

## Features

- User registration and login
- JWT-based authentication
- Protected routes for authenticated users
- User management functionalities

## Project Structure

```
mern-jwt-app
├── server
│   ├── src
│   │   ├── index.js               # Entry point for the server application
│   │   ├── app.js                 # Middleware, routes, and error handling setup
│   │   ├── controllers             # Contains authentication and user-related controllers
│   │   │   ├── authController.js   # Functions for user authentication
│   │   │   └── userController.js    # Functions for user-related operations
│   │   ├── models                  # Mongoose models
│   │   │   └── User.js            # User model definition
│   │   ├── routes                  # API routes
│   │   │   ├── auth.js            # Authentication routes
│   │   │   └── users.js           # User-related routes
│   │   ├── middleware              # Middleware functions
│   │   │   └── auth.js            # JWT authentication middleware
│   │   └── config                  # Configuration files
│   │       └── db.js              # Database connection setup
│   ├── package.json                # Server dependencies and scripts
│   └── .env.example                # Example environment variables for the server
├── client
│   ├── public
│   │   └── index.html             # Main HTML file for the React application
│   ├── src
│   │   ├── index.js               # Entry point for the React application
│   │   ├── App.js                 # Main App component
│   │   ├── api                    # API calls related to authentication
│   │   │   └── auth.js            # Functions for login and registration API calls
│   │   ├── components              # React components
│   │   │   ├── Login.js           # Login component
│   │   │   ├── Register.js        # Registration component
│   │   │   └── ProtectedRoute.js   # Component for protecting routes
│   │   ├── contexts                # Context API for managing authentication state
│   │   │   └── AuthContext.js     # Auth context definition
│   │   └── utils                  # Utility functions
│   │       └── token.js           # Functions for handling JWT tokens
│   ├── package.json                # Client dependencies and scripts
│   └── .env.example                # Example environment variables for the client
├── package.json                    # Overall project dependencies and scripts
├── .gitignore                      # Files and directories to ignore in version control
└── README.md                       # Project documentation
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mern-jwt-app
   ```

2. Install server dependencies:
   ```
   cd server
   npm install
   ```

3. Install client dependencies:
   ```
   cd client
   npm install
   ```

### Configuration

1. Create a `.env` file in the `server` directory based on the `.env.example` file.
2. Create a `.env` file in the `client` directory based on the `.env.example` file.

### Running the Application

1. Start the server:
   ```
   cd server
   npm start
   ```

2. Start the client:
   ```
   cd client
   npm start
   ```

The application should now be running on `http://localhost:3000` for the client and `http://localhost:5000` for the server.

## License

This project is licensed under the MIT License.