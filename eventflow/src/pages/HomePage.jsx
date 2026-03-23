import { Link } from "react-router-dom"
import { ArrowRight, Award, ChevronRight, ExternalLink, Mail, MapPin, Play, Star, Users, Zap } from "lucide-react"
import { EVENTS, STATS, TESTIMONIALS, PROFILE, SERVICES, AWARDS } from "../data/events"
import EventCard from "../components/EventCard"

function StatCard({ stat }) {
    return (
        <div className="card-stat text-center group hover:border-brand-500/20 cursor-default">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="font-display font-black text-3xl text-white mb-1 group-hover:gradient-text transition-all">{stat.value}</div>
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
        </div>
    )
}

function ServiceCard({ service }) {
    return (
        <div className={`${service.bg} border ${service.border} rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-default group`}
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}>
            <div className="text-4xl">{service.icon}</div>
            <h3 className="font-display font-bold text-white text-lg">{service.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
            <Link to={`/events?category=${service.id}`}
                className="mt-auto flex items-center gap-1 text-sm font-semibold text-white/60 hover:text-white transition-colors group-hover:gap-2">
                See work <ArrowRight size={14} />
            </Link>
        </div>
    )
}

export default function HomePage() {
    const featured = EVENTS.filter(e => e.featured).slice(0, 3)
    const recent = EVENTS.slice(0, 6)
    const visibleStats = STATS.slice(0, 4)

    return (
        <div className="min-h-screen">
            {/* ── HERO ── */}
            <section className="relative min-h-screen flex items-center pt-20 pb-16 hero-bg overflow-hidden">
                {/* Decorative rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/4 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-white/5 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-brand-500/10 pointer-events-none" />

                {/* Floating orbs */}
                <div className="absolute top-32 right-16 w-72 h-72 rounded-full bg-brand-600/10 blur-3xl animate-pulse-slow pointer-events-none" />
                <div className="absolute bottom-20 left-12 w-56 h-56 rounded-full bg-violet-600/8 blur-3xl animate-float pointer-events-none" />
                <div className="absolute top-1/4 left-1/3 w-40 h-40 rounded-full bg-accent-500/6 blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left copy */}
                        <div className="animate-slide-up">
                            {/* Available badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
                                style={{ background: "rgba(34,197,94,0.08)", borderColor: "rgba(34,197,94,0.2)" }}>
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-sm font-medium text-green-300">Currently Accepting New Clients</span>
                            </div>

                            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-white mb-5">
                                Creating <span className="gradient-text">Unforgettable</span>{" "}
                                <span className="block">Experiences</span>
                            </h1>

                            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
                                {PROFILE.tagline} Award-winning event management for{" "}
                                <span className="text-white font-medium">corporate, social & entertainment</span> clients worldwide.
                            </p>

                            <div className="flex flex-wrap gap-3 mb-10">
                                <Link to="/contact" className="btn-primary text-base px-7 py-3.5">
                                    <Mail size={16} />
                                    Hire Me for Your Event
                                </Link>
                                <Link to="/events" className="btn-secondary text-base px-7 py-3.5">
                                    View Portfolio <ArrowRight size={16} />
                                </Link>
                            </div>

                            {/* Quick stats */}
                            <div className="flex items-center gap-6 pt-6 border-t border-white/8">
                                {[
                                    { value: "200+", label: "Events" },
                                    { value: "500K+", label: "Guests" },
                                    { value: "4.9★", label: "Rating" },
                                    { value: "10+", label: "Years" },
                                ].map(s => (
                                    <div key={s.label}>
                                        <div className="font-display font-black text-xl text-white">{s.value}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — profile card */}
                        <div className="hidden lg:flex justify-center animate-fade-in">
                            <div className="relative">
                                {/* Main profile card */}
                                <div className="glass-card rounded-3xl overflow-hidden w-80"
                                    style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)" }}>
                                    <div className="relative h-52 bg-gradient-to-br from-brand-800/50 to-violet-900/50 overflow-hidden">
                                        <img src={PROFILE.avatar} alt={PROFILE.name}
                                            className="w-full h-full object-cover opacity-90" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="font-display font-bold text-xl text-white">{PROFILE.name}</h3>
                                            <p className="text-gray-300 text-sm">{PROFILE.title}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 grid grid-cols-3 gap-2 border-b border-white/8">
                                        {[{ v: "200+", l: "Events" }, { v: "10+", l: "Years" }, { v: "4.9", l: "Rating" }].map(s => (
                                            <div key={s.l} className="text-center py-2">
                                                <div className="font-display font-bold text-lg text-white">{s.v}</div>
                                                <div className="text-xs text-gray-500">{s.l}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4">
                                        <p className="text-gray-400 text-xs leading-relaxed mb-3">{PROFILE.bio.slice(0, 120)}...</p>
                                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <MapPin size={11} className="text-brand-400" /> {PROFILE.location}
                                        </span>
                                    </div>
                                </div>

                                {/* Floating award badge */}
                                <div className="absolute -top-4 -right-4 glass-card rounded-2xl p-3 flex items-center gap-2.5"
                                    style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                                        <Award size={16} className="text-amber-400" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white">12 Awards</div>
                                        <div className="text-xs text-gray-500">Industry Recognized</div>
                                    </div>
                                </div>

                                {/* Floating client satisfied */}
                                <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-3 flex items-center gap-2.5"
                                    style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                                    <div className="w-9 h-9 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                                        <Users size={16} className="text-green-400" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white">95+ Clients</div>
                                        <div className="text-xs text-gray-500">94% Retention Rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS BANNER ── */}
            <section className="py-16 border-y border-white/6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-950/30 via-transparent to-violet-950/20 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                        {STATS.map(s => (
                            <div key={s.label} className="text-center p-4 rounded-xl hover:bg-white/4 transition-colors cursor-default">
                                <div className="text-2xl mb-1">{s.icon}</div>
                                <div className="font-display font-black text-2xl text-white">{s.value}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="text-center mb-12">
                    <div className="badge bg-brand-500/15 text-brand-300 border border-brand-500/25 mb-4 mx-auto">
                        <Zap size={12} /> What I Do
                    </div>
                    <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">
                        Full-Spectrum <span className="gradient-text">Event Services</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        From intimate celebrations to stadium-scale productions — every detail, handled.
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {SERVICES.map(service => <ServiceCard key={service.id} service={service} />)}
                </div>
            </section>

            {/* ── FEATURED EVENTS ── */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <div className="badge bg-brand-500/15 text-brand-300 border border-brand-500/25 mb-3">
                            <Star size={12} /> Signature Work
                        </div>
                        <h2 className="font-display font-black text-4xl sm:text-5xl text-white">
                            Featured <span className="gradient-text">Events</span>
                        </h2>
                    </div>
                    <Link to="/events" className="btn-ghost text-sm hidden md:flex">
                        All Events <ChevronRight size={16} />
                    </Link>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map(e => <EventCard key={e.id} event={e} featured />)}
                </div>
                <div className="text-center mt-8 md:hidden">
                    <Link to="/events" className="btn-secondary">View All Events <ArrowRight size={16} /></Link>
                </div>
            </section>

            {/* ── MARQUEE CLIENTS ── */}
            <section className="py-14 border-y border-white/6 overflow-hidden">
                <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-6">Trusted by world-class clients</p>
                <div className="flex gap-12 items-center justify-center flex-wrap px-8">
                    {["Google", "Nike", "Goldman Sachs", "Live Nation", "United Nations", "NYRR", "Four Seasons"].map(c => (
                        <span key={c} className="font-display font-black text-lg text-gray-700 hover:text-gray-300 transition-colors cursor-default whitespace-nowrap">
                            {c}
                        </span>
                    ))}
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="text-center mb-12">
                    <div className="section-divider" />
                    <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-3">
                        What Clients <span className="gradient-text">Say</span>
                    </h2>
                    <p className="text-gray-400 text-base">Trusted by executives, celebrities, and private clients alike.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map(t => (
                        <div key={t.id} className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:border-brand-500/20 transition-all duration-300 hover:-translate-y-1"
                            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}>
                            <div className="flex gap-0.5">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                                ))}
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed italic flex-1">"{t.text}"</p>
                            <div className="flex items-center gap-3 border-t border-white/8 pt-4">
                                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                                <div>
                                    <p className="font-semibold text-white text-sm">{t.name}</p>
                                    <p className="text-xs text-gray-500">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── AWARDS STRIP ── */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
                <div className="text-center mb-10">
                    <h2 className="font-display font-bold text-3xl text-white mb-2">
                        Industry <span className="gradient-text">Recognition</span>
                    </h2>
                    <p className="text-gray-500 text-sm">Honored by leading event industry organizations</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {AWARDS.map((a, i) => (
                        <div key={i} className="glass-card rounded-xl px-5 py-4 flex items-center gap-4 hover:-translate-y-0.5 transition-all duration-300"
                            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.2)" }}>
                            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0">
                                <Award size={18} className="text-amber-400" />
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold text-white text-sm truncate">{a.title}</p>
                                <p className="text-xs text-gray-500 truncate">{a.org} · {a.year}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="py-24 px-4 sm:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-950/40 via-gray-950 to-violet-950/30 pointer-events-none" />
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[600px] h-full bg-brand-600/5 blur-3xl rounded-full pointer-events-none" />
                <div className="relative max-w-3xl mx-auto text-center">
                    <div className="badge bg-brand-500/15 text-brand-300 border border-brand-500/25 mb-6 mx-auto">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Available Now
                    </div>
                    <h2 className="font-display font-black text-5xl sm:text-6xl text-white mb-5 leading-tight">
                        Let's Make Your <span className="gradient-text">Event Legendary</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-10">
                        Tell me your vision and I'll transform it into an experience your guests will never forget.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/contact" className="btn-primary text-base px-8 py-4">
                            <Mail size={16} />
                            Start Planning Today
                        </Link>
                        <Link to="/events" className="btn-secondary text-base px-8 py-4">
                            Explore Portfolio <ExternalLink size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
