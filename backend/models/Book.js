import mongoose from 'mongoose'

// Store the details of one book.
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  isbn: { type: String, unique: true },
  available: { type: Boolean, default: true }
})

export default mongoose.model('Book', bookSchema)