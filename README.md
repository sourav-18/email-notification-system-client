# Email Notification System – Frontend

This repository contains the **frontend** for the Email Notification System. It provides a clean UI for organizations to manage email notifications, credentials, history, and administration features.

🔗 **Live Demo**: [https://email-notification-system-client-i9.vercel.app/login](https://email-notification-system-client-i9.vercel.app/login)

---

## 📦 Backend Repository

The backend for this project is **highly scalable** and designed for production workloads.

🔗 Backend GitHub URL: https://github.com/sourav-18/email-notification-system-api

---

---

## 🚀 What is Email Notification System?

The Email Notification System is a platform where:

* Organizations can **register using their email and password**
* Organizations can **add email credentials** (Gmail address + App Password)
* Organizations can **send emails via APIs** (we act as the API provider)
* Organizations can **send emails manually from the UI**
* Organizations can **view email notification history**
* Admins can **manage organizations, credentials, and activities** from the admin panel

This frontend application communicates with a **highly scalable backend service** to perform all operations.

---

## 🖥️ Features (Frontend)

### Organization Panel

* Organization signup & login
* Dashboard overview
* Add & manage email credentials
* Send emails manually from UI
* View sent email notification history
* Secure authentication & authorization

### Admin Panel

* View and manage all organizations
* Monitor email activities
* Manage system-level configurations

---

## 🔐 Test Organization Credentials

You can use the following **dummy credentials** to test the application:

```
Email: test@gmail.com
Password: password
```

⚠️ These credentials are for **testing/demo purposes only**.

---

## 🧰 Tech Stack

* **Frontend Framework**: React
* **Styling**: CSS / Tailwind (if applicable)
* **State Management**: Context API / Redux (if applicable)
* **API Communication**: REST APIs
* **Deployment**: Vercel

---

## ⚙️ Environment Setup

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn

### Installation

```bash
git clone https://github.com/sourav-18/email-notification-system-client.git
cd email-notification-system-client
npm install
```

### Run Locally

```bash
npm start
```

The app will run on:

```
http://localhost:3000
```

---

## 🔑 Email Credential Setup (Important)

To send emails, organizations must:

1. Use a **valid Gmail address**
2. Enable **2-Step Verification** in Google Account
3. Generate a **Google App Password**
4. Add the **email + app password** in the dashboard

📌 Normal Gmail passwords **will not work**.

---

## 📡 API-Based Email Sending

Organizations can integrate with our system using APIs to send emails programmatically.

* We act as the **Email API Provider**
* All email requests are authenticated
* Each request is logged and visible in notification history

(Backend documentation is maintained separately.)

---

## 🔒 Security Considerations

* Passwords are never stored in plain text
* App passwords are securely handled
* Token-based authentication
* Role-based access (Admin / Organization)


## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Sourav**
Backend Developer | Full Stack Enthusiast

If you find this project useful, please ⭐ the repository!
