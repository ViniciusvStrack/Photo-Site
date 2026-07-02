import { useState } from 'react';
import type { PageType, BookingState, PhotoItem, UserProfile } from './types';
import { MOCK_PHOTOS, SERVICE_PACKAGES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { AiChatbot } from './components/AiChatbot';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { BookingPage } from './pages/BookingPage';
import { ClientPortalPage } from './pages/ClientPortalPage';
import { AdminPage } from './pages/AdminPage';
import { AccountPage } from './pages/AccountPage';
import './App.css';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [activePhotoId, setActivePhotoId] = useState<string | null>(null);
  
  // Authentication & Session State (Google OAuth / LGPD Protected)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Persistent Booking State across transitions
  const [bookingState, setBookingState] = useState<BookingState>({
    packageId: SERVICE_PACKAGES[1].id, // Default to Popular Wedding Package
    date: '',
    timeSlot: '',
    location: 'Estúdio Lumen (São Lourenço da Mata - PE)',
    customLocation: '',
    addons: ['add-makeup'], // Default with makeup included
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: '',
    totalPrice: SERVICE_PACKAGES[1].price + 450
  });

  const handleNavigate = (page: PageType, packageId?: string) => {
    if (packageId) {
      const pkg = SERVICE_PACKAGES.find(p => p.id === packageId);
      if (pkg) {
        // recalculate price
        let total = pkg.price;
        bookingState.addons.forEach(addId => {
          if (addId === 'add-makeup') total += 450;
        });
        setBookingState(prev => ({
          ...prev,
          packageId: pkg.id,
          totalPrice: total
        }));
      }
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateBooking = (updated: Partial<BookingState>) => {
    setBookingState(prev => ({ ...prev, ...updated }));
  };

  const activePhoto: PhotoItem | null = activePhotoId 
    ? MOCK_PHOTOS.find(p => p.id === activePhotoId) || MOCK_PHOTOS[0]
    : null;

  return (
    <div className="app-container bg-gourmet-main text-dark-espresso min-vh-100 d-flex flex-column">
      {/* Floating Luminous Atelier Navbar */}
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        bookingCount={bookingState.packageId ? bookingState.totalPrice : 0}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Page Routing */}
      <main className="main-content flex-grow-1">
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={handleNavigate} 
            onPhotoClick={(id) => setActivePhotoId(id)} 
          />
        )}

        {currentPage === 'portfolio' && (
          <PortfolioPage 
            onPhotoClick={(id) => setActivePhotoId(id)} 
          />
        )}

        {currentPage === 'about' && (
          <AboutPage 
            onNavigate={handleNavigate} 
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage 
            onNavigate={handleNavigate} 
          />
        )}

        {currentPage === 'booking' && (
          <BookingPage 
            bookingState={bookingState}
            onUpdateBooking={handleUpdateBooking}
            onNavigate={handleNavigate}
            currentUser={currentUser}
          />
        )}

        {currentPage === 'portal' && (
          <ClientPortalPage 
            onPhotoClick={(id) => setActivePhotoId(id)}
          />
        )}

        {currentPage === 'account' && (
          <AccountPage
            currentUser={currentUser}
            onNavigate={handleNavigate}
            onLogout={() => setCurrentUser(null)}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage 
            onNavigate={handleNavigate}
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate} 
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
      />

      {/* Full-screen Lightbox Modal */}
      <LightboxModal 
        photo={activePhoto} 
        onClose={() => setActivePhotoId(null)}
      />

      {/* Secure Google OAuth Identity / Account Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={(user) => {
          setCurrentUser(user);
          if (user?.role === 'admin') {
            handleNavigate('admin');
          } else if (user) {
            handleNavigate('account');
          }
        }}
        currentUser={currentUser}
      />

      {/* Floating AI Virtual Assistant Chatbot */}
      <AiChatbot onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
