import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Activity, User, Home, Plus, Database } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="sidebar">
          <div className="sidebar-header">
            <Database className="logo-icon" />
            <span>DevOps Midterm</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/"><Home size={20} /> Dashboard</Link>
            </li>
            <li>
              <Link to="/about"><User size={20} /> Profile</Link>
            </li>
            <li>
              <a href="http://localhost:5000/health" target="_blank" rel="noreferrer">
                <Activity size={20} /> Health Check
              </a>
            </li>
          </ul>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <footer className="app-footer">
            <p>&copy; 2026 DevOps Midterm Project. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
