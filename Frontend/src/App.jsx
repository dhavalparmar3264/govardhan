import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AppContextProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './components/Contact';
import About from './pages/About';
import Order from './pages/Order';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import AdminLogin from './components/Adminlogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminPanelLayout from './components/admin/AdminPanelLayout';
import OrdersPage from './components/admin/OrdersPage';
import ReservationsPage from './components/admin/ReservationsPage';
import InventoryPage from './components/admin/InventoryPage';
import User from './components/admin/User';
import AdminMenu from './components/admin/AdminMenu';

const LayoutWrapper = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <Outlet />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const App = () => {
  return (
    <AppContextProvider>
      <CartProvider>
        <BrowserRouter>
        <Routes>
          {/* Routes with Layout */}
          <Route element={<LayoutWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="order" element={<Order />} />
            <Route path="menu" element={<Menu />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="admin/login" element={<AdminLogin />} />
            
            {/* Admin Routes with AdminPanelLayout */}
            <Route path="admin" element={
              localStorage.getItem('govardhanthal_admin_authenticated') === 'true' 
                ? <AdminPanelLayout><Outlet /></AdminPanelLayout>
                : <AdminLogin />
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="reservations" element={<ReservationsPage />} />
              <Route path="inventory" element={<InventoryPage />} />
              <Route path="user" element={<User />} />
              <Route path="menu" element={<AdminMenu />} />
            </Route>

          </Route>
          
          {/* Routes without Layout */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
        </BrowserRouter>
      </CartProvider>
    </AppContextProvider>
  );
};

export default App;
