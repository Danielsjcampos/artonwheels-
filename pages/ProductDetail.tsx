import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product, Lead } from '../types';
import { 
  ArrowLeft, ChevronRight, Zap, Shield, Check, 
  Send, Calendar, Gauge, Cpu, Droplet, Palette, 
  CheckCircle2, Loader2, Info
} from 'lucide-react';
import { SEO } from '../components/ui/seo';

interface Props {
  products: Product[];
  addLead: (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>) => void;
}

export default function ProductDetail({ products, addLead }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  const productSchema = product ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [product.image, ...(product.gallery || [])],
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "url": `https://artonwheelsgarage.pt/#/product/${product.id}`,
      "priceCurrency": "EUR",
      "price": product.price,
      "availability": "https://schema.org/InStock"
    }
  } : null;
  
  const [activeImage, setActiveImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-40 text-center px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-500">Produto não encontrado.</h2>
        <Link to="/store" className="text-performance-red font-bold hover:underline">Voltar à loja</Link>
      </div>
    );
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1200));
    
    addLead({
      ...formData,
      vehicle: `${product.brand} ${product.name}`,
      interest: `Interesse em Compra: ${product.category}`
    });
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const hasGallery = product.gallery && product.gallery.length > 0;
  const isMoto = product.category === 'Motos';

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEO 
        title={product.name}
        description={product.description}
        image={product.image}
        type="product"
        schema={productSchema}
      />
      {/* Back navigation */}
      <Link to="/store" className="inline-flex items-center space-x-2 text-gray-500 hover:text-white mb-10 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-widest">Voltar ao Catálogo</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Gallery */}
        <div className="space-y-6">
          <div className="aspect-[4/3] rounded-[40px] overflow-hidden bg-[#111] border border-white/5 relative group">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute top-6 left-6">
              <span className="bg-performance-red text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                Disponível
              </span>
            </div>
          </div>
          
          {hasGallery && (
            <div className="grid grid-cols-5 gap-3">
              {product.gallery?.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-performance-red' : 'border-white/5 hover:border-white/20'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Form */}
        <div className="flex flex-col">
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xs font-bold text-performance-red uppercase tracking-[0.2em]">{product.brand}</span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">{product.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-outfit font-extrabold mb-6 leading-tight uppercase">{product.name}</h1>
            <p className="text-3xl font-outfit font-bold mb-8">€ {product.price.toLocaleString()}</p>
            <div className="p-6 bg-[#111] border border-white/5 rounded-3xl mb-8">
              <p className="text-gray-400 font-light leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* Technical Specs for Motos */}
          {isMoto && product.specs && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-[#111] border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <Calendar className="w-5 h-5 text-gray-500 mb-2" />
                <span className="text-[10px] text-gray-500 font-bold uppercase mb-1">Ano</span>
                <span className="text-sm font-bold">{product.specs.year}</span>
              </div>
              <div className="bg-[#111] border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <Gauge className="w-5 h-5 text-gray-500 mb-2" />
                <span className="text-[10px] text-gray-500 font-bold uppercase mb-1">KM</span>
                <span className="text-sm font-bold">{product.specs.mileage?.toLocaleString()} km</span>
              </div>
              <div className="bg-[#111] border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <Cpu className="w-5 h-5 text-gray-500 mb-2" />
                <span className="text-[10px] text-gray-500 font-bold uppercase mb-1">Cilindrada</span>
                <span className="text-sm font-bold">{product.specs.engineSize}</span>
              </div>
              <div className="bg-[#111] border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <Zap className="w-5 h-5 text-gray-500 mb-2" />
                <span className="text-[10px] text-gray-500 font-bold uppercase mb-1">Potência</span>
                <span className="text-sm font-bold">{product.specs.power}</span>
              </div>
              <div className="bg-[#111] border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <Palette className="w-5 h-5 text-gray-500 mb-2" />
                <span className="text-[10px] text-gray-500 font-bold uppercase mb-1">Cor</span>
                <span className="text-sm font-bold">{product.specs.color}</span>
              </div>
              <div className="bg-[#111] border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <Droplet className="w-5 h-5 text-gray-500 mb-2" />
                <span className="text-[10px] text-gray-500 font-bold uppercase mb-1">Transmissão</span>
                <span className="text-sm font-bold truncate max-w-full">{product.specs.transmission}</span>
              </div>
            </div>
          )}

          {/* Lead Form */}
          <div className="bg-performance-red p-10 rounded-[40px] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Shield className="w-24 h-24 text-white" />
            </div>
            
            {isSuccess ? (
              <div className="text-center py-4 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">PEDIDO RECEBIDO</h3>
                <p className="text-white/80 text-sm">Um consultor Arton entrará em contacto muito brevemente.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="relative z-10 space-y-4">
                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tighter">Solicitar proposta personalizada</h3>
                <div className="space-y-3">
                  <input 
                    required
                    type="text" 
                    placeholder="O seu nome completo"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 placeholder:text-white/40 focus:outline-none focus:bg-white/20 text-white transition-all"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    required
                    type="email" 
                    placeholder="Endereço de email"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 placeholder:text-white/40 focus:outline-none focus:bg-white/20 text-white transition-all"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                  <input 
                    required
                    type="tel" 
                    placeholder="Telemóvel"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 placeholder:text-white/40 focus:outline-none focus:bg-white/20 text-white transition-all"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="w-full bg-white text-performance-red font-bold py-5 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-100 transition-all shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  <span>SOLICITAR CONTACTO AGORA</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      {/* Specs Section - Optional additional info */}
      <div className="mt-24 border-t border-white/5 pt-16">
        <h2 className="text-2xl font-bold mb-10 flex items-center space-x-3">
          <Info className="w-6 h-6 performance-red" />
          <span>GARANTIA ARTON WHEELS</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400 font-light">
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase">Certificação Técnica</h4>
            <p>Todos os nossos veículos passam por um rigoroso check-up de 120 pontos antes de serem colocados à venda.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase">Garantia Integrada</h4>
            <p>Oferecemos garantia completa de 12 a 24 meses em motor e caixa, com assistência técnica dedicada na nossa garagem.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase">Performance Ready</h4>
            <p>Entregamos o veículo pronto a rolar, com revisão efetuada e detalhe estético premium incluído.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
