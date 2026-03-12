import { Link } from 'react-router-dom'
import {
    ArrowRight, Zap, Star, TrendingUp, Calendar, MapPin,
    ChevronRight, Play, Shield, Globe, BarChart3, Users
} from 'lucide-react'
import { MOCK_EVENTS, STATS, TESTIMONIALS, CATEGORIES } from '../data/events'
import { getCategoryInfo, formatDate, formatPrice } from '../utils/helpers'
import EventCard from '../components/EventCard'

const FEATURED = MOCK_EVENTS.filter(e => e.featured)
const TRENDING = MOCK_EVENTS.filter(e => e.trending).slice(0, 4)

const FEATURES = [
    {
        icon: Calendar,
        title: 'Smart Scheduling',
        desc: 'AI-powered scheduling suggestions that avoid conflicts and maximize attendance.',
        color: 'from-brand-500 to-brand-700',
    },
    {
        icon: BarChart3,
        title: 'Real-time Analytics',
        desc: 'Track registrations, revenue, and engagement with live dashboards.',
        color: 'from-purple-500 to-purple-700',
    },
    {
        icon: Shield,
        title: 'Secure Payments',
        desc: 'Built-in PCI-compliant payment processing with fraud protection.',
        color: 'from-green-500 to-teal-700',
    },
    {
        icon: Globe,
        title: 'Global Reach',
        desc: 'Multi-currency, multi-language support for events across 180+ countries.',
        color: 'from-accent-500 to-accent-700',
    },
]

