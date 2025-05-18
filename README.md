# 🏠 Airbnb Clone
The Airbnb Clone is a full-stack web application developed with a focus on clean architecture and scalability. It uses a Model-View-Controller (MVC) pattern and follows RESTful principles to separate concerns and organize code efficiently. It features CRUD operations, cloud-based image hosting, and secure authentication using Passport.js.


## 📖 Project Description
This Airbnb Clone is a full-stack web application designed to replicate the core functionalities of the Airbnb platform. Built using the MERN stack with server-side rendering via EJS, the application allows users to explore, list, and manage rental properties in a seamless and secure environment.  
The project emphasizes clean architecture through the MVC (Model-View-Controller) design pattern and adheres to RESTful API principles. It integrates robust user authentication, cloud-based image handling, and session management to ensure both functionality and user experience are aligned with modern web standards.  
From dynamic property listings to secure user interactions, this clone serves as a practical implementation of real-world web development concepts using JavaScript across the stack.

## ⚙️ Tech Stack

### 🖥️ Frontend
- **Templating Engine**: EJS (Embedded JavaScript)
- **CSS Framework**: Bootstrap 5

### 🧠 Backend
- **Runtime**: Node.js
- **Web Framework**: Express.js
- **Database**: MongoDB Atlas (via Mongoose)
- **Authentication**: Passport.js (Local Strategy)
- **Session Handling**: express-session
- **Data Validation**: Joi
- **Middleware**: Method-Override, Multer, Custom Error Handlers

### ☁️ Cloud & File Storage
- **Image Uploads**: Multer
- **Cloud Image Storage**: Cloudinary


## 🧱 Architecture

### 🗂️ MVC Pattern
- **Model**: MongoDB schemas for users, listings, and reviews defined using Mongoose.
- **View**: EJS templates rendered on the server, providing responsive and dynamic user interfaces.
- **Controller**: Modular controller files manage all business logic and route handling.

### 🔁 RESTful API Design
The backend is designed with REST principles, with cleanly separated concerns for:
- Creating, retrieving, updating, and deleting listings and reviews.
- Authentication workflows (register, login, logout).
- Handling form submissions and file uploads.


## 🛡️ Features
- 🔐 User registration and login with securely hashed passwords
- 🛎️ Session-based authentication using Passport.js
- 🏘️ Full CRUD functionality for managing property listings
- ☁️ Image upload with seamless Cloudinary integration
- 📝 Review system allowing users to leave feedback on listings
- 📢 Flash messages for user actions (e.g., login, logout, errors)
- 📱 Fully responsive, mobile-first UI built with Bootstrap 5
- ✅ Server-side input validation using Joi


## 📂 Folder Structure
```bash
├── controllers/       # Business logic for listings, users, and reviews
├── models/            # Mongoose schemas
├── routes/            # Route definitions grouped by resource
├── views/             # EJS templates
├── public/            # Static files (CSS, JS, images)
├── utils/             # Helper functions and middleware
├── app.js             # Main application entry point
└── .env               # Environment variables
```

## 📫 Contact
Muhammad Ismail  
📧 Email: [contact@ismailfaridi](mailto:contact@ismailfaridi)  
💼 GitHub: [github.com/ismailfaridi](https://github.com/ismailfaridi)  
🌐 LinkedIn: [linkedin.com/in/ismailfaridi](https://www.linkedin.com/in/ismailfaridi)
