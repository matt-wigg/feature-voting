# Feature Voting System

A full-stack feature voting application built with **Next.js 15**, **TypeScript**, **Prisma**, **PostgreSQL**, and **shadcn/ui**.  
The app allows users to post new feature requests, view and sort them, and upvote features they like.

---

## 📑 Table of Contents

1. [Features](#features)
2. [Project Architecture](#project-architecture)
   - [Domain Layer](#domain-layer)
   - [Application Layer](#application-layer)
   - [Infrastructure Layer](#infrastructure-layer)
   - [Interface Layer](#interface-layer)
   - [UI Layer](#ui-layer)
3. [Tech Stack](#tech-stack)
4. [Setup Instructions](#setup-instructions)
   - [1. Clone and Install](#1-clone-and-install)
   - [2. Environment Variables](#2-environment-variables)
   - [3. Database Setup](#3-database-setup)
   - [4. Run Migrations](#4-run-migrations)
   - [5. Start the App](#5-start-the-app)
5. [Usage](#usage)
6. [Responsive Design](#responsive-design)
7. [Development Notes](#development-notes)

---

## 🚀 Features

- Add new feature requests.
- Upvote/downvote existing requests.
- Sort features by **Top**, **Trending**, or **New**.
- Responsive UI (desktop and mobile).
- Clean architecture for separation of concerns.

---

## 🏗 Project Architecture

This project follows Uncle Bob's **Clean Architecture** principles.

### Domain Layer

- `src/domain/entities`: Core business entities (`Feature`, `Vote`, `User`).
- `src/domain/ports`: Repository interfaces that abstract persistence.

### Application Layer

- `src/application/use-cases`: Business logic (e.g., create feature, list features, toggle votes).

### Infrastructure Layer

- `src/infrastructure/db`: Prisma client configuration.
- `src/infrastructure/repositories`: Implementations of repository interfaces using Prisma.

### Interface Layer

- `src/interface/controllers`: Orchestrates use cases and repositories.
- `src/interface/presenters`: Prepares data for the UI.

### UI Layer

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: React components built with **shadcn/ui** and **TailwindCSS**.

---

## 🛠 Tech Stack

- **Next.js 15** (App Router, Server Actions)
- **React 18** + **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **shadcn/ui** + **TailwindCSS**
- **Zod** (validation)

---

## ⚙️ Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/matt-wigg/feature-voting
cd feature-voting
npm install
```

### 2. Environment Variables

Create a `.env` file in the root of the project:

```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/feature_voting?schema=public"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

Adjust the username/password/port if different.

### 3. Database Setup

You need PostgreSQL running locally.  
If you have **pgAdmin**, create a database called `feature_voting`.

Alternatively, use Docker:

```bash
docker run --name feature-voting-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=feature_voting -p 5432:5432 -d postgres
```

### 4. Run Migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Optional: seed a demo user so feature creation/upvotes work without auth:

```sql
INSERT INTO "User" ("id", "email", "name", "role")
VALUES ('demo_user', 'demo@example.com', 'Demo User', 'user')
ON CONFLICT ("id") DO NOTHING;
```

### 5. Start the App

```bash
npm run dev
```

Visit [http://localhost:3000/dashboard/features](http://localhost:3000/dashboard/features).

---

## 📖 Usage

1. Open `/dashboard/features`.
2. Add a new feature via the dialog.
3. Upvote/downvote features.
4. Sort features using the tab controls (Top, Trending, New).

---

## 📱 Responsive Design

- Uses Tailwind’s mobile-first breakpoints (`sm`, `md`, `lg`).
- Works across mobile, tablet, and desktop.
- Components styled with **shadcn/ui**.

---

## 📝 Development Notes

- **Auth**: Currently uses a hard-coded `demo_user`. Replace with real auth (NextAuth or custom) later.
- **Votes/Features**: Strictly tied to the DB schema with foreign keys (`Feature_authorId_fkey`, `Vote_userId_fkey`).
- **Validation**: Input validation via Zod, applied in server actions and repositories.
- **Architecture**: Separates domain logic from infrastructure and UI for maintainability.
