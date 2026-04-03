import { useState, useEffect } from 'react'
import { User, Mail, Book, Globe } from 'lucide-react'

const About = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ name: '', id: '', class: '' })

  const fetchProfile = () => {
    setLoading(true)
    fetch('http://localhost:5000/about')
      .then(res => res.json())
      .then(data => {
        setData(data)
        if (data?.student) {
          setFormData({ name: data.student.name, id: data.student.id, class: data.student.class })
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Fetch about error:', err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    fetch('http://localhost:5000/about', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then(() => {
      fetchProfile()
    })
  }

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
            ) : !data?.student ? (
              <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <p>Profile is empty. Please enter your data:</p>
                <input required placeholder="Họ và Tên" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required placeholder="Mã SCV" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} />
                <input required placeholder="Lớp" value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} />
                <button type="submit" className="btn-primary">Save to Database</button>
              </form>
            ) : (
              <>
                <div className="info-item">
                  <span className="label">Họ tên:</span>
                  <span className="value">{data.student.name}</span>
                </div>
                <div className="info-item">
                  <span className="label">MSSV:</span>
                  <span className="value">{data.student.id}</span>
                </div>
                <div className="info-item">
                  <span className="label">Lớp:</span>
                  <span className="value">{data.student.class}</span>
                </div>
                <div className="info-item">
                  <span className="label">App Name:</span>
                  <span className="value">{data?.appName || 'DevOps App'}</span>
                </div>
                <div style={{marginTop: '15px' }}>
                  <button className="btn-primary" onClick={() => setData({...data, student: null})}>Edit Profile</button>
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
