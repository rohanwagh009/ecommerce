# MERN-JWT-APP Project Structure

## Overview

This is a full-stack MERN (MongoDB, Express, React, Node.js) application with JWT authentication for secure user authentication and product management.

---

## Directory Tree

```
mern-jwt-app/
├── .git/                          # Git repository
├── .gitignore                     # Git ignore file
├── package.json                   # Root dependencies (if any)
├── package-lock.json              # Locked dependencies
├── README.md                       # Project documentation
│
├── client/                         # React Frontend Application
│   ├── .env                        # Environment variables (API URLs, etc.)
│   ├── node_modules/              # Client dependencies
│   ├── package.json                # Client dependencies list
│   ├── package-lock.json           # Locked client dependencies
│   │
│   ├── public/                     # Static files served by React
│   │   └── index.html              # Main HTML file
│   │
│   └── src/                        # React source code
│       ├── index.js                # React app entry point
│       ├── App.js                  # Main App component
│       │
│       ├── api/                    # API service layer
│       │   ├── auth.js             # Authentication API calls
│       │   └── products.js         # Products API calls
│       │
│       ├── components/             # React components
│       │   ├── Home.js             # Home page component
│       │   ├── Login.js            # Login form component
│       │   ├── Register.js         # Registration form component
│       │   └── ProtectedRoute.js   # Protected route wrapper
│       │
│       ├── contexts/               # React context API
│       │   └── AuthContext.js      # Authentication context (user state)
│       │
│       └── utils/                  # Utility functions
│           └── token.js            # JWT token handling utilities
│
└── server/                         # Node.js/Express Backend Application
    ├── .env                        # Environment variables (DB URL, JWT secret, etc.)
    ├── node_modules/               # Server dependencies
    ├── package.json                # Server dependencies list
    ├── package-lock.json           # Locked server dependencies
    ├── server.js                   # Server entry point (Express setup)
    ├── seeder.js                   # Database seeding script
    │
    └── src/                        # Server source code
        ├── index.js                # Server initialization
        ├── app.js                  # Express app configuration
        │
        ├── config/                 # Configuration files
        │   └── db.js               # MongoDB connection setup
        │
        ├── models/                 # MongoDB Mongoose models
        │   ├── User.js             # User schema and model
        │   └── Product.js          # Product schema and model
        │
        ├── controllers/            # Business logic layer
        │   ├── authController.js   # Authentication logic (login, register, etc.)
        │   └── userController.js   # User management logic
        │
        ├── middleware/             # Express middleware
        │   └── auth.js             # JWT authentication middleware
        │
        └── routes/                 # API route definitions
            ├── auth.js             # Authentication routes (/api/auth)
            ├── users.js            # User routes (/api/users)
            └── products.js         # Product routes (/api/products)
```

---

## Functionality Summary

### Client (React)

- **Authentication**: Login/Register with JWT
- **Protected Routes**: Routes accessible only to authenticated users
- **Context API**: Global state management for user authentication
- **API Integration**: Communicates with backend via REST API

### Server (Node.js/Express)

- **Authentication**: JWT-based user authentication
- **Database**: MongoDB with Mongoose models
- **API Routes**: RESTful API endpoints for auth, users, and products
- **Middleware**: JWT verification for protected routes
- **Database Seeding**: Script to populate initial data

---

## Key Features

- ✅ User Registration & Login with JWT
- ✅ Protected Routes/Endpoints
- ✅ Product Management
- ✅ User Profile Management
- ✅ Secure token storage and validation
- ✅ MongoDB database integration

---

## Environment Setup

Each section (client/server) has its own `.env` file for configuration:

- **Client**: API base URL
- **Server**: MongoDB connection string, JWT secret key, port settings
