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
        <div className="min-h-screen">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/events/:id" element={<EventDetailPage />} />
                    <Route path="/services" element={<DashboardPage />} />
                    <Route path="/about" element={<DashboardPage />} />
                    <Route path="/contact" element={<CreateEventPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}
