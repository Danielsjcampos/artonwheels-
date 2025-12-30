import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, DollarSign, Sparkles, 
  ShoppingBag, Calendar, Settings, Home, Wrench, Menu, X, Plus,
  Monitor, Smartphone, AppWindow
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const adminLinks = [
  { icon: LayoutDashboard, name: 'Dash', path: '/admin', color: 'bg-blue-500' },
  { icon: Wrench, name: 'Oficina', path: '/admin/workshop', color: 'bg-gray-600' },
  { icon: Users, name: 'Leads', path: '/admin/crm', color: 'bg-green-500' },
  { icon: DollarSign, name: 'Dinheiro', path: '/admin/finance', color: 'bg-emerald-600' },
  { icon: Sparkles, name: 'Blog', path: '/admin/blog', color: 'bg-purple-500' },
  { icon: ShoppingBag, name: 'Stock', path: '/admin/products', color: 'bg-orange-500' },
  { icon: Calendar, name: 'Agenda', path: '/admin/appointments', color: 'bg-red-500' },
  { icon: Settings, name: 'Ajustes', path: '/admin/settings', color: 'bg-zinc-700' },
];

export function MobileAdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Floating Action Button (iOS AssistiveTouch style) */}
      <div className="fixed bottom-6 right-6 z-[100] md:hidden">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl"
        >
          {isOpen ? <X className="w-6 h-6 text-white" /> : <AppWindow className="w-6 h-6 text-white" />}
          
          {/* Subtle notification dot if needed */}
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full border-2 border-black -translate-y-1/3 translate-x-1/3"></div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-3xl md:hidden"
          >
            <div className="h-full w-full flex flex-col items-center justify-center p-8">
              {/* iOS Style Grid */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="grid grid-cols-4 gap-x-6 gap-y-10 max-w-sm w-full"
              >
                {adminLinks.map((link, idx) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="flex flex-col items-center group"
                  >
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: idx * 0.05 } }}
                      className={`w-14 h-14 ${link.color} rounded-[1.25rem] flex items-center justify-center shadow-lg relative overflow-hidden`}
                    >
                      {/* iOS Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
                      <link.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <span className="mt-2 text-[11px] font-medium text-white/70 tracking-tight">{link.name}</span>
                  </Link>
                ))}

                {/* Return Home Button */}
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: adminLinks.length * 0.05 } }}
                    className="w-14 h-14 bg-white rounded-[1.25rem] flex items-center justify-center shadow-lg"
                  >
                    <Home className="w-7 h-7 text-black" />
                  </motion.div>
                  <span className="mt-2 text-[11px] font-medium text-white/70 tracking-tight">Site</span>
                </Link>
              </motion.div>

              {/* iOS Bottom Dock (Optional Visual Element) */}
              <div className="absolute bottom-10 w-32 h-1 bg-white/20 rounded-full"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
