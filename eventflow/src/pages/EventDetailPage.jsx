import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Calendar, MapPin, Users, Trophy, CheckCircle, ExternalLink, ChevronRight, Star } from "lucide-react"
import { EVENTS, EVENT_CATEGORIES } from "../data/events"
import EventCard from "../components/EventCard"

function getCategoryStyle(categoryId) {
    const styles = {
        corporate: { bg: "bg-blue-500/15", text: "text-blue-300", border: "border-blue-500/25", dot: "bg-blue-400" },
        wedding: { bg: "bg-pink-500/15", text: "text-pink-300", border: "border-pink-500/25", dot: "bg-pink-400" },
        concert: { bg: "bg-purple-500/15", text: "text-purple-300", border: "border-purple-500/25", dot: "bg-purple-400" },
        conference: { bg: "bg-cyan-500/15", text: "text-cyan-300", border: "border-cyan-500/25", dot: "bg-cyan-400" },
        gala: { bg: "bg-amber-500/15", text: "text-amber-300", border: "border-amber-500/25", dot: "bg-amber-400" },
        social: { bg: "bg-rose-500/15", text: "text-rose-300", border: "border-rose-500/25", dot: "bg-rose-400" },
        sports: { bg: "bg-green-500/15", text: "text-green-300", border: "border-green-500/25", dot: "bg-green-400" },
    }
    return styles[categoryId] || { bg: "bg-white/8", text: "text-gray-300", border: "border-white/20", dot: "bg-gray-400" }
}

