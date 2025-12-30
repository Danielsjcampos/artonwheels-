
import React from 'react';
import { Lead, LeadStatus } from '../../types';
import { MoreHorizontal, Search, Filter, Phone, Mail, ChevronRight } from 'lucide-react';

interface Props {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
}

export default function AdminCRM({ leads, setLeads }: Props) {
  const updateStatus = (id: string, status: LeadStatus) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestão de Leads (CRM)</h1>
          <p className="text-gray-500">Acompanhe e converta potenciais clientes.</p>
        </div>
        <button className="bg-performance-red text-white px-6 py-3 rounded-xl font-bold text-sm">
          Adicionar Manualmente
        </button>
      </div>

      <div className="flex flex-wrap gap-4 items-center bg-[#111] p-4 rounded-2xl border border-white/5">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Pesquisar leads..." 
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-performance-red"
          />
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2.5 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm flex items-center space-x-2 text-gray-400">
            <Filter className="w-4 h-4" />
            <span>Filtros</span>
          </button>
          <select className="px-4 py-2.5 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-gray-400 focus:outline-none">
            <option>Recentemente Criados</option>
            <option>Nome (A-Z)</option>
            <option>Status</option>
          </select>
        </div>
      </div>

      <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <th className="px-8 py-5">Cliente</th>
              <th className="px-8 py-5">Veículo / Interesse</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5">Data</th>
              <th className="px-8 py-5 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center font-bold text-gray-300">
                      {lead.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{lead.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                         <Mail className="w-3 h-3 text-gray-600" />
                         <span className="text-xs text-gray-600">{lead.email}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <p className="text-sm font-medium">{lead.vehicle}</p>
                  <p className="text-xs text-gray-500 mt-1">{lead.interest}</p>
                </td>
                <td className="px-8 py-6">
                  <select 
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                    className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border border-white/10 bg-transparent focus:outline-none ${
                      lead.status === LeadStatus.NEW ? 'text-blue-500' :
                      lead.status === LeadStatus.CLOSED ? 'text-green-500' :
                      lead.status === LeadStatus.LOST ? 'text-gray-500' :
                      'text-amber-500'
                    }`}
                  >
                    {Object.values(LeadStatus).map(s => (
                      <option key={s} value={s} className="bg-[#111]">{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-8 py-6 text-sm text-gray-500">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-2 bg-white/5 rounded-lg hover:bg-performance-red hover:text-white transition-all">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/5 rounded-lg hover:bg-performance-red hover:text-white transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
