import { useState, useEffect } from 'react'
import { Plus, Database, RefreshCw, Trash2 } from 'lucide-react'

const Dashboard = () => {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/items')
      const data = await res.json()
      setItems(data)
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name) return

    try {
      const res = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      })
      if (res.ok) {
        setName('')
        setDescription('')
        fetchItems()
      }
    } catch (err) {
      console.error('Submit error:', err)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className="page-dashboard">
      <header className="page-header">
        <h1>Dashboard</h1>
        <p>Manage your real-time database items</p>
      </header>

      <section className="form-section">
        <div className="card">
          <h3>Add New Item</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                placeholder="Item name..." 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                placeholder="Item description..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn-primary">
              <Plus size={18} /> Add Item
            </button>
          </form>
        </div>
      </section>

      <section className="list-section">
        <div className="section-header">
          <h3>Database Items</h3>
          <button onClick={fetchItems} className="btn-icon">
            <RefreshCw size={18} className={loading ? 'spinning' : ''} />
          </button>
        </div>
        
        {loading ? (
          <div className="loading-state">Loading items...</div>
        ) : items.length === 0 ? (
          <div className="empty-state">No items found in database.</div>
        ) : (
          <div className="items-grid">
            {items.map((item) => (
              <div key={item._id} className="item-card card">
                <div className="item-content">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
                <div className="item-footer">
                  <span className="timestamp">{new Date(item.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Dashboard
