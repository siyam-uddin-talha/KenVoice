import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string().min(1, 'Client name is required'),
  email: z.string().email('Please enter a valid email address').or(z.literal('')),
  address: z.string().optional(),
  taxId: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;

export const itemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  unitPrice: z.coerce
    .number({ invalid_type_error: 'Unit price must be a valid number' })
    .min(0, 'Price cannot be negative'),
});

export type ItemFormData = z.infer<typeof itemSchema>;

export const businessProfileSchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  email: z.string().email('Please enter a valid email address').or(z.literal('')),
  address: z.string().optional(),
  taxId: z.string().optional(),
  logoUrl: z.string().optional(),
  defaultCurrency: z.string().min(1, 'Default currency is required'),
});

export type BusinessProfileFormData = z.infer<typeof businessProfileSchema>;

export const lineItemSchema = z.object({
  id: z.string(),
  description: z.string().min(1, 'Description is required'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
  unitPrice: z.coerce.number().min(0, 'Price cannot be negative'),
  taxRate: z.coerce.number().optional().default(0),
});

export const invoiceFormSchema = z.object({
  invoiceId: z.string().min(1, 'Invoice number is required'),
  clientId: z.string().min(1, 'Please select a client'),
  issueDate: z.string().min(1, 'Issue date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  currency: z.string().min(1, 'Currency is required'),
  notes: z.string().optional(),
  taxRate: z.coerce.number().min(0).max(100).optional().default(0),
  discount: z.coerce.number().min(0).optional().default(0),
  shipping: z.coerce.number().min(0).optional().default(0),
  lineItems: z.array(lineItemSchema).min(1, 'At least one line item is required'),
});

export type InvoiceFormData = z.infer<typeof invoiceFormSchema>;
