"use client";

import { useState, useEffect, useRef } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/schema";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft, X, Tag } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@/components/ui/DatePicker";
import { Select } from "@/components/ui/Select";
import { SignaturePad } from "@/components/ui/SignaturePad";
import { useToast } from "@/hooks/useToast";
import { getCurrencySymbol } from "@/lib/currency";
import { clientSchema, type ClientFormData } from "@/lib/validations";

export default function NewInvoicePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const clients = useLiveQuery(() => db.clients.toArray()) || [];
  const catalogItems = useLiveQuery(() => db.items.toArray()) || [];
  const profile = useLiveQuery(() => db.businessProfile.limit(1).first());

  const [invoiceId, setInvoiceId] = useState("");
  const [clientId, setClientId] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [notes, setNotes] = useState("Thank you for your business.");

  // Validation state
  const [clientError, setClientError] = useState("");
  const [invoiceIdError, setInvoiceIdError] = useState("");

  // Additional financial parameters
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);

  // Inline Add New Client State & Form
  const [isAddingClient, setIsAddingClient] = useState(false);
  const newClientNameRef = useRef<HTMLInputElement | null>(null);

  const {
    register: registerQuickClient,
    handleSubmit: handleSubmitQuickClient,
    reset: resetQuickClient,
    formState: { errors: quickClientErrors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema as any),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      taxId: "",
    },
  });

  // Signature state
  const [signatureType, setSignatureType] = useState<"none" | "draw" | "type" | "upload">("none");
  const [signatureText, setSignatureText] = useState("");
  const [signatureImage, setSignatureImage] = useState("");

  const [lineItems, setLineItems] = useState([
    { id: uuidv4(), description: "", quantity: 1, unitPrice: 0, taxRate: 0, error: "" },
  ]);

  useEffect(() => {
    setInvoiceId(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
    setIssueDate(new Date().toISOString().split("T")[0]);
    setDueDate(
      new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
    );
  }, []);

  useEffect(() => {
    if (profile?.defaultCurrency) {
      setCurrency(profile.defaultCurrency);
    }
  }, [profile]);

  const currencySymbol = getCurrencySymbol(currency);

  const handleClientSelect = (val: string) => {
    if (val === "__ADD_NEW_CLIENT__") {
      setIsAddingClient(true);
      setTimeout(() => {
        if (newClientNameRef.current) {
          newClientNameRef.current.focus();
        }
      }, 150);
    } else {
      setClientId(val);
      if (val) setClientError("");
    }
  };

  const onQuickClientSubmit = async (data: ClientFormData) => {
    const newId = uuidv4();
    await db.clients.add({
      id: newId,
      name: data.name.trim(),
      email: (data.email || "").trim(),
      address: (data.address || "").trim(),
      taxId: (data.taxId || "").trim(),
      createdAt: Date.now(),
    });

    setClientId(newId);
    setClientError("");
    showToast(`Client "${data.name.trim()}" added & selected!`, "success");
    setIsAddingClient(false);
    resetQuickClient();
  };

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: uuidv4(), description: "", quantity: 1, unitPrice: 0, taxRate: 0, error: "" },
    ]);
  };

  const handleSelectCatalogItem = (catalogItemId: string) => {
    const selectedItem = catalogItems.find((c) => c.id === catalogItemId);
    if (!selectedItem) return;

    if (
      lineItems.length === 1 &&
      !lineItems[0].description.trim() &&
      lineItems[0].unitPrice === 0
    ) {
      setLineItems([
        {
          id: lineItems[0].id,
          description: selectedItem.name,
          quantity: 1,
          unitPrice: selectedItem.unitPrice,
          taxRate: 0,
          error: "",
        },
      ]);
    } else {
      setLineItems([
        ...lineItems,
        {
          id: uuidv4(),
          description: selectedItem.name,
          quantity: 1,
          unitPrice: selectedItem.unitPrice,
          taxRate: 0,
          error: "",
        },
      ]);
    }
    showToast(`Added "${selectedItem.name}" to line items`, "info");
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
    showToast("Line item removed", "info");
  };

  const updateLineItem = (id: string, field: string, value: any) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id !== id) return item;
        
        const updated = { ...item, [field]: value, error: field === "description" && value ? "" : item.error };
        
        if (field === "description") {
          const matchedCatalogItem = catalogItems.find(
            (c) => c.name.toLowerCase() === String(value).trim().toLowerCase()
          );
          if (matchedCatalogItem) {
            updated.unitPrice = matchedCatalogItem.unitPrice;
          }
        }
        
        return updated;
      }),
    );
  };

  const calculateSubtotal = () => {
    return lineItems.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0,
    );
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * (taxRate / 100);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const result = subtotal + tax - discount + shipping;
    return Math.max(0, result);
  };

  const handleSave = async (status: "draft" | "sent" | "paid" = "draft") => {
    let isValid = true;

    if (!invoiceId.trim()) {
      setInvoiceIdError("Invoice number is required");
      isValid = false;
    } else {
      setInvoiceIdError("");
    }

    if (!clientId) {
      setClientError("Please select a client for this invoice");
      isValid = false;
    } else {
      setClientError("");
    }

    const updatedLineItems = lineItems.map((item) => {
      if (!item.description.trim()) {
        isValid = false;
        return { ...item, error: "Description is required" };
      }
      return { ...item, error: "" };
    });

    setLineItems(updatedLineItems);

    if (!isValid) {
      showToast("Please fix validation errors before saving", "warning");
      return;
    }

    // Auto-save new line items to Items Catalog page so they appear in /items
    for (const item of lineItems) {
      const desc = item.description.trim();
      if (desc) {
        const existing = catalogItems.find(
          (c) => c.name.toLowerCase() === desc.toLowerCase()
        );
        if (!existing) {
          await db.items.add({
            id: uuidv4(),
            name: desc,
            unitPrice: item.unitPrice || 0,
            taxRate: 0,
            createdAt: Date.now(),
          });
        }
      }
    }

    const selectedClient = clients.find((c) => c.id === clientId);

    const invoice = {
      id: invoiceId,
      clientId,
      clientName: selectedClient ? selectedClient.name : clientId,
      clientEmail: selectedClient ? selectedClient.email : "",
      clientAddress: selectedClient ? selectedClient.address : "",
      issueDate: new Date(issueDate).getTime(),
      dueDate: new Date(dueDate).getTime(),
      status,
      currency,
      notes,
      lineItems: lineItems.map(({ error, ...item }) => item),
      taxRate,
      discount,
      shipping,
      signatureType,
      signatureText,
      signatureImage,
      signedAt: signatureType !== "none" ? Date.now() : undefined,
      createdAt: Date.now(),
    };

    await db.invoices.add(invoice);
    showToast(
      status === "draft" ? "Invoice saved as draft" : "Invoice created successfully!",
      "success"
    );
    router.push(`/invoices/${invoiceId}`);
  };

  const { ref: nameRef, ...nameRegisterProps } = registerQuickClient("name");

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/invoices"
            className="p-2 text-[#626a64] hover:text-[#161917] hover:bg-[#c4cbc5]/30 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h2 className="text-[#161917] font-serif font-bold tracking-tight text-2xl">
              New Invoice
            </h2>
            <p className="text-[#626a64] text-sm">
              Create a new invoice document.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleSave("draft")}
            className="px-4.5 py-2 text-sm font-semibold font-serif text-[#626a64] hover:text-[#161917] transition-colors border border-[#c4cbc5] rounded-lg cursor-pointer"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave("sent")}
            className="bg-[#2b4c33] text-white hover:bg-[#161917] font-serif font-semibold transition-all duration-300 rounded-lg text-sm px-4.5 py-2 inline-flex items-center gap-2 cursor-pointer"
          >
            Create & View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Details Box */}
          <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg shadow-none p-6">
            <h3 className="font-serif font-bold text-lg mb-6 text-[#161917]">
              Invoice Details
            </h3>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#161917]">
                  Invoice Number *
                </label>
                <input
                  type="text"
                  value={invoiceId}
                  onChange={(e) => {
                    setInvoiceId(e.target.value);
                    if (e.target.value) setInvoiceIdError("");
                  }}
                  className={`w-full bg-[#f5f4ef] border text-[#161917] placeholder-stone-400 focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all rounded-lg text-sm px-3.5 py-2 outline-none font-mono ${
                    invoiceIdError ? "border-red-500" : "border-[#c4cbc5]"
                  }`}
                />
                {invoiceIdError && (
                  <p className="text-xs text-red-600 font-medium mt-1">
                    {invoiceIdError}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#161917]">
                  Client *
                </label>
                <Select
                  value={clientId}
                  onChange={handleClientSelect}
                  placeholder="Select a client..."
                  options={[
                    { value: "", label: "Select a client..." },
                    ...clients.map((c) => ({ value: c.id, label: c.name })),
                    {
                      value: "__ADD_NEW_CLIENT__",
                      label: "+ Add new client",
                      isAction: true,
                    },
                  ]}
                />
                {clientError && (
                  <p className="text-xs text-red-600 font-medium mt-1">
                    {clientError}
                  </p>
                )}
              </div>
            </div>

            {/* Smooth Inline Add New Client Section */}
            <AnimatePresence>
              {isAddingClient && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden mb-6"
                >
                  <form
                    onSubmit={handleSubmitQuickClient(onQuickClientSubmit)}
                    className="p-4 bg-[#f5f4ef] border border-[#c4cbc5] rounded-xl space-y-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between border-b border-[#c4cbc5]/60 pb-2">
                      <h4 className="font-serif font-bold text-sm text-[#161917]">
                        Add New Client
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingClient(false);
                          resetQuickClient();
                        }}
                        className="text-[#626a64] hover:text-[#161917] p-1 rounded-lg transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#161917]">
                          Client Name *
                        </label>
                        <input
                          {...nameRegisterProps}
                          ref={(e) => {
                            nameRef(e);
                            newClientNameRef.current = e;
                          }}
                          type="text"
                          className={`w-full bg-white border text-[#161917] text-xs px-3 py-2 rounded-lg outline-none focus:border-[#2b4c33] ${
                            quickClientErrors.name
                              ? "border-red-500"
                              : "border-[#c4cbc5]"
                          }`}
                          placeholder="Client or Company Name"
                        />
                        {quickClientErrors.name && (
                          <p className="text-xs text-red-600 font-medium mt-1">
                            {quickClientErrors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#161917]">
                          Email
                        </label>
                        <input
                          {...registerQuickClient("email")}
                          type="email"
                          className={`w-full bg-white border text-[#161917] text-xs px-3 py-2 rounded-lg outline-none focus:border-[#2b4c33] ${
                            quickClientErrors.email
                              ? "border-red-500"
                              : "border-[#c4cbc5]"
                          }`}
                          placeholder="billing@client.com"
                        />
                        {quickClientErrors.email && (
                          <p className="text-xs text-red-600 font-medium mt-1">
                            {quickClientErrors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#161917]">
                          Address
                        </label>
                        <input
                          {...registerQuickClient("address")}
                          type="text"
                          className="w-full bg-white border border-[#c4cbc5] text-[#161917] text-xs px-3 py-2 rounded-lg outline-none focus:border-[#2b4c33]"
                          placeholder="Billing Address..."
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#161917]">
                          Tax ID / VAT Registration
                        </label>
                        <input
                          {...registerQuickClient("taxId")}
                          type="text"
                          className="w-full bg-white border border-[#c4cbc5] text-[#161917] text-xs px-3 py-2 rounded-lg outline-none focus:border-[#2b4c33]"
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-[#c4cbc5]/60">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingClient(false);
                          resetQuickClient();
                        }}
                        className="px-3 py-1.5 text-xs text-[#626a64] hover:text-[#161917] cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-[#2b4c33] text-white font-serif font-semibold text-xs rounded-lg hover:bg-[#161917] transition-colors cursor-pointer"
                      >
                        Save & Select Client
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#161917]">
                  Issue Date
                </label>
                <DatePicker value={issueDate} onChange={setIssueDate} />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#161917]">
                  Due Date
                </label>
                <DatePicker value={dueDate} onChange={setDueDate} />
              </div>
            </div>
          </div>

          {/* Line Items Box */}
          <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg shadow-none p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="font-serif font-bold text-lg text-[#161917]">
                Line Items
              </h3>

              {/* Single Custom Themed Catalog Picker Dropdown */}
              {catalogItems.length > 0 && (
                <div className="w-full sm:w-64">
                  <Select
                    value=""
                    onChange={handleSelectCatalogItem}
                    placeholder="+ Add from items catalog..."
                    options={[
                      { value: "", label: "+ Add from items catalog..." },
                      ...catalogItems.map((c) => ({
                        value: c.id,
                        label: `${c.name} (${currencySymbol}${c.unitPrice.toFixed(2)})`,
                      })),
                    ]}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              {lineItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-start pb-4 border-b border-[#c4cbc5] last:border-0 last:pb-0"
                >
                  <div className="flex-1 space-y-1">
                    <label className="block text-xs font-semibold text-[#161917]">
                      Description *
                    </label>
                    <input
                      type="text"
                      list={`catalog-items-${item.id}`}
                      placeholder="Service or product description"
                      value={item.description}
                      onChange={(e) =>
                        updateLineItem(item.id, "description", e.target.value)
                      }
                      className={`w-full bg-[#f5f4ef] border text-[#161917] focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all rounded-lg text-sm px-3.5 py-2 outline-none ${
                        item.error ? "border-red-500" : "border-[#c4cbc5]"
                      }`}
                    />
                    <datalist id={`catalog-items-${item.id}`}>
                      {catalogItems.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name} - {currencySymbol}{c.unitPrice.toFixed(2)}
                        </option>
                      ))}
                    </datalist>
                    {item.error && (
                      <p className="text-xs text-red-600 font-medium mt-1">
                        {item.error}
                      </p>
                    )}
                  </div>
                  <div className="w-24 space-y-1">
                    <label className="block text-xs font-semibold text-[#161917]">
                      Qty
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateLineItem(
                          item.id,
                          "quantity",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-full bg-[#f5f4ef] border border-[#c4cbc5] text-[#161917] focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all rounded-lg text-sm px-3.5 py-2 outline-none font-mono"
                    />
                  </div>
                  <div className="w-32 space-y-1">
                    <label className="block text-xs font-semibold text-[#161917]">
                      Price
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) =>
                        updateLineItem(
                          item.id,
                          "unitPrice",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-full bg-[#f5f4ef] border border-[#c4cbc5] text-[#161917] focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all rounded-lg text-sm px-3.5 py-2 outline-none font-mono"
                    />
                  </div>
                  <div className="pt-6">
                    <button
                      onClick={() => removeLineItem(item.id)}
                      className="text-[#626a64] hover:text-red-700 p-2 transition-colors cursor-pointer"
                      title="Remove Item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={addLineItem}
                className="text-[#2b4c33] hover:text-[#161917] font-serif text-sm font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add Blank Line Item
              </button>
            </div>
          </div>

          {/* Signature Box */}
          <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg shadow-none p-6">
            <h3 className="font-serif font-bold text-lg mb-4 text-[#161917]">
              Signature Block
            </h3>
            <SignaturePad
              signatureType={signatureType}
              onTypeChange={setSignatureType}
              signatureText={signatureText}
              onTextChange={setSignatureText}
              signatureImage={signatureImage}
              onImageChange={setSignatureImage}
            />
          </div>

          {/* Notes Box */}
          <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg shadow-none p-6">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#161917]">
                Notes / Payment Terms
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full bg-[#f5f4ef] border border-[#c4cbc5] text-[#161917] focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all rounded-lg text-sm px-3.5 py-2 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Summary & Adjustments */}
        <div className="lg:col-span-1">
          <div className="bg-[#ededdf] border border-[#c4cbc5] rounded-lg shadow-none p-6 sticky top-8 space-y-6">
            <h3 className="font-serif font-bold text-lg text-[#161917]">
              Summary
            </h3>

            {/* Financial adjustments */}
            <div className="space-y-4 pt-2 border-t border-[#c4cbc5]/60">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#161917]">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#f5f4ef] border border-[#c4cbc5] text-[#161917] focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all rounded-lg text-sm px-3.5 py-2 outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#161917]">
                  Discount ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#f5f4ef] border border-[#c4cbc5] text-[#161917] focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all rounded-lg text-sm px-3.5 py-2 outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#161917]">
                  Shipping Fee ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={shipping}
                  onChange={(e) => setShipping(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#f5f4ef] border border-[#c4cbc5] text-[#161917] focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all rounded-lg text-sm px-3.5 py-2 outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#161917]">
                  Currency
                </label>
                <Select
                  value={currency}
                  onChange={setCurrency}
                  options={[
                    { value: "USD", label: "USD ($)" },
                    { value: "EUR", label: "EUR (€)" },
                    { value: "GBP", label: "GBP (£)" },
                    { value: "JPY", label: "JPY (¥)" },
                    { value: "CAD", label: "CAD ($)" },
                    { value: "AUD", label: "AUD ($)" },
                    { value: "INR", label: "INR (₹)" },
                  ]}
                />
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 pt-4 border-t border-[#c4cbc5] font-mono text-sm">
              <div className="flex justify-between text-[#626a64]">
                <span>Subtotal</span>
                <span>{currencySymbol}{calculateSubtotal().toFixed(2)}</span>
              </div>
              {taxRate > 0 && (
                <div className="flex justify-between text-[#626a64]">
                  <span>Tax ({taxRate}%)</span>
                  <span>+{currencySymbol}{calculateTax().toFixed(2)}</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span>-{currencySymbol}{discount.toFixed(2)}</span>
                </div>
              )}
              {shipping > 0 && (
                <div className="flex justify-between text-[#626a64]">
                  <span>Shipping</span>
                  <span>+{currencySymbol}{shipping.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-[#c4cbc5] flex justify-between text-[#161917] font-bold text-lg">
                <span className="font-serif">Total</span>
                <span>{currencySymbol}{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
