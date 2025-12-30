
import React, { useState } from 'react';
import { Product } from '../../types';
import { Plus, Edit2, Trash2, Star, Image as ImageIcon, X } from 'lucide-react';

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function AdminProducts({ products, setProducts }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    brand: '',
    name: '',
    price: 0,
    category: 'Motos',
    image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800',
    featured: false
  });

  const toggleFeatured = (id: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  };

  const deleteProduct = (id: string) => {
    if (confirm('Tem certeza que deseja remover este produto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      ...newProduct as Product,
      id: Math.random().toString(36).substr(2, 9)
    };
    setProducts([product, ...products]);
    setShowForm(false);
    setNewProduct({
      brand: '',
      name: '',
      price: 0,
      category: 'Motos',
      image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800',
      featured: false
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestão de Inventário</h1>
          <p className="text-gray-500">Controle o catálogo da loja online.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-performance-red text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center space-x-2 shadow-lg shadow-red-600/20 hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Produto</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-[#111] border border-red-600/30 p-8 rounded-[2rem] animate-in fade-in slide-in-from-top-4 duration-500 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
             </button>
          </div>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 performance-red" />
            Cadastrar Novo Item
          </h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Marca</label>
              <input 
                type="text" required placeholder="Ex: Ducati, Vossen..."
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
                value={newProduct.brand}
                onChange={e => setNewProduct({...newProduct, brand: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Nome do Modelo</label>
              <input 
                type="text" required placeholder="Ex: Panigale V4..."
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
                value={newProduct.name}
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Preço (€)</label>
              <input 
                type="number" required
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
                value={newProduct.price || ''}
                onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Categoria</label>
              <select 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
                value={newProduct.category}
                onChange={e => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option value="Motos">Motos</option>
                <option value="Jantes">Jantes</option>
                <option value="Pneus">Pneus</option>
                <option value="Acessórios">Acessórios</option>
                <option value="Performance">Performance</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Link da Imagem</label>
              <div className="flex gap-4">
                <input 
                  type="url" required
                  className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
                  value={newProduct.image}
                  onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                />
                <button type="submit" className="bg-red-600 text-white px-8 rounded-xl font-bold text-sm hover:bg-red-700 transition-all">
                  SALVAR ITEM
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-[#111] border border-white/5 rounded-[2.5rem] p-6 flex space-x-6 hover:border-red-600/20 transition-all group">
            <div className="w-32 h-32 bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1">{product.brand}</p>
                  <h3 className="text-xl font-bold tracking-tight text-white/90">{product.name}</h3>
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => toggleFeatured(product.id)}
                    className={`p-2 rounded-xl transition-all ${product.featured ? 'bg-amber-500/10 text-amber-500' : 'bg-white/5 text-gray-600'}`}
                  >
                    <Star className={`w-4 h-4 ${product.featured ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 bg-white/5 text-gray-400 rounded-xl hover:bg-white/10">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 bg-white/5 text-gray-400 rounded-xl hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-extrabold tracking-widest mb-1">Preço</p>
                    <p className="font-outfit font-bold text-xl text-white">€{product.price.toLocaleString()}</p>
                  </div>
                  <div className="w-px h-8 bg-white/5" />
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-extrabold tracking-widest mb-1">Categoria</p>
                    <p className="text-xs font-medium text-white/70">{product.category}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest ${product.featured ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-gray-500/5 text-gray-500 border border-white/5'}`}>
                  {product.featured ? 'DESTACADO' : 'NORMAL'}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div 
            onClick={() => setShowForm(true)}
            className="bg-[#0a0a0a] border-2 border-dashed border-white/5 rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-gray-600 hover:border-red-600/30 hover:text-red-600 transition-all cursor-pointer min-h-[160px] group"
        >
           <Plus className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
           <p className="font-bold uppercase tracking-widest text-sm text-gray-500 group-hover:text-red-600">Adicionar outro item</p>
        </div>
      </div>
    </div>
  );
}
