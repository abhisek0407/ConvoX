# RealTimeChat 💬

A full-stack real-time chat application built with **Node.js, Express, MongoDB** on the backend and **React (Vite) + Tailwind CSS** on the frontend. Users can register, log in, search for other users, and exchange messages within persistent conversations.

---

## 🚀 Features

- **Authentication** — Secure register/login/logout flow using JWT stored in HTTP-only cookies
- **Password hashing** — User passwords encrypted with bcrypt before storage
- **Protected routes** — Custom middleware validates JWT on every protected API call
- **User search** — Search for other registered users by username or full name
- **Conversations** — Automatically creates or reuses a conversation between two users
- **Messaging** — Send and retrieve messages tied to a conversation
- **Current chatters** — Fetch the list of users you've previously messaged
- **Gender-based avatars** — Auto-assigned profile picture based on gender if none is provided

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- cookie-parser for cookie-based session handling
- dotenv for environment configuration

---

## 📁 Project Structure

```
RealTimeChat/
├── backend/
│   ├── DB/
│   │   └── dbConnect.js
│   ├── middleware/
│   │   └── isLogin.js
│   ├── Models/
│   │   ├── conversationModels.js
│   │   ├── messageSchema.js
│   │   └── userModels.js
│   ├── routControlers/
│   │   ├── messageroutControler.js
│   │   ├── userHandlerControler.js
│   │   └── userroutControler.js
│   ├── route/
│   │   ├── authUser.js
│   │   ├── messageRout.js
│   │   └── userRout.js
│   ├── utils/
│   │   └── jwtwebToken.js
│   ├── .env
│   └── index.js
└── frontend/
    ├── src/
    ├── public/
    ├── index.html
    └── vite.config.js
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB (local instance or MongoDB Atlas connection string)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/RealTimeChat.git
cd RealTimeChat
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=3000
MONGODB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SECURE=development
```

Run the backend server:

```bash
npm run dev
```

The server will start at `http://localhost:3000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at `http://localhost:5173` (default Vite port).

---

## 🔑 API Endpoints

### Auth Routes — `/api/auth`
| Method | Endpoint    | Description         |
|--------|-------------|----------------------|
| POST   | `/register` | Register a new user  |
| POST   | `/login`    | Log in a user        |
| POST   | `/logout`   | Log out current user |

### User Routes — `/api/user` *(protected)*
| Method | Endpoint            | Description                          |
|--------|----------------------|---------------------------------------|
| GET    | `/search?search=`   | Search users by username/fullname     |
| GET    | `/currentchatters`  | Get list of users you've chatted with |

### Message Routes — `/api/message` *(protected)*
| Method | Endpoint      | Description                          |
|--------|---------------|----------------------------------------|
| POST   | `/send/:id`   | Send a message to a user (`:id`)      |
| GET    | `/:id`        | Get all messages with a user (`:id`)  |

> All protected routes require a valid `jwt` cookie set via login/register.

---

## 🔒 Authentication Flow

1. On register/login, the server signs a JWT containing the user's ID and sets it as an **HTTP-only cookie**.
2. Every protected request passes through the `isLogin` middleware, which:
   - Reads the `jwt` cookie
   - Verifies it using `JWT_SECRET`
   - Fetches the corresponding user and attaches it to `req.user`
3. Logout clears the cookie by resetting its `maxAge` to `0`.

---

## 📸 Screenshots

*(Add screenshots of your login page, chat interface, etc. here)*

---

## 🧩 Future Improvements

- Real-time messaging with Socket.IO
- Typing indicators & online/offline status
- Message read receipts
- Image/file sharing in chat
- Push notifications

---

## 👤 Author

**Abhisek**
- Building full-stack and AI-powered applications
- [LinkedIn](#) · [GitHub](#)

---

## 📄 License

This project is licensed under the MIT License.
