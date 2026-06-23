# <img width="32" height="32" alt="image" src="https://github.com/user-attachments/assets/a1b5a3f3-e9a7-41e8-9071-f963fed3a9c0" /> NexCareer

> AI-Powered Career Development Platform

NexCareer is a full-stack AI-powered career growth platform that helps users create ATS-friendly resumes, generate personalized cover letters, prepare for interviews, and gain actionable career insights through industry-specific assessments.

---

## ✨ Features

### 📄 AI Resume Builder

- Create Markdown formattable resumes
- AI-enhanced resume descriptions
- Dynamic work experience, education, and project sections
- Markdown editor support
- PDF export functionality

### ✍️ AI Cover Letter Generator

- Generate tailored cover letters
- Company-specific customization
- Job-description-aware content generation
- Professional formatting using Gemini AI

### 🎯 Industry Assessments

- AI-generated industry-specific quizzes
- Performance tracking
- Automated scoring
- Personalized improvement suggestions

### 📊 Career Insights

- Industry trends and analytics
- Skill gap identification
- Performance analytics dashboard
- Career growth recommendations

### ⚡ Automated Industry Insights

- Weekly automated industry data refresh using Inngest
- Scheduled background jobs for fetching industry trends
- Automated salary insights updates
- Continuous skill demand monitoring
- Event-driven workflow execution

### 🔐 Authentication

- Secure authentication using Clerk
- User-specific data management
- Protected routes and server actions

---

## 🛠️ Tech Stack

### Frontend

- Next.js 16
- React
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod

### Backend

- Next.js Server Actions
- Prisma ORM
- PostgreSQL

### AI

- Google Gemini 2.5 Flash

### Automation & Background Jobs

- Inngest
- Cron Jobs
- Event-Driven Workflows

### Authentication

- Clerk

### Deployment

- Vercel

---

## 📸 Screenshots

### Landing Page

![Landing Page](./screenshots/landing-page.png)

### Resume Builder

![Resume Builder](./screenshots/resume-builder.png)

### Cover Letter Generator

![Cover Letter](./screenshots/cover-letter.png)

### Assessment Dashboard

![Dashboard](./screenshots/dashboard.png)

---

## 🏗️ Architecture

```text
User
 │
 ▼
Clerk Authentication
 │
 ▼
Next.js Application
 │
 ├── Resume Builder
 ├── Cover Letter Generator
 ├── Industry Assessments
 ├── Career Insights
 │
 ▼
Inngest Automation
 │
 ▼
Weekly Industry Updates
 │
 ▼
Gemini AI
 │
 ▼
Prisma ORM
 │
 ▼
PostgreSQL
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/karunyaram07/nexcareer.git

cd nexcareer
```

### Install Dependencies

```bash
npm install
```

### Setup Environment Variables

Create a `.env` file:

```env
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

GEMINI_API_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Run Database Migrations

```bash
npx prisma migrate dev
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🤖 AI Features

NexCareer leverages Google Gemini AI to:

- Improve resume descriptions
- Generate personalized cover letters
- Create industry-specific assessments
- Provide performance feedback and recommendations,Improvement Tips

---

## 📚 What I Learned

This project helped me gain hands-on experience with:

- Full-stack development using Next.js
- Server Actions
- Prisma ORM & PostgreSQL
- Clerk Authentication
- Gemini AI Integration
- Inngest Workflow Automation
- Form validation with Zod
- React Hook Form
- SaaS-style application architecture
- Responsive UI development

---

## 🔮 Future Improvements

- Resume-to-job matching
- AI career roadmap generation
- Mock interview simulation
- LinkedIn profile analysis
- Resume version history
- Team collaboration features

---

## 🎥 Demo

### Live Demo

https://nexcareer-eight.vercel.app/

Note: The Deployed One currently not loading up the Resume,CoverLetter,Dashboard Pages due to Usage of Clerk for Authentication and Authorisation
As Clerk Not Allowing the vercel.app like subdomains the Live Keys are not being generated to use in the production Level.
Need to purchase Domain!! And then Create Production Instance using the clerk

### Demo Video

https://your-demo-video-link

---

## 👨‍💻 Author

**Karunya Ram**

GitHub: https://github.com/karunyaram07

LinkedIn: https://www.linkedin.com/in/prabhu-ram-karunya-sunkara-11986528a

Email: sprkarunya986@gmail.com

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the MIT License.
