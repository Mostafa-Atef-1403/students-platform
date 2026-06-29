# Examify — AI-Proctored Student Exam Platform

> A multi-role academic platform with real-time AI proctoring, built as a university capstone project.

🔗 **Live Demo:** [your-vercel-link-here](https://your-vercel-link-here)  
📡 **Backend API:** [examify.runasp.net/swagger](https://examify.runasp.net/swagger/index.html)

---

## What is Examify?

Examify is a full-stack exam management and proctoring platform built for three roles:

- 🎓 **Student** — Dashboard, enrolled subjects, quizzes with live AI camera monitoring
- 👨‍🏫 **Instructor** — Course management, quiz creation, student submissions, proctoring reports
- 🛡️ **Admin** — User management, department and course control, system stats

The platform integrates an AI proctoring system that monitors students via webcam during exams, detecting violations such as phone usage, extra persons, gaze deviation, and face absence — generating per-session text reports and per-exam Excel reports for instructors.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| UI | Tailwind CSS, shadcn/ui, Radix UI |
| Routing | React Router v6 |
| Forms | React Hook Form, Zod |
| Charts | Recharts |
| Backend | ASP.NET Core (REST API) |
| AI Service | FastAPI + Computer Vision models |
| Mobile | Flutter |

---

## Features

- 🔐 JWT-based authentication with role-based routing (Student / Instructor / Admin)
- 📷 Live webcam proctoring during exams — frames sent to AI service every 300ms
- 🤖 AI violation detection: phone, extra person, gaze, no face
- 📊 Per-student text reports and per-exam Excel reports with evidence images
- 📝 Quiz engine with timer, auto-submit, and score calculation
- 📈 Instructor dashboard with submission tracking and proctoring data

---

## Team

| Role | Count |
|---|---|
| Frontend (React) | 1 |
| Backend (ASP.NET) | 1 |
| AI Engineers | 3 |
| Mobile (Flutter) | 1 |

---

## Getting Started

```bash
npm install
npm run dev
```

> The app runs on `http://localhost:8080` by default.

### Environment
No `.env` needed — the backend URL is configured directly in `src/services/proctoring.ts` and `src/services/api.ts`.

---

## Project Structure

src/
├── pages/
│   ├── instructor/     # Instructor views
│   ├── admin/          # Admin views
│   └── ...             # Student views
├── services/
│   ├── api.ts          # Auth endpoints
│   └── proctoring.ts   # Proctoring + reports endpoints
├── data/               # Static mock data
├── components/         # Shared UI components
└── lib/                # Utilities and exam submission store

---

## API

Full API documentation available at:  
👉 [examify.runasp.net/swagger](https://examify.runasp.net/swagger/index.html)