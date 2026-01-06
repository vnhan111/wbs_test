import './App.css';
import React, { Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPasssword';
import ResetPassword from './pages/auth/ResetPassword';
import HeaderProject from './component/project/HeaderProject';
import Home from './pages/Home';
import VerifyEmail from './pages/auth/verifyEmail';

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-green-600"></div>
  </div>
);

const AuthLayout: React.FC = () => {
  return (
    <>
      <main className="min-h-screen">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

const DashboardLayout: React.FC = () => {
  return (
    <>
      <HeaderProject />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

const AppContent: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element = {<VerifyEmail />} />
          <Route index element={<Login />} /> {/* Trang mặc định khi vào root */}
        </Route>

        {/* 404 */}
        <Route path="*" element={<div className="text-center text-3xl mt-20">404 - Page Not Found</div>} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            icon: '✅',
            duration: 3000,
            style: {
              background: '#10b981',
              color: 'white',
              fontWeight: 'bold',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#ef4444',
              color: 'white',
            },
          },
        }}
      />
    </>
  );
};

function App() {
  return <AppContent />;
}

export default App;