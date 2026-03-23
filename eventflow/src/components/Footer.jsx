import { Link } from "react-router-dom"
import { CalendarDays, Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Heart } from "lucide-react"
import { PROFILE } from "../data/events"

export default function Footer() {
    const year = new Date().getFullYear()

    const links = {
        Portfolio: [
            { label: "All Events", to: "/events" },
            { label: "Corporate", to: "/events?category=corporate" },
            { label: "Weddings", to: "/events?category=wedding" },
            { label: "Festivals", to: "/events?category=concert" },
            { label: "Galas", to: "/events?category=gala" },
        ],
        Company: [
            { label: "About Me", to: "/about" },
            { label: "Services", to: "/services" },
            { label: "Testimonials", to: "/about#testimonials" },
            { label: "Awards", to: "/about#awards" },
            { label: "Contact", to: "/contact" },
        ],
    }

    return (
        <footer className="bg-gray-950/80 border-t border-white/8 mt-20">
            {/* CTA strip */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-600/20 via-violet-600/15 to-accent-600/20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="font-display font-bold text-2xl text-white mb-1">Ready to plan your event?</h3>
                        <p className="text-gray-400 text-sm">Let's create something extraordinary together.</p>
                    </div>
                    <Link to="/contact" className="btn-primary flex-shrink-0">
                        <Mail size={16} />
                        Start a Conversation
                    </Link>
                </div>
            </div>

            {/* Main footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Brand */}
                <div className="md:col-span-1">
                    <Link to="/" className="flex items-center gap-2.5 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-rose-600 flex items-center justify-center shadow-lg shadow-brand-600/30">
                            <CalendarDays size={18} className="text-white" />
                        </div>
                        <span className="font-display font-bold text-lg text-white">
                            Sophia<span className="gradient-text">Events</span>
                        </span>
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">
                        Award-winning event management for corporate, social, and entertainment experiences.
                    </p>
                    <div className="flex flex-col gap-2.5 text-sm text-gray-400">
                        <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-2 hover:text-brand-400 transition-colors">
                            <Mail size={14} className="text-brand-500" /> {PROFILE.email}
                        </a>
                        <span className="flex items-center gap-2">
                            <Phone size={14} className="text-brand-500" /> {PROFILE.phone}
                        </span>
                        <span className="flex items-center gap-2">
                            <MapPin size={14} className="text-brand-500" /> {PROFILE.location}
                        </span>
                    </div>
                </div>

                {/* Link columns */}
                {Object.entries(links).map(([group, items]) => (
                    <div key={group}>
                        <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-widest">{group}</h4>
                        <ul className="flex flex-col gap-2.5">
                            {items.map(item => (
                                <li key={item.label}>
                                    <Link to={item.to} className="text-sm text-gray-400 hover:text-white transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Social & newsletter */}
                <div>
                    <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-widest">Follow Along</h4>
                    <div className="flex gap-3 mb-6">
                        {[
                            { icon: Instagram, href: `https://instagram.com/${PROFILE.instagram}`, label: "Instagram" },
                            { icon: Linkedin, href: `https://linkedin.com/in/${PROFILE.linkedin}`, label: "LinkedIn" },
                            { icon: Twitter, href: `https://twitter.com/${PROFILE.twitter}`, label: "Twitter" },
                            { icon: Mail, href: `mailto:${PROFILE.email}`, label: "Email" },
                        ].map(({ icon: Icon, href, label }) => (
                            <a key={label} href={href} aria-label={label}
                                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-600/20 hover:border-brand-500/40 transition-all">
                                <Icon size={15} />
                            </a>
                        ))}
                    </div>
                    <div className="glass-card rounded-xl p-4">
                        <p className="text-xs text-gray-400 mb-3 font-medium">Get event inspiration monthly</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="your@email.com" className="flex-1 text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-brand-500" />
                            <button className="px-3 py-2 bg-brand-600 hover:bg-brand-500 rounded-lg transition-colors flex-shrink-0">
                                <Mail size={13} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/6 max-w-7xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
                <span>© {year} {PROFILE.name}. All rights reserved.</span>
                <span className="flex items-center gap-1.5">Made with <Heart size={13} className="text-brand-500 fill-brand-500" /> in {PROFILE.location}</span>
            </div>
        </footer>
    )
}
