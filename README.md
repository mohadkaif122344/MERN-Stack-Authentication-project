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

<img width="1910" height="818" alt="Screenshot 2026-09-16 165212" src="https://github.com/user-attachments/assets/0d6719ce-ba69-45c4-b006-99612013a0f0" />
<img width="1907" height="847" alt="Screenshot 2026-09-16 165251" src="https://github.com/user-attachments/assets/1e45191c-216f-49fd-84af-afeb3a44fc9a" />
<img width="1910" height="831" alt="Screenshot 2026-09-16 165302" src="https://github.com/user-attachments/assets/9a4af94d-ac50-48dd-8152-60210d91ecbc" />
<img width="1910" height="837" alt="Screenshot 2026-09-16 165313" src="https://github.com/user-attachments/assets/748ab6d6-7cfa-44a5-97cb-9b07b105b51e" />
<img width="1912" height="832" alt="Screenshot 2026-09-16 165346" src="https://github.com/user-attachments/assets/139cca63-f9fe-47da-89a5-9df2981c287d" />
<img width="1907" height="836" alt="Screenshot 2026-09-16 165437" src="https://github.com/user-attachments/assets/952b6df7-d3da-43d2-9c98-b81b3f5bb079" />
<img width="1898" height="835" alt="Screenshot 2026-09-16 165453" src="https://github.com/user-attachments/assets/6c99733f-690e-4223-9e2f-fccc5050f987" />
<img width="1917" height="821" alt="Screenshot 2026-09-16 165520" src="https://github.com/user-attachments/assets/e33b4720-dda7-4820-80fa-d88756e1cb67" />
<img width="1903" height="827" alt="Screenshot 2026-09-16 165533" src="https://github.com/user-attachments/assets/230fd61e-9f3f-4e4a-989e-87fddebe28f4" />




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
