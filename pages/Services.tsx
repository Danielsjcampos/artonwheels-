import React from 'react';
import { Service } from '../types';
import { Wrench, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/ui/seo';

export default function ServicesPage({ services }: { services: Service[] }) {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEO 
        title="Serviços Técnicos Premium | Detailing e Garagem" 
        description="Agende serviços de detailing externo, revisão técnica, suspensão Ohlins e manutenção especializada. Rigor técnico e excelência para o seu veículo."
      />
      <div className="text-center mb-20">
        <h1 className="text-5xl font-outfit font-extrabold mb-6">SERVIÇOS DE <span className="performance-red">EXCELÊNCIA</span></h1>
        <p className="text-gray-400 font-light max-w-3xl mx-auto text-lg">
          Tratamos o seu veículo com o rigor técnico que ele merece. Da manutenção preventiva ao refinamento estético extremo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {services.map((service) => (
          <div key={service.id} className="bg-[#111] border border-white/5 rounded-3xl p-8 hover:border-performance-red/20 transition-all flex flex-col md:flex-row gap-8 items-start group">
            <div className="w-16 h-16 bg-performance-red/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-performance-red/20 transition-all">
              <Wrench className="w-8 h-8 performance-red" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{service.name}</h3>
                <span className="text-xl font-outfit font-bold performance-red">€{service.price}</span>
              </div>
              <p className="text-gray-400 mb-6 font-light">{service.description}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500 font-medium">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Duração: {service.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Vagas Disponíveis</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Block */}
      <div className="relative rounded-[40px] overflow-hidden bg-white/5 border border-white/10 p-12 text-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-performance-red to-transparent"></div>
        <h2 className="text-3xl font-bold mb-6">Personalização à Medida</h2>
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
          Não encontrou o que procura? Realizamos projetos especiais de modificação mecânica, eletrónica e estética customizada.
        </p>
        <Link to="/contact" className="bg-white text-black px-12 py-4 rounded-full font-bold hover:bg-performance-red hover:text-white transition-all inline-flex items-center space-x-3">
          <span>CONSULTAR PROJETO ESPECIAL</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
