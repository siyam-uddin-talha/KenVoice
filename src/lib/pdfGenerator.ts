import { getCurrencySymbol } from './currency';

export function generateInvoicePdfBase64(
  invoice: any,
  clientName: string,
  clientEmail: string,
  profile: any
): string {
  const currency = invoice.currency || 'USD';
  const currencySymbol = getCurrencySymbol(currency);
  const subtotal = (invoice.lineItems || []).reduce(
    (acc: number, item: any) => acc + (item.quantity || 0) * (item.unitPrice || 0),
    0
  );
  const taxRate = invoice.taxRate || 0;
  const tax = subtotal * (taxRate / 100);
  const discount = invoice.discount || 0;
  const shipping = invoice.shipping || 0;
  const total = Math.max(0, subtotal + tax - discount + shipping);

  const formatDate = (d: any) => {
    try {
      const date = new Date(d);
      return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch {
      return '';
    }
  };

  // Page constants – standard 1-inch (72pt) margins
  const ML = 72;  // margin left
  const MR = 523; // margin right (595 - 72)
  const MT = 770; // margin top
  const PW = MR - ML; // printable width

  const lines: string[] = [];

  // No background fill – clean white page

  // ── Invoice Header ──
  lines.push('BT');
  lines.push('0.09 0.1 0.09 rg');
  lines.push('/F1 24 Tf ' + ML + ' ' + MT + ' Td (INVOICE) Tj');
  lines.push('/F2 10 Tf 0 -18 Td (' + escapePdfText('#' + (invoice.id || '')) + ') Tj');
  lines.push('ET');

  // Company info – top right
  let compY = MT + 4;
  lines.push('BT');
  lines.push('0.09 0.1 0.09 rg');
  lines.push('/F1 11 Tf ' + MR + ' ' + compY + ' Td');
  lines.push('(' + escapePdfText(profile?.name || 'Your Company Name') + ') Tj');
  lines.push('ET');

  compY -= 15;
  if (profile?.address) {
    const addrLines = String(profile.address).split('\n');
    for (const al of addrLines) {
      lines.push('BT');
      lines.push('0.33 0.33 0.33 rg');
      lines.push('/F2 9 Tf ' + MR + ' ' + compY + ' Td (' + escapePdfText(al) + ') Tj');
      lines.push('ET');
      compY -= 13;
    }
  }
  if (profile?.email) {
    lines.push('BT');
    lines.push('0.33 0.33 0.33 rg');
    lines.push('/F2 9 Tf ' + MR + ' ' + compY + ' Td (' + escapePdfText(profile.email) + ') Tj');
    lines.push('ET');
    compY -= 13;
  }

  // Header separator
  const sepY = Math.min(compY, MT - 40) - 8;
  lines.push('0.80 0.80 0.80 RG');
  lines.push('0.5 w');
  lines.push(ML + ' ' + sepY + ' m ' + MR + ' ' + sepY + ' l S');

  // ── Bill To + Dates ──
  let billY = sepY - 24;

  lines.push('BT');
  lines.push('0.40 0.40 0.40 rg');
  lines.push('/F1 8 Tf ' + ML + ' ' + billY + ' Td (BILL TO) Tj');
  lines.push('ET');

  billY -= 16;
  lines.push('BT');
  lines.push('0.09 0.1 0.09 rg');
  lines.push('/F1 12 Tf ' + ML + ' ' + billY + ' Td (' + escapePdfText(clientName || 'Valued Client') + ') Tj');
  lines.push('ET');

  billY -= 15;
  const clientAddress = invoice.clientAddress || '';
  if (clientAddress) {
    const addrParts = String(clientAddress).split('\n');
    for (const al of addrParts) {
      lines.push('BT');
      lines.push('0.20 0.20 0.20 rg');
      lines.push('/F2 9 Tf ' + ML + ' ' + billY + ' Td (' + escapePdfText(al) + ') Tj');
      lines.push('ET');
      billY -= 13;
    }
  }
  if (clientEmail) {
    lines.push('BT');
    lines.push('0.33 0.33 0.33 rg');
    lines.push('/F2 9 Tf ' + ML + ' ' + billY + ' Td (' + escapePdfText(clientEmail) + ') Tj');
    lines.push('ET');
    billY -= 13;
  }

  // Dates – right aligned
  let dateY = sepY - 24;
  const dateX = 420;

  lines.push('BT');
  lines.push('0.40 0.40 0.40 rg');
  lines.push('/F1 8 Tf ' + dateX + ' ' + dateY + ' Td (ISSUE DATE) Tj');
  lines.push('ET');
  dateY -= 14;
  lines.push('BT');
  lines.push('0.09 0.1 0.09 rg');
  lines.push('/F2 10 Tf ' + dateX + ' ' + dateY + ' Td (' + escapePdfText(formatDate(invoice.issueDate || Date.now())) + ') Tj');
  lines.push('ET');

  dateY -= 22;
  lines.push('BT');
  lines.push('0.40 0.40 0.40 rg');
  lines.push('/F1 8 Tf ' + dateX + ' ' + dateY + ' Td (DUE DATE) Tj');
  lines.push('ET');
  dateY -= 14;
  if (invoice.dueDate) {
    lines.push('BT');
    lines.push('0.09 0.1 0.09 rg');
    lines.push('/F2 10 Tf ' + dateX + ' ' + dateY + ' Td (' + escapePdfText(formatDate(invoice.dueDate)) + ') Tj');
    lines.push('ET');
  }

  // ── Line Items Table ──
  const tableTop = Math.min(billY, dateY) - 24;

  // Header line
  lines.push('0.80 0.80 0.80 RG');
  lines.push('0.5 w');
  lines.push(ML + ' ' + tableTop + ' m ' + MR + ' ' + tableTop + ' l S');

  // Column headers
  const thY = tableTop - 15;
  lines.push('BT');
  lines.push('0.33 0.33 0.33 rg');
  lines.push('/F1 9 Tf ' + ML + ' ' + thY + ' Td (Description) Tj');
  lines.push('ET');
  lines.push('BT');
  lines.push('/F1 9 Tf 340 ' + thY + ' Td (Qty) Tj');
  lines.push('ET');
  lines.push('BT');
  lines.push('/F1 9 Tf 400 ' + thY + ' Td (Unit Price) Tj');
  lines.push('ET');
  lines.push('BT');
  lines.push('/F1 9 Tf 480 ' + thY + ' Td (Amount) Tj');
  lines.push('ET');

  // Header bottom line
  const rowStart = thY - 8;
  lines.push(ML + ' ' + rowStart + ' m ' + MR + ' ' + rowStart + ' l S');

  // Rows
  let y = rowStart - 18;
  (invoice.lineItems || []).forEach((item: any) => {
    const qty = item.quantity || 1;
    const price = item.unitPrice || 0;
    const amount = qty * price;

    lines.push('BT');
    lines.push('0.12 0.12 0.12 rg');
    lines.push('/F2 10 Tf ' + ML + ' ' + y + ' Td (' + escapePdfText(item.description || 'Item') + ') Tj');
    lines.push('ET');

    lines.push('BT');
    lines.push('0.33 0.33 0.33 rg');
    lines.push('/F2 10 Tf 345 ' + y + ' Td (' + qty + ') Tj');
    lines.push('ET');

    lines.push('BT');
    lines.push('0.33 0.33 0.33 rg');
    lines.push('/F2 10 Tf 400 ' + y + ' Td (' + escapePdfText(currencySymbol + price.toFixed(2)) + ') Tj');
    lines.push('ET');

    lines.push('BT');
    lines.push('0.09 0.1 0.09 rg');
    lines.push('/F1 10 Tf 480 ' + y + ' Td (' + escapePdfText(currencySymbol + amount.toFixed(2)) + ') Tj');
    lines.push('ET');

    y -= 6;
    lines.push('0.88 0.88 0.88 RG');
    lines.push('0.3 w');
    lines.push(ML + ' ' + y + ' m ' + MR + ' ' + y + ' l S');
    y -= 16;
  });

  // ── Totals + Notes/Signature ──
  y -= 8;
  lines.push('0.80 0.80 0.80 RG');
  lines.push('0.5 w');
  lines.push(ML + ' ' + y + ' m ' + MR + ' ' + y + ' l S');

  // Notes – left
  let notesY = y - 24;
  if (invoice.notes) {
    lines.push('BT');
    lines.push('0.40 0.40 0.40 rg');
    lines.push('/F1 8 Tf ' + ML + ' ' + notesY + ' Td (NOTES) Tj');
    lines.push('ET');
    notesY -= 14;

    const noteLines = wrapText(invoice.notes, 50);
    for (const nl of noteLines) {
      lines.push('BT');
      lines.push('0.33 0.33 0.33 rg');
      lines.push('/F2 9 Tf ' + ML + ' ' + notesY + ' Td (' + escapePdfText(nl) + ') Tj');
      lines.push('ET');
      notesY -= 13;
    }
  }

  // Signature – left, below notes
  if (invoice.signatureText || (invoice.signatureType && invoice.signatureType !== 'none')) {
    notesY -= 10;
    lines.push('BT');
    lines.push('0.40 0.40 0.40 rg');
    lines.push('/F1 8 Tf ' + ML + ' ' + notesY + ' Td (AUTHORIZED SIGNATURE) Tj');
    lines.push('ET');
    notesY -= 18;

    if (invoice.signatureText) {
      lines.push('BT');
      lines.push('0.09 0.1 0.09 rg');
      lines.push('/F2 13 Tf ' + ML + ' ' + notesY + ' Td (' + escapePdfText(invoice.signatureText) + ') Tj');
      lines.push('ET');
      notesY -= 5;
      lines.push('0.20 0.20 0.20 RG');
      lines.push('0.4 w');
      lines.push(ML + ' ' + notesY + ' m 250 ' + notesY + ' l S');
      notesY -= 14;
    }

    if (invoice.signedAt) {
      lines.push('BT');
      lines.push('0.40 0.40 0.40 rg');
      lines.push('/F2 8 Tf ' + ML + ' ' + notesY + ' Td (Signed on ' + escapePdfText(formatDate(invoice.signedAt)) + ') Tj');
      lines.push('ET');
    }
  }

  // Totals – right
  const totX = 380;
  const totValX = 480;
  let totY = y - 24;

  lines.push('BT');
  lines.push('0.33 0.33 0.33 rg');
  lines.push('/F2 10 Tf ' + totX + ' ' + totY + ' Td (Subtotal) Tj');
  lines.push('ET');
  lines.push('BT');
  lines.push('/F2 10 Tf ' + totValX + ' ' + totY + ' Td (' + escapePdfText(currencySymbol + subtotal.toFixed(2)) + ') Tj');
  lines.push('ET');

  if (taxRate > 0) {
    totY -= 18;
    lines.push('BT');
    lines.push('0.33 0.33 0.33 rg');
    lines.push('/F2 10 Tf ' + totX + ' ' + totY + ' Td (Tax \\(' + taxRate + '%\\)) Tj');
    lines.push('ET');
    lines.push('BT');
    lines.push('/F2 10 Tf ' + totValX + ' ' + totY + ' Td (+' + escapePdfText(currencySymbol + tax.toFixed(2)) + ') Tj');
    lines.push('ET');
  }

  if (discount > 0) {
    totY -= 18;
    lines.push('BT');
    lines.push('0.33 0.33 0.33 rg');
    lines.push('/F2 10 Tf ' + totX + ' ' + totY + ' Td (Discount) Tj');
    lines.push('ET');
    lines.push('BT');
    lines.push('/F2 10 Tf ' + totValX + ' ' + totY + ' Td (-' + escapePdfText(currencySymbol + discount.toFixed(2)) + ') Tj');
    lines.push('ET');
  }

  if (shipping > 0) {
    totY -= 18;
    lines.push('BT');
    lines.push('0.33 0.33 0.33 rg');
    lines.push('/F2 10 Tf ' + totX + ' ' + totY + ' Td (Shipping) Tj');
    lines.push('ET');
    lines.push('BT');
    lines.push('/F2 10 Tf ' + totValX + ' ' + totY + ' Td (+' + escapePdfText(currencySymbol + shipping.toFixed(2)) + ') Tj');
    lines.push('ET');
  }

  // Total Due
  totY -= 14;
  lines.push('0.80 0.80 0.80 RG');
  lines.push('0.5 w');
  lines.push((totX - 5) + ' ' + totY + ' m ' + MR + ' ' + totY + ' l S');

  totY -= 18;
  lines.push('BT');
  lines.push('0.09 0.1 0.09 rg');
  lines.push('/F1 12 Tf ' + totX + ' ' + totY + ' Td (Total Due) Tj');
  lines.push('ET');
  lines.push('BT');
  lines.push('/F1 12 Tf ' + totValX + ' ' + totY + ' Td (' + escapePdfText(currencySymbol + total.toFixed(2)) + ') Tj');
  lines.push('ET');

  // ── Build PDF ──
  const streamContent = lines.join('\n');
  const streamLength = Buffer.byteLength(streamContent, 'utf8');

  const pdfParts: string[] = [];
  pdfParts.push('%PDF-1.4');
  pdfParts.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
  pdfParts.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj');
  pdfParts.push('3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /MediaBox [0 0 595 842] /Contents 6 0 R >>\nendobj');
  pdfParts.push('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj');
  pdfParts.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj');
  pdfParts.push('6 0 obj\n<< /Length ' + streamLength + ' >>\nstream\n' + streamContent + '\nendstream\nendobj');

  let offset = 0;
  const offsets: number[] = [0];
  const header = pdfParts[0] + '\n';
  offset += Buffer.byteLength(header, 'utf8');

  for (let i = 1; i < pdfParts.length; i++) {
    offsets.push(offset);
    offset += Buffer.byteLength(pdfParts[i] + '\n', 'utf8');
  }

  const startXref = offset;
  let xref = 'xref\n0 7\n0000000000 65535 f \n';
  for (let i = 1; i <= 6; i++) {
    const offStr = String(offsets[i]).padStart(10, '0');
    xref += `${offStr} 00000 n \n`;
  }
  xref += `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF`;

  const fullPdf = pdfParts.join('\n') + '\n' + xref;
  return Buffer.from(fullPdf).toString('base64');
}

function escapePdfText(text: string): string {
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\x20-\x7E]/g, '?');
}

function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(/\s+/);
  const result: string[] = [];
  let current = '';
  for (const word of words) {
    if (current.length + word.length + 1 > maxCharsPerLine) {
      result.push(current);
      current = word;
    } else {
      current = current ? current + ' ' + word : word;
    }
  }
  if (current) result.push(current);
  return result;
}
