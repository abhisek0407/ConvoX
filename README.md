# 💬 ConvoX - Real-Time Chat Application

ConvoX is a full-stack real-time chat application built using the MERN stack. It enables users to securely register, log in, search for other users, and exchange instant messages using Socket.IO. The application features JWT authentication, encrypted passwords, and a modern responsive interface.

---

## 🚀 Features

- 🔐 Secure User Authentication (JWT + HTTP-only Cookies)
- 👤 User Registration & Login
- 🔒 Password Hashing using bcryptjs
- 💬 Real-Time One-to-One Messaging
- ⚡ Instant Message Delivery using Socket.IO
- 🟢 Online User Status
- 🔍 Search Users
- 📱 Responsive User Interface
- 🎨 Modern Glassmorphism Design
- 🚪 Secure Logout
- 🌐 MongoDB Atlas Database
- 📦 Global State Management with Zustand

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- DaisyUI
- React Router DOM
- Axios
- Zustand
- Socket.IO Client
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.IO
- JWT Authentication
- bcryptjs
- Cookie Parser
- dotenv

---

# 📁 Project Structure

```text
REALTIMECHAT/
│
├── backend/
│   ├── DB/
│   ├── middleware/
│   ├── Models/
│   ├── routControllers/
│   ├── route/
│   ├── Socket/
│   ├── utils/
│   └── index.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── context/
│   │   ├── home/
│   │   ├── login/
│   │   ├── register/
│   │   ├── utils/
│   │   ├── Zustans/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── .env
├── package.json
├── package-lock.json
└── README.md
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/abhisek0407/ConvoX.git
cd ConvoX
```

---

## Install Dependencies

Install backend dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
MONGODB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_secret_key
SECURE=false
```

---

# ▶️ Run the Project

### Start Backend

```bash
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:5000
```

---

# 📸 Screenshots

Add screenshots of the following:

- Login Page
- Registration Page
- Chat Dashboard
- Real-Time Messaging
- Mobile Responsive View

---

# 🔐 Authentication

- JWT Authentication
- HTTP-only Cookies
- Password Encryption using bcryptjs
- Protected API Routes

---

# ⚡ Real-Time Communication

Socket.IO is used to provide:

- Instant messaging
- Online user tracking
- Live message updates
- Persistent socket connection

---

# 🌐 Deployment

The application is deployed using **Render**.

### Backend

- Node.js Web Service

### Frontend

- Static Site

### Database

- MongoDB Atlas

---

# 🚀 Future Improvements

- 👥 Group Chats
- 😊 Emoji Picker
- 📎 Image & File Sharing
- ✔️ Read Receipts
- ✍️ Typing Indicator
- 🎤 Voice Messages
- 📹 Video Calling
- 🌙 Dark / Light Theme
- 🔔 Push Notifications
- ❤️ Message Reactions

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Abhisek Panda**

- 🎓 B.Tech CSE (AI & ML), Odisha University of Technology and Research (OUTR)
- GitHub: https://github.com/abhisek0407
- LinkedIn: https://www.linkedin.com/in/abhisek-panda/

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.