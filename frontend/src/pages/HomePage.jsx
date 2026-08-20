import { BookOpen } from 'lucide-react'

function HomePage() {
  return (
    <div className="home-page">
      <div style={{ fontSize: '60px', marginBottom: '20px' }}>
        <BookOpen size={60} />
      </div>
      <h1>Welcome to Central Library</h1>
      <p className="home-subtitle">A sanctuary for book lovers</p>
    </div>
  )
}

export default HomePage
