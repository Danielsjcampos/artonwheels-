
import { Product, Service, Lead, LeadStatus, BlogPost, FinancialRecord, StoreSettings, Appointment, WorkOrder, WorkOrderStatus } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'm1',
    name: 'Ducati Panigale V4 Speciale',
    brand: 'Ducati',
    category: 'Motos',
    price: 45000,
    image: 'https://artonwheelsgarage.pt/wp-content/uploads/2025/02/MOTAS-1.jpg',
    description: 'A essência da performance italiana. Edição limitada com escape Akrapovič em titânio e componentes em magnésio.',
    featured: true,
    gallery: [
      'https://artonwheelsgarage.pt/wp-content/uploads/2025/02/MOTAS-1.jpg',
      'https://artonwheelsgarage.pt/wp-content/uploads/2025/02/122173346_2831075237129098_1402242756727258382_n.jpg',
      'https://artonwheelsgarage.pt/wp-content/uploads/2025/02/122322766_2831645907072031_6090597000900089145_n.jpg',
      'https://artonwheelsgarage.pt/wp-content/uploads/2025/02/240460485_3071883139714972_6938000264052546228_n.jpg',
      'https://artonwheelsgarage.pt/wp-content/uploads/2025/02/278994487_3245164312386853_1407995694917075689_n.jpg',
      'https://artonwheelsgarage.pt/wp-content/uploads/2025/02/191771043_2993509257552361_2978538583806811981_n.jpg'
    ],
    specs: {
      year: 2023,
      mileage: 1250,
      engineSize: '1103 cc',
      power: '226 cv',
      transmission: '6 Velocidades DQS',
      color: 'Rosso Ducati / Tricolore'
    }
  },
  {
    id: 'm2',
    name: 'BMW S1000RR Motorsport',
    brand: 'BMW Motorrad',
    category: 'Motos',
    price: 26500,
    image: 'https://artonwheelsgarage.pt/wp-content/uploads/2025/02/278994487_3245164312386853_1407995694917075689_n.jpg',
    description: 'Domine as pistas com a tecnologia M Package e jantes em carbono. Versão full extras.',
    featured: true,
    gallery: [
      'https://artonwheelsgarage.pt/wp-content/uploads/2025/02/278994487_3245164312386853_1407995694917075689_n.jpg',
      'https://artonwheelsgarage.pt/wp-content/uploads/2025/02/278925346_3245164329053518_8206417718558773935_n.jpg'
    ],
    specs: {
      year: 2024,
      mileage: 0,
      engineSize: '999 cc',
      power: '210 cv',
      transmission: 'Manual 6 vel',
      color: 'M Motorsport'
    }
  },
  {
    id: '1',
    name: 'Vossen HF-5 Gloss Black',
    brand: 'Vossen',
    category: 'Jantes',
    price: 3200,
    image: 'https://artonwheelsgarage.pt/wp-content/uploads/2024/10/IMG-20241018-WA0067.jpg',
    description: 'A HF-5 é a interpretação da Vossen para o design de raios divididos de alto desempenho.',
    featured: true
  },
  {
    id: '2',
    name: 'Michelin Pilot Sport 5',
    brand: 'Michelin',
    category: 'Pneus',
    price: 195,
    image: 'https://artonwheelsgarage.pt/wp-content/uploads/2024/10/IMG-20241018-WA0045.jpg',
    description: 'Máxima precisão de condução e longevidade quilométrica superior.',
    featured: false
  }
];

export const INITIAL_SERVICES: Service[] = [
  { 
    id: 's1', 
    name: 'Detailing Externo Premium', 
    price: 250, 
    duration: '4h', 
    description: 'Lavagem técnica detalhada, descontaminação e proteção de pintura de alto brilho.' 
  },
  { 
    id: 's2', 
    name: 'Revisão Técnica Performance', 
    price: 450, 
    duration: '6h', 
    description: 'Check-up completo de sistemas de suspensão, travagem e otimização eletrónica.' 
  }
];

