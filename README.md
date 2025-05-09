# 🔐 Next.js Authentication System

A complete authentication system built with **Next.js**, **MongoDB**, and **Nodemailer** featuring:

- ✅ Email verification
- ✅ Forgot password flow
- ✅ JWT-based sessions
- ✅ Mailtrap integration for email testing
- ✅ Fully customizable and secure

## ✨ Features

- ✅ Register and login with email and password
- ✅ Secure email verification using unique tokens
- ✅ Forgot and reset password via email
- ✅ Protected routes (e.g., Profile)
- ✅ API-based architecture
- ✅ Responsive, minimal UI

## 🛠️ Tech Stack

- **Next.js 15**
- **React 19**
- **MongoDB + Mongoose**
- **Nodemailer + Mailtrap**
- **JWT** for session tokens
- **UUID** for generating secure tokens
- **Tailwind CSS** for styling
- **Axios** for HTTP requests

## 🧪 Live Preview

https://next-js-authentication-x4q8.vercel.app/

## 📦 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/next-js-authentication.git
cd next-js-authentication
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Rename `.env.sample` to `.env` and update the following:

```
MONGO_URI=your_mongo_uri
TOKEN_SECRET=your_jwt_secret
DOMAIN=http://localhost:3000
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_pass
```

You can get Mailtrap credentials by signing up at [mailtrap.io](https://mailtrap.io).

## 🚀 Run the App

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
/app
  ├── api
  │   ├── users (register, login, resetPassword, etc.)
  ├── profile/page.tsx (protected page)
  └── layout.tsx, page.tsx

/models
  └── userModel.ts (Mongoose schema)

/utils
  └── sendmail.ts (Nodemailer logic)

.env.sample
```

## ✉️ Email Logic

Emails are handled by [Nodemailer](https://nodemailer.com/) with Mailtrap for local testing.

- Verification: `/verifyemail?token=`
- Password reset: `/resetPassword?token=`

Tokens are valid for 10 hours (`Date.now() + 36000000`).

## 🛡️ Security Notes

- Tokens are generated using `uuidv4()` and saved with expiration.
- Add rate-limiting or CAPTCHA in production to prevent abuse.
- Consider hashing tokens in production for added security.

## 📄 License

MIT — Free to use and modify.

## 💡 Author

Made with ❤️ by **Ayush Soni**
[GitHub Repo](https://github.com/AyushSoni86/next-js-authentication)

---
