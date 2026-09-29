# Student Internship Portal

A responsive full-stack internship management portal built for a 3rd-year engineering project.

## Tech Stack

- Frontend: React.js + Vite + Axios
- Backend: Python Django + Django REST Framework
- Database: MySQL
- Authentication: Token authentication
- Styling: Custom responsive CSS

## Features

### Student
- Register/login
- Create and edit profile
- Add skills, CGPA, GitHub, LinkedIn
- Upload resume
- Browse/search/filter internships
- Apply for internships
- Prevent duplicate applications
- Track application status

### Company
- Register/login
- Company profile
- Create/edit/delete internships
- View applications
- Download resumes
- Update application status

### Admin
- Dashboard statistics
- View/manage students
- View/manage companies
- View/manage internships
- View/manage applications

## Project Structure

student-internship-portal/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── config/
│   ├── users/
│   └── internships/
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
├── .gitignore
└── README.md

## 1. MySQL Setup

Create a MySQL database:

```sql
CREATE DATABASE internship_portal;
```

Create `backend/.env` using `.env.example`.

Example:

```env
DB_NAME=internship_portal
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=127.0.0.1
DB_PORT=3306
DJANGO_SECRET_KEY=change-this-secret-key
```

## 2. Backend Setup

Open terminal inside `backend`.

Windows:

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py seed_data
python manage.py runserver
```

Backend runs at:

http://127.0.0.1:8000/

Admin panel:

http://127.0.0.1:8000/admin/

## 3. Frontend Setup

Open another terminal inside `frontend`.

```bash
npm install
npm run dev
```

Frontend normally runs at:

http://localhost:5173/

## Demo Accounts

The seed command creates:

Student:
- Email: student@example.com
- Password: Student@123

Company:
- Email: company@example.com
- Password: Company@123

Admin:
- Email: admin@example.com
- Password: Admin@123

Change these passwords before real deployment.

## GitHub

From the project root:

```bash
git init
git add .
git commit -m "Initial Student Internship Portal"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Never commit `backend/.env`, `venv/`, `node_modules/`, or uploaded private resumes.

## Important

If MySQL is not running, Django database operations will fail. Start MySQL before running migrations or the server.
