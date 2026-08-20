import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import BooksPage from './pages/BooksPage'
import BorrowPage from './pages/BorrowPage'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/borrow" element={<BorrowPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
