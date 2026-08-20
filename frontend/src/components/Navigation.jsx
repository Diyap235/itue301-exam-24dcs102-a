import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Home, LogOut } from 'lucide-react'

function Navigation() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <BookOpen size={28} style={{ display: 'inline', marginRight: '8px' }} />
        Central Library
      </div>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
          <Home size={18} style={{ display: 'inline', marginRight: '6px' }} />
          Home
        </Link>
        <Link to="/books" className={`nav-link ${isActive('/books') ? 'active' : ''}`}>
          <BookOpen size={18} style={{ display: 'inline', marginRight: '6px' }} />
          Books
        </Link>
        <Link to="/borrow" className={`nav-link ${isActive('/borrow') ? 'active' : ''}`}>
          <LogOut size={18} style={{ display: 'inline', marginRight: '6px' }} />
          Borrow
        </Link>
      </div>
    </nav>
  )
}

export default Navigation
