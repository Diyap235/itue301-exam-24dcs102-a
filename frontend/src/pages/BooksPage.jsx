import { Loader, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import BookCard from '../components/BookCard'

function BooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // fetch books when page loads
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/books')
        const data = await response.json()
        setBooks(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  if (loading) return (
    <div className="books-page">
      <p className="loading-text">
        <Loader size={20} style={{ display: 'inline', marginRight: '8px', animation: 'spin 1s linear infinite' }} />
        Loading...
      </p>
    </div>
  )
  
  if (error) return (
    <div className="books-page">
      <p className="error-text">
        <AlertCircle size={20} style={{ display: 'inline', marginRight: '8px' }} />
        Error: {error}
      </p>
    </div>
  )

  return (
    <div className="books-page">
      <h1>Library Shelves</h1>
      <p className="books-count">Total books: {books.length}</p>
      <div className="books-grid">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            category={book.category}
            available={book.available}
          />
        ))}
      </div>
    </div>
  )
}

export default BooksPage
