import express from 'express'
import Book from '../models/Book.js'
import Member from '../models/Member.js'

const router = express.Router()

// Create and save a book in MongoDB.
router.post('/books', async (req, res) => {
  try {
    const { title, author, category, isbn, available } = req.body
    const book = new Book({ title, author, category, isbn, available })
    await book.save()
    res.status(201).json(book)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Create and save a member in MongoDB.
router.post('/members', async (req, res) => {
  try {
    const { name, email, phone, department } = req.body
    const member = new Member({ name, email, phone, department })
    await member.save()
    res.status(201).json(member)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: err.message })
      return
    }

    res.status(400).json({ error: err.message })
  }
})

// Return all books stored in MongoDB.
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find()
    res.status(200).json(books)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router