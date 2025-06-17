Thanks! Since the `forgetPasswordPage` also includes password **reset functionality** (not just sending the reset link), I’ve updated the `README.md` to reflect that.

Here’s the revised and more accurate version:

---

```markdown
# 💻 DevsCorner – Frontend

**DevsCorner** is a web application that empowers developers to showcase their profiles and connect with potential employers. This is the **frontend** of the project, built with modern web technologies and fully integrated with the backend.

---

## 🔧 Tech Stack

- **React.js**
- **Tailwind CSS / Farmer Motion**
- **Axios** – for HTTP requests
- **React Router DOM** – for routing
- **Zod** – for client-side schema validation (if used)
- **Dotenv** – for environment variable management

---

## ✅ Completed Pages

### 1. 🔐 Signup Page
- **Functionality:** Register a new user account.
- **Fields:** `userName`, `email`, `password`, `fullName`
- **Validations:**
  - `userName`: Alphanumeric, underscores allowed
  - `password`: Strong password enforcement (e.g., 8+ characters, uppercase, lowercase, number, special character)
- **Backend Connected:** ✅

---

### 2. 🔑 Login Page
- **Functionality:** Authenticate existing users.
- **Fields:** `email`, `password`
- **Backend Connected:** ✅

---

### 3. 🔁 Forgot Password & Reset Page
- **Functionality:**
  - Step 1: User requests a password reset by providing their email.
  - Step 2: User receives a link with a token (handled on the backend).
  - Step 3: User accesses the reset page from the link and sets a new password.
- **Fields:**
  - Request Form: `email`
  - Reset Form: `newPassword`, `confirmPassword`
- **Validations:**
  - `newPassword`: Must meet strong password criteria.
- **Backend Connected:** ✅

---

## 📁 Project Structure

```

devscorner-frontend/
│
├── public/                # Static files
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Signup, Login, ForgotPassword, ResetPassword, etc.
│   ├── store/             # Store has all state variables and methods
│   ├── utils/             # Helper functions and validation logic
│   └── App.jsx            # Root component
│
├── .env                   # Environment variables
├── package.json
└── README.md

````

---

## ⚙️ Environment Variables (`.env`)

Create a `.env` file at the root:

```env
VITE_API_BASE_URL=https://localhost:8080/api/v1
````

Vist: https://github.com/Dhiraj-4/DevsCorner_backend to clone the backend,

will make the backend live when the project once its stabilizes.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Dhiraj-4/DevsCorner_frontend
cd DevsCorner_frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure environment

Set your backend base URL in `.env`.

### 4. Start development server

```bash
npm run dev
# or
yarn dev
```

---

## 📡 API Integration

* All auth-related forms (signup, login, password reset) are fully connected to DevsCorner’s backend API.
* Uses secure token-based password reset system.
* Axios is used for API communication.

---

## 📌 Next Goals

* 👤 User Profile Dashboard
* 💬 Real-time Chat with WebSocket
* 📹 Video Calling with WebRTC
* 🛒 Premium Membership Integration
* 📄 Resume Upload/Display Features

---

## 🤝 Contributing

Feel free to fork the repo and submit PRs once the project stabilizes.

---

## 📄 License

I don't know by whom

---

## 👤 Author

Made by [Dhiraj Londhe](https://github.com/Dhiraj-4)

```
---
