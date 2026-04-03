# DevOps Midterm Project

A simple full-stack application built for the DevOps midterm exam.

## Technologies
- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose

## Quick Start (with Docker)

1. **Build and Run**:
   ```bash
   docker-compose up --build
   ```
2. **Access**:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`
   - Health Check: `http://localhost:5000/health`

## Manual Setup

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints
- `GET /health`: System health status.
- `GET /about`: Student information.
- `GET /api/items`: List all items from database.
- `POST /api/items`: Add a new item to database.

## Environment Variables
- `PORT`: Server port (default: 5000)
- `DB_URL`: MongoDB connection string
- `APP_NAME`: Application name
