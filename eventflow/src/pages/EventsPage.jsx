import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X, Grid3X3, List, ChevronDown } from 'lucide-react'
import { MOCK_EVENTS, CATEGORIES } from '../data/events'
import { formatDate, formatPrice, getCapacityPercent } from '../utils/helpers'
import EventCard from '../components/EventCard'

const SORT_OPTIONS = [
    { value: 'date-asc', label: 'Date: Upcoming First' },
    { value: 'date-desc', label: 'Date: Latest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'popularity', label: 'Most Popular' },
]

export default function EventsPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState('')
    const [sort, setSort] = useState('date-asc')
    const [showFilters, setShow] = useState(false)
    const [viewGrid, setViewGrid] = useState(true)
    const [priceMax, setPriceMax] = useState(500)

    const activeCategory = searchParams.get('category') || ''

    const setCategory = cat => {
        if (cat) setSearchParams({ category: cat })
        else setSearchParams({})
    }

    const filtered = useMemo(() => {
        let list = [...MOCK_EVENTS]

        if (query.trim()) {
            const q = query.toLowerCase()
            list = list.filter(e =>
                e.title.toLowerCase().includes(q) ||
                e.description.toLowerCase().includes(q) ||
                e.location.toLowerCase().includes(q) ||
                e.tags.some(t => t.toLowerCase().includes(q))
            )
        }

        if (activeCategory) list = list.filter(e => e.category === activeCategory)
        list = list.filter(e => e.price <= priceMax)

        switch (sort) {
            case 'date-asc': list.sort((a, b) => new Date(a.date) - new Date(b.date)); break
            case 'date-desc': list.sort((a, b) => new Date(b.date) - new Date(a.date)); break
            case 'price-asc': list.sort((a, b) => a.price - b.price); break
            case 'price-desc': list.sort((a, b) => b.price - a.price); break
            case 'popularity': list.sort((a, b) => b.registered - a.registered); break
        }
        return list
    }, [query, activeCategory, sort, priceMax])

    return (
        <div className="min-h-screen pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-3">
                        Explore <span className="gradient-text">Events</span>
                    </h1>
                    <p className="text-gray-400 text-lg">Discover {MOCK_EVENTS.length} curated events from around the world</p>
                </div>

                {/* Search + Filter bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <div className="relative flex-1">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search events, locations, tags…"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="input-field pl-11"
                        />
                        {query && (
                            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Sort */}
                    <div className="relative">
                        <select
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                            className="input-field appearance-none pr-10 cursor-pointer min-w-[200px]"
                        >
                            {SORT_OPTIONS.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>

                    {/* Filter toggle */}
                    <button
                        onClick={() => setShow(!showFilters)}
                        className={`btn-secondary gap-2 ${showFilters ? 'bg-brand-600/20 text-brand-400 border-brand-500/30' : ''}`}
                    >
                        <SlidersHorizontal size={16} />
                        Filters
                    </button>

                    {/* View toggle */}
                    <div className="flex glass rounded-xl overflow-hidden">
                        <button
                            onClick={() => setViewGrid(true)}
                            className={`p-3 transition-colors ${viewGrid ? 'bg-brand-600/30 text-brand-400' : 'text-gray-500 hover:text-white'}`}
                        >
                            <Grid3X3 size={18} />
                        </button>
                        <button
                            onClick={() => setViewGrid(false)}
                            className={`p-3 transition-colors ${!viewGrid ? 'bg-brand-600/30 text-brand-400' : 'text-gray-500 hover:text-white'}`}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>

                {/* Expandable filters */}
                {showFilters && (
                    <div className="glass-dark rounded-2xl p-6 mb-8 animate-fade-in">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-3">Max Price: ${priceMax}</label>
                                <input
                                    type="range"
                                    min={0}
                                    max={500}
                                    step={10}
                                    value={priceMax}
                                    onChange={e => setPriceMax(Number(e.target.value))}
                                    className="w-full accent-brand-500 cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-600 mt-1">
                                    <span>Free</span><span>$500</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-3">Active filters</label>
                                <div className="flex flex-wrap gap-2">
                                    {activeCategory && (
                                        <button
                                            onClick={() => setCategory('')}
                                            className="badge bg-brand-500/20 text-brand-400 border border-brand-500/30 gap-1"
                                        >
                                            {CATEGORIES.find(c => c.id === activeCategory)?.label}
                                            <X size={10} />
                                        </button>
                                    )}
                                    {priceMax < 500 && (
                                        <button onClick={() => setPriceMax(500)}
                                            className="badge bg-gray-700 text-gray-300 border border-gray-600 gap-1"
                                        >
                                            Max ${priceMax} <X size={10} />
                                        </button>
                                    )}
                                    {!activeCategory && priceMax === 500 && (
                                        <span className="text-gray-500 text-sm">No active filters</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Category pills */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
                    <button
                        onClick={() => setCategory('')}
                        className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${!activeCategory ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30' : 'glass text-gray-400 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        All Events
                    </button>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${activeCategory === cat.id
                                ? `${cat.color} shadow-sm`
                                : 'glass border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Results count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-400 text-sm">
                        <span className="text-white font-semibold">{filtered.length}</span> events found
                    </p>
                </div>

                {/* Grid */}
                {filtered.length > 0 ? (
                    viewGrid ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filtered.map(event => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {filtered.map(event => (
                                <EventListRow key={event.id} event={event} />
                            ))}
                        </div>
                    )
                ) : (
                    <div className="text-center py-24">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="font-display font-bold text-2xl text-white mb-2">No events found</h3>
                        <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                        <button onClick={() => { setQuery(''); setCategory(''); setPriceMax(500) }}
                            className="btn-primary">
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

function EventListRow({ event }) {

    const cat = CATEGORIES.find(c => c.id === event.category)
    const pct = Math.round((event.registered / event.capacity) * 100)

    return (
        <a href={`/events/${event.id}`} className="block group">
            <div className="card flex gap-4 p-4 rounded-2xl hover:border-brand-500/30">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        {cat && <span className={`badge border ${cat.color} text-xs`}>{cat.label}</span>}
                        {event.trending && <span className="badge bg-accent-500/20 text-accent-400 border border-accent-500/30 text-xs">Trending</span>}
                    </div>
                    <h3 className="font-display font-semibold text-white group-hover:text-brand-300 transition-colors line-clamp-1 mb-1">{event.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-1 mb-2">{event.description}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                        <span>📅 {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span>📍 {event.location}</span>
                        <span>👥 {event.registered.toLocaleString()} / {event.capacity.toLocaleString()}</span>
                    </div>
                </div>
                <div className="shrink-0 flex flex-col items-end justify-between">
                    <span className="font-bold text-white">{event.price === 0 ? 'Free' : `$${event.price}`}</span>
                    <span className={`badge ${pct > 85 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                        {pct > 85 ? 'Almost Full' : 'Available'}
                    </span>
                </div>
            </div>
        </a>
    )
}
