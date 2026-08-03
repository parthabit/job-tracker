# TrackHire — Job Application Tracker

A modern, premium job application tracker built for students and job seekers. Track applications, interviews, offers, and analytics in one clean dashboard.

Built with the MERN stack (MongoDB, Express, React, Node.js). 

![Tech](https://img.shields.io/badge/stack-MERN-2563EB)

---

## ✨ Features

- **Landing page** — hero, features, product preview, testimonials, FAQ
- **JWT authentication** — register, login, protected routes, logout
- **Dashboard** — overview cards (total, interviews, offers, rejected, pending), recent applications, quick add
- **Applications** — full CRUD, search by company/title, filter by status, sort by date
- **Analytics** — applications per month, status distribution, interview & offer success rate (Recharts)
- **Profile** — update name/email, change password, upload avatar
- **Dark mode** — polished light/dark themes, persisted across sessions
- **Responsive design** — desktop, tablet, and mobile
- **Reusable UI kit** — Sidebar, Navbar, Cards, Tables, Modals, Toasts, Skeletons, Empty states, Confirm dialogs

## 🛠 Tech Stack

**Frontend:** React (Vite), Tailwind CSS, React Router, Axios, React Hook Form, Framer Motion, Recharts, Lucide Icons, react-hot-toast

**Backend:** Node.js, Express.js, MongoDB + Mongoose, JWT, bcryptjs

---

## 📁 Project Structure

```
job-tracker/
├── backend/
│   ├── config/          # DB connection
│   ├── controllers/     # Route handlers (auth, applications, dashboard)
│   ├── middleware/      # JWT auth guard, error handler
│   ├── models/          # Mongoose schemas (User, Application)
│   ├── routes/          # Express routers
│   ├── server.js
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── layout/       # Sidebar, Navbar, DashboardLayout, ProtectedRoute, AuthLayout
    │   │   ├── ui/            # Modal, ConfirmDialog, Toaster, Spinner, Skeleton, EmptyState, StatusBadge
    │   │   ├── dashboard/     # StatCard, RecentApplications
    │   │   └── applications/  # ApplicationForm, ApplicationsTable, FilterBar
    │   ├── pages/             # Landing, Login, Register, Dashboard, Applications, Analytics, Profile, NotFound
    │   ├── context/           # AuthContext, ThemeContext
    │   ├── hooks/
    │   ├── services/          # api.js (axios instance), authService, applicationService
    │   └── assets/
    └── .env.example
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB database (local, or free tier on [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone & install

```bash
git clone <your-repo-url>
cd job-tracker
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your values:

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/job-tracker
JWT_SECRET=your_long_random_secret
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

Run the server:

```bash
npm run dev      # with nodemon
# or
npm start
```

The API runs on `http://localhost:5000`.

### 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

Run the dev server:

```bash
npm run dev
```

The app runs on `http://localhost:5173`.

---

## 📡 API Reference

### Auth — `/api/auth`
| Method | Route | Description | Auth |
|---|---|---|---|
| POST | `/register` | Create account | Public |
| POST | `/login` | Log in | Public |
| GET | `/me` | Get current user | Private |
| PUT | `/profile` | Update name/email/avatar | Private |
| PUT | `/password` | Change password | Private |

### Applications — `/api/applications`
| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/` | List (supports `?search=&status=&sort=&jobType=`) | Private |
| GET | `/:id` | Get one | Private |
| POST | `/` | Create | Private |
| PUT | `/:id` | Update | Private |
| DELETE | `/:id` | Delete | Private |

### Dashboard — `/api/dashboard`
| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/stats` | Overview counts (total, applied, interview, offer, rejected, pending) | Private |
| GET | `/charts` | Applications/month, status distribution, success rates | Private |

All private routes require an `Authorization: Bearer <token>` header.

---

## 🗄 Database Schema

**User**
```
name, email (unique), password (hashed), avatar, timestamps
```

**Application**
```
user (ref), company, jobTitle, location, jobType, salary,
status (Applied | Under Review | Interview | Offer | Rejected),
appliedDate, interviewDate, jobLink, notes, timestamps
```

---

## ☁️ Deployment

### Backend → Render

1. Push this repo to GitHub.
2. Create a new **Web Service** on [Render](https://render.com), pointing to the `backend` folder.
3. Build command: `npm install` · Start command: `npm start`
4. Add environment variables from `.env.example` (use your production `MONGO_URI`, a strong `JWT_SECRET`, and set `CLIENT_URL` to your deployed frontend URL).

### Frontend → Vercel

1. Import the repo into [Vercel](https://vercel.com), set the root directory to `frontend`.
2. Framework preset: **Vite**. Build command: `npm run build` · Output directory: `dist`
3. Add environment variable `VITE_API_URL` pointing to your Render backend, e.g. `https://your-api.onrender.com/api`.

---

## 🔐 Environment Variables

See `backend/.env.example` and `frontend/.env.example` for the full list.

---

## 📄 License

MIT — free to use for personal portfolios and learning.
