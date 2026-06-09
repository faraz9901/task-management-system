# Smart Internal Operations System

A role-based internal task management platform designed to improve operational visibility, accountability, and workflow management across teams.

## Features

### Authentication & Authorization

* JWT-based authentication
* Role-Based Access Control (RBAC)
* Ownership-based resource authorization
* Admin-controlled user onboarding

### Task Management

* Create tasks
* Assign tasks to users
* Update task status
* Track task progress
* Task prioritization
* Due date management

### Search & Filtering

#### User Filters

* Name
* Email
* Role

#### Task Filters

* Title
* Status
* Priority

### Workload Insights Dashboard

* Total Tasks
* Completed Tasks
* Pending Tasks
* Tasks by Priority

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* shadcn/ui
* Recharts

### Backend

* NestJS
* Prisma ORM
* JWT Authentication
* class-validator

### Database

* PostgreSQL

---

## Project Structure

```text
root/
├── frontend/
├── backend/
├── docs/
```

---

## Role Hierarchy

```text
Admin
│
├── Create Managers
├── Create Users
├── Manage All Tasks
└── Access Analytics

Manager
│
├── Create Tasks
├── Assign Tasks
├── Update Own Tasks
└── Delete Own Tasks

User
│
├── View Assigned Tasks
├── Update Task Status
└── Update Task Description
```

---

# Setup Instructions

## Prerequisites

Ensure the following are installed:

* Node.js (v20+ recommended)
* PostgreSQL
* npm

---

## 1. Clone Repository

```bash
git clone https://github.com/faraz9901/task-management-system
cd task-management-system
```

---

## 2. Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
PORT="9000"
DB_HOST="localhost"
DB_USERNAME="postgres"
DB_PORT="5432"
DB_PASSWORD="postgres"
DB_NAME="tasks_management_db"

# FOR PRISMA
DB_URL="postgresql://postgres:postgres@localhost/tasks_management_db?sslmode=verify-full"

ADMIN_NAME="ADMIN"
ADMIN_EMAIL = "admin@tasks.com"
ADMIN_PASSWORD = "admin@123"

JWT_SECRET="StrongSecret"
```

Update values according to your local environment.

---

## 4. Create Database

Run the database creation script:

```bash
npm run create:db
```

This script creates the PostgreSQL database if it does not already exist.

---

## 5. Run Prisma Migrations

```bash
npx prisma migrate dev
```

---

## 6. Seed Initial Admin User

Create the default administrator account:

```bash
npm run seed:admin
```

---

## 7. Start Backend Server

```bash
npm run start:dev
```

Backend will be available at:

```text
http://localhost:9000
```

---

## 8. Start Frontend Application

```bash
npm run dev
```

Frontend will be available at:

```text
http://localhost:5173
```

---

# Default Admin Account

The seed script creates the initial administrator account.

Configure the credentials inside:

```text
src/scripts/seed-admin.ts
```

Use those credentials to log in and create managers and users.

---

# API Documentation

Swagger documentation is automatically generated and available after starting the backend server.

Example:

```text
http://localhost:9000/api/docs
```

---

# Backend Architecture

The backend follows a modular NestJS architecture.

```text
src/
├── assets/
├── common/
├── config/
├── decorators/
├── interceptors/
├── modules/
├── scripts/
└── main.ts
```

---

# Frontend Architecture

Feature-driven folder structure:

```text
src/
├── features/
│   ├── api/
│   ├── hooks/
│   ├── components/
│   ├── pages/
│   └── utils/
```

---

# Design Decisions

### Admin-Controlled User Creation

User registration is intentionally disabled.

Only administrators can create:

* Managers
* Users

This ensures controlled onboarding and prevents unauthorized account creation.

### Ownership-Based Authorization

Role checks alone are not sufficient.

Task modifications are additionally protected through ownership validation to ensure users can only manage resources they own.

---

# Known Limitations

The following features were intentionally excluded due to assignment scope and time constraints:

* Activity Logging
* Notifications
* Report Generation
* Automated Testing
* Distributed Caching

---

# Future Improvements

* Activity tracking and audit logs
* Notification system
* Redis caching
* Advanced analytics
* Automated test coverage
* Exportable reports

---

# Acknowledgements

The backend project was initially bootstrapped using the NestJS Starter Template:

https://github.com/faraz9901/nestjs-starter

The business logic, RBAC implementation, task workflows, database schema, APIs, frontend application, and analytics dashboard were implemented specifically for this assignment.
