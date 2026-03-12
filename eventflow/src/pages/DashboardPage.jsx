import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    BarChart3, Users, DollarSign, TrendingUp, Calendar, Eye,
    Plus, ArrowUpRight, ArrowDownRight, MoreHorizontal, Edit,
    Trash2, Copy, Bell, Settings, ChevronRight, Activity,
    CheckCircle, Clock, AlertCircle
} from 'lucide-react'
import { MOCK_EVENTS } from '../data/events'
import { getCategoryInfo, formatDate, formatPrice } from '../utils/helpers'

const OWNED = MOCK_EVENTS.slice(0, 4).map((e, i) => ({
    ...e,
    status: i === 0 ? 'live' : i === 1 ? 'upcoming' : 'draft',
    revenue: e.registered * e.price,
}))

const STAT_CARDS = [
    {
        label: 'Total Revenue',
        value: '$42,850',
        change: '+18.2%',
        up: true,
        icon: DollarSign,
        color: 'from-green-500 to-teal-600',
        bg: 'bg-green-500/10 border-green-500/20',
    },
    {
        label: 'Total Attendees',
        value: '8,426',
        change: '+12.5%',
        up: true,
        icon: Users,
        color: 'from-brand-500 to-brand-700',
        bg: 'bg-brand-500/10 border-brand-500/20',
    },
    {
        label: 'Events Hosted',
        value: '24',
        change: '+4 this month',
        up: true,
        icon: Calendar,
        color: 'from-purple-500 to-purple-700',
        bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
        label: 'Avg. Fill Rate',
        value: '78%',
        change: '-2.1%',
        up: false,
        icon: Activity,
        color: 'from-accent-500 to-accent-700',
        bg: 'bg-accent-500/10 border-accent-500/20',
    },
]

