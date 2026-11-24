# Employee Management Dashboard

A simple MERN monorepo for managing employees locally. The application is intentionally split into independently installable frontend and backend projects so it can later be containerized and deployed.

## Architecture

- `frontend`: React 19 + Vite + Tailwind CSS single-page admin dashboard
- `backend`: Express REST API using Mongoose and MongoDB
- `backend/src`: MVC-style config, models, controllers, routes, and middleware

## Technology Stack

React 19, Vite, Tailwind CSS, Axios, React Router, Node.js, Express, MongoDB, Mongoose, dotenv, and cors.

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- MongoDB Community Edition running locally

## Project Structure

```text
employee-management/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       └── services/
└── backend/
    └── src/
        ├── config/
        ├── controllers/
        ├── middleware/
        ├── models/
        └── routes/
```

## Setup

### Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

On macOS/Linux, use `cp .env.example .env` instead of `copy`.

### Frontend

In another terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

### MongoDB

Start MongoDB Community Edition locally. The default connection string is:

```text
mongodb://localhost:27017/employee_management
```

Change `MONGODB_URI` in `backend/.env` when using a different local MongoDB setup.

## Environment Configuration

Backend `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee_management
NODE_ENV=development
```

Frontend `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Seed Data

With MongoDB running, insert 15 sample employees:

```bash
cd backend
npm run seed
```

The seed command uses stable employee IDs and upserts records, so running it repeatedly does not create duplicates.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Application health |
| GET | `/api/employees` | List employees with search and filters |
| GET | `/api/employees/:id` | Get one employee |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |
| GET | `/api/dashboard/stats` | Dashboard totals and recent employees |

Employee list query parameters: `search`, `department`, and `status`.

## Scripts

Backend: `npm run dev`, `npm start`, `npm run seed`

Frontend: `npm run dev`, `npm run build`, `npm run preview`

Docker, CI/CD, authentication, and cloud deployment are intentionally out of scope for this phase.
