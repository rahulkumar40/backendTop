# Modern Blog App (MERN Stack)

> A full-featured Modern Blog Application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

> This project demonstrates real-world full-stack development, secure authentication, content management, and scalable backend architecture.

## The platform allows users to:

- Register and log in securely
- Manage profiles
- Create, edit, and delete blog posts
- Like, comment, and favorite blogs

---

# 📸 Application Preview

> The following screenshots demonstrate the core features and user experience of the Modern MERN Blog Application.

---

# 🏠 Home Page

![alt text](/screenshotPhoto/image.png)

> The home page provides a clean and modern interface where users can explore recent blog posts, trending content, and featured authors.<br>
> It acts as the central hub of the platform, helping users quickly discover engaging articles.

---

# 🔐 Login & Signup

![alt text](/screenshotPhoto/image-1.png)

> The authentication system allows users to securely register and log in.<br>
> It includes password hashing, JWT-based authentication, and form validation to ensure secure access and a smooth user experience.

---

# 📝 Blog Editor

![alt text](/screenshotPhoto/image-2.png)

---

> The blog editor enables users to create and publish posts.<br>
> Users can write content, edit existing blogs, and manage their posts through a simple and intuitive interface.

---

📚 Blog Listing Page

![alt text](/screenshotPhoto/image-3.png)

> The blog listing page displays all available posts in a structured layout.<br>
> Users can browse blogs, open detailed views, like posts, and interact through comments.

---

# 🚀 Features

## 🔐 Authentication & Security

> A complete authentication system built with **JWT and bcrypt** to ensure secure user access.

- **User Registration:** New users can create an account with secure password hashing.
- **Login & Logout:** Authenticated sessions using JWT tokens.
- **Password Encryption:** All passwords are hashed using bcrypt before storage.
- **Forgot Password Flow:** Secure token-based password reset system.
- **Protected Routes:** Only authenticated users can access private features.
- **Token Validation:** Middleware ensures only valid sessions can perform actions.

---

## 👤 User Profile Management

> Each user has a personalized profile that stores their information and activity.

- Update personal details and profile information.
- Add bio and social media links.
- Upload and change profile picture.
- View personal blogs and interactions.
- Secure profile editing through authenticated APIs.

---

## 📰 Blog Content Management

> A complete CRUD-based blog system allowing users to manage their content.

- Create new blog posts.
- Edit existing posts (author-only access).
- Delete own blog posts securely.
- View all blogs from different users.
- Save blogs to a personal **Favorites** list.

**Authorization Logic:**

> Only the original author can edit or delete their posts, ensuring proper access control.

---

## 💬 Social Interaction System

> Features that allow users to engage with content and other users.

- Like or dislike blog posts.
- Comment on blogs.
- Prevent duplicate likes or dislikes from the same user.
- Real-time UI updates after interactions.

> This system demonstrates handling **user actions, relationships, and database updates** efficiently.

---

## 🧠 Backend Logic & Architecture

> The backend is designed with a clean, scalable structure.

- Layered architecture:

  - Config
  - Controller
  - Middlewares
  - Model
  - Public
  - Router
    \*Utils

- Centralized error handling.
- Input validation for secure APIs.
- Ownership checks for protected actions.

---

# 🛠️ Tech Stack

> ## Frontend

- React.js – Component-based UI development
- React Router – Client-side routing and navigation

- Axios – API communication with the backend

- Context API / Redux – Global state management (authentication, user data, etc.)

> ## Backend

- Node.js – JavaScript runtime for server-side development

- Express.js – Lightweight backend framework for building REST APIs

- MongoDB – NoSQL database for storing application data

- Mongoose – ODM for MongoDB to manage schemas and data models

- Security & Authentication

- JWT (JSON Web Token) – Secure user authentication and authorization

- bcrypt – Password hashing for secure credential storage

- Protected Routes – Restrict access to authenticated users only

- Ownership Validation – Ensure users can only modify their own content

# 🧱 Project Architecture

## Backend Structure

backend/<br>
│<br>
├── routes/<br>
├── controllers/<br>
├── services/<br>
├── models/<br>
├── middleware/<br>
└── config/<br>

---

# 📁 Frontend Architecture

client/<br>
│
├── public/ <br>
├── src/ <br>
│ ├── app/ <br>
│ ├── assets/ <br>
│ ├── component/  
│ ├── context/ state<br>
│ ├── feature/ <br>
│ ├── pages/ <br>
│ ├── App.jsx <br>
│ ├── App.css <br>
│ ├── index.css <br>
│ └── main.jsx <br>
├── .gitignore<br>
├── eslint.config.js<br>
├── index.html<br>
├── package.json<br>
├── package-lock.json<br>
├── README.md<br>
└── vite.config.js<br>

---

# ⚙️ Installation & Setup

> Follow the steps below to run the project locally.

## 1️⃣ Clone the Repository

- git clone https://github.com/your-username/blog-app.git
  cd blog-app

# 2️⃣ Backend Setup

- cd server
- npm install

### Create a .env file in the backend directory:

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret_key

### Run the backend server:

- npm run dev

# 3️⃣ Frontend Setup

> Open a new terminal and run:

- cd client
- npm install
- npm run dev
  Yeh section **proper Markdown table format** me convert kiya gaya hai, taaki GitHub README me perfectly render ho.
  Aap isko **direct copy-paste** kar sakte ho.

---

## 🔑 Environment Variables

| Variable   | Description                    |
| ---------- | ------------------------------ |
| MONGO_URI  | MongoDB connection string      |
| JWT_SECRET | Secret key used for JWT tokens |
| PORT       | Backend server port            |

---

## 📌 API Highlights

### 🔐 Authentication Routes

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| POST   | `/api/auth/register`        | Register new user      |
| POST   | `/api/auth/login`           | User login             |
| POST   | `/api/auth/forgot-password` | Request password reset |
| POST   | `/api/auth/reset-password`  | Reset password         |

---

### 📝 Blog Routes

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | `/api/blogs`     | Get all blogs   |
| POST   | `/api/blogs`     | Create new blog |
| PUT    | `/api/blogs/:id` | Update a blog   |
| DELETE | `/api/blogs/:id` | Delete a blog   |

---

### 👤 User Routes

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| GET    | `/api/users/profile` | Get user profile    |
| PUT    | `/api/users/profile` | Update user profile |

---

## 🔮 Future Improvements

- Rich text editor for blog creation
- AI-powered content suggestions
- Smart blog recommendations
- Notification system
- Advanced comment interface

---

## 📚 What I Learned

- Full-stack MERN application architecture
- JWT-based authentication workflows
- Secure password hashing with bcrypt
- RESTful API design and middleware
- Database schema design with MongoDB
- Permission-based access control



## 👨‍💻 Author

**Rahul Kumar**
Full Stack Developer (MERN Stack)

---

