import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from './components/layout/AdminLayout';
import StaffLayout from './components/layout/StaffLayout';
import PortalLayout from './components/layout/PortalLayout';

// Public Pages
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductsPage from './pages/admin/ProductsPage';
import PlansPage from './pages/admin/PlansPage';
import TaxesPage from './pages/admin/TaxesPage';
import DiscountsPage from './pages/admin/DiscountsPage';
import TemplatesPage from './pages/admin/TemplatesPage';
import UsersPage from './pages/admin/UsersPage';

// Staff Pages
import StaffDashboard from './pages/staff/StaffDashboard';
import CustomersPage from './pages/staff/CustomersPage';
import SubscriptionsPage from './pages/staff/SubscriptionsPage';
import InvoicesPage from './pages/staff/InvoicesPage';
import PaymentsPage from './pages/staff/PaymentsPage';

// Customer Portal Pages
import MySubscriptionsPage from './pages/portal/MySubscriptionsPage';
import MyInvoicesPage from './pages/portal/MyInvoicesPage';
import ProfilePage from './pages/portal/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirect */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="plans" element={<PlansPage />} />
          <Route path="taxes" element={<TaxesPage />} />
          <Route path="discounts" element={<DiscountsPage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>

        {/* Staff Routes */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<StaffDashboard />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="subscriptions" element={<SubscriptionsPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="payments" element={<PaymentsPage />} />
        </Route>

        {/* Customer Portal Routes */}
        <Route path="/portal" element={<PortalLayout />}>
          <Route index element={<Navigate to="/portal/my-subscriptions" replace />} />
          <Route path="my-subscriptions" element={<MySubscriptionsPage />} />
          <Route path="my-invoices" element={<MyInvoicesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Fallback to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
