
export enum LeadStatus {
  NEW = 'Novo',
  IN_CONTACT = 'Em contacto',
  QUOTED = 'Orçamento enviado',
  CLOSED = 'Fechado',
  LOST = 'Perdido'
}

export enum WorkOrderStatus {
  DIAGNOSIS = 'Diagnóstico',
  IN_PROGRESS = 'Em Reparação',
  AWAITING_PARTS = 'Aguardar Peças',
  READY = 'Finalizado',
  DELIVERED = 'Entregue'
}

export interface WorkOrderItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  type: 'Peça' | 'Serviço';
}

export interface WorkOrderChecklist {
  lights: boolean;
  bodywork: boolean;
  tires: boolean;
  oilLevel: boolean;
  fuelLevel: string; // e.g. "1/4", "Reserva", "Cheio"
  scratches: string;
}

export interface WorkOrder {
  id: string;
  trackingCode: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  vehicle: string;
  plate: string;
  km: number;
  status: WorkOrderStatus;
  items: WorkOrderItem[];
  checklist: WorkOrderChecklist;
  technician: string;
  startDate: string;
  notes: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  interest: string;
  status: LeadStatus;
  createdAt: string;
}

export interface ProductSpecs {
  year?: number;
  mileage?: number;
  engineSize?: string;
  power?: string;
  transmission?: string;
  color?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Jantes' | 'Pneus' | 'Kits' | 'Motos' | 'Serviço';
  price: number;
  image: string;
  description: string;
  featured: boolean;
  gallery?: string[];
  specs?: ProductSpecs;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
}

export interface Appointment {
  id: string;
  leadId: string;
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
}

export interface FinancialRecord {
  id: string;
  type: 'inflow' | 'outflow';
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  author: string;
  date: string;
  keywords: string[];
}

export interface StoreSettings {
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  address: string;
  logo: string;
  icon: string;
  aiProvider: 'gemini' | 'gpt';
  heroVideoUrl?: string;
}
