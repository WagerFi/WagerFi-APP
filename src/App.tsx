import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WagersPage from './pages/WagersPage';
import UserDashboardPage from './pages/UserDashboardPage';
import ActiveWagersPage from './pages/ActiveWagersPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import DocumentationPage from './pages/DocumentationPage';
import Header from './components/Header';
import SearchContainer from './components/SearchContainer';
import Footer from './components/Footer';
import { ProfileProvider } from './contexts/ProfileContext';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationPopupContainer from './components/NotificationPopupContainer';

const SearchPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <SearchContainer />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ProfileProvider>
        <NotificationProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/wagers" element={<WagersPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/dashboard/active" element={<ActiveWagersPage />} />
          <Route path="/dashboard/history" element={<HistoryPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
          <NotificationPopupContainer />
        </NotificationProvider>
      </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;