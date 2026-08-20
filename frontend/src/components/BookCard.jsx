import { CheckCircle, XCircle } from 'lucide-react'

// BookCard component - displays book info with availability stamp
function BookCard({ title, author, category, available }) {
  return (
    <div className="book-card">
      <div className="book-card-category">{category.toUpperCase()}</div>
      <div className="book-card-content">
        <h3 className="book-card-title">{title}</h3>
        <p className="book-card-author">{author}</p>
      </div>
      
      {/* Availability stamp - styled like an ink stamp */}
      {available ? (
        <div className="availability-stamp available">
          <CheckCircle size={16} style={{ display: 'inline', marginRight: '4px' }} />
          AVAILABLE
        </div>
      ) : (
        <div className="availability-stamp checked-out">
          <XCircle size={16} style={{ display: 'inline', marginRight: '4px' }} />
          CHECKED OUT
        </div>
      )}
    </div>
  )
}

export default BookCard
