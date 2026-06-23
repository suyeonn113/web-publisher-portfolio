import { Icon } from '@iconify/react'
import { NavLink, Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <nav className="app-nav" aria-label="App navigation">
          <NavLink className="app-nav-link" to="/my-page">
            <Icon icon="fluent:person-24-regular" width="22" height="22" />
            <span>My page</span>
          </NavLink>

          <NavLink className="app-nav-link" to="/">
            <Icon icon="fluent:home-24-regular" width="20" height="20" />
            <span>Home</span>
          </NavLink>

          <NavLink className="app-nav-link" to="/library">
            <Icon icon="fluent:library-24-regular" width="20" height="20" />
            <span>Library</span>
          </NavLink>
        </nav>
      </header>

      <main className="page">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
