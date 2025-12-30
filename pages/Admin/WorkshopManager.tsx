
import React, { useState } from 'react';
import { WorkOrder, WorkOrderStatus, Lead, WorkOrderItem, WorkOrderChecklist } from '../../types';
import { 
  Plus, ClipboardList, Wrench, Search, Filter, 
  Clock, User, CheckCircle2, AlertCircle, ChevronRight, 
  Trash2, Printer, X, Save, Bike, ListChecks, DollarSign,
  Link as LinkIcon, ExternalLink
} from 'lucide-react';

interface Props {
  workOrders: WorkOrder[];
  setWorkOrders: React.Dispatch<React.SetStateAction<WorkOrder[]>>;
  leads: Lead[];
}

export default function AdminWorkshop({ workOrders, setWorkOrders, leads }: Props) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingOS, setEditingOS] = useState<WorkOrder | null>(null);
  
  // Form State for new/edit OS
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<WorkOrder>>({
    status: WorkOrderStatus.DIAGNOSIS,
    items: [],
    checklist: {
      lights: true,
      bodywork: true,
      tires: true,
      oilLevel: true,
      fuelLevel: '1/2',
      scratches: 'Nenhuma'
    },
    technician: 'Chefe de Oficina'
  });

  const handleCreateOS = () => {
    const finalOS: WorkOrder = {
      ...formData as WorkOrder,
      id: formData.id || `OS-${Math.floor(1000 + Math.random() * 9000)}`,
      trackingCode: formData.trackingCode || Math.random().toString(36).substr(2, 6).toUpperCase(),
      startDate: formData.startDate || new Date().toISOString(),
      items: formData.items || []
    };

    if (editingOS) {
      setWorkOrders(workOrders.map(os => os.id === editingOS.id ? finalOS : os));
    } else {
      setWorkOrders([finalOS, ...workOrders]);
    }
    resetForm();
  };

  const resetForm = () => {
    setIsCreating(false);
    setEditingOS(null);
    setStep(1);
    setFormData({
      status: WorkOrderStatus.DIAGNOSIS,
      items: [],
      checklist: { lights: true, bodywork: true, tires: true, oilLevel: true, fuelLevel: '1/2', scratches: 'Nenhuma' },
      technician: 'Chefe de Oficina'
    });
  };

  const addItem = () => {
    const newItem: WorkOrderItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      quantity: 1,
      unitPrice: 0,
      type: 'Serviço'
    };
    setFormData({ ...formData, items: [...(formData.items || []), newItem] });
  };

  const updateItem = (id: string, field: keyof WorkOrderItem, value: any) => {
    setFormData({
      ...formData,
      items: formData.items?.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const removeItem = (id: string) => {
    setFormData({ ...formData, items: formData.items?.filter(item => item.id !== id) });
  };

  const total = formData.items?.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0) || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Oficina Performance</h1>
          <p className="text-gray-500">Gestão técnica, checklist e orçamentação.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-performance-red text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center space-x-2 hover:bg-rose-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Abrir Nova Ficha</span>
        </button>
      </div>

      <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <h3 className="font-bold flex items-center space-x-2 uppercase tracking-widest text-xs text-gray-400">
            <ClipboardList className="w-4 h-4 performance-red" />
            <span>Ordens de Serviço Ativas</span>
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <th className="px-8 py-5">Nº OS / Tracking</th>
                <th className="px-8 py-5">Cliente / Viatura</th>
                <th className="px-8 py-5">Estado</th>
                <th className="px-8 py-5">Orcamento</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {workOrders.map((os) => (
                <tr key={os.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <p className="font-mono performance-red font-bold">{os.id}</p>
                    <p className="text-[10px] text-gray-600 font-bold mt-1 uppercase">Cód: {os.trackingCode}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-bold">{os.clientName}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-tighter mt-1">{os.vehicle} ({os.plate})</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border border-white/10 ${
                      os.status === WorkOrderStatus.READY ? 'bg-green-500/10 text-green-500' : 'bg-performance-red/10 text-performance-red'
                    }`}>
                      {os.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-bold font-outfit">
                    € {os.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0).toLocaleString()}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => { setEditingOS(os); setFormData(os); setIsCreating(true); }}
                        className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                      >
                        <Wrench className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                        <Printer className="w-4 h-4" />
                      </button>
                      <a href={`#/tracking/${os.trackingCode}`} target="_blank" className="p-2 bg-white/5 rounded-lg hover:bg-performance-red hover:text-white transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
              {workOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-gray-600 italic">Nenhuma OS em aberto.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* OS Creation/Edit Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={resetForm}></div>
          <div className="relative bg-[#111] border border-white/10 w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold flex items-center space-x-3">
                   <ClipboardList className="w-6 h-6 performance-red" />
                   <span>{editingOS ? `Editar Ordem ${editingOS.id}` : 'Nova Ordem de Serviço'}</span>
                </h3>
                <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">Etapa {step} de 3</p>
              </div>
              <button onClick={resetForm} className="p-2 hover:bg-white/5 rounded-full"><X className="w-6 h-6 text-gray-500" /></button>
            </div>

            {/* Modal Body */}
            <div className="p-10 max-h-[70vh] overflow-y-auto">
              {step === 1 && (
                <div className="space-y-8 animate-in slide-in-from-right duration-300">
                  <div className="flex items-center space-x-3 text-performance-red">
                    <User className="w-5 h-5" />
                    <h4 className="font-bold uppercase text-sm tracking-widest">Dados do Cliente e Viatura</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Nome do Cliente</label>
                      <input 
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 focus:border-performance-red focus:outline-none transition-all"
                        value={formData.clientName || ''}
                        onChange={e => setFormData({...formData, clientName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Telemóvel</label>
                      <input 
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 focus:border-performance-red focus:outline-none transition-all"
                        value={formData.clientPhone || ''}
                        onChange={e => setFormData({...formData, clientPhone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Matrícula</label>
                      <input 
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 focus:border-performance-red focus:outline-none transition-all"
                        placeholder="00-XX-00"
                        value={formData.plate || ''}
                        onChange={e => setFormData({...formData, plate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Viatura (Marca/Modelo)</label>
                      <input 
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 focus:border-performance-red focus:outline-none transition-all"
                        value={formData.vehicle || ''}
                        onChange={e => setFormData({...formData, vehicle: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Quilometragem</label>
                      <input 
                        type="number"
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 focus:border-performance-red focus:outline-none transition-all"
                        value={formData.km || ''}
                        onChange={e => setFormData({...formData, km: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in slide-in-from-right duration-300">
                  <div className="flex items-center space-x-3 text-performance-red">
                    <ListChecks className="w-5 h-5" />
                    <h4 className="font-bold uppercase text-sm tracking-widest">Checklist de Entrada</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['lights', 'bodywork', 'tires', 'oilLevel'].map((key) => (
                      <button 
                        key={key}
                        onClick={() => setFormData({
                          ...formData, 
                          checklist: { ...formData.checklist!, [key]: !formData.checklist![key as keyof WorkOrderChecklist] }
                        })}
                        className={`p-4 rounded-2xl border transition-all flex items-center justify-between font-bold text-xs uppercase ${
                          formData.checklist![key as keyof WorkOrderChecklist] ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-white/5 border-white/10 text-gray-500'
                        }`}
                      >
                        <span>{key === 'lights' ? 'Iluminação' : key === 'bodywork' ? 'Pintura/Chassis' : key === 'tires' ? 'Pneus/Travões' : 'Níveis'}</span>
                        {formData.checklist![key as keyof WorkOrderChecklist] ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Observações de Danos / Estado</label>
                    <textarea 
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 focus:border-performance-red focus:outline-none transition-all h-24 resize-none"
                      value={formData.checklist?.scratches || ''}
                      onChange={e => setFormData({...formData, checklist: { ...formData.checklist!, scratches: e.target.value }})}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-in slide-in-from-right duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-performance-red">
                      <DollarSign className="w-5 h-5" />
                      <h4 className="font-bold uppercase text-sm tracking-widest">Orçamento / Serviços</h4>
                    </div>
                    <button onClick={addItem} className="text-xs bg-white text-black font-bold px-4 py-2 rounded-lg hover:bg-performance-red hover:text-white transition-all">Adicionar Item</button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.items?.map(item => (
                      <div key={item.id} className="grid grid-cols-12 gap-3 items-center bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                        <div className="col-span-1">
                          <select 
                             className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg py-2 text-[10px] uppercase font-bold text-gray-500"
                             value={item.type}
                             onChange={e => updateItem(item.id, 'type', e.target.value)}
                          >
                            <option value="Peça">Pç</option>
                            <option value="Serviço">Sv</option>
                          </select>
                        </div>
                        <div className="col-span-5">
                          <input 
                            placeholder="Descrição do serviço ou peça..."
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-performance-red outline-none"
                            value={item.description}
                            onChange={e => updateItem(item.id, 'description', e.target.value)}
                          />
                        </div>
                        <div className="col-span-2">
                          <input 
                            type="number"
                            placeholder="Qtd"
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-center"
                            value={item.quantity}
                            onChange={e => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                          />
                        </div>
                        <div className="col-span-3">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-xs">€</span>
                            <input 
                              type="number"
                              placeholder="Preço"
                              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-right font-outfit"
                              value={item.unitPrice}
                              onChange={e => updateItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                            />
                          </div>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <button onClick={() => removeItem(item.id)} className="p-2 text-gray-600 hover:text-performance-red transition-all"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                    <div className="text-right">
                       <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Orçamentado</p>
                       <p className="text-4xl font-outfit font-extrabold performance-red">€ {total.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-[#0a0a0a] border-t border-white/5 flex items-center justify-between">
              <button 
                onClick={() => step > 1 ? setStep(step - 1) : resetForm()}
                className="px-8 py-4 text-xs font-bold text-gray-500 hover:text-white transition-all uppercase tracking-widest"
              >
                {step === 1 ? 'Cancelar' : 'Retroceder'}
              </button>
              
              {step < 3 ? (
                <button 
                  onClick={() => setStep(step + 1)}
                  className="bg-white text-black px-12 py-4 rounded-2xl font-bold hover:bg-performance-red hover:text-white transition-all shadow-xl"
                >
                  PRÓXIMO PASSO
                </button>
              ) : (
                <button 
                  onClick={handleCreateOS}
                  className="bg-performance-red text-white px-12 py-4 rounded-2xl font-bold hover:bg-rose-700 transition-all shadow-xl flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingOS ? 'GUARDAR ALTERAÇÕES' : 'CONFIRMAR E GERAR CÓDIGO'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
