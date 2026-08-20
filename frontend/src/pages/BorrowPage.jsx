import { useState } from 'react'
import { Send, User, BookMarked, Calendar } from 'lucide-react'

function BorrowPage() {
  // state for form inputs
  const [memberName, setMemberName] = useState('')
  const [bookTitle, setBookTitle] = useState('')
  const [borrowDate, setBorrowDate] = useState('')
  const [returnDate, setReturnDate] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // send borrowing request to backend
    const response = await fetch('http://localhost:8000/api/v1/borrowings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        memberName,
        bookTitle,
        borrowDate,
        returnDate,
        status: 'borrowed'
      })
    })

    const result = await response.json()
    alert('Borrowing created: ' + JSON.stringify(result))

    // clear form
    setMemberName('')
    setBookTitle('')
    setBorrowDate('')
    setReturnDate('')
  }

  return (
    <div className="borrow-page">
      <h1>Library Checkout Slip</h1>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <User size={16} style={{ display: 'inline', marginRight: '6px' }} />
            Member Name
          </label>
          <input
            type="text"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>
            <BookMarked size={16} style={{ display: 'inline', marginRight: '6px' }} />
            Book Title
          </label>
          <input
            type="text"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            placeholder="Enter book title"
          />
        </div>

        <div className="form-group">
          <label>
            <Calendar size={16} style={{ display: 'inline', marginRight: '6px' }} />
            Borrow Date
          </label>
          <input
            type="date"
            value={borrowDate}
            onChange={(e) => setBorrowDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>
            <Calendar size={16} style={{ display: 'inline', marginRight: '6px' }} />
            Return Date
          </label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>

        <button type="submit" className="stamp-button">
          <Send size={16} style={{ display: 'inline', marginRight: '6px' }} />
          STAMP & BORROW
        </button>
      </form>

      {/* display book title live as user types */}
      {bookTitle && (
        <p className="borrowing-preview">
          <BookMarked size={18} style={{ display: 'inline', marginRight: '8px' }} />
          You are borrowing: <strong>{bookTitle}</strong>
        </p>
      )}
    </div>
  )
}

export default BorrowPage
