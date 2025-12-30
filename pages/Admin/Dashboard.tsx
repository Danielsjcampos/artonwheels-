
import React from 'react';
import { Lead, Product, LeadStatus, FinancialRecord } from '../../types';
import { 
  Users, ShoppingBag, TrendingUp, DollarSign, 
  ArrowUpRight, Clock, Activity, MessageSquare 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Fev', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Abr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Jun', value: 2390 },
];

export default function AdminDashboard({ leads, products, finance }: { leads: Lead[], products: Product[], finance: FinancialRecord[] }) {
  const totalInflow = finance.filter(r => r.type === 'inflow').reduce((acc, curr) => acc + curr.amount, 0);

  const stats = [
    { label: 'Total de Leads', value: leads.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Faturação Mensal', value: `€${(totalInflow / 1000).toFixed(1)}k`, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Itens em Stock', value: products.length, icon: ShoppingBag, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Taxa de Conversão', value: '18%', icon: TrendingUp, color: 'text-performance-red', bg: 'bg-performance-red/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Painel de Controlo</h1>
        <p className="text-gray-500">Bem-vindo ao centro de comando da Arton Wheels Garage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#111] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
               <stat.icon className="w-12 h-12" />
             </div>
             <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-lg flex items-center justify-center mb-4`}>
               <stat.icon className="w-5 h-5" />
             </div>
             <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
             <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#111] border border-white/5 p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Fluxo de Faturação</h3>
            <select className="bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-1 text-xs text-gray-500 focus:outline-none">
              <option>Últimos 6 Meses</option>
              <option>Ano Inteiro</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                <XAxis dataKey="name" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#e11d48' }}
                />
                <Area type="monotone" dataKey="value" stroke="#e11d48" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#111] border border-white/5 p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-6">Leads Recentes</h3>
          <div className="space-y-6">
            {leads.slice(0, 5).map(lead => (
              <div key={lead.id} className="flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-xs font-bold border border-white/5 group-hover:border-performance-red/50 transition-all">
                    {lead.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold truncate max-w-[120px]">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.vehicle}</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                  lead.status === LeadStatus.NEW ? 'bg-blue-500/10 text-blue-500' :
                  lead.status === LeadStatus.CLOSED ? 'bg-green-500/10 text-green-500' :
                  'bg-amber-500/10 text-amber-500'
                }`}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 border border-white/5 rounded-xl text-xs font-bold text-gray-500 hover:text-white hover:bg-white/5 transition-all">
            VER TODOS OS LEADS
          </button>
        </div>
      </div>
    </div>
  );
}
