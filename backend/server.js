import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import dbRoutes from './routes/dbRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// middleware
app.use(cors())
app.use(express.json())

// ===== TASK 3: Custom Request Logger Middleware =====
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString()
  console.log(`[${req.method}] ${req.path} [${timestamp}]`)
  next()
}

app.use(requestLogger)

// ===== TASK 3: In-Memory Data (no database yet) =====
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', available: true },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', available: true },
  { id: 3, title: '1984', author: 'George Orwell', category: 'Dystopian', available: false }
]

let borrowings = []

// ===== TASK 3: REST API Endpoints =====

// GET all books
app.get('/api/v1/books', (req, res) => {
  res.status(200).json(books)
})

// GET all borrowings
app.get('/api/v1/borrowings', (req, res) => {
  res.status(200).json(borrowings)
})

// POST create borrowing
app.post('/api/v1/borrowings', (req, res) => {
  const { memberName, bookTitle, borrowDate, returnDate, status } = req.body

  const newBorrowing = {
    id: borrowings.length + 1,
    memberName,
    bookTitle,
    borrowDate,
    returnDate,
    status: status || 'borrowed'
  }

  borrowings.push(newBorrowing)
  res.status(201).json(newBorrowing)
})

// ===== TASK 5: MongoDB Setup =====

// connect to MongoDB
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err.message))
}

// Mount Task 5 database routes separately from the Task 3 in-memory routes.
app.use('/api/v1/db', dbRoutes)

// ===== TASK 3: Global Error Handler (MUST be last) =====
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ error: 'Something went wrong' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log('=====================')
  console.log('TASK 3 - In-Memory Routes (always available):')
  console.log('  GET  /api/v1/books')
  console.log('  GET  /api/v1/borrowings')
  console.log('  POST /api/v1/borrowings')
  console.log('=====================')
  console.log('TASK 5 - MongoDB Routes (if MONGO_URI is set):')
  console.log('  GET  /api/v1/db/books')
  console.log('  POST /api/v1/db/books')
  console.log('  POST /api/v1/db/members')
  console.log('=====================')
})
