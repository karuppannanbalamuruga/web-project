import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
    Calendar, MapPin, Users, Clock, ArrowLeft, Share2, Heart, Tag,
    CheckCircle, TrendingUp, User, Star, ChevronRight, Ticket
} from 'lucide-react'
import { MOCK_EVENTS, CATEGORIES } from '../data/events'
import { getCategoryInfo, formatDate, formatPrice, getCapacityPercent } from '../utils/helpers'
import EventCard from '../components/EventCard'

export default function EventDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [liked, setLiked] = useState(false)
    const [registered, setRegistered] = useState(false)
    const [qty, setQty] = useState(1)

    const event = MOCK_EVENTS.find(e => e.id === id)

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24">
                <div className="text-center">
                    <div className="text-7xl mb-4">🎭</div>
                    <h2 className="font-display font-bold text-3xl text-white mb-3">Event Not Found</h2>
                    <p className="text-gray-400 mb-6">This event may have ended or been removed.</p>
                    <Link to="/events" className="btn-primary">Back to Events</Link>
                </div>
            </div>
        )
    }

    const cat = getCategoryInfo(event.category)
    const pct = getCapacityPercent(event.registered, event.capacity)
    const related = MOCK_EVENTS.filter(e => e.category === event.category && e.id !== event.id).slice(0, 3)
    const spotsLeft = event.capacity - event.registered

    return (
        <div className="min-h-screen pt-24 pb-20">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <nav className="flex items-center gap-2 text-sm text-gray-500">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/events" className="hover:text-white transition-colors">Events</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-300 truncate">{event.title}</span>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* ── Main Content ── */}
                    <div className="lg:col-span-2">
                        {/* Hero image */}
                        <div className="relative rounded-3xl overflow-hidden mb-8 h-64 sm:h-80 lg:h-96">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />

                            {/* Back button */}
                            <button
                                onClick={() => navigate(-1)}
                                className="absolute top-4 left-4 p-2 glass rounded-xl hover:bg-white/10 transition-all"
                            >
                                <ArrowLeft size={18} />
                            </button>

                            {/* Actions */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button
                                    onClick={() => setLiked(!liked)}
                                    className={`p-2 glass rounded-xl transition-all ${liked ? 'text-red-400' : 'text-gray-300 hover:text-red-400'}`}
                                >
                                    <Heart size={18} className={liked ? 'fill-red-400' : ''} />
                                </button>
                                <button className="p-2 glass rounded-xl text-gray-300 hover:text-white transition-all">
                                    <Share2 size={18} />
                                </button>
                            </div>

                            {/* Badges */}
                            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                                <span className={`badge border ${cat.color}`}>{cat.label}</span>
                                {event.trending && (
                                    <span className="badge bg-accent-500/20 text-accent-400 border border-accent-500/30">
                                        <TrendingUp size={10} /> Trending
                                    </span>
                                )}
                                {event.featured && (
                                    <span className="badge bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                        <Star size={10} className="fill-amber-400" /> Featured
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Title & meta */}
                        <div className="mb-8">
                            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-4 leading-tight">
                                {event.title}
                            </h1>

                            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                {[
                                    { icon: Calendar, label: 'Date', value: formatDate(event.date), color: 'text-brand-400' },
                                    { icon: Clock, label: 'Time', value: `${event.time}${event.endDate !== event.date ? ` · ends ${formatDate(event.endDate)}` : ''}`, color: 'text-brand-400' },
                                    { icon: MapPin, label: 'Location', value: event.location, color: 'text-accent-400' },
                                    { icon: User, label: 'Organizer', value: event.organizer, color: 'text-purple-400' },
                                ].map(({ icon: Icon, label, value, color }) => (
                                    <div key={label} className="flex items-start gap-3 glass rounded-xl p-4">
                                        <Icon size={18} className={`${color} shrink-0 mt-0.5`} />
                                        <div>
                                            <div className="text-xs text-gray-500 mb-0.5">{label}</div>
                                            <div className="text-gray-200 text-sm font-medium">{value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {event.tags.map(tag => (
                                    <span key={tag} className="flex items-center gap-1 px-3 py-1.5 glass rounded-lg text-xs text-gray-400 border border-white/5">
                                        <Tag size={10} /> {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Description */}
                            <div className="prose-custom">
                                <h2 className="font-display font-bold text-xl text-white mb-3">About this Event</h2>
                                <p className="text-gray-300 leading-relaxed text-base">{event.description}</p>
                            </div>
                        </div>

                        {/* Capacity */}
                        <div className="glass-dark rounded-2xl p-6 mb-8">
                            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                                <Users size={18} className="text-brand-400" /> Attendance
                            </h3>
                            <div className="flex items-end gap-4 mb-3">
                                <div>
                                    <div className="font-display font-bold text-3xl text-white">{event.registered.toLocaleString()}</div>
                                    <div className="text-gray-500 text-sm">registered</div>
                                </div>
                                <div className="text-gray-600 text-lg">/</div>
                                <div>
                                    <div className="font-display font-bold text-3xl text-gray-400">{event.capacity.toLocaleString()}</div>
                                    <div className="text-gray-500 text-sm">capacity</div>
                                </div>
                                <div className="ml-auto">
                                    <span className={`badge text-base px-4 py-2 ${spotsLeft < 100 ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                            spotsLeft < 500 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                                'bg-green-500/20 text-green-400 border border-green-500/30'
                                        }`}>
                                        {spotsLeft.toLocaleString()} spots left
                                    </span>
                                </div>
                            </div>
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${pct > 85 ? 'bg-gradient-to-r from-red-600 to-red-400' :
                                            pct > 60 ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                                                'bg-gradient-to-r from-green-600 to-green-400'
                                        }`}
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                            <div className="text-right text-xs text-gray-500 mt-1">{pct}% filled</div>
                        </div>

                        {/* Related Events */}
                        {related.length > 0 && (
                            <div>
                                <h2 className="font-display font-bold text-2xl text-white mb-6">Similar Events</h2>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {related.map(e => <EventCard key={e.id} event={e} />)}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── Sidebar / Ticket Panel ── */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-4">
                            <div className="glass-dark rounded-3xl p-6 border border-white/10">
                                <div className="flex items-baseline justify-between mb-6">
                                    <div>
                                        <div className="text-gray-400 text-sm mb-1">Ticket Price</div>
                                        <div className="font-display font-extrabold text-4xl text-white">
                                            {formatPrice(event.price)}
                                        </div>
                                        {event.price > 0 && <div className="text-gray-500 text-xs mt-1">per person</div>}
                                    </div>
                                    <Ticket size={32} className="text-brand-400 opacity-60" />
                                </div>

                                {/* Quantity selector */}
                                {event.price > 0 && !registered && (
                                    <div className="mb-5">
                                        <label className="text-sm text-gray-400 mb-2 block">Tickets</label>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setQty(q => Math.max(1, q - 1))}
                                                className="w-9 h-9 glass rounded-xl text-white font-bold hover:bg-white/10 transition-all"
                                            >−</button>
                                            <span className="font-bold text-white text-xl w-8 text-center">{qty}</span>
                                            <button
                                                onClick={() => setQty(q => Math.min(10, q + 1))}
                                                className="w-9 h-9 glass rounded-xl text-white font-bold hover:bg-white/10 transition-all"
                                            >+</button>
                                            <span className="ml-auto font-bold text-xl text-white">${(event.price * qty).toLocaleString()}</span>
                                        </div>
                                    </div>
                                )}

                                {registered ? (
                                    <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl mb-5">
                                        <CheckCircle size={20} className="text-green-400 shrink-0" />
                                        <div>
                                            <div className="font-semibold text-green-300 text-sm">You're registered!</div>
                                            <div className="text-green-500 text-xs">Check your email for confirmation</div>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setRegistered(true)}
                                        className="btn-primary w-full justify-center text-base py-3 mb-3"
                                        disabled={spotsLeft === 0}
                                    >
                                        <Ticket size={18} />
                                        {spotsLeft === 0 ? 'Sold Out' : event.price === 0 ? 'Register Free' : `Buy ${qty > 1 ? qty + ' Tickets' : 'Ticket'}`}
                                    </button>
                                )}

                                <button className="btn-secondary w-full justify-center text-sm py-2.5">
                                    <Heart size={16} className={liked ? 'fill-red-400 text-red-400' : ''} />
                                    {liked ? 'Saved' : 'Save Event'}
                                </button>

                                <div className="mt-5 pt-5 border-t border-white/5 space-y-3 text-sm text-gray-400">
                                    <div className="flex items-center justify-between">
                                        <span>Organized by</span>
                                        <span className="text-white font-medium">{event.organizer}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Category</span>
                                        <span className={`badge border ${cat.color}`}>{cat.label}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Duration</span>
                                        <span className="text-white">
                                            {event.date === event.endDate ? '1 day' : `Multi-day`}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Share card */}
                            <div className="glass rounded-2xl p-5 text-center">
                                <Share2 size={20} className="text-brand-400 mx-auto mb-2" />
                                <p className="text-gray-400 text-sm mb-3">Share this event with friends</p>
                                <button className="btn-secondary w-full justify-center text-sm">Copy Link</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