export default function HomePage() {
    const heroEvent = FEATURED[0]

    return (
        <div className="pt-24">
            {/* ── Hero ── */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden">
                {/* Background blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl animate-float" />
                    <div className="absolute top-20 right-0 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
                    <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left copy */}
                        <div className="animate-slide-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-brand-300 font-medium mb-6 border border-brand-500/20">
                                <Zap size={14} className="text-brand-400" />
                                The #1 Event Management Platform
                            </div>

                            <h1 className="font-display font-extrabold text-5xl sm:text-6xl xl:text-7xl leading-tight mb-6 text-balance">
                                Discover &amp; Host{' '}
                                <span className="gradient-text">Extraordinary</span>
                                {' '}Events
                            </h1>

                            <p className="text-gray-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
                                EventFlow makes it effortless to find, create and manage world-class events.
                                Join 2.8 million attendees already using our platform.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link to="/events" className="btn-primary text-base px-6 py-3">
                                    Explore Events <ArrowRight size={18} />
                                </Link>
                                <Link to="/create" className="btn-secondary text-base px-6 py-3">
                                    <Play size={16} className="fill-white" /> Host an Event
                                </Link>
                            </div>

                            {/* Social proof */}
                            <div className="flex items-center gap-3 mt-8">
                                <div className="flex -space-x-2">
                                    {[
                                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&q=80',
                                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&q=80',
                                        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&q=80',
                                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&q=80',
                                    ].map((src, i) => (
                                        <img key={i} src={src} alt="" className="w-9 h-9 rounded-full ring-2 ring-gray-950 object-cover" />
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
                                        <span className="text-white font-semibold text-sm ml-1">4.9</span>
                                    </div>
                                    <p className="text-gray-500 text-xs">Trusted by 2.8M+ attendees</p>
                                </div>
                            </div>
                        </div>

                        {/* Right — featured event card */}
                        {heroEvent && (
                            <div className="animate-slide-up hidden lg:block" style={{ animationDelay: '0.2s' }}>
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-brand-600/10 rounded-3xl blur-xl" />
                                    <div className="relative card rounded-3xl overflow-hidden">
                                        <div className="relative h-64">
                                            <img src={heroEvent.image} alt={heroEvent.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <span className={`badge border ${getCategoryInfo(heroEvent.category).color} mb-2`}>
                                                    {getCategoryInfo(heroEvent.category).label}
                                                </span>
                                                <h3 className="font-display font-bold text-white text-xl line-clamp-2">{heroEvent.title}</h3>
                                            </div>
                                        </div>
                                        <div className="p-5 grid grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2 text-gray-300 text-sm">
                                                <Calendar size={14} className="text-brand-400" />
                                                {formatDate(heroEvent.date)}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-300 text-sm">
                                                <MapPin size={14} className="text-accent-400" />
                                                Austin TX
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-300 text-sm">
                                                <Users size={14} className="text-green-400" />
                                                {heroEvent.registered.toLocaleString()} going
                                            </div>
                                            <div className="font-bold text-white text-right text-lg">{formatPrice(heroEvent.price)}</div>
                                        </div>
                                        <div className="px-5 pb-5">
                                            <Link to={`/events/${heroEvent.id}`} className="btn-primary w-full justify-center">
                                                Get Tickets <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Stats ── */}
            <section className="py-12 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {STATS.map(({ label, value }) => (
                            <div key={label} className="text-center py-4">
                                <div className="font-display font-extrabold text-3xl sm:text-4xl gradient-text mb-1">{value}</div>
                                <div className="text-gray-400 text-sm">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Featured Events ── */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-brand-400 text-sm font-semibold mb-2">
                            <Star size={14} className="fill-brand-400" /> Featured Events
                        </div>
                        <h2 className="section-title text-3xl sm:text-4xl">Handpicked for You</h2>
                    </div>
                    <Link to="/events" className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors group">
                        View all <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURED.map(event => (
                        <EventCard key={event.id} event={event} featured />
                    ))}
                </div>
            </section>

            {/* ── Categories ── */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="section-title text-3xl sm:text-4xl mb-3">Browse by Category</h2>
                    <p className="text-gray-400">Find events that match your passion</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {CATEGORIES.map(cat => (
                        <Link
                            key={cat.id}
                            to={`/events?category=${cat.id}`}
                            className="group glass rounded-2xl p-5 text-center hover:bg-white/10 transition-all hover:-translate-y-1"
                        >
                            <div className={`badge ${cat.color} border mx-auto mb-3 text-sm px-4 py-1.5`}>
                                {cat.label}
                            </div>
                            <div className="text-gray-500 text-xs">Explore →</div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── Trending Events ── */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-accent-400 text-sm font-semibold mb-2">
                            <TrendingUp size={14} /> Trending Now
                        </div>
                        <h2 className="section-title text-3xl sm:text-4xl">What&apos;s Hot</h2>
                    </div>
                    <Link to="/events" className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors group">
                        View all <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {TRENDING.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </section>

            {/* ── Features ── */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <h2 className="section-title text-3xl sm:text-4xl mb-3">
                        Everything You Need to{' '}
                        <span className="gradient-text">Succeed</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Powerful tools designed for modern event creators and attendees alike.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map(({ icon: Icon, title, desc, color }) => (
                        <div key={title} className="card p-6">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg`}>
                                <Icon size={22} className="text-white" />
                            </div>
                            <h3 className="font-display font-semibold text-white mb-2">{title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <h2 className="section-title text-3xl sm:text-4xl mb-3">Loved by Event Makers</h2>
                    <p className="text-gray-400">Don&apos;t take our word for it</p>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                    {TESTIMONIALS.map(({ name, role, avatar, text, rating }) => (
                        <div key={name} className="card p-6">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(rating)].map((_, i) => (
                                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                                ))}
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">&ldquo;{text}&rdquo;</p>
                            <div className="flex items-center gap-3">
                                <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/30" />
                                <div>
                                    <div className="font-semibold text-white text-sm">{name}</div>
                                    <div className="text-gray-500 text-xs">{role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-purple-800 p-10 sm:p-16 text-center">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent-500/20 rounded-full blur-2xl" />
                    </div>
                    <div className="relative">
                        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mb-4 text-balance">
                            Ready to Host Your Next Event?
                        </h2>
                        <p className="text-brand-200 text-lg mb-8 max-w-lg mx-auto">
                            Join 8,500+ organizers who trust EventFlow to create unforgettable experiences.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link to="/create" className="btn-accent text-base px-8 py-3">
                                Start for Free <ArrowRight size={18} />
                            </Link>
                            <Link to="/events" className="btn-secondary text-base px-8 py-3 border-white/20">
                                Explore Events
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