export const INITIAL_LEADS: Lead[] = [
  { 
    id: 'l1', 
    name: 'Carlos Santos', 
    email: 'carlos@email.com', 
    phone: '912345678', 
    vehicle: 'Porsche 911 GT3', 
    interest: 'Tratamento Cerâmico', 
    status: LeadStatus.NEW, 
    createdAt: '2024-05-20T10:00:00Z' 
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'O Guia Definitivo para Jantes Forjadas',
    slug: 'guia-jantes-forjadas',
    content: 'Descubra por que as jantes forjadas são a escolha preferida para entusiastas de performance que procuram leveza e resistência...',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
    author: 'Equipa Arton',
    date: '2024-05-21',
    keywords: ['jantes', 'performance', 'luxo']
  }
];

export const INITIAL_FINANCE: FinancialRecord[] = [
  { id: 'f1', type: 'inflow', category: 'Serviço', amount: 850, date: '2024-05-21', description: 'Venda Tratamento Cerâmico - Carlos' },
  { id: 'f2', type: 'outflow', category: 'Marketing', amount: 200, date: '2024-05-20', description: 'Campanha Instagram Performance' },
  { id: 'f3', type: 'inflow', category: 'Venda', amount: 3200, date: '2024-05-22', description: 'Venda Jantes Vossen HF-5 - Ricardo' },
  { id: 'f4', type: 'outflow', category: 'Peças', amount: 1200, date: '2024-05-23', description: 'Aquisição Material Suspensão Ohlins' },
  { id: 'f5', type: 'inflow', category: 'Serviço', amount: 450, date: '2024-05-24', description: 'Revisão BMW S1000RR' }
];

export const INITIAL_WORK_ORDERS: WorkOrder[] = [
  {
    id: 'os1',
    trackingCode: 'ART-2024-001',
    clientName: 'Daniel Oliveira',
    clientPhone: '912344556',
    clientEmail: 'daniel@email.com',
    vehicle: 'Ducati Panigale V4',
    plate: 'AA-00-BB',
    km: 5200,
    status: WorkOrderStatus.IN_PROGRESS,
    items: [
      { id: 'i1', description: 'Óleo Shell Advance', quantity: 4, unitPrice: 25, type: 'Peça' },
      { id: 'i2', description: 'Filtro de Óleo', quantity: 1, unitPrice: 15, type: 'Peça' },
      { id: 'i3', description: 'Mão de Obra Especializada', quantity: 2, unitPrice: 60, type: 'Serviço' }
    ],
    checklist: {
      lights: true,
      bodywork: true,
      tires: true,
      oilLevel: false,
      fuelLevel: '1/2',
      scratches: 'Pequeno risco no depósito lateral direito.'
    },
    technician: 'Bruno Arton',
    startDate: '2024-05-24',
    notes: 'Cliente solicitou verificação do sistema de travagem.'
  },
  {
    id: 'os2',
    trackingCode: 'ART-2024-002',
    clientName: 'Marta Ferreira',
    clientPhone: '934556778',
    clientEmail: 'marta@email.com',
    vehicle: 'Porsche Taycan S',
    plate: 'ZZ-99-XX',
    km: 12400,
    status: WorkOrderStatus.DIAGNOSIS,
    items: [
      { id: 'i4', description: 'Detailing Cerâmico Exterior', quantity: 1, unitPrice: 850, type: 'Serviço' }
    ],
    checklist: {
      lights: true,
      bodywork: true,
      tires: true,
      oilLevel: true,
      fuelLevel: '80%',
      scratches: 'Sem danos visíveis.'
    },
    technician: 'Nuno Estética',
    startDate: '2024-05-25',
    notes: 'Preparação para evento de performance.'
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  name: 'ART ON WHEELS',
  cnpj: '500 000 000',
  phone: '+351 912 345 678',
  email: 'contacto@artonwheels.pt',
  address: 'Zona Industrial da Maia, Armazém 4A - Porto',
  logo: 'https://artonwheelsgarage.pt/wp-content/uploads/2024/03/logo-art-on-wheels.png',
  icon: 'https://artonwheelsgarage.pt/wp-content/uploads/2024/03/logo-art-on-wheels.png',
  aiProvider: 'gemini',
  heroVideoUrl: 'https://www.youtube.com/watch?v=ToOxT1B0Ye8'
};

export const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 'a1', leadId: 'l1', serviceId: 's1', date: '2024-05-27', time: '10:00' }
];
