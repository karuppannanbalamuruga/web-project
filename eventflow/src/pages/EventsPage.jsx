import { useState, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { Search, LayoutGrid, LayoutList, Filter, X, Trophy, MapPin, Users, CalendarDays } from "lucide-react"
import { EVENTS, EVENT_CATEGORIES } from "../data/events"
import EventCard from "../components/EventCard"

const SORT_OPTIONS = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "guests-high", label: "Most Guests" },
    { value: "guests-low", label: "Fewest Guests" },
]

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

function EventListRow({ event }) {
    const cat = EVENT_CATEGORIES.find(c => c.id === event.category)
    const style = getCategoryStyle(event.category)
    return (
        <a href={`/events/${event.id}`}
            className="group glass-card rounded-2xl overflow-hidden flex gap-0 hover:-translate-y-0.5 transition-all duration-300 hover:border-brand-500/25"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
            <div className="relative w-48 sm:w-60 flex-shrink-0 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-950/40" />
                {event.award && (
                    <div className="absolute top-2 left-2">
                        <span className="badge bg-amber-500/25 text-amber-300 border border-amber-500/30 backdrop-blur-sm text-xs">
                            <Trophy size={9} /> Award
                        </span>
                    </div>
                )}
            </div>
            <div className="flex-1 p-5 flex flex-col gap-2 min-w-0">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <span className={`badge ${style.bg} ${style.text} border ${style.border} text-xs mb-2`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                            {cat?.label || event.category}
                        </span>
                        <h3 className="font-display font-bold text-white text-lg leading-tight group-hover:text-brand-300 transition-colors truncate">
                            {event.title}
                        </h3>
                        <p className="text-xs text-gray-500">{event.client}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <span className="font-display font-black text-xl text-white">{event.budget}</span>
                        <p className="text-xs text-gray-600">budget</p>
                    </div>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">{event.description}</p>
                <div className="flex flex-wrap gap-3 mt-auto pt-2 border-t border-white/6">
                    <span className="flex items-center gap-1 text-xs text-gray-500"><CalendarDays size={11} /> {event.date}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-500"><MapPin size={11} /> {event.location}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-500"><Users size={11} /> {event.guests.toLocaleString()} guests</span>
                </div>
            </div>
        </a>
    )
}

export default function EventsPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState("")
    const [sort, setSort] = useState("newest")
    const [viewGrid, setViewGrid] = useState(true)
    const [showFilters, setShowFilters] = useState(false)

    const activeCategory = searchParams.get("category") || "all"
    const setCategory = cat => {
        if (cat && cat !== "all") setSearchParams({ category: cat })
        else setSearchParams({})
    }

    const filtered = useMemo(() => {
        let list = [...EVENTS]
        if (query.trim()) {
            const q = query.toLowerCase()
            list = list.filter(e =>
                e.title.toLowerCase().includes(q) ||
                e.client.toLowerCase().includes(q) ||
                e.description.toLowerCase().includes(q) ||
                e.tags.some(t => t.toLowerCase().includes(q))
            )
        }
        if (activeCategory && activeCategory !== "all") {
            list = list.filter(e => e.category === activeCategory)
        }
        switch (sort) {
            case "oldest": list.sort((a, b) => a.date.localeCompare(b.date)); break
            case "guests-high": list.sort((a, b) => b.guests - a.guests); break
            case "guests-low": list.sort((a, b) => a.guests - b.guests); break
            default: list.sort((a, b) => b.date.localeCompare(a.date)); break
        }
        return list
    }, [query, activeCategory, sort])

    const totalGuests = EVENTS.reduce((s, e) => s + e.guests, 0)
    const awardCount = EVENTS.filter(e => e.award).length

    return (
        <div className="min-h-screen pt-20">
            {/* Page header */}
            <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
                <div className="max-w-3xl">
                    <div className="badge bg-brand-500/15 text-brand-300 border border-brand-500/25 mb-4">Portfolio</div>
                    <h1 className="font-display font-black text-5xl sm:text-6xl text-white mb-4">
                        Event <span className="gradient-text">Portfolio</span>
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        {EVENTS.length} events. {totalGuests.toLocaleString()}+ guests. {awardCount} industry awards.
                        Every event a story worth telling.
                    </p>
                </div>

                {/* Mini stats */}
                <div className="flex flex-wrap gap-4 mt-8">
                    {[
                        { label: "Total Events", value: EVENTS.length },
                        { label: "Total Guests", value: totalGuests.toLocaleString() + "+" },
                        { label: "Award-Winning", value: awardCount },
                        { label: "Categories", value: EVENT_CATEGORIES.length - 1 },
                    ].map(s => (
                        <div key={s.label} className="glass-card rounded-xl px-5 py-3">
                            <span className="font-display font-black text-lg text-white">{s.value}</span>
                            <span className="text-gray-500 text-sm ml-2">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Filters + content */}
            <section className="pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
                {/* Category tabs */}
                <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-1">
                    {EVENT_CATEGORIES.map(cat => (
                        <button key={cat.id} onClick={() => setCategory(cat.id)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap border ${activeCategory === cat.id
                                    ? "bg-brand-600 text-white border-brand-500 shadow-lg shadow-brand-600/30"
                                    : "glass text-gray-400 hover:text-white hover:bg-white/10 border-white/10"
                                }`}>
                            <span>{cat.icon}</span> {cat.label}
                        </button>
                    ))}
                </div>

                {/* Search + sort + view toggle */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input value={query} onChange={e => setQuery(e.target.value)}
                            placeholder="Search events, clients, keywords..."
                            className="input-field pl-11 pr-10" />
                        {query && (
                            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                                <X size={15} />
                            </button>
                        )}
                    </div>
                    <select value={sort} onChange={e => setSort(e.target.value)}
                        className="input-field w-auto bg-gray-900">
                        {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <div className="flex gap-1 glass border border-white/10 rounded-xl p-1">
                        <button onClick={() => setViewGrid(true)}
                            className={`p-2 rounded-lg transition-all ${viewGrid ? "bg-brand-600 text-white" : "text-gray-400 hover:text-white"}`}>
                            <LayoutGrid size={16} />
                        </button>
                        <button onClick={() => setViewGrid(false)}
                            className={`p-2 rounded-lg transition-all ${!viewGrid ? "bg-brand-600 text-white" : "text-gray-400 hover:text-white"}`}>
                            <LayoutList size={16} />
                        </button>
                    </div>
                </div>

                {/* Results count */}
                <p className="text-sm text-gray-500 mb-5">
                    Showing <span className="text-white font-semibold">{filtered.length}</span> event{filtered.length !== 1 ? "s" : ""}
                    {activeCategory !== "all" && <span> in <span className="text-brand-400 capitalize">{activeCategory}</span></span>}
                    {query && <span> matching "<span className="text-white">{query}</span>"</span>}
                </p>

                {/* Events grid / list */}
                {filtered.length === 0 ? (
                    <div className="text-center py-24 glass-card rounded-2xl">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="font-display font-bold text-xl text-white mb-2">No events found</h3>
                        <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                        <button onClick={() => { setQuery(""); setCategory("all") }}
                            className="btn-secondary mt-5 text-sm">Clear filters</button>
                    </div>
                ) : viewGrid ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map(e => <EventCard key={e.id} event={e} featured={e.featured} />)}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {filtered.map(e => <EventListRow key={e.id} event={e} />)}
                    </div>
                )}
            </section>
        </div>
    )
}
