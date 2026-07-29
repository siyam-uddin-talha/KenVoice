export function getCurrencySymbol(currencyCode?: string): string {
  if (!currencyCode) return '$';
  switch (currencyCode.toUpperCase()) {
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';
    case 'JPY':
      return '¥';
    case 'CAD':
      return 'CA$';
    case 'AUD':
      return 'AU$';
    case 'INR':
      return '₹';
    case 'USD':
    default:
      return '$';
  }
}

export function formatCurrency(amount: number, currencyCode?: string): string {
  const symbol = getCurrencySymbol(currencyCode);
  const formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formattedAmount}`;
}
