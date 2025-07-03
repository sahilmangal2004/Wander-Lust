# Wander-Lust 🌍✨

A full-stack travel listing web application where users can explore, create, and manage travel destinations. Wander-Lust is built using the **MERN-style stack** (MongoDB, Express.js, Node.js) with **EJS templating** and a modular, RESTful backend.

## 🌐 Live Demo

🔗 [Visit App](https://wander-lust-jqo7.onrender.com/listings)

---

## 🛠️ Tech Stack

| Layer        | Technology                |
|--------------|---------------------------|
| Frontend     | HTML, CSS, EJS, Bootstrap |
| Backend      | Node.js, Express.js       |
| Database     | MongoDB, Mongoose         |
| Auth         | Passport.js (Local)       |
| File Storage | Cloudinary                |
| Deployment   | Render                    |

---

## 🔍 Features

- 🧾 **User authentication** (login/register with secure sessions)
- 🗺️ **Create, read, update, delete (CRUD)** listings with description, location & image
- ☁️ **Image uploads** with Cloudinary integration
- 🧭 **Searchable, responsive UI** using Bootstrap and EJS
- ❗ **Input validation** & custom error handling
- 🧱 **MVC structure** with middleware, routes, and RESTful API logic

---

## 📁 Folder Structure

```
wander-lust/
├── models/              # Mongoose schemas
├── routes/              # Express route files
├── public/              # Static assets (CSS, JS, images)
├── views/               # EJS templates
├── utils/               # Middleware, helpers
├── app.js               # Express server
├── .env                 # Environment variables
└── package.json
```

---

## 🚀 Getting Started

### 🧰 Prerequisites
- Node.js and npm
- MongoDB Atlas account
- Cloudinary account

### ⚙️ Environment Setup
Create a `.env` file in the root directory:

```env
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
DB_URL=mongodb+srv://...
SESSION_SECRET=your_session_key
```

### 🔧 Installation

```bash
git clone https://github.com/sahilmangal2004/Wander-Lust.git
cd Wander-Lust
npm install
npm start
```

Visit `http://localhost:3000` in your browser.

---

## ✨ Future Improvements

- ⭐ User favorites / bookmarks
- 🗨️ Review and rating system
- 🧭 Interactive map view
- 🔍 Advanced filtering (budget, type, location)
- 🧪 Unit & integration testing with Jest / Supertest
---

## 👤 Author

**Sahil Mangal**  
📍 [LinkedIn](https://www.linkedin.com/in/sahil-mangal-05752b257/)  
🌐 [GitHub](https://github.com/sahilmangal2004)

---

> Wander-Lust is a hands-on full-stack application built to showcase RESTful architecture, secure authentication, file storage, and dynamic UI rendering.
