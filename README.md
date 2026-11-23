# 📚 Library Management System

A backend application for managing a library system, built with Node.js, TypeScript, Express, PostgreSQL, and Drizzle ORM, following Domain-Driven Design (DDD) principles.

## 🚀 Tech Stack

- **Node.js** – JavaScript runtime
- **TypeScript** – Type-safe development
- **Express.js** – Backend web framework
- **PostgreSQL** – Relational database
- **Drizzle ORM** – Type-safe database ORM
- **JWT** – Authentication
- **Bcrypt** – Password hashing
- **Zod** – Request validation

## 🏗️ Architecture

The project follows Domain-Driven Design (DDD) with a domain-based structure.

```text
src/
├── domains/
│   ├── auth/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── presentation/
│   │
│   └── users/
│       ├── application/
│       ├── domain/
│       ├── infrastructure/
│       └── presentation/
│
├── shared/
├── config/
├── app.ts
└── index.ts
```

## ✨ Current Features

### Authentication
- User login
- JWT-based authentication
- Password verification using Bcrypt
- Role-based authorization

### User Management
- Create users
- Get all users
- Get user by ID
- Update users
- Delete users
- Email validation
- User roles (Admin and Member)

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd library_system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run database migrations

```bash
npm run db:migrate
```

### 5. Start development server

```bash
npm run dev
```

### 6. Build the project

```bash
npm run build
```

## 🔐 User Roles

| Role | Permissions |
|---|---|
| Admin | Manage users and access protected administrative operations |
| Member | Access authenticated user operations |

## 🛣️ API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | User login |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create a user (Admin) |
| PATCH | `/api/users/:id` | Update a user (Admin) |
| DELETE | `/api/users/:id` | Delete a user (Admin) |

## 🚧 Project Status

The project is under active development.

Planned features include:
- Books Management
- Borrowing and Returning Books
- Reservations
- Fines and Payments

## 👩‍💻 Author

Developed as a backend learning project using TypeScript and Domain-Driven Design principles.
