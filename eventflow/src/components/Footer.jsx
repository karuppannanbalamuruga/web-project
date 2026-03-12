import { Link } from 'react-router-dom'
import { Zap, Twitter, Instagram, Linkedin, Github, Mail } from 'lucide-react'

const FOOTER_LINKS = {
    Product: ['Explore Events', 'Create Event', 'Dashboard', 'Analytics'],
    Company: ['About Us', 'Blog', 'Careers', 'Press'],
    Support: ['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact'],
}

export default function Footer() {
    return (
        <footer className="border-t border-white/5 mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/30">
                                <Zap size={18} className="text-white fill-white" />
                            </div>
                            <span className="font-display font-bold text-xl text-white">
                                Event<span className="gradient-text">Flow</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
                            The modern platform for discovering and managing extraordinary events worldwide.
                        </p>
                        <div className="flex items-center gap-3">
                            {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                                <button
                                    key={i}
                                    className="p-2 glass rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <Icon size={16} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-semibold text-white mb-4 text-sm">{category}</h4>
                            <ul className="space-y-3">
                                {links.map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">© 2026 EventFlow. All rights reserved.</p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Mail size={14} />
                        <span>hello@eventflow.io</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