const RECENT_REGISTRATIONS = [
    { name: 'Emma Thompson', event: 'Neon Nights Festival', time: '2 min ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&q=80' },
    { name: 'Liam Rodriguez', event: 'AI & Tech Summit', time: '15 min ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&q=80' },
    { name: 'Aisha Patel', event: 'Urban Canvas Fair', time: '32 min ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&q=80' },
    { name: 'Noah Kim', event: 'Neon Nights Festival', time: '1 hr ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&q=80' },
    { name: 'Sofia Martinez', event: 'AI & Tech Summit', time: '2 hrs ago', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&q=80' },
]

const STATUS_MAP = {
    live: { label: 'Live', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: Activity },
    upcoming: { label: 'Upcoming', color: 'bg-brand-500/20 text-brand-400 border-brand-500/30', icon: Clock },
    draft: { label: 'Draft', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', icon: AlertCircle },
    ended: { label: 'Ended', color: 'bg-gray-700/40 text-gray-500 border-gray-600/30', icon: CheckCircle },
}

const TABS = ['Overview', 'My Events', 'Registrations', 'Analytics']

export default function DashboardPage() {
    const [tab, setTab] = useState('Overview')
    const [openMenu, setOpenMenu] = useState(null)

    return (
        <div className="min-h-screen pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <p className="text-gray-500 text-sm mb-1">Welcome back 👋</p>
                        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                            Your <span className="gradient-text">Dashboard</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2.5 glass rounded-xl text-gray-400 hover:text-white transition-all relative">
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full" />
                        </button>
                        <button className="p-2.5 glass rounded-xl text-gray-400 hover:text-white transition-all">
                            <Settings size={18} />
                        </button>
                        <Link to="/create" className="btn-primary">
                            <Plus size={16} /> New Event
                        </Link>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {STAT_CARDS.map(({ label, value, change, up, icon: Icon, color, bg }) => (
                        <div key={label} className={`glass-dark rounded-2xl p-5 border ${bg}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                                    <Icon size={18} className="text-white" />
                                </div>
                                <span className={`flex items-center gap-1 text-xs font-semibold ${up ? 'text-green-400' : 'text-red-400'}`}>
                                    {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                    {change}
                                </span>
                            </div>
                            <div className="font-display font-bold text-2xl text-white mb-1">{value}</div>
                            <div className="text-gray-500 text-xs">{label}</div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-1 glass rounded-xl p-1 mb-8 overflow-x-auto">
                    {TABS.map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shrink-0 ${tab === t ? 'bg-brand-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                {tab === 'Overview' && (
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* My Events preview */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-display font-semibold text-xl text-white">Active Events</h2>
                                <button onClick={() => setTab('My Events')} className="text-brand-400 text-sm hover:text-brand-300 flex items-center gap-1">
                                    View all <ChevronRight size={14} />
                                </button>
                            </div>
                            <div className="space-y-3">
                                {OWNED.map(event => <EventRow key={event.id} event={event} openMenu={openMenu} setOpenMenu={setOpenMenu} />)}
                            </div>
                        </div>

                        {/* Right column */}
                        <div className="space-y-6">
                            {/* Recent registrations */}
                            <div className="glass-dark rounded-2xl p-5 border border-white/5">
                                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                                    <Users size={16} className="text-brand-400" /> Recent Registrations
                                </h3>
                                <div className="space-y-3">
                                    {RECENT_REGISTRATIONS.map(({ name, event, time, avatar }) => (
                                        <div key={name} className="flex items-center gap-3">
                                            <img src={avatar} alt={name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm text-white font-medium truncate">{name}</div>
                                                <div className="text-xs text-gray-500 truncate">{event}</div>
                                            </div>
                                            <span className="text-xs text-gray-600 shrink-0">{time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick stats */}
                            <div className="glass-dark rounded-2xl p-5 border border-white/5">
                                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                                    <BarChart3 size={16} className="text-purple-400" /> This Month
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Page Views', value: '12,400', bar: 80 },
                                        { label: 'Conversions', value: '8.4%', bar: 40 },
                                        { label: 'Avg. Revenue', value: '$1,785', bar: 60 },
                                    ].map(({ label, value, bar }) => (
                                        <div key={label}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-400">{label}</span>
                                                <span className="text-white font-semibold">{value}</span>
                                            </div>
                                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-brand-600 to-purple-500 rounded-full" style={{ width: `${bar}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {tab === 'My Events' && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-400 text-sm"><span className="text-white font-semibold">{OWNED.length}</span> events</p>
                            <Link to="/create" className="btn-primary text-sm">
                                <Plus size={14} /> Create New
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {OWNED.map(event => <EventRow key={event.id} event={event} openMenu={openMenu} setOpenMenu={setOpenMenu} detailed />)}
                        </div>
                    </div>
                )}

                {tab === 'Registrations' && (
                    <div>
                        <h2 className="font-display font-semibold text-xl text-white mb-6">Registration Feed</h2>
                        <div className="glass-dark rounded-2xl border border-white/5 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/5 text-left">
                                        <th className="px-5 py-4 text-gray-400 font-medium">Attendee</th>
                                        <th className="px-5 py-4 text-gray-400 font-medium hidden sm:table-cell">Event</th>
                                        <th className="px-5 py-4 text-gray-400 font-medium hidden md:table-cell">Amount</th>
                                        <th className="px-5 py-4 text-gray-400 font-medium">Time</th>
                                        <th className="px-5 py-4 text-gray-400 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ...RECENT_REGISTRATIONS,
                                        { name: 'Carlos Mendez', event: 'Global Marathon', time: '3 hrs ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&q=80' },
                                        { name: 'Yuki Tanaka', event: 'Web3 Hackathon', time: '5 hrs ago', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&q=80' },
                                    ].map(({ name, event, time, avatar }, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-3">
                                                    <img src={avatar} alt={name} className="w-8 h-8 rounded-full object-cover" />
                                                    <span className="text-gray-200 font-medium">{name}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 text-gray-400 hidden sm:table-cell">{event}</td>
                                            <td className="px-5 py-3 text-white font-semibold hidden md:table-cell">${(Math.random() * 300 + 50 | 0)}</td>
                                            <td className="px-5 py-3 text-gray-500 text-xs">{time}</td>
                                            <td className="px-5 py-3">
                                                <span className="badge bg-green-500/20 text-green-400 border border-green-500/30">Confirmed</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {tab === 'Analytics' && (
                    <div className="space-y-6">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { label: 'Total Views', value: '84,200', icon: Eye, color: 'text-brand-400' },
                                { label: 'Click-through', value: '6.2%', icon: TrendingUp, color: 'text-green-400' },
                                { label: 'Avg. Ticket Value', value: '$127', icon: DollarSign, color: 'text-amber-400' },
                                { label: 'Repeat Attendees', value: '34%', icon: Users, color: 'text-purple-400' },
                            ].map(({ label, value, icon: Icon, color }) => (
                                <div key={label} className="glass-dark rounded-2xl p-5 border border-white/5">
                                    <Icon size={20} className={`${color} mb-3`} />
                                    <div className="font-display font-bold text-2xl text-white mb-1">{value}</div>
                                    <div className="text-gray-500 text-xs">{label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Simulated bar chart */}
                        <div className="glass-dark rounded-2xl p-6 border border-white/5">
                            <h3 className="font-semibold text-white mb-6">Monthly Revenue</h3>
                            <div className="flex items-end gap-2 h-40">
                                {[35, 60, 45, 80, 55, 95, 70, 88, 65, 100, 78, 92].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                        <div
                                            className="w-full rounded-t-lg bg-gradient-to-t from-brand-700 to-brand-500 hover:from-brand-600 hover:to-brand-400 transition-colors cursor-pointer"
                                            style={{ height: `${h}%` }}
                                            title={`$${(h * 500).toLocaleString()}`}
                                        />
                                        <span className="text-gray-600 text-[10px] hidden sm:block">
                                            {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function EventRow({ event, openMenu, setOpenMenu, detailed = false }) {
    const cat = getCategoryInfo(event.category)
    const status = STATUS_MAP[event.status] || STATUS_MAP.draft
    const StatusIcon = status.icon
    const pct = Math.round((event.registered / event.capacity) * 100)

    return (
        <div className="glass-dark rounded-2xl p-4 border border-white/5 hover:border-brand-500/20 transition-all group">
            <div className="flex items-center gap-4">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`badge border text-xs ${cat.color}`}>{cat.label}</span>
                        <span className={`badge border text-xs ${status.color}`}>
                            <StatusIcon size={10} /> {status.label}
                        </span>
                    </div>
                    <h3 className="font-semibold text-white truncate text-sm">{event.title}</h3>
                    {detailed && (
                        <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-3">
                            <span>📅 {formatDate(event.date)}</span>
                            <span>📍 {event.location}</span>
                        </div>
                    )}
                </div>

                <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                    <div className="font-bold text-white text-sm">{formatPrice(event.price)}</div>
                    <div className="text-gray-500 text-xs">{event.registered.toLocaleString()} registered</div>
                </div>

                {/* Capacity bar */}
                <div className="hidden md:block w-20 shrink-0">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${pct > 85 ? 'bg-red-500' : pct > 60 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
                    </div>
                </div>

                {/* Actions */}
                <div className="relative shrink-0">
                    <button
                        onClick={() => setOpenMenu(openMenu === event.id ? null : event.id)}
                        className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                        <MoreHorizontal size={18} />
                    </button>
                    {openMenu === event.id && (
                        <div className="absolute right-0 top-full mt-1 w-44 glass-dark rounded-xl border border-white/10 shadow-xl z-20 overflow-hidden">
                            {[
                                { icon: Eye, label: 'View Event', action: () => { } },
                                { icon: Edit, label: 'Edit', action: () => { } },
                                { icon: Copy, label: 'Duplicate', action: () => { } },
                                { icon: Trash2, label: 'Delete', action: () => { }, danger: true },
                            ].map(({ icon: Icon, label, action, danger }) => (
                                <button
                                    key={label}
                                    onClick={() => { action(); setOpenMenu(null) }}
                                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors ${danger ? 'text-red-400 hover:text-red-300' : 'text-gray-300 hover:text-white'}`}
                                >
                                    <Icon size={14} /> {label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
