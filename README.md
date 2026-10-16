## MERN Authentication

This project implements a secure authentication system using the MERN stack.
It provides user registration, login, logout, and JWT-based authentication.
Users can verify their email, reset or change their password, and manage their accounts securely.
Authentication is handled using secure cookies and protected API routes.

## Live Link : | https://mern-stack-authentication-project.vercel.app |

<img width="1916" height="863" alt="Screenshot 2026-10-17 011526" src="https://github.com/user-attachments/assets/95dd4752-5529-40b6-95b9-5a5862e2fe62" />

<img width="1893" height="835" alt="Screenshot 2026-10-17 012434" src="https://github.com/user-attachments/assets/0f0b5349-d3f3-4599-823d-a0916f786968" />

<img width="1905" height="831" alt="Screenshot 2026-10-17 013039" src="https://github.com/user-attachments/assets/a7d56bf1-e231-434d-ab22-baa6cae75eba" />

<img width="1906" height="831" alt="Screenshot 2026-10-17 013049" src="https://github.com/user-attachments/assets/bfaf8a58-7650-4221-a1d0-34b47cb8a1a4" />

<img width="1905" height="832" alt="Screenshot 2026-10-17 013159" src="https://github.com/user-attachments/assets/f36ad2fb-5cea-40b0-b4db-2f65db158370" />

<img width="1905" height="833" alt="Screenshot 2026-10-17 013241" src="https://github.com/user-attachments/assets/dbebc005-aaa6-45b8-8232-a2136358b987" />

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
