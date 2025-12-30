
import React from 'react';
import { StoreSettings } from '../../types';
import { Save, Building2, Phone, Mail, MapPin, Key, Palette } from 'lucide-react';

interface Props {
  settings: StoreSettings;
  setSettings: React.Dispatch<React.SetStateAction<StoreSettings>>;
}

export default function AdminSettings({ settings, setSettings }: Props) {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Configurações salvas com sucesso!');
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 font-outfit">A carregar configurações...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Ajustes da Garagem</h1>
        <p className="text-gray-500">Branding, dados fiscais e integrações de IA.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Branding & Info */}
        <div className="bg-[#111] border border-white/5 p-8 rounded-[40px] space-y-6">
          <h3 className="text-xl font-bold flex items-center space-x-3 mb-4">
            <Building2 className="w-6 h-6 performance-red" />
            <span>Identidade do Negócio</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Nome da Loja</label>
              <input 
                type="text" 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-performance-red"
                value={settings.name || ''}
                onChange={e => setSettings({...settings, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">CNPJ / NIF</label>
              <input 
                type="text" 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-performance-red"
                value={settings.cnpj || ''}
                onChange={e => setSettings({...settings, cnpj: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Telefone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input 
                  type="text" 
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-performance-red"
                  value={settings.phone || ''}
                  onChange={e => setSettings({...settings, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Endereço</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input 
                  type="text" 
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-performance-red"
                  value={settings.address || ''}
                  onChange={e => setSettings({...settings, address: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Media & Design */}
        <div className="bg-[#111] border border-white/5 p-8 rounded-[40px] space-y-6">
          <h3 className="text-xl font-bold flex items-center space-x-3 mb-4">
            <Palette className="w-6 h-6 text-purple-500" />
            <span>Média & Design</span>
          </h3>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">URL do Vídeo Hero (MP4)</label>
            <input 
              type="text" 
              placeholder="https://exemplo.com/video.mp4"
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-performance-red"
              value={settings.heroVideoUrl || ''}
              onChange={e => setSettings({...settings, heroVideoUrl: e.target.value})}
            />
            <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-1">Insira um link direto para um arquivo MP4 que será exibido no fundo do topo do site.</p>
          </div>
        </div>

        {/* AI & Integration */}
        <div className="bg-[#111] border border-white/5 p-8 rounded-[40px] space-y-6">
          <h3 className="text-xl font-bold flex items-center space-x-3 mb-4">
            <Key className="w-6 h-6 text-blue-500" />
            <span>Integração de IA</span>
          </h3>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-400">A plataforma utiliza automaticamente a chave configurada no ambiente para processamento de IA.</p>
            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl">
              <button 
                type="button"
                onClick={() => setSettings({...settings, aiProvider: 'gemini'})}
                className={`flex-1 py-4 rounded-xl font-bold transition-all ${settings.aiProvider === 'gemini' ? 'bg-performance-red text-white' : 'bg-[#0a0a0a] text-gray-500'}`}
              >
                Google Gemini
              </button>
              <button 
                type="button"
                onClick={() => setSettings({...settings, aiProvider: 'gpt'})}
                className={`flex-1 py-4 rounded-xl font-bold transition-all ${settings.aiProvider === 'gpt' ? 'bg-blue-600 text-white' : 'bg-[#0a0a0a] text-gray-500'}`}
              >
                OpenAI GPT
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-white text-black font-bold px-12 py-5 rounded-2xl hover:bg-performance-red hover:text-white transition-all flex items-center space-x-2">
            <Save className="w-5 h-5" />
            <span>GUARDAR CONFIGURAÇÕES</span>
          </button>
        </div>
      </form>
    </div>
  );
}
