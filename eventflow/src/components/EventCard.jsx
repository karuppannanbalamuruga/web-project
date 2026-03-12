import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, Clock, ArrowRight, TrendingUp } from 'lucide-react'
import { getCategoryInfo, formatDate, formatPrice, getCapacityPercent } from '../utils/helpers'

export default function EventCard({ event, featured = false }) {
    const cat = getCategoryInfo(event.category)
    const pct = getCapacityPercent(event.registered, event.capacity)

    return (
        <Link to={`/events/${event.id}`} className="block group">
            <div className={`card h-full flex flex-col ${featured ? 'rounded-3xl' : ''}`}>
                {/* Image */}
                <div className={`relative overflow-hidden ${featured ? 'h-56' : 'h-44'}`}>
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className={`badge border ${cat.color}`}>
                            {cat.label}
                        </span>
                        {event.trending && (
                            <span className="badge bg-accent-500/20 text-accent-400 border border-accent-500/30">
                                <TrendingUp size={10} /> Trending
                            </span>
                        )}
                    </div>

                    {/* Price */}
                    <div className="absolute top-3 right-3">
                        <span className="badge bg-gray-950/80 text-white border border-white/10 text-sm font-bold">
                            {formatPrice(event.price)}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display font-semibold text-white text-base mb-2 line-clamp-2 group-hover:text-brand-300 transition-colors">
                        {event.title}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                        {event.description}
                    </p>

                    <div className="mt-auto space-y-2">
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Calendar size={12} className="text-brand-400 shrink-0" />
                            <span>{formatDate(event.date)}</span>
                            <span className="mx-1 text-gray-600">·</span>
                            <Clock size={12} className="text-brand-400 shrink-0" />
                            <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <MapPin size={12} className="text-accent-400 shrink-0" />
                            <span className="truncate">{event.location}</span>
                        </div>

                        {/* Capacity bar */}
                        <div className="pt-2">
                            <div className="flex items-center justify-between text-xs mb-1.5">
                                <div className="flex items-center gap-1 text-gray-500">
                                    <Users size={10} />
                                    <span>{event.registered.toLocaleString()} registered</span>
                                </div>
                                <span className={`font-semibold ${pct > 85 ? 'text-red-400' : pct > 60 ? 'text-amber-400' : 'text-green-400'}`}>
                                    {pct}%
                                </span>
                            </div>
                            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-700 ${pct > 85 ? 'bg-red-500' : pct > 60 ? 'bg-amber-500' : 'bg-green-500'
                                        }`}
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-brand-400 text-xs font-medium pt-1 group-hover:gap-2 transition-all">
                            View Details <ArrowRight size={12} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
