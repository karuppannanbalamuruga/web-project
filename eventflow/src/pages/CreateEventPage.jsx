import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Calendar, MapPin, DollarSign, Users, Image, Tag,
    ChevronRight, CheckCircle, ArrowLeft, Clock, Info,
    Zap, FileText, Settings
} from 'lucide-react'
import { CATEGORIES } from '../data/events'

const STEPS = [
    { id: 1, label: 'Basics', icon: FileText },
    { id: 2, label: 'Details', icon: Settings },
    { id: 3, label: 'Tickets', icon: Zap },
    { id: 4, label: 'Review', icon: CheckCircle },
]

const INITIAL = {
    title: '', description: '', category: '', date: '', endDate: '',
    time: '', location: '', image: '', organizer: '',
    capacity: '', price: '', tags: '', isFree: false,
}

export default function CreateEventPage() {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [form, setForm] = useState(INITIAL)
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

    const update = (field, value) => {
        setForm(f => ({ ...f, [field]: value }))
        if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
    }

    const validateStep = (s) => {
        const errs = {}
        if (s === 1) {
            if (!form.title.trim()) errs.title = 'Title is required'
            if (!form.description.trim()) errs.description = 'Description is required'
            if (!form.category) errs.category = 'Please select a category'
        }
        if (s === 2) {
            if (!form.date) errs.date = 'Start date is required'
            if (!form.time) errs.time = 'Start time is required'
            if (!form.location.trim()) errs.location = 'Location is required'
        }
        if (s === 3) {
            if (!form.capacity) errs.capacity = 'Capacity is required'
            if (!form.isFree && !form.price) errs.price = 'Set a price or mark as free'
        }
        return errs
    }

    const nextStep = () => {
        const errs = validateStep(step)
        if (Object.keys(errs).length) { setErrors(errs); return }
        setStep(s => s + 1)
    }

    const handleSubmit = () => {
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24 pb-20 px-4">
                <div className="text-center max-w-lg animate-slide-up">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30">
                        <CheckCircle size={36} className="text-white" />
                    </div>
                    <h1 className="font-display font-extrabold text-4xl text-white mb-3">Event Created! 🎉</h1>
                    <p className="text-gray-400 text-lg mb-8">
                        <strong className="text-white">"{form.title}"</strong> has been submitted for review. You'll receive a confirmation shortly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button onClick={() => navigate('/dashboard')} className="btn-primary text-base px-8 py-3">
                            Go to Dashboard
                        </button>
                        <button onClick={() => { setSubmitted(false); setStep(1); setForm(INITIAL) }} className="btn-secondary text-base px-8 py-3">
                            Create Another
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-28 pb-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <button onClick={() => step > 1 ? setStep(s => s - 1) : navigate(-1)}
                        className="p-2 glass rounded-xl hover:bg-white/10 transition-all">
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">Create Event</h1>
                        <p className="text-gray-400 mt-1">Step {step} of {STEPS.length}</p>
                    </div>
                </div>

                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
                    {STEPS.map((s, i) => {
                        const Icon = s.icon
                        const done = step > s.id
                        const active = step === s.id
                        return (
                            <div key={s.id} className="flex items-center gap-2 shrink-0">
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${active ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30' :
                                        done ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                            'glass text-gray-500 border-white/5'
                                    }`}>
                                    {done
                                        ? <CheckCircle size={16} className="text-green-400" />
                                        : <Icon size={16} />
                                    }
                                    <span className="text-sm font-medium">{s.label}</span>
                                </div>
                                {i < STEPS.length - 1 && (
                                    <ChevronRight size={14} className={`${step > s.id ? 'text-green-500' : 'text-gray-700'} shrink-0`} />
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Form card */}
                <div className="glass-dark rounded-3xl p-6 sm:p-8 border border-white/10 animate-fade-in">
                    {/* STEP 1 – Basics */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="font-display font-bold text-2xl text-white mb-6">Event Basics</h2>

                            <FormField label="Event Title" error={errors.title} required>
                                <input
                                    type="text"
                                    placeholder="e.g. Neon Nights Music Festival"
                                    value={form.title}
                                    onChange={e => update('title', e.target.value)}
                                    className="input-field"
                                />
                            </FormField>

                            <FormField label="Description" error={errors.description} required>
                                <textarea
                                    placeholder="Describe your event — what makes it special, what attendees can expect…"
                                    value={form.description}
                                    onChange={e => update('description', e.target.value)}
                                    rows={5}
                                    className="input-field resize-none"
                                />
                            </FormField>

                            <FormField label="Category" error={errors.category} required>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => update('category', cat.id)}
                                            className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${form.category === cat.id
                                                    ? `${cat.color} shadow-sm`
                                                    : 'glass border-white/5 text-gray-400 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </FormField>

                            <FormField label="Organizer / Company Name">
                                <input
                                    type="text"
                                    placeholder="Your name or organization"
                                    value={form.organizer}
                                    onChange={e => update('organizer', e.target.value)}
                                    className="input-field"
                                />
                            </FormField>

                            <FormField label="Event Cover Image URL">
                                <div className="relative">
                                    <Image size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        type="url"
                                        placeholder="https://…"
                                        value={form.image}
                                        onChange={e => update('image', e.target.value)}
                                        className="input-field pl-10"
                                    />
                                </div>
                                {form.image && (
                                    <img src={form.image} alt="preview" className="mt-3 h-40 w-full object-cover rounded-xl" onError={e => e.target.style.display = 'none'} />
                                )}
                            </FormField>
                        </div>
                    )}

                    {/* STEP 2 – Details */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="font-display font-bold text-2xl text-white mb-6">Date, Time &amp; Location</h2>

                            <div className="grid sm:grid-cols-2 gap-5">
                                <FormField label="Start Date" error={errors.date} required>
                                    <div className="relative">
                                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <input
                                            type="date"
                                            value={form.date}
                                            onChange={e => update('date', e.target.value)}
                                            className="input-field pl-10"
                                        />
                                    </div>
                                </FormField>

                                <FormField label="End Date">
                                    <div className="relative">
                                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <input
                                            type="date"
                                            value={form.endDate}
                                            min={form.date}
                                            onChange={e => update('endDate', e.target.value)}
                                            className="input-field pl-10"
                                        />
                                    </div>
                                </FormField>
                            </div>

                            <FormField label="Start Time" error={errors.time} required>
                                <div className="relative">
                                    <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        type="time"
                                        value={form.time}
                                        onChange={e => update('time', e.target.value)}
                                        className="input-field pl-10"
                                    />
                                </div>
                            </FormField>

                            <FormField label="Location / Venue" error={errors.location} required>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Venue name, city, state"
                                        value={form.location}
                                        onChange={e => update('location', e.target.value)}
                                        className="input-field pl-10"
                                    />
                                </div>
                            </FormField>

                            <FormField label="Tags (comma separated)">
                                <div className="relative">
                                    <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Music, Outdoor, Festival"
                                        value={form.tags}
                                        onChange={e => update('tags', e.target.value)}
                                        className="input-field pl-10"
                                    />
                                </div>
                            </FormField>
                        </div>
                    )}

                    {/* STEP 3 – Tickets */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="font-display font-bold text-2xl text-white mb-6">Tickets &amp; Capacity</h2>

                            <FormField label="Max Capacity" error={errors.capacity} required>
                                <div className="relative">
                                    <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        type="number"
                                        placeholder="e.g. 500"
                                        min={1}
                                        value={form.capacity}
                                        onChange={e => update('capacity', e.target.value)}
                                        className="input-field pl-10"
                                    />
                                </div>
                            </FormField>

                            <div>
                                <label className="flex items-center gap-3 cursor-pointer mb-5">
                                    <div
                                        onClick={() => update('isFree', !form.isFree)}
                                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${form.isFree ? 'bg-brand-600' : 'bg-gray-700'}`}
                                    >
                                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${form.isFree ? 'translate-x-6' : ''}`} />
                                    </div>
                                    <span className="text-gray-200 font-medium">This is a free event</span>
                                </label>

                                {!form.isFree && (
                                    <FormField label="Ticket Price (USD)" error={errors.price}>
                                        <div className="relative">
                                            <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                            <input
                                                type="number"
                                                placeholder="0.00"
                                                min={0}
                                                step={0.01}
                                                value={form.price}
                                                onChange={e => update('price', e.target.value)}
                                                className="input-field pl-10"
                                            />
                                        </div>
                                    </FormField>
                                )}
                            </div>

                            <div className="p-4 bg-brand-500/5 border border-brand-500/20 rounded-2xl flex gap-3">
                                <Info size={18} className="text-brand-400 shrink-0 mt-0.5" />
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    EventFlow charges a 5% service fee on paid tickets. Free events always have zero platform fees.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* STEP 4 – Review */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <h2 className="font-display font-bold text-2xl text-white mb-6">Review &amp; Publish</h2>

                            {form.image && (
                                <img src={form.image} alt="Cover" className="w-full h-48 object-cover rounded-2xl" onError={e => e.target.style.display = 'none'} />
                            )}

                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { label: 'Title', value: form.title },
                                    { label: 'Category', value: CATEGORIES.find(c => c.id === form.category)?.label },
                                    { label: 'Date', value: form.date + (form.endDate ? ` → ${form.endDate}` : '') },
                                    { label: 'Time', value: form.time },
                                    { label: 'Location', value: form.location },
                                    { label: 'Capacity', value: form.capacity ? `${Number(form.capacity).toLocaleString()} attendees` : '—' },
                                    { label: 'Price', value: form.isFree ? 'Free' : form.price ? `$${form.price}` : '—' },
                                    { label: 'Organizer', value: form.organizer || '—' },
                                ].map(({ label, value }) => (
                                    <div key={label} className="glass rounded-xl p-4">
                                        <div className="text-xs text-gray-500 mb-1">{label}</div>
                                        <div className="text-gray-200 font-medium text-sm">{value || '—'}</div>
                                    </div>
                                ))}
                            </div>

                            {form.description && (
                                <div className="glass rounded-xl p-4">
                                    <div className="text-xs text-gray-500 mb-1">Description</div>
                                    <div className="text-gray-300 text-sm leading-relaxed line-clamp-4">{form.description}</div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Footer buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                        <button
                            onClick={() => step > 1 ? setStep(s => s - 1) : navigate(-1)}
                            className="btn-secondary text-sm"
                        >
                            <ArrowLeft size={16} /> Back
                        </button>

                        {step < 4 ? (
                            <button onClick={nextStep} className="btn-primary">
                                Continue <ChevronRight size={16} />
                            </button>
                        ) : (
                            <button onClick={handleSubmit} className="btn-accent text-base px-8 py-3">
                                <Zap size={18} /> Publish Event
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function FormField({ label, error, required, children }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
                {label}
                {required && <span className="text-brand-400 ml-1">*</span>}
            </label>
            {children}
            {error && <p className="mt-1.5 text-red-400 text-xs flex items-center gap-1"><Info size={12} />{error}</p>}
        </div>
    )
}
