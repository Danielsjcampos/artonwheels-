
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { WorkOrder, WorkOrderStatus } from '../types';
import { 
  SearchCode, Wrench, CheckCircle2, Clock, 
  MapPin, Phone, MessageCircle, ArrowLeft,
  Bike, ClipboardList, Info, AlertCircle
} from 'lucide-react';

export default function PublicTracking({ workOrders }: { workOrders: WorkOrder[] }) {
  const { code } = useParams();
  const [searchCode, setSearchCode] = useState(code || '');
  const [foundOS, setFoundOS] = useState<WorkOrder | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (code) {
      const os = workOrders.find(o => o.trackingCode.toLowerCase() === code.toLowerCase());
      if (os) {
        setFoundOS(os);
        setError(false);
      } else {
        setError(true);
      }
    }
  }, [code, workOrders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode) return;
    const os = workOrders.find(o => o.trackingCode.toLowerCase() === searchCode.toLowerCase());
    if (os) {
      setFoundOS(os);
      setError(false);
    } else {
      setFoundOS(null);
      setError(true);
    }
  };

  const getStatusProgress = (status: WorkOrderStatus) => {
    switch (status) {
      case WorkOrderStatus.DIAGNOSIS: return 20;
      case WorkOrderStatus.IN_PROGRESS: return 50;
      case WorkOrderStatus.AWAITING_PARTS: return 65;
      case WorkOrderStatus.READY: return 100;
      case WorkOrderStatus.DELIVERED: return 100;
      default: return 0;
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-outfit font-extrabold mb-4 uppercase tracking-tighter">
          Rastreio de <span className="performance-red">Performance</span>
        </h1>
        <p className="text-gray-400 font-light">Acompanhe cada etapa do tratamento da sua máquina em tempo real.</p>
      </div>

      {!foundOS ? (
        <div className="bg-[#111] border border-white/5 rounded-[40px] p-10 md:p-16 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-performance-red/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-performance-red/20">
            <SearchCode className="w-10 h-10 performance-red" />
          </div>
          <h2 className="text-2xl font-bold mb-8">Insira o seu código de tracking</h2>
          <form onSubmit={handleSearch} className="max-w-md mx-auto space-y-4">
            <input 
              type="text" 
              placeholder="Ex: ARTON-XP1" 
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-8 py-5 text-center text-xl font-mono focus:border-performance-red outline-none transition-all uppercase"
              value={searchCode}
              onChange={e => setSearchCode(e.target.value)}
            />
            {error && <p className="text-performance-red text-xs font-bold uppercase tracking-widest mt-2 animate-bounce">Código não encontrado</p>}
            <button className="w-full bg-performance-red text-white py-5 rounded-2xl font-bold hover:bg-rose-700 transition-all shadow-xl shadow-performance-red/20">
              CONSULTAR AGORA
            </button>
          </form>
          <div className="mt-12 flex items-center justify-center space-x-2 text-gray-500 text-xs uppercase tracking-widest">
            <Info className="w-4 h-4" />
            <span>O código encontra-se na sua ficha de entrada</span>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
           <button onClick={() => setFoundOS(null)} className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Nova Pesquisa</span>
           </button>

           <div className="bg-[#111] border border-white/5 rounded-[40px] overflow-hidden">
              <div className="p-10 border-b border-white/5 bg-white/[0.01]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="text-xs font-bold text-performance-red uppercase tracking-widest mb-2 block">Ordem de Serviço: {foundOS.id}</span>
                    <h2 className="text-3xl font-outfit font-extrabold uppercase">{foundOS.vehicle}</h2>
                    <p className="text-gray-500 font-mono mt-1">{foundOS.plate}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Status Atual</p>
                    <span className={`text-xl font-outfit font-bold uppercase ${foundOS.status === WorkOrderStatus.READY ? 'text-green-500' : 'text-performance-red'}`}>
                      {foundOS.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-10">
                 {/* Progress Bar */}
                 <div className="mb-12">
                   <div className="flex justify-between mb-4 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest px-2">
                     <span>Check-in</span>
                     <span>Diagnóstico</span>
                     <span>Em Trabalho</span>
                     <span>Finalizado</span>
                   </div>
                   <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-performance-red shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all duration-1000 ease-out"
                        style={{ width: `${getStatusProgress(foundOS.status)}%` }}
                      ></div>
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                       <h4 className="font-bold flex items-center space-x-2">
                          <ClipboardList className="w-5 h-5 performance-red" />
                          <span>DETALHES DA INTERVENÇÃO</span>
                       </h4>
                       <div className="space-y-3">
                          {foundOS.items.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                               <div>
                                  <p className="text-sm font-bold">{item.description}</p>
                                  <p className="text-[10px] text-gray-500 uppercase font-bold">{item.type} x{item.quantity}</p>
                               </div>
                               <CheckCircle2 className="w-5 h-5 text-green-500/50" />
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h4 className="font-bold flex items-center space-x-2">
                          <Bike className="w-5 h-5 performance-red" />
                          <span>ESTADO DE ENTRADA</span>
                       </h4>
                       <div className="grid grid-cols-2 gap-3">
                          {Object.entries(foundOS.checklist).map(([key, val]) => (
                            typeof val === 'boolean' && (
                              <div key={key} className="flex items-center space-x-3 p-3 rounded-xl bg-white/5">
                                {val ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-amber-500" />}
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                  {key === 'lights' ? 'Luzes OK' : key === 'tires' ? 'Pneus OK' : key === 'bodywork' ? 'Corpo OK' : 'Níveis OK'}
                                </span>
                              </div>
                            )
                          ))}
                       </div>
                       <div className="p-4 bg-performance-red/5 border border-performance-red/10 rounded-2xl">
                          <p className="text-[10px] text-performance-red font-bold uppercase tracking-widest mb-1">Notas do Técnico</p>
                          <p className="text-sm text-gray-400 font-light leading-relaxed">{foundOS.notes}</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-10 bg-white/[0.02] border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="flex items-center space-x-6">
                    <div className="text-center md:text-left">
                       <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Início dos Trabalhos</p>
                       <p className="text-sm font-bold">{new Date(foundOS.startDate).toLocaleDateString()}</p>
                    </div>
                 </div>
                 <div className="flex items-center space-x-4">
                    <a href="tel:+351912345678" className="p-4 bg-white/5 rounded-2xl hover:bg-performance-red transition-all group">
                       <Phone className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </a>
                    <a href="https://wa.me/351912345678" className="flex items-center space-x-3 bg-green-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-600 transition-all">
                       <MessageCircle className="w-5 h-5" />
                       <span>FALAR COM OFICINA</span>
                    </a>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
