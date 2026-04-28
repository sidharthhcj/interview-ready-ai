import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'

const Navbar = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    const onLogout = async () => {
        await handleLogout()
        navigate('/login')
    }

    const getInitials = (name) => {
        if (!name) return '?'
        return name.slice(0, 2).toUpperCase()
    }

    return (
        <nav className='navbar'>
            {/* Brand / Logo */}
            <NavLink to="/" className='navbar__brand'>
                <span className='navbar__logo-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                    </svg>
                </span>
                Interview AI
            </NavLink>

            {/* Center Nav Links */}
            <ul className='navbar__links'>
                <li>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/create-interview"
                        className={({ isActive }) =>
                            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Create Plan
                    </NavLink>
                </li>
            </ul>

            {/* Right Side — User + Logout */}
            <div className='navbar__right'>
                <div className='navbar__user'>
                    <span className='navbar__avatar'>{getInitials(user?.username)}</span>
                    <span>{user?.username}</span>
                </div>
                <button className='navbar__logout-btn' onClick={onLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar
