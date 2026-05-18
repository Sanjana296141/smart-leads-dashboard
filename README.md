# Smart Leads Dashboard 🚀

A full-stack CRM dashboard application built using MERN Stack.

---

## Features

- JWT Authentication
- Role-Based Access Control
- Lead Management
- Search & Filtering
- Pagination
- CSV Export
- Dark Mode
- Docker Support

---

## Tech Stack

### Frontend
- React
- TypeScript
- TailwindCSS

### Backend
- Node.js
- Express.js
- MongoDB

---

## Folder Structure

smart-leads-dashboard/
│
├── backend/
├── frontend/
├── docker-compose.yml
├── README.md

---

## Setup Instructions

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Docker Setup

```bash
docker-compose up
```

---

## Environment Variables

Create `.env` file inside backend folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key
```

---

## API Endpoints

### Authentication APIs

#### Register User

```http
POST /api/auth/register
```

#### Login User

```http
POST /api/auth/login
```

---

### Leads APIs

#### Get Leads

```http
GET /api/leads
```

#### Create Lead

```http
POST /api/leads
```

#### Update Lead

```http
PUT /api/leads/:id
```

#### Delete Lead

```http
DELETE /api/leads/:id
```

---

## Author

Sanjana Giri