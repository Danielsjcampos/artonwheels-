
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Trophy, Settings, Users, LayoutDashboard, ShoppingBag, 
  Calendar, Wrench, Phone, Menu, X, ArrowRight,
  ChevronRight, Instagram, Facebook, Mail, MapPin, Search, Filter,
  DollarSign, FileText, Sparkles, ClipboardList, SearchCode
} from 'lucide-react';

// Types and Mocks
import { Lead, Product, Service, LeadStatus, BlogPost, FinancialRecord, StoreSettings, WorkOrder, Appointment } from './types';
import { INITIAL_PRODUCTS, INITIAL_SERVICES, INITIAL_LEADS, INITIAL_BLOG_POSTS, INITIAL_FINANCE, INITIAL_SETTINGS, INITIAL_APPOINTMENTS, INITIAL_WORK_ORDERS } from './constants';

// Pages
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail';
import TestDrive from './pages/TestDrive';
import ServicesPage from './pages/Services';
import Contact from './pages/Contact';
import BlogList from './pages/BlogList';
import BlogPostDetail from './pages/BlogPostDetail';
import PublicTracking from './pages/PublicTracking';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import AdminCRM from './pages/Admin/CRM';
import AdminProducts from './pages/Admin/ProductsManager';
import AdminAppointments from './pages/Admin/AppointmentsManager';
import AdminFinance from './pages/Admin/Finance';
import AdminBlog from './pages/Admin/Blog';
import AdminSettings from './pages/Admin/Settings';
import AdminWorkshop from './pages/Admin/WorkshopManager';

import { Header } from './components/ui/header-2';
import { MobileAdminNav } from './components/ui/mobile-admin-nav';

const MainLayout = ({ settings, children }: { settings: StoreSettings, children: React.ReactNode }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-inter">
      {!isAdmin && <Header settings={settings} />}
      {children}
    </div>
  );
};

const Sidebar = ({ settings }: { settings: StoreSettings }) => {
  const links = [
    { icon: LayoutDashboard, name: 'Dashboard', path: '/admin' },
    { icon: ClipboardList, name: 'Oficina (OS)', path: '/admin/workshop' },
    { icon: Users, name: 'CRM & Leads', path: '/admin/crm' },
    { icon: DollarSign, name: 'Financeiro', path: '/admin/finance' },
    { icon: Sparkles, name: 'Blog AI', path: '/admin/blog' },
    { icon: ShoppingBag, name: 'Produtos', path: '/admin/products' },
    { icon: Calendar, name: 'Agenda', path: '/admin/appointments' },
    { icon: Settings, name: 'Ajustes', path: '/admin/settings' },
  ];

  return (
    <aside className="hidden md:flex w-64 h-screen bg-[#0a0a0a] border-r border-white/5 flex-col fixed left-0 top-0 z-50">
      <div className="p-8">
        <img src={settings.logo} alt={settings.name} className="h-8 w-auto mb-10" />
        <nav className="space-y-4">
          {links.map(link => (
            <Link 
              key={link.path}
              to={link.path}
              className="flex items-center space-x-3 text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-all font-medium text-sm"
            >
              <link.icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default function App() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [finance, setFinance] = useState<FinancialRecord[]>(INITIAL_FINANCE);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(INITIAL_WORK_ORDERS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  const addLead = (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>) => {
    const newLead: Lead = { ...lead, id: Math.random().toString(36).substr(2, 9), status: LeadStatus.NEW, createdAt: new Date().toISOString() };
    setLeads([newLead, ...leads]);
  };

  return (
    <Router>
      <MainLayout settings={settings}>
        <Routes>
          <Route path="/" element={<Home products={products.filter(p => p.featured)} blogPosts={blogPosts} settings={settings} />} />
          <Route path="/store" element={<Store products={products} />} />
          <Route path="/product/:id" element={<ProductDetail products={products} addLead={addLead} />} />
          <Route path="/tracking" element={<PublicTracking workOrders={workOrders} />} />
          <Route path="/tracking/:code" element={<PublicTracking workOrders={workOrders} />} />
          <Route path="/services" element={<ServicesPage services={services} />} />
          <Route path="/test-drive" element={<TestDrive addLead={addLead} />} />
          <Route path="/contact" element={<Contact addLead={addLead} settings={settings} />} />

          <Route path="/admin/*" element={
            <div className="flex flex-col md:flex-row">
              <Sidebar settings={settings} />
              <MobileAdminNav />
              <div className="flex-1 md:ml-64 min-h-screen p-4 md:p-8 bg-[#070707]">
                <Routes>
                  <Route path="/" element={<AdminDashboard leads={leads} products={products} finance={finance} />} />
                  <Route path="/workshop" element={<AdminWorkshop workOrders={workOrders} setWorkOrders={setWorkOrders} leads={leads} />} />
                  <Route path="/crm" element={<AdminCRM leads={leads} setLeads={setLeads} />} />
                  <Route path="/finance" element={<AdminFinance records={finance} setRecords={setFinance} />} />
                  <Route path="/blog" element={<AdminBlog posts={blogPosts} setPosts={setBlogPosts} settings={settings} />} />
                  <Route path="/products" element={<AdminProducts products={products} setProducts={setProducts} />} />
                  <Route path="/appointments" element={<AdminAppointments appointments={appointments} setAppointments={setAppointments} leads={leads} services={services} />} />
                  <Route path="/settings" element={<AdminSettings settings={settings} setSettings={setSettings} />} />
                  <Route path="*" element={<AdminDashboard leads={leads} products={products} finance={finance} />} />
                </Routes>
              </div>
            </div>
          } />
        </Routes>
      </MainLayout>
    </Router>
  );
}
