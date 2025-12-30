
import React, { useState } from 'react';
import { FinancialRecord } from '../../types';
import { Plus, TrendingUp, TrendingDown, DollarSign, Filter, Search, X, Calendar as CalendarIcon } from 'lucide-react';

interface Props {
  records: FinancialRecord[];
  setRecords: React.Dispatch<React.SetStateAction<FinancialRecord[]>>;
}

export default function AdminFinance({ records, setRecords }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [newRecord, setNewRecord] = useState<Partial<FinancialRecord>>({ 
    type: 'inflow', 
    category: 'Serviço',
    date: new Date().toISOString().split('T')[0]
  });

  const totalInflow = records.filter(r => r.type === 'inflow').reduce((acc, curr) => acc + curr.amount, 0);
  const totalOutflow = records.filter(r => r.type === 'outflow').reduce((acc, curr) => acc + curr.amount, 0);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const record: FinancialRecord = {
      ...newRecord as FinancialRecord,
      id: Math.random().toString(36).substr(2, 9),
      amount: Number(newRecord.amount)
    };
    setRecords([record, ...records]);
    setShowForm(false);
    setNewRecord({ 
      type: 'inflow', 
      category: 'Serviço',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestão Financeira</h1>
          <p className="text-gray-500">Fluxo de caixa, entradas e saídas da Arton.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-performance-red text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center space-x-2 shadow-lg shadow-red-600/20 hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Transação</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] hover:border-green-500/20 transition-colors group">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded-full">Receitas</span>
          </div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Entradas Totais</p>
          <p className="text-4xl font-outfit font-extrabold text-white">€{totalInflow.toLocaleString()}</p>
        </div>

        <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] hover:border-red-600/20 transition-colors group">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-performance-red/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingDown className="w-6 h-6 performance-red" />
            </div>
            <span className="text-[10px] font-bold performance-red uppercase tracking-widest bg-red-600/10 px-3 py-1 rounded-full">Despesas</span>
          </div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Saídas Totais</p>
          <p className="text-4xl font-outfit font-extrabold text-white">€{totalOutflow.toLocaleString()}</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:border-blue-500/20 transition-colors group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl" />
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">Liquidez</span>
          </div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Saldo em Caixa</p>
          <p className="text-4xl font-outfit font-extrabold text-white relative z-10">€{(totalInflow - totalOutflow).toLocaleString()}</p>
        </div>
      </div>

      {showForm && (
        <div className="bg-[#111] border border-red-600/30 p-8 rounded-[2rem] animate-in fade-in slide-in-from-top-4 duration-500 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
             </button>
          </div>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 performance-red" />
            Lançar Movimentação Financeira
          </h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tipo</label>
              <div className="flex p-1 bg-[#0a0a0a] rounded-xl border border-white/10">
                <button 
                  type="button"
                  onClick={() => setNewRecord({...newRecord, type: 'inflow'})}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${newRecord.type === 'inflow' ? 'bg-green-600 text-white' : 'text-gray-500 hover:text-white'}`}
                >
                  ENTRADA
                </button>
                <button 
                  type="button"
                  onClick={() => setNewRecord({...newRecord, type: 'outflow'})}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${newRecord.type === 'outflow' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'}`}
                >
                  SAÍDA
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Valor (€)</label>
              <input 
                type="number" required
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
                value={newRecord.amount || ''}
                onChange={e => setNewRecord({...newRecord, amount: Number(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Categoria</label>
              <select 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
                value={newRecord.category}
                onChange={e => setNewRecord({...newRecord, category: e.target.value})}
              >
                <option value="Serviço">Serviço</option>
                <option value="Venda">Venda</option>
                <option value="Peças">Peças</option>
                <option value="Marketing">Marketing</option>
                <option value="Infraestrutura">Infraestrutura</option>
                <option value="Impostos">Impostos</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Data</label>
              <input 
                type="date" required
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
                value={newRecord.date}
                onChange={e => setNewRecord({...newRecord, date: e.target.value})}
              />
            </div>
            <div className="md:col-span-3 space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Descrição detalhada</label>
              <input 
                type="text" required placeholder="Ex: Venda Jantes Vossen - Cliente Carlos..."
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
                value={newRecord.description}
                onChange={e => setNewRecord({...newRecord, description: e.target.value})}
              />
            </div>
            <button type="submit" className="bg-red-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-all uppercase tracking-widest shadow-lg shadow-red-600/20">
              LANÇAR TRANSAÇÃO
            </button>
          </form>
        </div>
      )}

      <div className="bg-[#111] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
           <h3 className="font-bold flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-gray-400" />
              Histórico de Lançamentos
           </h3>
           <div className="flex gap-2">
              <div className="relative">
                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                 <input type="text" placeholder="Procurar transações..." className="bg-black/40 border border-white/5 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-red-600 w-64" />
              </div>
              <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400"><Filter className="w-4 h-4" /></button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] bg-[#0a0a0a]">
                <th className="px-8 py-5">Data da Operação</th>
                <th className="px-8 py-5">Descrição do Movimento</th>
                <th className="px-8 py-5">Categorização</th>
                <th className="px-8 py-5 text-right">Valor Final</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6 text-sm text-gray-500 font-medium">{r.date}</td>
                  <td className="px-8 py-6 font-bold text-sm text-white/90 group-hover:text-white">{r.description}</td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-bold bg-white/5 px-3 py-1.5 rounded-full text-gray-400 border border-white/5 uppercase tracking-wider">{r.category}</span>
                  </td>
                  <td className={`px-8 py-6 text-right font-outfit font-extrabold text-lg ${r.type === 'inflow' ? 'text-green-500' : 'performance-red'}`}>
                    {r.type === 'inflow' ? '+' : '-'} €{r.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
