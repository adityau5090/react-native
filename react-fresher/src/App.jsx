import {useState, useEffect} from 'react'
import './App.css'

const USERNAME = 'adityau5090'

const App = () => {
  const [theme, setTheme] = useState('light')
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`https://api.github.com/users/${USERNAME}`)
        if (!response.ok) {
          throw new Error(`GitHub API returned ${response.status}`)
        }

        const result = await response.json()
        setUser(result)
      } catch (fetchError) {
        setError(fetchError.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGithubData()
  }, [])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading GitHub profile…</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="error-state">
          <p>Unable to load profile.</p>
          <small>{error}</small>
        </div>
      )
    }

    if (!user) {
      return <p>No profile found.</p>
    }

    return (
      <div className="profile-body">
        <div className="profile-header">
          <img className="avatar" src={user.avatar_url} alt={`${user.name || user.login} avatar`} />
          <div>
            <h1 className="profile-title">{user.name || user.login}</h1>
            <p className="profile-subtitle">@{user.login}</p>
          </div>
        </div>

        {user.bio && <p className="bio">{user.bio}</p>}

        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Repositories</p>
            <p className="stat-value">{user.public_repos}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Followers</p>
            <p className="stat-value">{user.followers}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Following</p>
            <p className="stat-value">{user.following}</p>
          </div>
        </div>

        <div className="profile-links">
          {user.company && <p>Company: {user.company}</p>}
          {user.location && <p>Location: {user.location}</p>}
          {user.blog && (
            <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noreferrer">
              {user.blog}
            </a>
          )}
          <a href={user.html_url} target="_blank" rel="noreferrer">
            View on GitHub
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <div className="app-content">
        <div className="toggle-row">
          <span className="theme-chip">{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
          <button className="theme-toggle" onClick={toggleTheme} type="button">
            {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
          </button>
        </div>

        <section className="profile-card">{renderContent()}</section>
      </div>
    </div>
  )
}

export default App
