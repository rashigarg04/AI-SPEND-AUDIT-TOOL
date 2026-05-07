
---

# ARCHITECTURE.md

```md
# Architecture Documentation

## Overview

The AI Spend Audit Tool follows a modular SaaS architecture built using Next.js App Router.

---

## Frontend

The frontend is built using:
- Next.js
- Tailwind CSS
- React Components

### Main Pages

- Landing Page
- Results Dashboard
- Shareable Reports
- Authentication

---

## Backend

Backend APIs are handled using Next.js Route Handlers.

### API Routes

| Route | Purpose |
|---|---|
| /api/audit | Perform spend calculations |
| /api/summary | Generate AI summary |
| /api/save | Save reports |
| /api/share | Generate public links |

---

## Database

Firebase Firestore is used for:
- User authentication
- Audit report storage
- Shared report links

---

## Authentication

Firebase Authentication handles:
- User signup
- Login
- Logout
- Session persistence

---

## Deployment

Application is deployed using Vercel.

---

## Scalability

The architecture is scalable because:
- API routes are modular
- Components are reusable
- Database is cloud-based
- Frontend is separated from logic