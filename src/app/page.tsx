"use client";

import { FileText, Users, Box, Plus, Eye } from "lucide-react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/schema";
import { format } from "date-fns";
import { getCurrencySymbol } from "@/lib/currency";

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

export default function DashboardPage() {
  const invoiceCount = useLiveQuery(() => db.invoices.count()) || 0;
  const clientCount = useLiveQuery(() => db.clients.count()) || 0;
  const itemCount = useLiveQuery(() => db.items.count()) || 0;
  const recentInvoices =
    useLiveQuery(() =>
      db.invoices.orderBy("createdAt").reverse().limit(5).toArray(),
    ) || [];
  const clients = useLiveQuery(() => db.clients.toArray()) || [];

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <h2 className="text-[#161917] font-serif font-bold tracking-tight text-2xl sm:text-3xl">
            Dashboard
          </h2>
          <p className="text-[#626a64] text-sm mt-1 sm:mt-2">
            Overview of your business activity and quick actions.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link
            href="/invoices/new"
            className="bg-[#2b4c33] text-white hover:bg-[#161917] font-serif font-semibold transition-all duration-300 rounded-lg text-sm px-4.5 py-2.5 sm:py-2 inline-flex items-center justify-center gap-2 flex-1 sm:flex-initial cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            New Invoice
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg p-6 flex items-center justify-between shadow-none">
          <div>
            <p className="text-[#626a64] text-sm font-semibold font-serif">
              Total Invoices
            </p>
            <p className="text-[#161917] text-3xl font-bold font-mono mt-2">
              {invoiceCount}
            </p>
          </div>
          <div className="p-3 bg-[#f5f4ef] rounded-lg text-[#2b4c33]">
            <FileText className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg p-6 flex items-center justify-between shadow-none">
          <div>
            <p className="text-[#626a64] text-sm font-semibold font-serif">
              Total Clients
            </p>
            <p className="text-[#161917] text-3xl font-bold font-mono mt-2">
              {clientCount}
            </p>
          </div>
          <div className="p-3 bg-[#f5f4ef] rounded-lg text-[#2b4c33]">
            <Users className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg p-6 flex items-center justify-between shadow-none sm:col-span-2 lg:col-span-1">
          <div>
            <p className="text-[#626a64] text-sm font-semibold font-serif">
              Catalog Items
            </p>
            <p className="text-[#161917] text-3xl font-bold font-mono mt-2">
              {itemCount}
            </p>
          </div>
          <div className="p-3 bg-[#f5f4ef] rounded-lg text-[#2b4c33]">
            <Box className="h-6 w-6" />
          </div>
        </div>
      </div>

      <h3 className="text-[#161917] font-serif font-bold tracking-tight text-xl mb-4 sm:mb-6">
        Recent Invoices
      </h3>

      {recentInvoices.length === 0 ? (
        <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg shadow-none flex flex-col items-center justify-center p-8 sm:p-12 text-center">
          <FileText className="h-8 w-8 text-[#626a64] mb-4 opacity-50" />
          <p className="text-[#161917] font-serif font-semibold">
            No invoices yet
          </p>
          <p className="text-[#626a64] text-sm mt-1">
            Create your first invoice to get started.
          </p>
        </div>
      ) : (
        <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg shadow-none overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[800px] table-fixed">
            <colgroup><col className="w-[140px]" /><col className="w-[170px]" /><col className="w-[150px]" /><col className="w-[150px]" /><col className="w-[90px]" /><col className="w-[100px]" /></colgroup>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c4cbc5]">
              {recentInvoices.map((inv) => {
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
                    className="hover:bg-[#f5f4ef]/30 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 font-mono text-[#161917]">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/invoices/${inv.id}`}
                          className="hover:text-[#2b4c33] transition-colors font-semibold text-xs truncate max-w-[120px]"
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
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-[#161917]">
                      <div className="font-semibold text-sm text-[#161917]">
                        {clientDetails.name}
                      </div>
                      {clientDetails.email && (
                        <div className="text-xs font-mono text-[#626a64] mt-0.5">
                          {clientDetails.email}
                        </div>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-[#626a64] font-mono text-[11px] leading-tight whitespace-nowrap">
                      {inv.createdAt
                        ? format(new Date(inv.createdAt), "MMM dd,yy,hh:mma")
                        : "—"}
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-[#626a64]">
                      <div className="text-xs font-semibold text-[#161917]">
                        Issue Date:{" "}
                        {format(new Date(inv.issueDate), "MMM dd, yyyy")}
                      </div>
                      <div className="text-xs text-[#626a64] mt-0.5">
                        Due {format(new Date(inv.dueDate), "MMM dd, yyyy")}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4">
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
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-right font-mono text-[#161917] font-semibold">
                      {symbol}
                      {total.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
