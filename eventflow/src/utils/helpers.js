export function getCategoryInfo(categoryId) {
    const map = {
        corporate: { id: 'corporate', label: 'Corporate', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
        wedding: { id: 'wedding', label: 'Wedding', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
        concert: { id: 'concert', label: 'Concert', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
        conference: { id: 'conference', label: 'Conference', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
        gala: { id: 'gala', label: 'Gala', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
        social: { id: 'social', label: 'Social', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
        sports: { id: 'sports', label: 'Sports', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
    }
    return map[categoryId] || { id: categoryId, label: categoryId, color: 'bg-gray-500/20 text-gray-300 border-gray-500/30' }
}
