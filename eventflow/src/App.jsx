import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'
import CreateEventPage from './pages/CreateEventPage'
import DashboardPage from './pages/DashboardPage'

export default function App() {
    return (
        <div className="min-h-screen gradient-bg">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/events/:id" element={<EventDetailPage />} />
                    <Route path="/create" element={<CreateEventPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}
