import { Link } from "react-router-dom"
import { MapPin, Users, CalendarDays, ArrowRight, Trophy, Star } from "lucide-react"
import { EVENT_CATEGORIES } from "../data/events"

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
    return styles[categoryId] || { bg: "bg-white/10", text: "text-gray-300", border: "border-white/20", dot: "bg-gray-400" }
}

export default function EventCard({ event, featured = false }) {
    const cat = EVENT_CATEGORIES.find(c => c.id === event.category)
    const style = getCategoryStyle(event.category)

    return (
        <Link to={`/events/${event.id}`}
            className={`group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-400 hover:-translate-y-2 ${featured ? "ring-1 ring-brand-500/30" : ""}`}
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.09)", boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                style={{ boxShadow: "inset 0 0 0 1px rgba(244,63,94,0.2), 0 20px 60px rgba(0,0,0,0.6)" }} />

            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <img src={event.image} alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent" />

                {/* Badges overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                    <span className={`badge ${style.bg} ${style.text} border ${style.border} backdrop-blur-sm`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        {cat?.label || event.category}
                    </span>
                    <div className="flex flex-col gap-1.5 items-end">
                        {event.award && (
                            <span className="badge bg-amber-500/25 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                                <Trophy size={10} /> Award
                            </span>
                        )}
                        {featured && (
                            <span className="badge bg-brand-500/25 text-brand-300 border border-brand-500/30 backdrop-blur-sm">
                                <Star size={10} /> Featured
                            </span>
                        )}
                    </div>
                </div>

                {/* Budget pill */}
                <div className="absolute bottom-3 right-3">
                    <span className="text-xs font-bold font-display text-white px-2.5 py-1 rounded-lg backdrop-blur-sm"
                        style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.12)" }}>
                        {event.budget}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
                <div className="mb-1.5">
                    <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">{event.client}</p>
                    <h3 className="font-display font-bold text-white text-lg leading-tight group-hover:text-brand-300 transition-colors line-clamp-1">
                        {event.title}
                    </h3>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                    {event.description}
                </p>

                {/* Meta row */}
                <div className="grid grid-cols-3 gap-2 mb-4 pt-3 border-t border-white/6">
                    <div className="flex flex-col items-center gap-0.5">
                        <span className="text-xs text-gray-500 flex items-center gap-1"><CalendarDays size={11} /> Date</span>
                        <span className="text-xs font-semibold text-gray-200">{event.date}</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <span className="text-xs text-gray-500 flex items-center gap-1"><Users size={11} /> Guests</span>
                        <span className="text-xs font-semibold text-gray-200">{event.guests.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <span className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={11} /> City</span>
                        <span className="text-xs font-semibold text-gray-200 truncate">{event.location.split(",")[1]?.trim() || "NYC"}</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {event.tags.slice(0, 3).map(t => (
                        <span key={t} className="tag-pill">{t}</span>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{event.services[0]} + {event.services.length - 1} more</span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-brand-400 group-hover:text-brand-300 transition-colors">
                        View Event <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </div>
            </div>
        </Link>
    )
}
