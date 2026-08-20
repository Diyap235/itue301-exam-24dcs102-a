# Library Book Management System (SET B)

A simple library management system with React frontend and Express backend.

## Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173

### Backend
```bash
cd backend
npm install
node server.js
```
Runs on http://localhost:3000

### Environment Variables
Create a `.env` file in the backend folder based on `.env.example`:
```
MONGO_URI=your_mongodb_connection_string_here
PORT=3000
```

## Requirements
- MONGO_URI: MongoDB connection string (for Task 5 only)
- PORT: Server port (default 3000)
