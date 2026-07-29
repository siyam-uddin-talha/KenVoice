'use client';

import { Box, Plus, Trash2 } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db/schema';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/useToast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { itemSchema, type ItemFormData } from '@/lib/validations';

export default function ItemsPage() {
  const { showToast, confirmToast } = useToast();
  const items = useLiveQuery(() => db.items.orderBy('createdAt').reverse().toArray()) || [];
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema as any),
    defaultValues: {
      name: '',
      unitPrice: 0,
    },
  });

  const onSubmit = async (data: ItemFormData) => {
    await db.items.add({
      id: uuidv4(),
      name: data.name.trim(),
      unitPrice: data.unitPrice,
      taxRate: 0,
      createdAt: Date.now(),
    });

    showToast(`Item "${data.name.trim()}" saved!`, 'success');
    setIsAdding(false);
    reset();
  };

  const handleDelete = (id: string, itemName: string) => {
    confirmToast({
      message: `Delete item "${itemName}"?`,
      confirmLabel: "Delete Item",
      onConfirm: async () => {
        await db.items.delete(id);
        showToast(`Item "${itemName}" deleted`, 'info');
      },
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-[#161917] font-serif font-bold tracking-tight text-2xl sm:text-3xl">Items</h2>
          <p className="text-[#626a64] text-sm mt-1 sm:mt-2">Manage your catalog of services and products.</p>
        </div>
        <button 
          onClick={() => {
            setIsAdding(!isAdding);
            reset();
          }}
          className="bg-[#2b4c33] text-white hover:bg-[#161917] font-serif font-semibold transition-all duration-300 rounded-lg text-sm px-4.5 py-2.5 sm:py-2 inline-flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>

      {isAdding && (
        <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg p-6 mb-8 max-w-xl">
          <h3 className="font-serif font-bold text-lg mb-4 text-[#161917]">New Item</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#161917]">Item Description *</label>
              <input 
                {...register('name')}
                type="text"
                className={`w-full bg-[#f5f4ef] border text-[#161917] placeholder-stone-400 focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all duration-300 rounded-lg text-sm px-3.5 py-2 outline-none ${
                  errors.name ? 'border-red-500' : 'border-[#c4cbc5]'
                }`}
                placeholder="Consulting Services"
              />
              {errors.name && (
                <p className="text-xs text-red-600 font-medium mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-1 w-1/2">
              <label className="block text-xs font-semibold text-[#161917]">Unit Price *</label>
              <input 
                {...register('unitPrice')}
                type="number"
                step="0.01"
                min="0"
                className={`w-full bg-[#f5f4ef] border text-[#161917] placeholder-stone-400 focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all duration-300 rounded-lg text-sm px-3.5 py-2 outline-none font-mono ${
                  errors.unitPrice ? 'border-red-500' : 'border-[#c4cbc5]'
                }`}
                placeholder="100.00"
              />
              {errors.unitPrice && (
                <p className="text-xs text-red-600 font-medium mt-1">{errors.unitPrice.message}</p>
              )}
            </div>
            
            <div className="flex gap-3 justify-end pt-2">
              <button 
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  reset();
                }}
                className="px-4.5 py-2 text-sm font-semibold font-serif text-[#626a64] hover:text-[#161917] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-[#2b4c33] text-white hover:bg-[#161917] font-serif font-semibold transition-all duration-300 rounded-lg text-sm px-4.5 py-2 cursor-pointer"
              >
                Save Item
              </button>
            </div>
          </form>
        </div>
      )}

      {items.length === 0 && !isAdding ? (
        <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg shadow-none flex flex-col items-center justify-center p-12">
          <Box className="h-8 w-8 text-[#626a64] mb-4 opacity-50" />
          <p className="text-[#161917] font-serif font-semibold">No items yet</p>
          <p className="text-[#626a64] text-sm mt-1 mb-4">Add your first item to reuse on invoices.</p>
          <button 
            onClick={() => setIsAdding(true)}
            className="text-[#2b4c33] hover:text-[#161917] font-serif text-sm font-semibold transition-colors cursor-pointer"
          >
            + Add Item
          </button>
        </div>
      ) : (
        <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg shadow-none overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[500px] table-fixed">
            <colgroup><col className="w-auto" /><col className="w-[160px]" /><col className="w-[80px]" /></colgroup>
            <thead>
              <tr className="border-b border-[#c4cbc5] bg-[#f5f4ef]/50">
                <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-serif font-semibold text-[#161917]">Description</th>
                <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-serif font-semibold text-[#161917] text-right">Unit Price</th>
                <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-serif font-semibold text-[#161917] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c4cbc5]">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-[#f5f4ef]/30 transition-colors align-middle">
                  <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-[#161917] font-medium truncate">{item.name}</td>
                  <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-right font-mono text-[#161917] font-semibold">${item.unitPrice.toFixed(2)}</td>
                  <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-center">
                    <button 
                      onClick={() => handleDelete(item.id, item.name)}
                      className="text-[#626a64] hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
