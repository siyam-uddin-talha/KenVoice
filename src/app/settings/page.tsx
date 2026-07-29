'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db/schema';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/useToast';
import { Upload, Trash2 } from 'lucide-react';
import { Select } from '@/components/ui/Select';
import { CURRENCY_OPTIONS } from '@/lib/currency';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { businessProfileSchema, type BusinessProfileFormData } from '@/lib/validations';

export default function SettingsPage() {
  const { showToast } = useToast();
  const profile = useLiveQuery(() => db.businessProfile.limit(1).first());

  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BusinessProfileFormData>({
    resolver: zodResolver(businessProfileSchema as any),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      taxId: '',
      logoUrl: '',
      defaultCurrency: 'USD',
    },
  });

  const logoUrl = watch('logoUrl');
  const defaultCurrency = watch('defaultCurrency');

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || '',
        email: profile.email || '',
        address: profile.address || '',
        taxId: profile.taxId || '',
        logoUrl: profile.logoUrl || '',
        defaultCurrency: profile.defaultCurrency || 'USD',
      });
    }
  }, [profile, reset]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast('Logo image size should be under 2MB', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setValue('logoUrl', reader.result);
        showToast('Logo uploaded. Click "Save Profile" to save changes.', 'info');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setValue('logoUrl', '');
    showToast('Logo removed. Click "Save Profile" to update.', 'info');
  };

  const onSubmit = async (data: BusinessProfileFormData) => {
    if (profile) {
      await db.businessProfile.update(profile.id, {
        name: data.name.trim(),
        email: (data.email || '').trim(),
        address: (data.address || '').trim(),
        taxId: (data.taxId || '').trim(),
        logoUrl: data.logoUrl || '',
        defaultCurrency: data.defaultCurrency,
      });
    } else {
      await db.businessProfile.add({
        id: uuidv4(),
        name: data.name.trim(),
        email: (data.email || '').trim(),
        address: (data.address || '').trim(),
        taxId: (data.taxId || '').trim(),
        logoUrl: data.logoUrl || '',
        defaultCurrency: data.defaultCurrency,
      });
    }

    setSaved(true);
    showToast('Business profile updated successfully!', 'success');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-[#161917] font-serif font-bold tracking-tight text-3xl">
            Settings
          </h2>
          <p className="text-[#626a64] mt-2">
            Configure your business profile, company logo, and preferences.
          </p>
        </div>
      </div>

      <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg shadow-none p-6 sm:p-8 max-w-2xl">
        <h3 className="font-serif font-bold text-xl mb-6 text-[#161917]">
          Business Profile
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Logo Field */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#161917]">
              Company Logo
            </label>
            {logoUrl ? (
              <div className="flex items-center gap-4 p-3 bg-[#f5f4ef] border border-[#c4cbc5] rounded-lg">
                <div className="h-16 w-32 flex items-center justify-center bg-white border border-[#c4cbc5]/60 rounded p-1 overflow-hidden">
                  <img
                    src={logoUrl}
                    alt="Company Logo Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-[#161917]">
                    Logo uploaded
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="text-xs text-red-700 hover:text-red-900 font-semibold flex items-center gap-1 cursor-pointer transition-colors w-fit"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove Logo
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#c4cbc5] hover:border-[#2b4c33] rounded-lg cursor-pointer bg-[#f5f4ef] transition-colors group">
                <Upload className="w-6 h-6 text-[#626a64] group-hover:text-[#2b4c33] mb-2 transition-colors" />
                <span className="text-xs font-semibold text-[#161917] group-hover:text-[#2b4c33] transition-colors">
                  Upload Company Logo
                </span>
                <span className="text-[10px] text-[#626a64] mt-1">
                  PNG, JPG, SVG or WEBP (Max 2MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#161917]">
              Company Name *
            </label>
            <input
              {...register('name')}
              type="text"
              className={`w-full bg-[#f5f4ef] border text-[#161917] placeholder-stone-400 focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all duration-300 rounded-lg text-sm px-3.5 py-2 outline-none ${
                errors.name ? 'border-red-500' : 'border-[#c4cbc5]'
              }`}
              placeholder="Your Business LLC"
            />
            {errors.name && (
              <p className="text-xs text-red-600 font-medium mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#161917]">
              Business Email
            </label>
            <input
              {...register('email')}
              type="email"
              className={`w-full bg-[#f5f4ef] border text-[#161917] placeholder-stone-400 focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all duration-300 rounded-lg text-sm px-3.5 py-2 outline-none ${
                errors.email ? 'border-red-500' : 'border-[#c4cbc5]'
              }`}
              placeholder="billing@yourbusiness.com"
            />
            {errors.email && (
              <p className="text-xs text-red-600 font-medium mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#161917]">
              Business Address
            </label>
            <textarea
              {...register('address')}
              rows={3}
              className="w-full bg-[#f5f4ef] border border-[#c4cbc5] text-[#161917] placeholder-stone-400 focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all duration-300 rounded-lg text-sm px-3.5 py-2 outline-none"
              placeholder="123 Main St..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#161917]">
                Tax ID / VAT Registration
              </label>
              <input
                {...register('taxId')}
                type="text"
                className="w-full bg-[#f5f4ef] border border-[#c4cbc5] text-[#161917] placeholder-stone-400 focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all duration-300 rounded-lg text-sm px-3.5 py-2 outline-none"
                placeholder="Optional"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#161917]">
                Default Invoice Currency
              </label>
              <Select
                value={defaultCurrency || 'USD'}
                onChange={(val) => setValue('defaultCurrency', val)}
                options={CURRENCY_OPTIONS}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#c4cbc5] flex items-center justify-between">
            <div
              className="text-sm text-[#2b4c33] font-semibold transition-opacity duration-300"
              style={{ opacity: saved ? 1 : 0 }}
            >
              Settings saved successfully.
            </div>
            <button
              type="submit"
              className="bg-[#2b4c33] text-white hover:bg-[#161917] font-serif font-semibold transition-all duration-300 rounded-lg text-sm px-4.5 py-2 cursor-pointer"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
