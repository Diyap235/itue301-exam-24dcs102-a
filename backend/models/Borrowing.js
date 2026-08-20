import mongoose from 'mongoose'

// Store one borrowing record and link it to a member and a book.
const borrowingSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  borrowDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['borrowed', 'returned', 'overdue'],
    default: 'borrowed'
  }
})

export default mongoose.model('Borrowing', borrowingSchema)