import './App.css';
import React, { Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPasssword';
import ResetPassword from './pages/auth/ResetPassword';
import HeaderProject from './component/project/HeaderProject';
import Home from './pages/Home';
import VerifyEmail from './pages/auth/verifyEmail';
import PageNotFound from './pages/general/PageNotFound';
import Unauthorized from './pages/general/Unauthorized';
import PrivateRoute from './routes/PrivateRoute';

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
        <Route path="/project" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
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
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

function App() {
  return <AppContent />;
}

export default App;