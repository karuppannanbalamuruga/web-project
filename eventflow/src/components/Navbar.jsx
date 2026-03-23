import { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { CalendarDays, Menu, X, Star, Mail } from "lucide-react"

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { pathname } = useLocation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => { setOpen(false) }, [pathname])

    const links = [
        { to: "/", label: "Home" },
        { to: "/events", label: "Portfolio" },
        { to: "/services", label: "Services" },
        { to: "/about", label: "About" },
    ]

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-gray-950/90 backdrop-blur-xl border-b border-white/8 shadow-xl shadow-black/30" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-18">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-rose-600 flex items-center justify-center shadow-lg shadow-brand-600/40 group-hover:scale-105 transition-transform">
                            <CalendarDays size={18} className="text-white" />
                        </div>
                        <span className="font-display font-bold text-lg text-white tracking-tight">
                            Sophia<span className="gradient-text">Events</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {links.map(l => (
                            <NavLink key={l.to} to={l.to} end={l.to === "/"}
                                className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? "text-white bg-white/10" : "text-gray-400 hover:text-white hover:bg-white/6"}`}>
                                {l.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/15 border border-green-500/25 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow"></span>
                            <span className="text-xs font-medium text-green-300">Available for Events</span>
                        </div>
                        <Link to="/contact" className="btn-primary text-sm py-2 px-4">
                            <Mail size={15} />
                            Hire Me
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg glass text-gray-300 hover:text-white transition-colors">
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden bg-gray-950/98 backdrop-blur-xl border-b border-white/8 px-4 pb-5 pt-2 animate-fade-in">
                    <div className="flex flex-col gap-1">
                        {links.map(l => (
                            <NavLink key={l.to} to={l.to} end={l.to === "/"}
                                className={({ isActive }) => `px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? "text-white bg-white/10" : "text-gray-400 hover:text-white hover:bg-white/6"}`}>
                                {l.label}
                            </NavLink>
                        ))}
                        <Link to="/contact" className="btn-primary mt-3 justify-center text-sm">
                            <Mail size={15} />
                            Hire Me
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
