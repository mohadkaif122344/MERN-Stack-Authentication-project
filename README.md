## MERN Authentication

This project implements a secure authentication system using the MERN stack.
It provides user registration, login, logout, and JWT-based authentication.
Users can verify their email, reset or change their password, and manage their accounts securely.
Authentication is handled using secure cookies and protected API routes.

## Features

- User Signup and Login
- JWT Authentication
- Email Verification
- Forgot Password
- Change Password
- Profile Management
- Profile Image Upload
- Update Name, Email and Bio
- Notifications
- Delete Notifications
- Dark and Light Mode
- Delete Account

  
## Screenshot




## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cloudinary
- Nodemailer

## Project Structure

```text
MyApp/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

## Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm start
```

## Environment Variables

Create a `.env` file in both the frontend and backend folders.

Do not upload `.env` files or secret keys to GitHub.

### Frontend

```env
VITE_BACKEND_URL=your_backend_url
```

### Backend

Add your MongoDB, JWT, Cloudinary and frontend URL configuration to the backend `.env`.

### Author

**Mohad Kaif**
