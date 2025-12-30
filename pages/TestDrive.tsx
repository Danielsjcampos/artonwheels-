
import React, { useState } from 'react';
import { Lead } from '../types';
import { Calendar, Car, Send, CheckCircle2 } from 'lucide-react';

interface Props {
  addLead: (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>) => void;
}

export default function TestDrive({ addLead }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    interest: 'Test Drive Performance'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-20 max-w-xl mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-4xl font-outfit font-bold mb-4">SOLICITAÇÃO ENVIADA!</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Obrigado, {formData.name.split(' ')[0]}. Um dos nossos consultores técnicos entrará em contato nas próximas 24 horas para agendar o seu test drive.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-performance-red text-white px-8 py-4 rounded-full font-bold"
        >
          SOLICITAR OUTRO AGENDAMENTO
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
      <div className="flex-1">
        <div className="inline-flex items-center space-x-2 bg-performance-red/10 border border-performance-red/20 px-4 py-1.5 rounded-full mb-6">
          <Car className="w-4 h-4 performance-red" />
          <span className="text-xs font-bold performance-red uppercase tracking-widest">Experiência VIP</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-outfit font-extrabold mb-6 leading-tight">
          SINTA A <span className="performance-red">POTÊNCIA</span> NA PRÁTICA.
        </h1>
        <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
          Queremos que experimente a diferença que um setup de alta performance faz na condução. Agende um test drive num dos nossos veículos de demonstração equipados com kits ARTON.
        </p>
        
        <ul className="space-y-4 mb-8 text-gray-300">
          <li className="flex items-center space-x-3">
            <div className="w-1.5 h-1.5 rounded-full bg-performance-red"></div>
            <span>Acompanhamento de piloto profissional.</span>
          </li>
          <li className="flex items-center space-x-3">
            <div className="w-1.5 h-1.5 rounded-full bg-performance-red"></div>
            <span>Percurso técnico selecionado.</span>
          </li>
          <li className="flex items-center space-x-3">
            <div className="w-1.5 h-1.5 rounded-full bg-performance-red"></div>
            <span>Análise de telemetria básica.</span>
          </li>
        </ul>
      </div>

      <div className="w-full lg:w-[500px]">
        <div className="bg-[#111] border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-performance-red/5 blur-[100px]"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Nome Completo</label>
              <input 
                required
                type="text" 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-performance-red transition-all"
                placeholder="Ex: João Silva"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-performance-red transition-all"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Telemóvel</label>
                <input 
                  required
                  type="tel" 
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-performance-red transition-all"
                  placeholder="912 345 678"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Veículo Atual (Marca/Modelo)</label>
              <input 
                required
                type="text" 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-performance-red transition-all"
                placeholder="Ex: BMW M3 E92"
                value={formData.vehicle}
                onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
              />
            </div>

            <button type="submit" className="w-full bg-performance-red hover:bg-rose-700 text-white font-bold py-5 rounded-xl flex items-center justify-center space-x-3 transition-all">
              <Send className="w-5 h-5" />
              <span>CONFIRMAR SOLICITAÇÃO</span>
            </button>
            <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest leading-relaxed">
              Ao submeter, concorda com os nossos termos de tratamento de dados para fins comerciais e agendamento.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
