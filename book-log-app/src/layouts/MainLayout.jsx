import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { Icon } from '@iconify/react'
import { NavLink, Outlet } from 'react-router-dom'
import { auth } from '../firebase/firebase'

function MainLayout({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = async () => {
    closeMenu()
    await signOut(auth)
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <button
          type="button"
          className="menu-button"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <Icon
            icon={
              isMenuOpen
                ? 'fluent:dismiss-24-regular'
                : 'fluent:navigation-24-regular'
            }
            width="22"
            height="22"
          />
        </button>

        <NavLink className="brand" to="/" onClick={closeMenu}>
          Book Log
        </NavLink>
      </header>

      {isMenuOpen && (
        <div className="menu-backdrop" onClick={closeMenu}>
          <nav
            className="side-menu"
            aria-label="Main navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/library" onClick={closeMenu}>
              Library
            </NavLink>
            <button type="button" onClick={closeMenu}>
              독서모임
            </button>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        </div>
      )}

      <main className="page">
        <p className="user-badge">{user.displayName || user.email}</p>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
