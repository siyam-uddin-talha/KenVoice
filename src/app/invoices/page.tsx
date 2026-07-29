"use client";

import { FileText, Plus, Search, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/schema";
import { format } from "date-fns";
import { useState } from "react";
import { getCurrencySymbol } from "@/lib/currency";
import { useToast } from "@/hooks/useToast";

const isUUID = (str?: string) =>
  !!str &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

const getClientDisplayDetails = (inv: any, clientsList: any[]) => {
  if (!inv) return { name: "Unknown", email: "" };

  if (inv.clientId) {
    const matched = clientsList.find(
      (c) =>
        c.id === inv.clientId ||
        (c.name && c.name.toLowerCase() === inv.clientId.toLowerCase()),
    );
    if (matched) {
      return { name: matched.name, email: matched.email || "" };
    }
  }

  if (inv.clientName && !isUUID(inv.clientName)) {
    return { name: inv.clientName, email: inv.clientEmail || "" };
  }

  if (inv.clientId && !isUUID(inv.clientId)) {
    return { name: inv.clientId, email: inv.clientEmail || "" };
  }

  return { name: "Unknown", email: inv.clientEmail || "" };
};

export default function InvoicesPage() {
  const { showToast, confirmToast } = useToast();
  const allInvoices =
    useLiveQuery(() => db.invoices.orderBy("createdAt").reverse().toArray()) ||
    [];
  const clients = useLiveQuery(() => db.clients.toArray()) || [];

  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteInvoice = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    confirmToast({
      message: `Delete invoice ${id}?`,
      confirmLabel: "Delete Invoice",
      onConfirm: async () => {
        await db.invoices.delete(id);
        showToast(`Invoice ${id} deleted`, "info");
      },
    });
  };

  const filteredInvoices = allInvoices.filter((inv) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const clientDetails = getClientDisplayDetails(inv, clients);
    return (
      inv.id.toLowerCase().includes(searchLower) ||
      clientDetails.name.toLowerCase().includes(searchLower) ||
      clientDetails.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-[#161917] font-serif font-bold tracking-tight text-2xl sm:text-3xl">
            Invoices
          </h2>
          <p className="text-[#626a64] text-sm mt-1 sm:mt-2">
            Manage and track your issued invoices.
          </p>
        </div>
        <Link
          href="/invoices/new"
          className="bg-[#2b4c33] text-white hover:bg-[#161917] font-serif font-semibold transition-all duration-300 rounded-lg text-sm px-4.5 py-2.5 sm:py-2 inline-flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          New Invoice
        </Link>
      </div>

      <div className="mb-6 sm:mb-8 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#626a64]" />
        <input
          type="text"
          placeholder="Search by invoice number or client name/email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#ededdf] border border-[#c4cbc5] text-[#161917] placeholder-[#626a64] focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all rounded-lg text-sm pl-10 pr-4 py-3 outline-none"
        />
      </div>

      {allInvoices.length === 0 ? (
        <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg shadow-none flex flex-col items-center justify-center p-8 sm:p-12 text-center">
          <FileText className="h-8 w-8 text-[#626a64] mb-4 opacity-50" />
          <p className="text-[#161917] font-serif font-semibold">
            No invoices found
          </p>
          <p className="text-[#626a64] text-sm mt-1">
            Create an invoice to get paid.
          </p>
        </div>
      ) : (
        <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg shadow-none overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[860px] table-fixed">
            <colgroup>
              <col className="w-[140px]" /> {/* Invoice */}
              <col className="w-[170px]" /> {/* Client Details — flex grows */}
              <col className="w-[150px]" /> {/* Created Date */}
              <col className="w-[160px]" /> {/* Date */}
              <col className="w-[90px]" /> {/* Status */}
              <col className="w-[100px]" /> {/* Amount */}
              <col className="w-[60px]" /> {/* Actions */}
            </colgroup>
            <thead>
              <tr className="border-b border-[#c4cbc5] bg-[#f5f4ef]/50">
                <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-serif font-semibold text-[#161917]">
                  Invoice
                </th>
                <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-serif font-semibold text-[#161917]">
                  Client Details
                </th>
                <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-serif font-semibold text-[#161917]">
                  Created Date
                </th>
                <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-serif font-semibold text-[#161917]">
                  Date
                </th>
                <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-serif font-semibold text-[#161917]">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-serif font-semibold text-[#161917] text-right">
                  Amount
                </th>
                <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-serif font-semibold text-[#161917] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c4cbc5]">
              {filteredInvoices.map((inv) => {
                const subtotal = inv.lineItems.reduce(
                  (acc, item) => acc + item.quantity * item.unitPrice,
                  0,
                );
                const taxRate = inv.taxRate || 0;
                const tax = subtotal * (taxRate / 100);
                const discount = inv.discount || 0;
                const shipping = inv.shipping || 0;
                const total = Math.max(0, subtotal + tax - discount + shipping);
                const symbol = getCurrencySymbol(inv.currency);
                const clientDetails = getClientDisplayDetails(inv, clients);

                return (
                  <tr
                    key={inv.id}
                    className="hover:bg-[#f5f4ef]/30 transition-colors align-middle"
                  >
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 font-mono text-[#161917] align-middle">
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/invoices/${inv.id}`}
                          className="hover:text-[#2b4c33] transition-colors font-semibold text-xs truncate"
                        >
                          {inv.id}
                        </Link>
                        <Link
                          href={`/invoices/${inv.id}`}
                          className="flex-shrink-0 p-1 rounded-md text-[#626a64] hover:text-[#2b4c33] hover:bg-[#d1ded3]/60 transition-colors"
                          title="View invoice"
                          aria-label={`View invoice ${inv.id}`}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-[#161917] align-middle">
                      <div className="font-semibold text-sm text-[#161917]">
                        {clientDetails.name}
                      </div>
                      {clientDetails.email && (
                        <div className="text-xs font-mono text-[#626a64] mt-0.5">
                          {clientDetails.email}
                        </div>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-[#626a64] font-mono text-[11px] leading-tight whitespace-nowrap align-middle">
                      {inv.createdAt
                        ? format(
                            new Date(inv.createdAt),
                            "MMM dd, yyyy, hh:mm a",
                          )
                        : "—"}
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-[#626a64] align-middle">
                      <div className="text-xs font-semibold text-[#161917]">
                        Issue Date:{" "}
                        {format(new Date(inv.issueDate), "MMM dd, yyyy")}
                      </div>
                      <div className="text-xs text-[#626a64] mt-0.5">
                        Due {format(new Date(inv.dueDate), "MMM dd, yyyy")}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 align-middle">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-serif border ${
                          inv.status === "paid"
                            ? "bg-[#d1ded3] text-[#2b4c33] border-[#2b4c33]/20"
                            : inv.status === "sent"
                              ? "bg-[#f5f4ef] text-[#626a64] border-[#c4cbc5]"
                              : "bg-transparent text-[#626a64] border-[#c4cbc5]"
                        }`}
                      >
                        {inv.status.charAt(0).toUpperCase() +
                          inv.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-right font-mono text-[#161917] font-semibold align-middle">
                      {symbol}
                      {total.toFixed(2)}
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-center align-middle">
                      <button
                        onClick={(e) => handleDeleteInvoice(inv.id, e)}
                        className="text-[#626a64] hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Invoice"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-[#626a64]"
                  >
                    No matching invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