export default function EventDetailPage() {
    const { id } = useParams()
    const event = EVENTS.find(e => e.id === id)

    if (!event) return (
        <div className="min-h-screen flex items-center justify-center pt-20">
            <div className="text-center">
                <div className="text-6xl mb-4">🎪</div>
                <h2 className="font-display font-bold text-2xl text-white mb-3">Event not found</h2>
                <Link to="/events" className="btn-primary">Back to Portfolio</Link>
            </div>
        </div>
    )

    const cat = EVENT_CATEGORIES.find(c => c.id === event.category)
    const style = getCategoryStyle(event.category)
    const related = EVENTS.filter(e => e.id !== event.id && e.category === event.category).slice(0, 3)

    return (
        <div className="min-h-screen pt-20">
            {/* Hero image */}
            <div className="relative h-[55vh] min-h-80 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950/30 to-transparent" />

                {/* Back button */}
                <div className="absolute top-6 left-4 sm:left-8">
                    <Link to="/events" className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-sm text-gray-300 hover:text-white transition-all backdrop-blur-sm hover:bg-white/10">
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>
                </div>

                {/* Breadcrumb */}
                <div className="absolute bottom-8 left-4 sm:left-8 right-4 sm:right-8">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <Link to="/events" className="hover:text-white transition-colors">Portfolio</Link>
                        <ChevronRight size={12} />
                        <span className="text-white truncate">{event.title}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <span className={`badge ${style.bg} ${style.text} border ${style.border} backdrop-blur-sm`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} /> {cat?.label}
                        </span>
                        {event.award && (
                            <span className="badge bg-amber-500/25 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                                <Trophy size={11} /> {event.award}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
                    {/* Left column — main info */}
                    <div className="lg:col-span-2">
                        <div className="mb-8">
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-widest mb-2">Client: {event.client}</p>
                            <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight mb-4">
                                {event.title}
                            </h1>
                            <p className="text-gray-300 text-lg leading-relaxed">{event.description}</p>
                        </div>

                        {/* Event meta */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                            {[
                                { icon: Calendar, label: "Date", value: event.date, color: "text-brand-400" },
                                { icon: MapPin, label: "Venue", value: event.location, color: "text-violet-400" },
                                { icon: Users, label: "Guests", value: event.guests.toLocaleString(), color: "text-cyan-400" },
                                { icon: Trophy, label: "Budget", value: event.budget, color: "text-amber-400" },
                            ].map(({ icon: Icon, label, value, color }) => (
                                <div key={label} className="glass-card rounded-xl p-4 text-center"
                                    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
                                    <Icon size={18} className={`${color} mx-auto mb-2`} />
                                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{label}</p>
                                    <p className="font-semibold text-white text-sm">{value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Highlights */}
                        <div className="mb-10">
                            <h2 className="font-display font-bold text-2xl text-white mb-5 flex items-center gap-2">
                                <Star size={20} className="text-amber-400" /> Key Highlights
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {event.highlights.map((h, i) => (
                                    <div key={i} className="flex items-start gap-3 glass-card rounded-xl p-4"
                                        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
                                        <CheckCircle size={16} className="text-brand-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-300 text-sm">{h}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Services delivered */}
                        <div className="mb-10">
                            <h2 className="font-display font-bold text-2xl text-white mb-5">Services Delivered</h2>
                            <div className="flex flex-wrap gap-2.5">
                                {event.services.map(s => (
                                    <span key={s} className="px-4 py-2 glass-card rounded-xl text-sm font-medium text-gray-200 border-white/8 hover:border-brand-500/30 transition-colors">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Gallery */}
                        {event.gallery?.length > 0 && (
                            <div className="mb-4">
                                <h2 className="font-display font-bold text-2xl text-white mb-5">Event Gallery</h2>
                                <div className="grid grid-cols-3 gap-3">
                                    {event.gallery.map((img, i) => (
                                        <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl">
                                            <img src={img} alt={`Gallery ${i + 1}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right sidebar */}
                    <div className="space-y-5 lg:sticky lg:top-24 h-fit">
                        {/* CTA card */}
                        <div className="glass-card rounded-2xl p-6" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
                            <h3 className="font-display font-bold text-white text-xl mb-2">Want a similar event?</h3>
                            <p className="text-gray-400 text-sm mb-5">Let's discuss your vision and turn it into reality.</p>
                            <Link to="/contact" className="btn-primary w-full justify-center mb-3">
                                <ExternalLink size={15} /> Start Planning
                            </Link>
                            <Link to="/events" className="btn-secondary w-full justify-center text-sm">
                                <ArrowLeft size={14} /> View All Events
                            </Link>
                        </div>

                        {/* Tags */}
                        <div className="glass-card rounded-2xl p-5" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
                            <h4 className="font-semibold text-white text-sm mb-3 uppercase tracking-wider">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {event.tags.map(tag => (
                                    <span key={tag} className="tag-pill">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* Category */}
                        <div className="glass-card rounded-2xl p-5" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
                            <h4 className="font-semibold text-white text-sm mb-3 uppercase tracking-wider">Category</h4>
                            <span className={`badge ${style.bg} ${style.text} border ${style.border}`}>
                                <span className={`w-2 h-2 rounded-full ${style.dot}`} /> {cat?.label}
                            </span>
                            <div className="mt-4">
                                <Link to={`/events?category=${event.category}`}
                                    className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors">
                                    See all {cat?.label} events <ChevronRight size={12} />
                                </Link>
                            </div>
                        </div>

                        {/* Award */}
                        {event.award && (
                            <div className="glass-card rounded-2xl p-5 border-amber-500/20"
                                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)", borderColor: "rgba(245,158,11,0.2)" }}>
                                <h4 className="font-semibold text-white text-sm mb-3 uppercase tracking-wider">Award</h4>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0">
                                        <Trophy size={18} className="text-amber-400" />
                                    </div>
                                    <span className="text-amber-300 text-sm font-medium">{event.award}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related events */}
                {related.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-white/8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-display font-bold text-3xl text-white">
                                More <span className="gradient-text">{cat?.label}</span> Events
                            </h2>
                            <Link to={`/events?category=${event.category}`} className="btn-ghost text-sm hidden sm:flex">
                                View all <ChevronRight size={15} />
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {related.map(e => <EventCard key={e.id} event={e} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
