
import React, { useState } from 'react';
import { BlogPost, StoreSettings } from '../../types';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, List, Plus, Loader2, Trash2, Globe } from 'lucide-react';

interface Props {
  posts: BlogPost[];
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  settings: StoreSettings;
}

export default function AdminBlog({ posts, setPosts, settings }: Props) {
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [queue, setQueue] = useState<string[]>([]);

  const addToQueue = () => {
    if (!keywords.trim()) return;
    setQueue([...queue, keywords]);
    setKeywords('');
  };

  const generatePost = async (topic: string) => {
    if (!settings) {
      alert('Configurações não carregadas.');
      return;
    }
    
    setIsGenerating(true);
    try {
      if (settings.aiProvider === 'gemini') {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Escreva um post de blog premium para uma garagem de rodas e performance sobre: ${topic}. 
          Retorne em formato JSON: { "title": "string", "content": "string em markdown", "keywords": ["string"] }`,
          config: { responseMimeType: "application/json" }
        });

        const data = JSON.parse(response.text || '{}');
        const newPost: BlogPost = {
          id: Math.random().toString(36).substr(2, 9),
          title: data.title || topic,
          slug: (data.title || topic).toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
          content: data.content || 'Conteúdo gerado...',
          image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=1200',
          author: 'Arton AI',
          date: new Date().toISOString().split('T')[0],
          keywords: data.keywords || [topic]
        };
        setPosts([newPost, ...posts]);
        setQueue(q => q.filter(item => item !== topic));
      } else {
        alert('Integração GPT requer backend ou Proxy. Simulado para fins de UI.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao gerar com IA.');
    } finally {
      setIsGenerating(false);
    }
  };

  const aiProviderLabel = settings?.aiProvider ? settings.aiProvider.toUpperCase() : 'AI';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog Engine AI</h1>
          <p className="text-gray-500">Criação automatizada de conteúdo com {aiProviderLabel}.</p>
        </div>
        <div className="flex items-center space-x-2 bg-performance-red/10 border border-performance-red/20 px-4 py-2 rounded-full">
          <Sparkles className="w-4 h-4 performance-red" />
          <span className="text-xs font-bold performance-red uppercase tracking-widest">{settings?.aiProvider || 'AI'} Ativo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#111] border border-white/5 p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <List className="w-5 h-5 performance-red" />
              <span>Fila de Produção</span>
            </h3>
            <div className="space-y-4 mb-6">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ex: Vantagens de rodas aro 20..." 
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-performance-red"
                  value={keywords}
                  onChange={e => setKeywords(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && addToQueue()}
                />
                <button 
                  onClick={addToQueue}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-performance-red text-white rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              {queue.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl group">
                  <span className="text-sm text-gray-300 truncate">{item}</span>
                  <button 
                    disabled={isGenerating}
                    onClick={() => generatePost(item)}
                    className="opacity-0 group-hover:opacity-100 p-2 hover:bg-performance-red rounded-lg transition-all"
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  </button>
                </div>
              ))}
              {queue.length === 0 && <p className="text-xs text-center text-gray-600 py-10 italic">Nenhum tópico na fila.</p>}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-bold flex items-center space-x-2">
                <Globe className="w-5 h-5 text-blue-500" />
                <span>Posts Publicados</span>
              </h3>
            </div>
            <div className="divide-y divide-white/5">
              {posts.map(post => (
                <div key={post.id} className="p-6 flex items-center justify-between hover:bg-white/[0.01]">
                  <div className="flex items-center space-x-4">
                    <img src={post.image} className="w-16 h-12 object-cover rounded-lg" />
                    <div>
                      <h4 className="font-bold text-sm">{post.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{post.date} • {post.author}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10" onClick={() => setPosts(posts.filter(p => p.id !== post.id))}>
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
