'use client';

import { Users, Plus, Trash2, Pencil } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db/schema';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { useToast } from '@/hooks/useToast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema, type ClientFormData } from '@/lib/validations';

export default function ClientsPage() {
  const { showToast, confirmToast } = useToast();
  const clients = useLiveQuery(() => db.clients.orderBy('createdAt').reverse().toArray()) || [];
  const [isAdding, setIsAdding] = useState(false);
  const [editingClient, setEditingClient] = useState<any | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema as any),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      taxId: '',
    },
  });

  const handleAddNew = () => {
    setEditingClient(null);
    setIsAdding(!isAdding);
    reset({
      name: '',
      email: '',
      address: '',
      taxId: '',
    });
  };

  const handleEdit = (client: any) => {
    setIsAdding(false);
    setEditingClient(client);
    reset({
      name: client.name || '',
      email: client.email || '',
      address: client.address || '',
      taxId: client.taxId || '',
    });
  };

  const handleCancelForm = () => {
    setIsAdding(false);
    setEditingClient(null);
    reset({
      name: '',
      email: '',
      address: '',
      taxId: '',
    });
  };

  const onSubmit = async (data: ClientFormData) => {
    if (editingClient) {
      await db.clients.update(editingClient.id, {
        name: data.name.trim(),
        email: (data.email || '').trim(),
        address: (data.address || '').trim(),
        taxId: (data.taxId || '').trim(),
      });
      showToast(`Client "${data.name.trim()}" updated successfully!`, 'success');
      setEditingClient(null);
    } else {
      await db.clients.add({
        id: uuidv4(),
        name: data.name.trim(),
        email: (data.email || '').trim(),
        address: (data.address || '').trim(),
        taxId: (data.taxId || '').trim(),
        createdAt: Date.now(),
      });
      showToast(`Client "${data.name.trim()}" added successfully!`, 'success');
      setIsAdding(false);
    }
    reset();
  };

  const handleDelete = (id: string, clientName: string) => {
    confirmToast({
      message: `Delete client "${clientName}"?`,
      confirmLabel: "Delete Client",
      onConfirm: async () => {
        if (editingClient?.id === id) {
          setEditingClient(null);
        }
        await db.clients.delete(id);
        showToast(`Client "${clientName}" deleted`, 'info');
      },
    });
  };

  const showForm = isAdding || Boolean(editingClient);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-[#161917] font-serif font-bold tracking-tight text-2xl sm:text-3xl">Clients</h2>
          <p className="text-[#626a64] text-sm mt-1 sm:mt-2">Manage your client roster and their billing details.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-[#2b4c33] text-white hover:bg-[#161917] font-serif font-semibold transition-all duration-300 rounded-lg text-sm px-4.5 py-2.5 sm:py-2 inline-flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Client
        </button>
      </div>

      {showForm && (
        <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg p-6 mb-8">
          <h3 className="font-serif font-bold text-lg mb-4 text-[#161917]">
            {editingClient ? `Edit Client: ${editingClient.name}` : 'New Client'}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#161917]">Client Name *</label>
                <input 
                  {...register('name')}
                  type="text"
                  className={`w-full bg-[#f5f4ef] border text-[#161917] placeholder-stone-400 focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all duration-300 rounded-lg text-sm px-3.5 py-2 outline-none ${
                    errors.name ? 'border-red-500' : 'border-[#c4cbc5]'
                  }`}
                  placeholder="Acme Corp"
                />
                {errors.name && (
                  <p className="text-xs text-red-600 font-medium mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#161917]">Email</label>
                <input 
                  {...register('email')}
                  type="email"
                  className={`w-full bg-[#f5f4ef] border text-[#161917] placeholder-stone-400 focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all duration-300 rounded-lg text-sm px-3.5 py-2 outline-none ${
                    errors.email ? 'border-red-500' : 'border-[#c4cbc5]'
                  }`}
                  placeholder="billing@acme.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-600 font-medium mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#161917]">Billing Address</label>
              <textarea 
                {...register('address')}
                rows={2}
                className="w-full bg-[#f5f4ef] border border-[#c4cbc5] text-[#161917] placeholder-stone-400 focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all duration-300 rounded-lg text-sm px-3.5 py-2 outline-none"
                placeholder="123 Business Rd..."
              />
            </div>

            <div className="space-y-1 w-full md:w-1/2">
              <label className="block text-xs font-semibold text-[#161917]">Tax ID / VAT</label>
              <input 
                {...register('taxId')}
                type="text"
                className="w-full bg-[#f5f4ef] border border-[#c4cbc5] text-[#161917] placeholder-stone-400 focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all duration-300 rounded-lg text-sm px-3.5 py-2 outline-none"
                placeholder="Optional"
              />
            </div>
            
            <div className="flex gap-3 justify-end pt-2">
              <button 
                type="button"
                onClick={handleCancelForm}
                className="px-4.5 py-2 text-sm font-semibold font-serif text-[#626a64] hover:text-[#161917] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-[#2b4c33] text-white hover:bg-[#161917] font-serif font-semibold transition-all duration-300 rounded-lg text-sm px-4.5 py-2 cursor-pointer"
              >
                {editingClient ? 'Update Client' : 'Save Client'}
              </button>
            </div>
          </form>
        </div>
      )}

      {clients.length === 0 && !showForm ? (
        <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg shadow-none flex flex-col items-center justify-center p-12">
          <Users className="h-8 w-8 text-[#626a64] mb-4 opacity-50" />
          <p className="text-[#161917] font-serif font-semibold">No clients yet</p>
          <p className="text-[#626a64] text-sm mt-1 mb-4">Add your first client to start generating invoices.</p>
          <button 
            onClick={handleAddNew}
            className="text-[#2b4c33] hover:text-[#161917] font-serif text-sm font-semibold transition-colors cursor-pointer"
          >
            + Add Client
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map(client => (
            <div key={client.id} className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg p-6 relative group">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-serif font-bold text-lg text-[#161917]">{client.name}</h3>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <button 
                    onClick={() => handleEdit(client)}
                    className="text-[#626a64] hover:text-[#2b4c33] p-1.5 rounded-lg hover:bg-[#d1ded3]/60 transition-colors cursor-pointer"
                    title="Edit Client"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(client.id, client.name)}
                    className="text-[#626a64] hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete Client"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {client.email && <p className="text-sm text-[#626a64] font-mono mb-1">{client.email}</p>}
              {client.address && <p className="text-sm text-[#626a64] mb-3 leading-relaxed whitespace-pre-wrap">{client.address}</p>}
              {client.taxId && (
                <div className="mt-3">
                  <span className="bg-[#d1ded3] text-[#2b4c33] border border-[#c4cbc5] text-xs px-3 py-0.5 rounded-md font-serif">
                    Tax ID: {client.taxId}
                  </span>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-[#c4cbc5] text-xs text-[#626a64]">
                Added {format(new Date(client.createdAt), 'MMM dd, yyyy')}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
