"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/schema";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Printer, Trash2, PenTool, X, Send, Download } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { SignaturePad } from "@/components/ui/SignaturePad";
import { getCurrencySymbol } from "@/lib/currency";
import { generateInvoicePdfBase64 } from "@/lib/pdfGenerator";

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast, confirmToast } = useToast();
  const id = params.id as string;

  const invoice = useLiveQuery(() => db.invoices.get(id), [id]);
  const client = useLiveQuery(
    () => (invoice ? db.clients.get(invoice.clientId) : undefined),
    [invoice],
  );
  const profile = useLiveQuery(() => db.businessProfile.limit(1).first());

  // Quick signature modal state
  const [showSigModal, setShowSigModal] = useState(false);
  const [sigType, setSigType] = useState<"none" | "draw" | "type" | "upload">("draw");
  const [sigText, setSigText] = useState("");
  const [sigImage, setSigImage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleDelete = () => {
    confirmToast({
      message: `Delete invoice ${id}?`,
      confirmLabel: "Delete Invoice",
      onConfirm: async () => {
        await db.invoices.delete(id);
        showToast(`Invoice ${id} deleted`, "info");
        router.push("/invoices");
      },
    });
  };

  const handlePrint = async () => {
    if (invoice && invoice.status === "draft") {
      await db.invoices.update(id, { status: "sent" });
    }
    window.print();
  };

  const handleSaveSignature = async () => {
    if (!invoice) return;
    await db.invoices.update(id, {
      signatureType: sigType,
      signatureText: sigText,
      signatureImage: sigImage,
      signedAt: sigType !== "none" ? Date.now() : undefined,
    });
    showToast("Invoice signature updated!", "success");
    setShowSigModal(false);
  };

  if (invoice === undefined) {
    return <div className="p-8 text-[#626a64]">Loading invoice...</div>;
  }

  if (invoice === null) {
    return (
      <div className="p-8 flex flex-col items-center justify-center">
        <p className="text-[#161917] font-serif">Invoice not found.</p>
        <Link
          href="/invoices"
          className="text-[#2b4c33] mt-4 hover:underline"
        >
          Back to invoices
        </Link>
      </div>
    );
  }

  const currencySymbol = getCurrencySymbol(invoice.currency);

  const subtotal = invoice.lineItems.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0,
  );
  const taxRate = invoice.taxRate || 0;
  const tax = subtotal * (taxRate / 100);
  const discount = invoice.discount || 0;
  const shipping = invoice.shipping || 0;
  const total = Math.max(0, subtotal + tax - discount + shipping);

  const hasSignature =
    invoice.signatureType &&
    invoice.signatureType !== "none" &&
    (invoice.signatureImage || invoice.signatureText);

  const isUUID = (str?: string) =>
    !!str && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

  const clientDisplayName =
    client?.name ||
    (invoice.clientName && !isUUID(invoice.clientName) ? invoice.clientName : undefined) ||
    (invoice.clientId && !isUUID(invoice.clientId) ? invoice.clientId : undefined) ||
    "Unknown";

  const clientEmail = client?.email || invoice.clientEmail || "";
  const clientAddress = client?.address || invoice.clientAddress || "";

  const generatePdfFromDom = async (): Promise<string | undefined> => {
    try {
      const element = document.getElementById("printable-invoice-card");
      if (!element) return undefined;

      if (!(window as any).html2pdf) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      const html2pdf = (window as any).html2pdf;
      const opt = {
        margin: [8, 8, 8, 8],
        filename: `Invoice-${invoice?.id}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          onclone: (clonedDoc: Document) => {
            // Clean style tags of modern CSS color functions (lab, oklch) that crash html2canvas
            const styleTags = clonedDoc.querySelectorAll("style");
            styleTags.forEach((styleTag) => {
              if (styleTag.innerHTML) {
                styleTag.innerHTML = styleTag.innerHTML
                  .replace(/lab\([^)]+\)/gi, "#161917")
                  .replace(/oklch\([^)]+\)/gi, "#2b4c33")
                  .replace(/color\(display-p3[^)]+\)/gi, "#161917");
              }
            });

            // Convert computed styles on elements to plain hex/rgb
            const allElements = clonedDoc.querySelectorAll("*");
            allElements.forEach((el) => {
              const htmlEl = el as HTMLElement;
              if (!htmlEl.style) return;
              try {
                const style = window.getComputedStyle(htmlEl);
                if (
                  style.color &&
                  (style.color.includes("lab") || style.color.includes("oklch"))
                ) {
                  htmlEl.style.color = "#161917";
                }
                if (
                  style.backgroundColor &&
                  (style.backgroundColor.includes("lab") ||
                    style.backgroundColor.includes("oklch"))
                ) {
                  htmlEl.style.backgroundColor = "#ffffff";
                }
                if (
                  style.borderColor &&
                  (style.borderColor.includes("lab") ||
                    style.borderColor.includes("oklch"))
                ) {
                  htmlEl.style.borderColor = "#c4cbc5";
                }
              } catch (e) {
                // Ignore style read errors
              }
            });
          },
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      const pdfArrayBuffer = await html2pdf()
        .set(opt)
        .from(element)
        .outputPdf("arraybuffer");
      const bytes = new Uint8Array(pdfArrayBuffer);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    } catch (e) {
      console.warn("DOM PDF generation failed, using fallback:", e);
      return undefined;
    }
  };

  const downloadPdfBase64 = (base64Data: string, fileName: string) => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = async () => {
    if (!invoice) return;
    try {
      const fileName = `Invoice-${invoice.id || "draft"}.pdf`;

      // 1. Try DOM rendering first (matches Print PDF exactly)
      let pdfBase64 = await generatePdfFromDom();

      // 2. Fallback to native PDF generator if DOM script failed or was blocked
      if (!pdfBase64) {
        pdfBase64 = generateInvoicePdfBase64(
          invoice,
          clientDisplayName,
          clientEmail,
          profile,
        );
      }

      if (pdfBase64) {
        downloadPdfBase64(pdfBase64, fileName);
        showToast("Invoice PDF downloaded!", "success");
        if (invoice.status === "draft") {
          await db.invoices.update(id, { status: "sent" });
        }
      } else {
        throw new Error("PDF generation failed");
      }
    } catch (e) {
      console.error("Download PDF error:", e);
      showToast("Failed to download PDF", "error");
    }
  };

  const handleSendEmail = async () => {
    if (!invoice) return;
    if (!clientEmail) {
      showToast(`Please configure an email address for ${clientDisplayName}`, "warning");
      return;
    }

    setIsSending(true);
    try {
      // 1. Try DOM rendering first (matches Print PDF exactly)
      let pdfBase64 = await generatePdfFromDom();

      // 2. Fallback to native PDF generator
      if (!pdfBase64) {
        pdfBase64 = generateInvoicePdfBase64(
          invoice,
          clientDisplayName,
          clientEmail,
          profile,
        );
      }

      const res = await fetch("/api/invoices/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoice,
          clientName: clientDisplayName,
          clientEmail,
          profile,
          pdfBase64,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send invoice email");
      }

      await db.invoices.update(id, { status: "sent" });
      if (data.simulated) {
        showToast(`Email triggered for ${clientDisplayName} (${clientEmail})`, "success");
      } else {
        showToast(`Invoice sent to ${clientEmail}!`, "success");
      }
    } catch (err: any) {
      showToast(err.message || "Failed to send email", "error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Action Header bar */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <Link
            href="/invoices"
            className="p-2 text-[#626a64] hover:text-[#161917] hover:bg-[#c4cbc5]/30 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h2 className="text-[#161917] font-serif font-bold tracking-tight text-xl sm:text-2xl">
              Invoice {invoice.id}
            </h2>
            <div className="flex items-center gap-3 mt-1 text-sm">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-serif border ${
                  invoice.status === "paid"
                    ? "bg-[#d1ded3] text-[#2b4c33] border-[#2b4c33]/20"
                    : invoice.status === "sent"
                      ? "bg-[#f5f4ef] text-[#626a64] border-[#c4cbc5]"
                      : "bg-transparent text-[#626a64] border-[#c4cbc5]"
                }`}
              >
                {invoice.status.charAt(0).toUpperCase() +
                  invoice.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={handleSendEmail}
            disabled={isSending}
            className="bg-[#2b4c33] text-white hover:bg-[#161917] font-serif font-semibold transition-all duration-300 rounded-lg text-xs px-4 py-2 inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            {isSending ? "Sending..." : `Send to ${clientDisplayName}`}
          </button>
          <button
            onClick={() => {
              setSigType(invoice.signatureType || "draw");
              setSigText(invoice.signatureText || "");
              setSigImage(invoice.signatureImage || "");
              setShowSigModal(true);
            }}
            className="px-3.5 py-2 text-xs font-semibold font-serif text-[#2b4c33] hover:text-[#161917] transition-colors border border-[#2b4c33]/30 rounded-lg cursor-pointer bg-[#d1ded3]/40 hover:bg-[#d1ded3]"
          >
            {hasSignature ? "Edit Signature" : "+ Add Signature"}
          </button>
          <button
            onClick={handleDelete}
            className="px-3.5 py-2 text-xs font-semibold font-serif text-red-700 hover:text-red-900 transition-colors border border-red-200 rounded-lg cursor-pointer hover:bg-red-50"
          >
            Delete
          </button>
          <button
            onClick={handleDownloadPdf}
            className="px-3.5 py-2 text-xs font-semibold font-serif text-[#2b4c33] hover:text-[#161917] transition-colors border border-[#2b4c33]/30 rounded-lg inline-flex items-center gap-1.5 cursor-pointer bg-[#d1ded3]/40 hover:bg-[#d1ded3]"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold font-serif text-[#626a64] hover:text-[#161917] transition-colors border border-[#c4cbc5] rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            Print PDF
          </button>
        </div>
      </div>

      {/* Signature Modal */}
      {showSigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs print:hidden">
          <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#c4cbc5] pb-3">
              <h3 className="font-serif font-bold text-base text-[#161917]">
                Add / Update Signature
              </h3>
              <button
                onClick={() => setShowSigModal(false)}
                className="text-[#626a64] hover:text-[#161917] p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SignaturePad
              signatureType={sigType}
              onTypeChange={setSigType}
              signatureText={sigText}
              onTextChange={setSigText}
              signatureImage={sigImage}
              onImageChange={setSigImage}
            />
            <div className="pt-2 flex justify-end gap-2 border-t border-[#c4cbc5]">
              <button
                onClick={() => setShowSigModal(false)}
                className="px-3 py-1.5 text-xs text-[#626a64] hover:text-[#161917] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSignature}
                className="px-4 py-1.5 bg-[#2b4c33] text-white rounded-lg text-xs font-serif font-semibold hover:bg-[#161917] transition-colors cursor-pointer"
              >
                Save Signature
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Invoice */}
      <div id="printable-invoice-card" className="max-w-4xl mx-auto py-6 sm:py-8 px-2 sm:px-0 print:p-0 print:bg-white text-[#161917] overflow-x-auto">
        {/* Compact Invoice Header */}
        <div className="flex justify-between items-start gap-4 mb-4 sm:mb-6 border-b border-[#c4cbc5] pb-4 print:border-black/20">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-0.5">
              INVOICE
            </h1>
            <p className="font-mono text-[#626a64] text-xs sm:text-sm">
              {invoice.id}
            </p>
          </div>
          <div className="text-right flex flex-col items-end">
            {profile?.logoUrl && (
              <img
                src={profile.logoUrl}
                alt="Company Logo"
                className="max-h-12 max-w-[160px] object-contain mb-1.5"
              />
            )}
            <h3 className="font-bold text-sm sm:text-base leading-tight">
              {profile?.name || "Your Company Name"}
            </h3>
            <p className="text-[#626a64] text-xs mt-0.5 whitespace-pre-wrap leading-tight">
              {profile?.address || "123 Business Rd.\nCity, Country"}
            </p>
            {profile?.email && (
              <p className="text-[#626a64] text-xs mt-0.5">
                {profile.email}
              </p>
            )}
          </div>
        </div>

        {/* Compact Client & Dates Row */}
        <div className="flex justify-between gap-6 mb-6">
          <div>
            <h4 className="text-[10px] font-semibold text-[#626a64] uppercase tracking-wider mb-1">
              Bill To
            </h4>
            <p className="font-serif font-bold text-sm sm:text-base leading-tight">
              {clientDisplayName}
            </p>
            {clientAddress && (
              <p className="text-xs text-[#161917] mt-0.5 whitespace-pre-wrap leading-tight">
                {clientAddress}
              </p>
            )}
            {clientEmail && (
              <p className="text-xs text-[#626a64] mt-0.5">
                {clientEmail}
              </p>
            )}
            {client?.taxId && (
              <p className="text-xs text-[#626a64] mt-0.5">
                Tax ID: {client.taxId}
              </p>
            )}
          </div>
          <div className="text-right flex flex-col gap-2 text-xs">
            <div>
              <span className="text-[10px] font-semibold text-[#626a64] uppercase tracking-wider block mb-0.5">
                Issue Date
              </span>
              <span className="font-mono text-xs">
                {format(new Date(invoice.issueDate), "MMM dd, yyyy")}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-[#626a64] uppercase tracking-wider block mb-0.5">
                Due Date
              </span>
              <span className="font-mono text-xs">
                {format(new Date(invoice.dueDate), "MMM dd, yyyy")}
              </span>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="mb-6 overflow-x-auto print:overflow-visible">
          <table className="w-full text-left text-xs sm:text-sm min-w-[480px] print:min-w-0">
            <thead>
              <tr className="border-b border-[#c4cbc5] print:border-black/20 text-[#626a64]">
                <th className="py-2 font-serif font-semibold">Description</th>
                <th className="py-2 font-serif font-semibold text-center w-16">
                  Qty
                </th>
                <th className="py-2 font-serif font-semibold text-right w-24">
                  Unit Price
                </th>
                <th className="py-2 font-serif font-semibold text-right w-28">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c4cbc5]/60 print:divide-black/10">
              {invoice.lineItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-2.5 text-[#161917] font-medium">
                    {item.description}
                  </td>
                  <td className="py-2.5 text-center font-mono text-[#626a64]">
                    {item.quantity}
                  </td>
                  <td className="py-2.5 text-right font-mono text-[#626a64]">
                    {currencySymbol}
                    {item.unitPrice.toFixed(2)}
                  </td>
                  <td className="py-2.5 text-right font-mono font-semibold text-[#161917]">
                    {currencySymbol}
                    {(item.quantity * item.unitPrice).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Summary & Signature Section */}
        <div className="pt-4 border-t border-[#c4cbc5] print:border-black/20 flex flex-col sm:flex-row justify-between items-start gap-6">
          {/* Notes & Bank Details Block */}
          <div className="space-y-4 max-w-sm flex-1">
            {invoice.notes && (
              <div>
                <h4 className="text-[10px] font-semibold text-[#626a64] uppercase tracking-wider mb-1">
                  Notes
                </h4>
                <p className="text-xs text-[#626a64] leading-relaxed whitespace-pre-wrap">
                  {invoice.notes}
                </p>
              </div>
            )}
          </div>

          {/* Calculations Totals & Authorized Signature */}
          <div className="w-full sm:w-64 space-y-1.5 font-mono text-xs">
            <div className="flex justify-between text-[#626a64]">
              <span>Subtotal</span>
              <span>
                {currencySymbol}
                {subtotal.toFixed(2)}
              </span>
            </div>
            {taxRate > 0 && (
              <div className="flex justify-between text-[#626a64]">
                <span>Tax ({taxRate}%)</span>
                <span>
                  +{currencySymbol}
                  {tax.toFixed(2)}
                </span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount</span>
                <span>
                  -{currencySymbol}
                  {discount.toFixed(2)}
                </span>
              </div>
            )}
            {shipping > 0 && (
              <div className="flex justify-between text-[#626a64]">
                <span>Shipping</span>
                <span>
                  +{currencySymbol}
                  {shipping.toFixed(2)}
                </span>
              </div>
            )}
            <div className="pt-2 border-t border-[#c4cbc5] print:border-black/20 flex justify-between text-[#161917] font-bold text-sm">
              <span className="font-serif">Total Due</span>
              <span>
                {currencySymbol}
                {total.toFixed(2)}
              </span>
            </div>

            {/* Signature rendering below Total Due */}
            {hasSignature && (
              <div className="mt-[80px] pt-4 border-t border-dashed border-[#c4cbc5] print:border-black/20 flex flex-col items-end">
                <h4 className="text-[10px] font-semibold text-[#626a64] uppercase tracking-wider mb-1.5 text-right">
                  Authorized Signature
                </h4>
                {invoice.signatureType === "draw" || invoice.signatureType === "upload" ? (
                  invoice.signatureImage ? (
                    <div className="h-16 max-w-[200px] border-b border-[#161917]/40 pb-1 flex items-end justify-end">
                      <img
                        src={invoice.signatureImage}
                        alt="Signature"
                        className="max-h-full object-contain"
                      />
                    </div>
                  ) : null
                ) : invoice.signatureType === "type" && invoice.signatureText ? (
                  <div className="border-b border-[#161917]/40 pb-1 text-right w-full">
                    <span className="font-serif italic text-lg text-[#161917]">
                      {invoice.signatureText}
                    </span>
                  </div>
                ) : null}
                {invoice.signedAt && (
                  <p className="text-[10px] text-[#626a64] mt-1 font-mono text-right">
                    Signed on {format(new Date(invoice.signedAt), "MMM dd, yyyy")}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
