import { useState } from "react"
import { Link } from "react-router-dom"
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Twitter, CheckCircle, CalendarDays, Users, Building2, Heart, Award } from "lucide-react"
import { PROFILE } from "../data/events"

const INQUIRY_TYPES = [
    { id: "corporate", label: "Corporate Event", icon: "🏢" },
    { id: "wedding", label: "Wedding", icon: "💍" },
    { id: "concert", label: "Concert / Festival", icon: "🎵" },
    { id: "conference", label: "Conference", icon: "🎤" },
    { id: "gala", label: "Gala / Awards", icon: "🏆" },
    { id: "social", label: "Social / Private", icon: "🎉" },
    { id: "other", label: "Other", icon: "✦" },
]

const BUDGET_RANGES = [
    "Under $25K",
    "$25K – $75K",
    "$75K – $200K",
    "$200K – $500K",
    "$500K – $1M",
    "$1M+",
]

export default function CreateEventPage() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", inquiryType: "", budget: "", eventDate: "", guests: "", message: "" })
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = "Name is required"
        if (!form.email.trim()) e.email = "Email is required"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email"
        if (!form.inquiryType) e.inquiryType = "Please select an event type"
        if (!form.message.trim()) e.message = "Message is required"
        return e
    }

    const handleSubmit = e => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) { setErrors(errs); return }
        setSubmitted(true)
    }

    const set = (field, value) => {
        setForm(f => ({ ...f, [field]: value }))
        if (errors[field]) setErrors(e => { const n = { ...e }; delete n[field]; return n })
    }

    if (submitted) return (
        <div className="min-h-screen flex items-center justify-center pt-20 px-4">
            <div className="text-center animate-slide-up max-w-md">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-600 to-rose-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-brand-600/40">
                    <CheckCircle size={40} className="text-white" />
                </div>
                <h2 className="font-display font-black text-4xl text-white mb-3">Message Sent!</h2>
                <p className="text-gray-400 text-lg mb-2">Thank you, <span className="text-white font-semibold">{form.name}</span>!</p>
                <p className="text-gray-500 text-sm mb-8">I'll review your inquiry and get back to you within 24 hours.</p>
                <div className="flex gap-3 justify-center">
                    <Link to="/" className="btn-primary">Back to Home</Link>
                    <Link to="/events" className="btn-secondary">View Portfolio</Link>
                </div>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
                <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">

                    {/* Left sidebar */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Intro */}
                        <div>
                            <div className="badge bg-brand-500/15 text-brand-300 border border-brand-500/25 mb-4">Let's Connect</div>
                            <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight mb-4">
                                Plan Your <span className="gradient-text">Dream Event</span>
                            </h1>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Ready to create something extraordinary? Tell me about your vision and I'll get back to you within 24 hours.
                            </p>
                        </div>

                        {/* Contact details */}
                        <div className="glass-card rounded-2xl p-6 space-y-4"
                            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
                            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Contact Details</h3>
                            <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                <div className="w-9 h-9 rounded-xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center flex-shrink-0">
                                    <Mail size={15} className="text-brand-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-0.5">Email</p>
                                    <p className="text-sm font-medium">{PROFILE.email}</p>
                                </div>
                            </a>
                            <div className="flex items-center gap-3 text-gray-400">
                                <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center flex-shrink-0">
                                    <Phone size={15} className="text-violet-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-0.5">Phone</p>
                                    <p className="text-sm font-medium">{PROFILE.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center flex-shrink-0">
                                    <MapPin size={15} className="text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-0.5">Location</p>
                                    <p className="text-sm font-medium">{PROFILE.location}</p>
                                </div>
                            </div>
                        </div>

                        {/* Social */}
                        <div className="glass-card rounded-2xl p-6"
                            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
                            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Follow My Work</h3>
                            <div className="flex gap-3">
                                {[
                                    { icon: Instagram, href: `https://instagram.com/${PROFILE.instagram}`, label: "Instagram", color: "text-pink-400" },
                                    { icon: Linkedin, href: `https://linkedin.com/in/${PROFILE.linkedin}`, label: "LinkedIn", color: "text-blue-400" },
                                    { icon: Twitter, href: `https://twitter.com/${PROFILE.twitter}`, label: "Twitter", color: "text-sky-400" },
                                ].map(({ icon: Icon, href, label, color }) => (
                                    <a key={label} href={href} aria-label={label}
                                        className="flex-1 flex flex-col items-center gap-2 p-3 glass rounded-xl hover:bg-white/8 transition-all group">
                                        <Icon size={18} className={`${color} group-hover:scale-110 transition-transform`} />
                                        <span className="text-xs text-gray-500">{label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Why hire me */}
                        <div className="glass-card rounded-2xl p-6 space-y-3"
                            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
                            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Why Work With Me</h3>
                            {[
                                { icon: Award, text: "12 industry awards & recognitions", color: "text-amber-400" },
                                { icon: Users, text: "500K+ guests hosted across 200+ events", color: "text-cyan-400" },
                                { icon: CheckCircle, text: "94% client retention rate", color: "text-green-400" },
                                { icon: Heart, text: "Obsessive attention to every detail", color: "text-rose-400" },
                            ].map(({ icon: Icon, text, color }) => (
                                <div key={text} className="flex items-center gap-3">
                                    <Icon size={15} className={`${color} flex-shrink-0`} />
                                    <span className="text-gray-400 text-sm">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} noValidate
                            className="glass-card rounded-3xl p-7 sm:p-8 space-y-6"
                            style={{ boxShadow: "0 16px 60px rgba(0,0,0,0.4)" }}>
                            <h2 className="font-display font-bold text-xl text-white">Tell Me About Your Event</h2>

                            {/* Name + Email */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Full Name *</label>
                                    <input value={form.name} onChange={e => set("name", e.target.value)}
                                        placeholder="Jane Smith" className={`input-field ${errors.name ? "ring-2 ring-red-500 border-red-500" : ""}`} />
                                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Email *</label>
                                    <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                                        placeholder="jane@company.com" className={`input-field ${errors.email ? "ring-2 ring-red-500 border-red-500" : ""}`} />
                                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            {/* Phone + Date */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Phone</label>
                                    <input value={form.phone} onChange={e => set("phone", e.target.value)}
                                        placeholder="+1 (212) 000-0000" className="input-field" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Event Date (approx.)</label>
                                    <input type="date" value={form.eventDate} onChange={e => set("eventDate", e.target.value)}
                                        className="input-field" />
                                </div>
                            </div>

                            {/* Event type */}
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Event Type *</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {INQUIRY_TYPES.map(t => (
                                        <button key={t.id} type="button" onClick={() => set("inquiryType", t.id)}
                                            className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-xs font-medium border transition-all ${form.inquiryType === t.id
                                                    ? "bg-brand-600/25 text-brand-300 border-brand-500/50 shadow-lg shadow-brand-600/20"
                                                    : "glass text-gray-400 border-white/10 hover:bg-white/8 hover:text-white"
                                                }`}>
                                            <span className="text-xl">{t.icon}</span>
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                                {errors.inquiryType && <p className="text-red-400 text-xs mt-1.5">{errors.inquiryType}</p>}
                            </div>

                            {/* Budget + Guests */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Estimated Budget</label>
                                    <select value={form.budget} onChange={e => set("budget", e.target.value)} className="input-field bg-gray-900">
                                        <option value="">Select range...</option>
                                        {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Expected Guests</label>
                                    <input value={form.guests} onChange={e => set("guests", e.target.value)}
                                        placeholder="e.g. 200" type="number" min="1" className="input-field" />
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Tell Me Your Vision *</label>
                                <textarea value={form.message} onChange={e => set("message", e.target.value)}
                                    placeholder="Describe your event, theme, key requirements, and any special requests..."
                                    rows={5} className={`input-field resize-none ${errors.message ? "ring-2 ring-red-500 border-red-500" : ""}`} />
                                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                            </div>

                            <button type="submit" className="btn-primary w-full justify-center text-base py-3.5">
                                <Send size={16} />
                                Send My Inquiry
                            </button>

                            <p className="text-center text-xs text-gray-600">
                                I typically respond within 24 hours. Your information is kept strictly confidential.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
