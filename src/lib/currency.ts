export interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
  name: string;
}

export const CURRENCIES: CurrencyOption[] = [
  { value: 'USD', label: 'USD ($)', symbol: '$', name: 'US Dollar' },
  { value: 'EUR', label: 'EUR (€)', symbol: '€', name: 'Euro' },
  { value: 'GBP', label: 'GBP (£)', symbol: '£', name: 'British Pound' },
  { value: 'JPY', label: 'JPY (¥)', symbol: '¥', name: 'Japanese Yen' },
  { value: 'CAD', label: 'CAD (CA$)', symbol: 'CA$', name: 'Canadian Dollar' },
  { value: 'AUD', label: 'AUD (AU$)', symbol: 'AU$', name: 'Australian Dollar' },
  { value: 'CHF', label: 'CHF (CHF)', symbol: 'CHF', name: 'Swiss Franc' },
  { value: 'CNY', label: 'CNY (¥)', symbol: '¥', name: 'Chinese Yuan' },
  { value: 'INR', label: 'INR (₹)', symbol: '₹', name: 'Indian Rupee' },
  { value: 'SGD', label: 'SGD (S$)', symbol: 'S$', name: 'Singapore Dollar' },
  { value: 'NZD', label: 'NZD (NZ$)', symbol: 'NZ$', name: 'New Zealand Dollar' },
  { value: 'HKD', label: 'HKD (HK$)', symbol: 'HK$', name: 'Hong Kong Dollar' },
  { value: 'SEK', label: 'SEK (kr)', symbol: 'kr', name: 'Swedish Krona' },
  { value: 'NOK', label: 'NOK (kr)', symbol: 'kr', name: 'Norwegian Krone' },
  { value: 'DKK', label: 'DKK (kr)', symbol: 'kr', name: 'Danish Krone' },
  { value: 'AED', label: 'AED (AED)', symbol: 'AED', name: 'UAE Dirham' },
  { value: 'SAR', label: 'SAR (SAR)', symbol: 'SAR', name: 'Saudi Riyal' },
  { value: 'ZAR', label: 'ZAR (R)', symbol: 'R', name: 'South African Rand' },
  { value: 'BRL', label: 'BRL (R$)', symbol: 'R$', name: 'Brazilian Real' },
  { value: 'MXN', label: 'MXN (MEX$)', symbol: 'MEX$', name: 'Mexican Peso' },
  { value: 'PLN', label: 'PLN (zł)', symbol: 'zł', name: 'Polish Zloty' },
  { value: 'TRY', label: 'TRY (₺)', symbol: '₺', name: 'Turkish Lira' },
  { value: 'THB', label: 'THB (฿)', symbol: '฿', name: 'Thai Baht' },
  { value: 'IDR', label: 'IDR (Rp)', symbol: 'Rp', name: 'Indonesian Rupiah' },
  { value: 'MYR', label: 'MYR (RM)', symbol: 'RM', name: 'Malaysian Ringgit' },
  { value: 'PHP', label: 'PHP (₱)', symbol: '₱', name: 'Philippine Peso' },
  { value: 'VND', label: 'VND (₫)', symbol: '₫', name: 'Vietnamese Dong' },
  { value: 'KRW', label: 'KRW (₩)', symbol: '₩', name: 'South Korean Won' },
  { value: 'ILS', label: 'ILS (₪)', symbol: '₪', name: 'Israeli New Shekel' },
  { value: 'EGP', label: 'EGP (E£)', symbol: 'E£', name: 'Egyptian Pound' },
  { value: 'NGN', label: 'NGN (₦)', symbol: '₦', name: 'Nigerian Naira' },
  { value: 'KES', label: 'KES (KSh)', symbol: 'KSh', name: 'Kenyan Shilling' },
  { value: 'BDT', label: 'BDT (৳)', symbol: '৳', name: 'Bangladeshi Taka' },
  { value: 'PKR', label: 'PKR (Rs)', symbol: 'Rs', name: 'Pakistani Rupee' },
  { value: 'CLP', label: 'CLP (CLP$)', symbol: 'CLP$', name: 'Chilean Peso' },
  { value: 'COP', label: 'COP (COL$)', symbol: 'COL$', name: 'Colombian Peso' },
  { value: 'ARS', label: 'ARS (ARS$)', symbol: 'ARS$', name: 'Argentine Peso' },
  { value: 'CZK', label: 'CZK (Kč)', symbol: 'Kč', name: 'Czech Koruna' },
  { value: 'HUF', label: 'HUF (Ft)', symbol: 'Ft', name: 'Hungarian Forint' },
  { value: 'RON', label: 'RON (lei)', symbol: 'lei', name: 'Romanian Leu' },
];

export const CURRENCY_OPTIONS = CURRENCIES.map((c) => ({
  value: c.value,
  label: c.label,
}));

export function getCurrencySymbol(currencyCode?: string): string {
  if (!currencyCode) return '$';
  const match = CURRENCIES.find((c) => c.value === currencyCode.toUpperCase());
  return match ? match.symbol : '$';
}

export function formatCurrency(amount: number, currencyCode?: string): string {
  const symbol = getCurrencySymbol(currencyCode);
  const formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formattedAmount}`;
}
