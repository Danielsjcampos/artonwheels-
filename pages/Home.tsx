import React from 'react';
import { Link } from 'react-router-dom';
import { Product, BlogPost, StoreSettings } from '../types';
import { ArrowRight, Zap, Shield, Award, ChevronRight } from 'lucide-react';
import { HeroSection } from '../components/blocks/hero-section-5';
import { HorizonComplexFooter } from '../components/ui/horizon-complex-footer';
import { SEO } from '../components/ui/seo';

export default function Home({ products, blogPosts, settings }: { products: Product[], blogPosts: BlogPost[], settings: StoreSettings }) {
  return (
    <div className="bg-[#0a0a0a]">
      <SEO 
        title="Home | Performance e Estética Automotiva" 
        description="A Arton Wheels Garage é especialista em jantes exclusivas, motos de elite e serviços de detalhe técnico premium em Portugal. Eleve a performance da sua máquina."
      />
      <HeroSection settings={settings} />

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-xs font-bold performance-red uppercase tracking-[0.2em] mb-4">Curadoria Exclusiva</h2>
            <h3 className="text-4xl font-outfit font-bold uppercase tracking-tight">Máquinas de Alta Performance</h3>
          </div>
          <Link to="/store" className="hidden md:flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <span>Ver catálogo completo</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="group relative bg-[#111] border border-white/5 rounded-3xl overflow-hidden hover:border-red-600/30 transition-all duration-500">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <p className="text-red-500 text-sm font-bold uppercase tracking-widest mb-2">{product.brand}</p>
                <h4 className="text-2xl font-bold mb-4">{product.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold font-outfit">€ {product.price.toLocaleString()}</span>
                  <Link to={`/product/${product.id}`} className="p-3 bg-white text-black rounded-full hover:bg-red-600 hover:text-white transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-[#111] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center group">
            <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="text-xl font-bold mb-4 uppercase tracking-wider text-white">Máxima Segurança</h4>
            <p className="text-gray-400 font-light text-sm leading-relaxed">Processos certificados e garantia total em todos os componentes e serviços realizados.</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="text-xl font-bold mb-4 uppercase tracking-wider text-white">Exclusividade</h4>
            <p className="text-gray-400 font-light text-sm leading-relaxed">Acesso a marcas e edições limitadas que definem o padrão mundial de performance.</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="text-xl font-bold mb-4 uppercase tracking-wider text-white">Alta Tecnologia</h4>
            <p className="text-gray-400 font-light text-sm leading-relaxed">Equipamentos de última geração para alinhamento, montagem e correção estética.</p>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 relative overflow-hidden bg-[#070707]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/10 via-transparent to-transparent opacity-50"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-outfit font-extrabold mb-8 tracking-tighter">PRONTO PARA ELEVAR O SEU NÍVEL?</h2>
          <p className="text-gray-400 mb-12 text-lg font-light max-w-2xl mx-auto">Agende uma consultoria técnica com os nossos especialistas e transforme a sua máquina na garagem definitiva.</p>
          <div className="flex flex-wrap justify-center gap-6">
             <Link to="/contact" className="px-10 py-5 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all uppercase tracking-widest text-sm shadow-xl shadow-red-600/20">
              Falar com Especialista
             </Link>
             <Link to="/services" className="px-10 py-5 border border-white/10 text-white font-bold rounded-full hover:bg-white/5 transition-all uppercase tracking-widest text-sm backdrop-blur-sm">
              Ver Serviços
             </Link>
          </div>
        </div>
      </section>
      
      <HorizonComplexFooter settings={settings} />
    </div>
  );
}
