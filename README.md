# Productivity Dashboard V2

A modern full-stack productivity dashboard built with the MERN stack.

This project allows users to securely manage their daily tasks through a clean dashboard interface with authentication, personalized task management, dark mode support, and a responsive user experience.

> 🚧 Live Demo: Coming Soon

---

## ✨ Features

### 🔐 Authentication
- User Signup & Login
- JWT Authentication
- Password hashing with bcrypt
- Protected Routes
- Automatic Logout on Invalid Token

### ✅ Task Management
- Create Tasks
- Edit Tasks
- Delete Tasks
- Mark Tasks as Completed
- Search Tasks
- Filter Tasks (All / Completed / Pending)
- Reset All Tasks

### 🎨 User Experience
- Dark / Light Theme
- Responsive Layout
- Personalized Welcome Message
- Settings Page
- Modern Dashboard UI
- Clean Component Architecture

---

## 🛠 Tech Stack

### Frontend

- React
- React Router
- Context API
- Fetch API
- CSS

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt

### Database

- MongoDB Atlas
- Mongoose

---

## 📂 Project Structure

```
productivity-dashboard/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── config/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/aadi-devx97/productivity-dashboard
```

```bash
cd Productivity-dashboard
```

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

PORT=5000
```

Create a `.env` file inside the **frontend** folder.

```env
VITE_API_URL=http://localhost:5000
```

---

## ▶️ Running the Project

### Start Backend

```bash
cd backend
npm start
```

### Start Frontend

```bash
cd frontend
npm run dev
```

The application will be available at:

```
Frontend:
http://localhost:5173

Backend:
http://localhost:5000
```

---

## 🚀 Future Improvements

Planned features for upcoming versions:

- 📱 Fully Responsive Mobile Design
- 📅 Drag & Drop Task Management
- 📆 Calendar Integration
- 🔔 Task Reminders & Notifications
- 📊 Productivity Analytics Dashboard
- 🤖 AI-powered Task Suggestions
- 📁 Task Categories & Labels
- 📈 Weekly & Monthly Progress Reports
- ☁️ Docker Deployment
- 🌍 Multi-language Support

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome!

If you'd like to improve this project:

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

## 👨‍💻 Author

**Aadi Jain**

- GitHub: [aadi-devx97](https://github.com/aadi-devx97)
- LinkedIn: [Aadi Jain](https://www.linkedin.com/in/aadi-jain-a043782b8/)
---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future development.

---

## 🙏 Acknowledgements

Built as part of my Full-Stack + AI learning journey.

Special thanks to the open-source community and everyone whose resources helped make this project possible.