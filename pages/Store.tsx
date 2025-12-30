import React, { useState } from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { Search, Filter, Tag, Eye, ArrowRight } from 'lucide-react';
import { SEO } from '../components/ui/seo';

export default function Store({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<string>('Tudo');
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'Tudo' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = ['Tudo', 'Jantes', 'Pneus', 'Kits', 'Motos', 'Serviço'];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEO 
        title="Loja de Performance | Jantes e Acessórios" 
        description="Explore o nosso catálogo exclusivo de jantes Vossen, pneus Michelin, motos de elite e kits de performance. Qualidade premium para o seu veículo."
      />
      <div className="mb-12">
        <h1 className="text-5xl font-outfit font-extrabold mb-4 uppercase">ARTON <span className="performance-red">SHOP</span></h1>
        <p className="text-gray-400 font-light max-w-2xl">Equipe o seu veículo ou motociclo com o que há de melhor no mercado mundial de performance.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
        <div className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Categorias</h3>
            <div className="flex flex-col space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-left px-4 py-2 rounded-lg text-sm transition-all ${filter === cat ? 'bg-performance-red text-white' : 'hover:bg-white/5 text-gray-400'}`}
                >
                  {cat === 'Tudo' ? 'Todos os Produtos' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-performance-red/20 to-transparent border border-performance-red/20 rounded-2xl">
            <Tag className="w-6 h-6 performance-red mb-4" />
            <h4 className="font-bold mb-2">Oferta de Lançamento</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">15% de desconto em qualquer kit de jantes + pneus este mês.</p>
            <button className="text-xs font-bold performance-red hover:underline uppercase tracking-widest">Consultar agora</button>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Pesquisar por modelo ou marca..." 
                className="w-full bg-[#111] border border-white/5 rounded-full pl-12 pr-6 py-3 focus:outline-none focus:border-performance-red/50 transition-all text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="flex items-center space-x-2 bg-[#111] px-6 py-3 rounded-full border border-white/5 text-sm font-medium hover:bg-white/5 transition-all">
              <Filter className="w-4 h-4" />
              <span>Filtros Avançados</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-[#111] border border-white/5 rounded-[32px] p-4 group transition-all hover:border-white/10 hover:shadow-2xl hover:shadow-performance-red/5">
                <div className="aspect-square rounded-[24px] overflow-hidden mb-4 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-[10px] font-extrabold text-gray-300 uppercase tracking-widest">{product.category}</span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                     <Link 
                      to={`/product/${product.id}`}
                      className="bg-white text-black p-4 rounded-full hover:bg-performance-red hover:text-white transition-all transform hover:scale-110 shadow-xl"
                     >
                        <Eye className="w-5 h-5" />
                     </Link>
                  </div>
                </div>
                <div className="px-2">
                  <p className="text-gray-500 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-1">{product.brand}</p>
                  <h4 className="text-lg font-bold mb-4 line-clamp-1">{product.name}</h4>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-600 font-bold uppercase">Preço</span>
                      <span className="text-xl font-outfit font-bold">€ {product.price.toLocaleString()}</span>
                    </div>
                    <Link to={`/product/${product.id}`} className="flex items-center space-x-2 bg-white/5 hover:bg-performance-red text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all">
                      <span>VER DETALHES</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-500">Nenhum item encontrado para a sua pesquisa.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
