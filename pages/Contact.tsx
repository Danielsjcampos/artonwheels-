import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { Lead, StoreSettings } from '../types';
import { SEO } from '../components/ui/seo';

interface Props {
  addLead: (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>) => void;
  settings: StoreSettings;
}

export default function Contact({ addLead, settings }: Props) {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEO 
        title="Contactos | Arton Wheels Garage" 
        description="Entre em contacto com os nossos especialistas em performance automotiva. Localizados na Maia, Porto. Agende a sua visita."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-6xl font-outfit font-extrabold mb-8 tracking-tighter">VAMOS FALAR DE <span className="performance-red">PERFORMANCE?</span></h1>
          <p className="text-gray-400 text-lg mb-12 font-light">Estamos sediados no coração da indústria automóvel de alta gama. Visite-nos para uma experiência imersiva.</p>
          
          <div className="space-y-8 mb-12">
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <MapPin className="w-5 h-5 performance-red" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Localização</p>
                <p className="text-white">{settings.address}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <Phone className="w-5 h-5 performance-red" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Contacto</p>
                <p className="text-white">{settings.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <Mail className="w-5 h-5 performance-red" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Email</p>
                <p className="text-white">{settings.email}</p>
              </div>
            </div>
          </div>

          <a 
            href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-4 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-green-500/10"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            <span className="text-lg">CHAMAR NO WHATSAPP</span>
          </a>
        </div>

        <div className="bg-[#111] border border-white/5 p-10 rounded-[40px]">
          {submitted ? (
             <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-16 bg-performance-red/20 rounded-full flex items-center justify-center mb-6">
                  <Send className="w-8 h-8 performance-red" />
                </div>
                <h3 className="text-2xl font-bold mb-4">MENSAGEM RECEBIDA</h3>
                <p className="text-gray-400">Responderemos ao seu contacto o mais breve possível.</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Nome</label>
                  <input required type="text" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-performance-red transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Telemóvel</label>
                  <input required type="tel" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-performance-red transition-all" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Assunto de interesse</label>
                <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-performance-red transition-all appearance-none text-gray-400">
                  <option>Compra de Jantes/Pneus</option>
                  <option>Compra de Motos Premium</option>
                  <option>Estética & Detalhe</option>
                  <option>Mecânica & Performance</option>
                  <option>Outros</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Mensagem</label>
                <textarea rows={5} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-performance-red transition-all resize-none text-white"></textarea>
              </div>

              <button className="w-full bg-white text-black font-bold py-5 rounded-xl hover:bg-performance-red hover:text-white transition-all">
                ENVIAR MENSAGEM
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
