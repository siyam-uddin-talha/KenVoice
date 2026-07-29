import Dexie, { type EntityTable } from 'dexie';

export interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
  taxId: string;
  createdAt: number;
}

export interface Item {
  id: string;
  name: string;
  unitPrice: number;
  taxRate: number;
  createdAt: number;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export interface Invoice {
  id: string; 
  clientId: string;
  clientName?: string;
  clientEmail?: string;
  clientAddress?: string;
  issueDate: number;
  dueDate: number;
  status: 'draft' | 'sent' | 'paid';
  lineItems: LineItem[];
  currency: string;
  notes: string;
  createdAt: number;
  // Additional invoice financial fields
  taxRate?: number;
  discount?: number;
  shipping?: number;
  // Signature fields
  signatureType?: 'none' | 'draw' | 'type' | 'upload';
  signatureText?: string;
  signatureImage?: string;
  signedAt?: number;
}

export interface BusinessProfile {
  id: string;
  name: string;
  email: string;
  address: string;
  taxId: string;
  logoUrl?: string;
  defaultCurrency: string;
}

const db = new Dexie('KyotoInvoiceDB') as Dexie & {
  clients: EntityTable<Client, 'id'>;
  items: EntityTable<Item, 'id'>;
  invoices: EntityTable<Invoice, 'id'>;
  businessProfile: EntityTable<BusinessProfile, 'id'>;
};

db.version(1).stores({
  clients: 'id, name, createdAt',
  items: 'id, name, createdAt',
  invoices: 'id, clientId, issueDate, status, createdAt',
  businessProfile: 'id',
});

export { db };
