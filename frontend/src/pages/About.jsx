import { useState, useEffect } from 'react'
import { User, Mail, Book, Globe } from 'lucide-react'

const About = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/about')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Fetch about error:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="page-about">
      <header className="page-header">
        <h1>Profile</h1>
        <p>Student Information for Midterm Exam</p>
      </header>

      <section className="profile-section">
        <div className="card profile-card">
          <div className="profile-avatar">
            <User size={64} />
          </div>
          <div className="profile-info">
            {loading ? (
              <p>Loading profile info...</p>
            ) : (
              <>
                <div className="info-item">
                  <span className="label">Họ tên:</span>
                  <span className="value">{data?.student?.name || '[Tên của bạn]'}</span>
                </div>
                <div className="info-item">
                  <span className="label">MSSV:</span>
                  <span className="value">{data?.student?.id || '[Mã số sinh viên]'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Lớp:</span>
                  <span className="value">{data?.student?.class || '[Lớp của bạn]'}</span>
                </div>
                <div className="info-item">
                  <span className="label">App Name:</span>
                  <span className="value">{data?.appName || 'DevOps App'}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="about-notes card">
        <h3>DevOps Project Notes</h3>
        <p>
          This application was built as part of the DevOps midterm requirements. 
          It demonstrates a full-stack architecture with:
        </p>
        <ul>
          <li><strong>Frontend:</strong> React (Vite) with modern Vanilla CSS components.</li>
          <li><strong>Backend:</strong> Node.js & Express API with CORS and environment variable support.</li>
          <li><strong>Database:</strong> MongoDB for real-time document storage.</li>
          <li><strong>Compliance:</strong> Includes health check endpoints and semantic HTML.</li>
        </ul>
      </section>
    </div>
  )
}

export default About
