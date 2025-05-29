# Expense Tracker

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Environment Setup](#environment-setup)
  - [Development with Docker](#development-with-docker)
  - [Development without Docker](#development-without-docker)
- [Authors](#authors)

---

## Introduction

A modern expense tracking application built with Node.js, Express, and React. This application allows users to add income, expenses and help keep track of their expenses in real time.

---

## Features

- Add, Delete income and expenses entries
- Categorize entries (e.g., Food, Travel, Rent)
- Real-time graphs, charts for expense status
- User authentication and authorization
- Responsive design
- File upload support
- File download support for in excel format
- Docker support for easy development

---

## Tech Stack

#### Backend

- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- Cloudinary for cloud storage

#### Frontend

- React with Vite
- TailwindCSS for styling
- Axios for API requests

---

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized development)
- MongoDB (if running locally)

---

## Getting Started

### Environment Setup

1. Clone the repository:

```bash
git clone https://github.com/Santos2175/expense-tracker.git
```

2. Create environment files:

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp client/.env.example client/.env
```

3. Update the environment variables in both `.env` files with your configuration.

- Backend Environment Variables

```
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

- Frontend Environment Variables

```
VITE_API_URL=your_api_url e.g. http://localhost:8000
```

### Development with Docker

1. Build and start the containers:

```bash
docker-compose up --build
```

2. Access the applications:

- Frontend: http://localhost:5173
- Backend: http://localhost:8000

### Development without Docker

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Authors

- Santosh Gurung
