import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Pages
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import Lawyers from './pages/lawyers/Lawyers';
import Billings from './pages/billings/Billings';
import Appointments from './pages/appointments/Appointments';
import Documents from './pages/documents/Documents';
import Procedures from './pages/government-procedures/Procedures';
import Messages from './pages/messages/Messages';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';

// Auth Pages
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';

// Auth check
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('access_token');
  return token ? <>{children}</> : <Navigate to="/signin" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('access_token');
  return token ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Auth routes */}
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        {/* Private/Dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/lawyers"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Lawyers />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/billings"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Billings />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Appointments />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/documents"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Documents />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/government-procedures"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Procedures />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Messages />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* Redirect root based on auth status */}
        <Route
          path="/"
          element={
            localStorage.getItem('access_token') ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
