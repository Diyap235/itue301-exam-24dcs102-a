import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

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

// ===== TASK 5: Mongoose Schemas =====

// Book schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  isbn: { type: String, unique: true, sparse: true },
  available: { type: Boolean, default: true }
})

// Member schema
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  department: { type: String, required: true }
})

// Borrowing schema
const borrowingSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['borrowed', 'returned', 'overdue'],
    default: 'borrowed'
  }
})

const Book = mongoose.model('Book', bookSchema)
const Member = mongoose.model('Member', memberSchema)
const Borrowing = mongoose.model('Borrowing', borrowingSchema)

// ===== TASK 5: Routes to demonstrate schema and validation =====

// GET all books from DB
app.get('/api/v1/db/books', async (req, res) => {
  try {
    const books = await Book.find()
    res.status(200).json(books)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// POST create book (proves schema works)
app.post('/api/v1/db/books', async (req, res) => {
  try {
    const { title, author, category, isbn, available } = req.body
    const book = new Book({ title, author, category, isbn, available })
    await book.save()
    res.status(201).json(book)
  } catch (err) {
    // return clean error message, not raw Mongoose error
    res.status(400).json({ error: err.message })
  }
})

// GET all members from DB
app.get('/api/v1/db/members', async (req, res) => {
  try {
    const members = await Member.find()
    res.status(200).json(members)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// POST create member (proves schema works)
app.post('/api/v1/db/members', async (req, res) => {
  try {
    const { name, email, phone, department } = req.body
    const member = new Member({ name, email, phone, department })
    await member.save()
    res.status(201).json(member)
  } catch (err) {
    // return clean error message, not raw Mongoose error
    res.status(400).json({ error: err.message })
  }
})

// GET all borrowings from DB
app.get('/api/v1/db/borrowings', async (req, res) => {
  try {
    const borrowings = await Borrowing.find().populate('memberId bookId')
    res.status(200).json(borrowings)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// POST create borrowing (with validation)
app.post('/api/v1/db/borrowings', async (req, res) => {
  try {
    const { memberId, bookId, borrowDate, returnDate, status } = req.body
    const borrowing = new Borrowing({ memberId, bookId, borrowDate, returnDate, status })
    await borrowing.save()
    res.status(201).json(borrowing)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

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
  console.log('  GET  /api/v1/db/members')
  console.log('  POST /api/v1/db/members')
  console.log('  GET  /api/v1/db/borrowings')
  console.log('  POST /api/v1/db/borrowings')
  console.log('=====================')
})
