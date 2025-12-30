import React, { useState } from 'react';
import { Lead, Service, Appointment } from '../../types';
import { Calendar as CalendarIcon, Clock, User, Wrench, MoreVertical, Plus, X, Check } from 'lucide-react';

interface Props {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  leads: Lead[];
  services: Service[];
}

export default function AdminAppointments({ appointments, setAppointments, leads, services }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [newAppt, setNewAppt] = useState<Partial<Appointment>>({
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    leadId: leads[0]?.id || '',
    serviceId: services[0]?.id || ''
  });

  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const times = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

  // Map Brazilian days to dates for the current week starting from a reference Monday (May 27th, 2024 for testing)
  const getDayDate = (day: string) => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 is Sunday, 1 is Monday...
    const diff = now.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust to Monday
    const monday = new Date(now.setDate(diff));
    
    const dayIndex = days.indexOf(day);
    const date = new Date(monday);
    date.setDate(monday.getDate() + dayIndex);
    return date.toISOString().split('T')[0];
  };

  const handleAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newAppt.leadId || !newAppt.serviceId) return;

    const appointment: Appointment = {
      ...newAppt as Appointment,
      id: Math.random().toString(36).substr(2, 9)
    };
    setAppointments([...appointments, appointment]);
    setShowForm(false);
  };

  const openQuickAdd = (day: string, time: string) => {
    setNewAppt({
      ...newAppt,
      date: getDayDate(day),
      time: time
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Agenda da Garagem</h1>
          <p className="text-gray-500 font-medium">Coordene as marcações de serviços e a ocupação técnica da Arton.</p>
        </div>
        <div className="flex space-x-4">
           <button className="px-6 py-3 bg-[#111] border border-white/5 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all text-gray-400 hover:text-white flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Vista em Lista
           </button>
           <button 
              onClick={() => setShowForm(true)}
              className="bg-red-600 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 flex items-center gap-2 scale-105 active:scale-95"
           >
              <Plus className="w-4 h-4" />
              Nova Marcação
           </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-[#111] border border-red-600/30 p-10 rounded-[2.5rem] animate-in fade-in slide-in-from-top-6 duration-500 shadow-3xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6">
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
                 <X className="w-6 h-6 text-gray-500 group-hover:text-white" />
              </button>
           </div>
           
           <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600/10 rounded-xl flex items-center justify-center">
                 <Plus className="w-5 h-5 text-red-600" />
              </div>
              Agendar Novo Serviço
           </h2>

           <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Cliente / Veículo</label>
                 <select 
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-red-600 transition-all appearance-none"
                    value={newAppt.leadId}
                    onChange={e => setNewAppt({...newAppt, leadId: e.target.value})}
                 >
                    {leads.map(lead => (
                       <option key={lead.id} value={lead.id}>{lead.name} - {lead.vehicle}</option>
                    ))}
                 </select>
              </div>

              <div className="space-y-3">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Serviço Especializado</label>
                 <select 
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-red-600 transition-all appearance-none"
                    value={newAppt.serviceId}
                    onChange={e => setNewAppt({...newAppt, serviceId: e.target.value})}
                 >
                    {services.map(service => (
                       <option key={service.id} value={service.id}>{service.name} (€{service.price})</option>
                    ))}
                 </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Data</label>
                    <input 
                       type="date"
                       className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-red-600 transition-all"
                       value={newAppt.date}
                       onChange={e => setNewAppt({...newAppt, date: e.target.value})}
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Horário</label>
                    <select 
                       className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-red-600 transition-all appearance-none"
                       value={newAppt.time}
                       onChange={e => setNewAppt({...newAppt, time: e.target.value})}
                    >
                       {times.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                 </div>
              </div>

              <div className="md:col-span-3 flex justify-end gap-4 mt-4">
                 <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-sm text-gray-400 hover:text-white transition-all"
                 >
                    CANCELAR
                 </button>
                 <button 
                    type="submit"
                    className="px-12 py-4 bg-red-600 hover:bg-red-700 rounded-2xl font-bold text-sm text-white transition-all shadow-xl shadow-red-600/20"
                 >
                    CONFIRMAR AGENDAMENTO
                 </button>
              </div>
           </form>
        </div>
      )}

      <div className="bg-[#111] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl relative">
        <div className="overflow-x-auto custom-scrollbar">
          <div className="min-w-[1000px]">
            <div className="grid grid-cols-7 border-b border-white/5 bg-white/[0.01]">
              <div className="p-8 border-r border-white/5 bg-black/40 flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-600" />
              </div>
              {days.map(day => (
                <div key={day} className="p-8 text-center border-r border-white/5 last:border-r-0">
                  <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-[0.3em] block mb-1">{day}</span>
                  <span className="text-[11px] font-medium text-gray-700">{getDayDate(day).split('-').reverse().slice(0, 2).join('/')}</span>
                </div>
              ))}
            </div>

            <div className="divide-y divide-white/5 bg-gradient-to-b from-transparent to-black/20">
              {times.map(time => (
                <div key={time} className="grid grid-cols-7 min-h-[140px]">
                  <div className="p-6 border-r border-white/5 bg-black/20 flex items-center justify-center transition-colors hover:bg-black/40">
                    <span className="text-sm font-outfit font-bold text-gray-500 tracking-tighter">{time}</span>
                  </div>
                  {days.map(day => {
                    const dayDate = getDayDate(day);
                    const appt = appointments.find(a => a.date === dayDate && a.time === time);
                    const lead = leads.find(l => l.id === appt?.leadId);
                    const service = services.find(s => s.id === appt?.serviceId);

                    return (
                      <div key={day} className="p-2 border-r border-white/5 last:border-r-0 relative group">
                        {appt && lead && service ? (
                          <div className="absolute inset-3 bg-red-600/5 border border-red-600/20 rounded-[1.5rem] p-4 flex flex-col justify-between hover:scale-[1.02] hover:bg-red-600/10 hover:border-red-600/40 transition-all duration-300 cursor-pointer shadow-xl z-10 overflow-hidden backdrop-blur-sm group/card">
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-600/10 rounded-full blur-2xl group-hover/card:bg-red-600/20 transition-all" />
                            
                            <div className="relative z-10">
                              <div className="flex items-center justify-between mb-2">
                                <div className="px-2 py-1 bg-red-600/10 rounded text-[9px] font-bold text-red-600 uppercase tracking-widest border border-red-600/10">
                                    {service.name.split(' ')[0]}
                                </div>
                                <Check className="w-3 h-3 text-red-600/40" />
                              </div>
                              <h4 className="text-[11px] font-extrabold text-white leading-tight mb-1 group-hover/card:text-red-500 transition-colors uppercase">{service.name}</h4>
                              <p className="text-[12px] font-bold text-gray-300">{lead.name}</p>
                            </div>

                            <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold relative z-10 mt-2">
                              <span className="bg-white/5 px-2 py-0.5 rounded flex items-center gap-1">
                                <Wrench className="w-2.5 h-2.5" />
                                {lead.vehicle}
                              </span>
                              <span className="flex items-center gap-1 opacity-60">
                                <Clock className="w-2.5 h-2.5" />
                                {time}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 bg-red-600/[0.02]">
                            <button 
                              onClick={() => openQuickAdd(day, time)}
                              className="w-12 h-12 bg-white/5 hover:bg-red-600 rounded-2xl flex items-center justify-center text-gray-600 hover:text-white transition-all hover:scale-110 shadow-2xl border border-white/5"
                            >
                              <Plus className="w-6 h-6" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
