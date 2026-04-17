#  Node.js Backend Setup Guide

## Project Overview
This project is a Node.js-based backend API for a social media system. It provides features like post creation, likes, comments, and feed management.

---

## 🛠️ Tech Stack

- Node.js (v24)
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- Postman (for API testing)

---

## Getting Started

### 1. Prerequisites

Make sure you have installed:

- Node.js v24 or above
- npm or yarn
- MongoDB Atlas account
- Git

Check Node version:
```bash
node -v
```

---

### 2. Clone the Repository

```bash
git clone https://github.com/techCodeSB/Parenting-Community-Wall-Server.git
cd Parenting-Community-Wall-Server
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
```

#### Without SRV (optional)
```env
MONGO_URI=mongodb://127.0.0.1:27017/your_db_name
```

---

### 5. Run the Server

#### Development
```bash
node index.js
```

#### Production
```bash
node index.js
```

---

##  Project Structure

```
src/
│
├── models/         # Mongoose schemas
├── controllers/    # Business logic
├── routes/         # API routes
├── middlewares/    # Custom middleware
├── db/             # DB connection
├── utils/          # Helpers / constants
└── app.js          # Express app setup
```

---

## API Endpoints

###  Posts

- `GET /posts` → Get all posts (pagination supported)
- `POST /posts` → Create a new post

### ❤️ Likes

- `POST /like`  
  Request Body:
```json
{
  "postId": "POST_ID",
  "like": 1   // +1 (like) or -1 (unlike)
}
```

### 💬 Comments

- `POST /comment`  
  Request Body:
```json
{
  "postId": "POST_ID",
  "comment": "Nice post!"
}
```

---

## 🗄️ Database Schema (Example)

```js
const postSchema = new mongoose.Schema({
  author: String,
  msg: String,
  like: Number,
  comments: Array
}, { timestamps: true });
```

---

## ⚙️ Key Features

- RESTful API design  
- Like / Unlike system  
- Comment system  
- Pagination support  
- Modular MVC architecture  

---

## 🐛 Common Issues & Fixes

### ❌ MongoDB Atlas not connecting
✔ Check:
- IP whitelist (Network Access → Allow from anywhere)
- Correct username/password
- Database name in URI

---

### ❌ Port already in use
```bash
npx kill-port 3000
```

---

### ❌ Environment variables not loading
✔ Make sure:
```js
require('dotenv').config();
```

---

## 🧪 Testing API

Use Postman or any API client.

Example:
```
GET http://localhost:3000/posts?page=1&limit=10
```

---

## 📦 Deployment

You can deploy using:
- Render
- Railway
- AWS
- VPS

---

## 📄 License

This project is licensed under the MIT License.
