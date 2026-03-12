import { CATEGORIES } from '../data/events'

export function getCategoryInfo(categoryId) {
    return CATEGORIES.find(c => c.id === categoryId) || {
        id: categoryId,
        label: categoryId,
        color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    }
}

export function formatDate(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatPrice(price) {
    return price === 0 ? 'Free' : `$${price.toLocaleString()}`
}

export function getCapacityPercent(registered, capacity) {
    return Math.min(100, Math.round((registered / capacity) * 100))
}
