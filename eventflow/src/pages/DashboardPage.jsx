import { Link } from "react-router-dom"
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Award, Briefcase, Star, CheckCircle, ArrowRight, Download } from "lucide-react"
import { PROFILE, STATS, EXPERIENCE, TESTIMONIALS, AWARDS, SERVICES } from "../data/events"

export default function DashboardPage() {
    return (
        <div className="min-h-screen pt-20">
            {/* Header */}
            <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    {/* Profile card */}
                    <div className="lg:col-span-1">
                        <div className="glass-card rounded-3xl overflow-hidden sticky top-24"
                            style={{ boxShadow: "0 16px 60px rgba(0,0,0,0.4)" }}>
                            {/* Cover photo strip */}
                            <div className="h-28 bg-gradient-to-br from-brand-700 to-violet-800 relative">
                                <div className="absolute inset-0 opacity-30"
                                    style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)" }} />
                            </div>

                            {/* Avatar + info */}
                            <div className="px-6 pb-6">
                                <div className="flex items-end justify-between -mt-10 mb-4">
                                    <img src={PROFILE.avatar} alt={PROFILE.name}
                                        className="w-20 h-20 rounded-2xl object-cover border-4 border-gray-950 shadow-xl" />
                                    {PROFILE.available && (
                                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/25 text-xs font-medium text-green-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                            Available
                                        </span>
                                    )}
                                </div>
                                <h2 className="font-display font-black text-2xl text-white mb-0.5">{PROFILE.name}</h2>
                                <p className="text-brand-400 text-sm font-medium mb-3">{PROFILE.title}</p>
                                <p className="text-gray-400 text-sm leading-relaxed mb-5">{PROFILE.bio}</p>

                                {/* Contact info */}
                                <div className="space-y-2.5 mb-5 pb-5 border-b border-white/8">
                                    <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                                        <Mail size={14} className="text-brand-500 flex-shrink-0" /> {PROFILE.email}
                                    </a>
                                    <span className="flex items-center gap-2.5 text-sm text-gray-400">
                                        <Phone size={14} className="text-brand-500 flex-shrink-0" /> {PROFILE.phone}
                                    </span>
                                    <span className="flex items-center gap-2.5 text-sm text-gray-400">
                                        <MapPin size={14} className="text-brand-500 flex-shrink-0" /> {PROFILE.location}
                                    </span>
                                </div>

                                {/* Social */}
                                <div className="flex gap-2.5 mb-5">
                                    {[
                                        { icon: Instagram, href: `https://instagram.com/${PROFILE.instagram}`, label: "Instagram" },
                                        { icon: Linkedin, href: `https://linkedin.com/in/${PROFILE.linkedin}`, label: "LinkedIn" },
                                        { icon: Twitter, href: `https://twitter.com/${PROFILE.twitter}`, label: "Twitter" },
                                        { icon: Mail, href: `mailto:${PROFILE.email}`, label: "Email" },
                                    ].map(({ icon: Icon, href, label }) => (
                                        <a key={label} href={href} aria-label={label}
                                            className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-600/20 hover:border-brand-500/30 transition-all">
                                            <Icon size={15} />
                                        </a>
                                    ))}
                                </div>

                                <Link to="/contact" className="btn-primary w-full justify-center">
                                    <Mail size={15} /> Hire Me
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right — content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Stats grid */}
                        <div>
                            <h2 className="font-display font-bold text-3xl text-white mb-6">By The Numbers</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {STATS.map(s => (
                                    <div key={s.label} className="glass-card rounded-2xl p-5 text-center hover:-translate-y-1 transition-all duration-300 cursor-default"
                                        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
                                        <div className="text-3xl mb-2">{s.icon}</div>
                                        <div className="font-display font-black text-2xl text-white mb-1">{s.value}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Experience */}
                        <div>
                            <h2 className="font-display font-bold text-3xl text-white mb-6 flex items-center gap-3">
                                <Briefcase size={24} className="text-brand-400" /> Professional Journey
                            </h2>
                            <div className="relative pl-5">
                                {/* Timeline line */}
                                <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-brand-500 via-violet-500 to-transparent" />

                                <div className="space-y-6">
                                    {EXPERIENCE.map((exp, i) => (
                                        <div key={exp.id} className="relative pl-8">
                                            {/* Dot */}
                                            <div className={`absolute -left-2 top-1.5 w-4 h-4 rounded-full border-2 ${i === 0 ? "bg-brand-500 border-brand-400" : "bg-gray-800 border-gray-600"
                                                }`} />

                                            <div className="glass-card rounded-2xl p-5 hover:border-brand-500/20 transition-all duration-300"
                                                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
                                                <div className="flex items-start justify-between gap-3 mb-2">
                                                    <div>
                                                        <h3 className="font-display font-bold text-white text-lg">{exp.role}</h3>
                                                        <p className="text-brand-400 text-sm font-medium">{exp.company}</p>
                                                    </div>
                                                    <div className="text-right flex-shrink-0">
                                                        <span className="text-xs text-gray-500 font-medium">{exp.period}</span>
                                                        {exp.type === "own" && (
                                                            <span className="block text-xs badge bg-brand-500/15 text-brand-300 border border-brand-500/25 mt-1">Founder</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-gray-400 text-sm leading-relaxed mb-3">{exp.description}</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {exp.tags.map(tag => (
                                                        <span key={tag} className="tag-pill">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        <div id="services">
                            <h2 className="font-display font-bold text-3xl text-white mb-6">Services Offered</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {SERVICES.map(s => (
                                    <div key={s.id} className={`${s.bg} border ${s.border} rounded-2xl p-5 flex items-start gap-4 hover:-translate-y-0.5 transition-all duration-300`}
                                        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
                                        <span className="text-3xl flex-shrink-0">{s.icon}</span>
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">{s.title}</h3>
                                            <p className="text-gray-400 text-xs leading-relaxed">{s.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Awards */}
            <section id="awards" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/8">
                <div className="text-center mb-10">
                    <h2 className="font-display font-bold text-4xl text-white mb-2">
                        Awards & <span className="gradient-text">Recognition</span>
                    </h2>
                    <p className="text-gray-500 text-sm">Honored by the leading organizations in the events industry</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {AWARDS.map((a, i) => (
                        <div key={i} className="glass-card rounded-xl px-5 py-4 flex items-center gap-4 hover:-translate-y-0.5 transition-all duration-300">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0">
                                <Award size={18} className="text-amber-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-white text-sm">{a.title}</p>
                                <p className="text-xs text-gray-500">{a.org} · {a.year}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="font-display font-bold text-4xl text-white mb-2">
                        Client <span className="gradient-text">Testimonials</span>
                    </h2>
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
                                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <p className="font-semibold text-white text-sm">{t.name}</p>
                                    <p className="text-xs text-gray-500">{t.role}</p>
                                    <p className="text-xs text-brand-500">{t.event}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
