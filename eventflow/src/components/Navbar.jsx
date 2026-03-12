import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Zap, Bell, User, Plus } from 'lucide-react'

const NAV_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/events', label: 'Explore' },
    { to: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="mx-4 mt-4">
                <div className="glass-dark rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
                        <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform">
                            <Zap size={16} className="text-white fill-white" />
                        </div>
                        <span className="font-display font-bold text-lg text-white">
                            Event<span className="gradient-text">Flow</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-brand-600/20 text-brand-400'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Desktop actions */}
                    <div className="hidden md:flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                            <Bell size={18} />
                        </button>
                        <button
                            onClick={() => navigate('/create')}
                            className="btn-primary text-sm px-4 py-2"
                        >
                            <Plus size={16} />
                            Create Event
                        </button>
                        <button className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center hover:scale-105 transition-transform">
                            <User size={14} className="text-white" />
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {open && (
                    <div className="glass-dark rounded-2xl mt-2 p-4 md:hidden max-w-7xl mx-auto animate-fade-in">
                        <nav className="flex flex-col gap-1 mb-4">
                            {NAV_LINKS.map(({ to, label }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    end={to === '/'}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        `px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                            ? 'bg-brand-600/20 text-brand-400'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`
                                    }
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </nav>
                        <button
                            onClick={() => { navigate('/create'); setOpen(false) }}
                            className="btn-primary w-full justify-center text-sm"
                        >
                            <Plus size={16} />
                            Create Event
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}
