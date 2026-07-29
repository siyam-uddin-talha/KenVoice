"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastConfirmOptions {
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, action?: ToastAction) => void;
  confirmToast: (options: ToastConfirmOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    action?: ToastAction;
  } | null>(null);

  const [confirmState, setConfirmState] = useState<ToastConfirmOptions | null>(null);

  const showToast = (
    message: string,
    type: ToastType = "info",
    action?: ToastAction
  ) => {
    setToast({ message, type, action });
  };

  const confirmToast = (options: ToastConfirmOptions) => {
    setConfirmState(options);
  };

  useEffect(() => {
    if (toast) {
      const duration = toast.action ? 7000 : 4000;
      const timer = setTimeout(() => setToast(null), duration);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-4.5 h-4.5 shrink-0 text-[#2b4c33]" />;
      case "error":
        return <AlertCircle className="w-4.5 h-4.5 shrink-0 text-red-700" />;
      case "warning":
        return <AlertTriangle className="w-4.5 h-4.5 shrink-0 text-amber-700" />;
      default:
        return <Info className="w-4.5 h-4.5 shrink-0 text-[#2b4c33]" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, confirmToast }}>
      {children}
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && !confirmState && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 pointer-events-auto"
          >
            <div
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl border shadow-xl backdrop-blur-md ${
                toast.type === "error"
                  ? "bg-red-50/95 border-red-200 text-red-800"
                  : toast.type === "success"
                  ? "bg-[#ededdf]/95 border-[#2b4c33]/30 text-[#161917]"
                  : toast.type === "warning"
                  ? "bg-amber-50/95 border-amber-200 text-amber-900"
                  : "bg-[#ededdf]/95 border-[#c4cbc5] text-[#161917]"
              }`}
            >
              {getIcon(toast.type)}
              <span className="text-xs font-semibold tracking-wide font-sans">
                {toast.message}
              </span>
              {toast.action && (
                <button
                  onClick={() => {
                    toast.action?.onClick();
                    setToast(null);
                  }}
                  className={`ml-3 px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
                    toast.type === "warning"
                      ? "bg-amber-600 hover:bg-amber-700 text-white shadow-sm border border-amber-500"
                      : "bg-[#2b4c33] hover:bg-[#161917] text-white"
                  }`}
                >
                  {toast.action.label}
                </button>
              )}
              <button
                onClick={() => setToast(null)}
                className="ml-3 p-1 hover:bg-[#c4cbc5]/40 rounded-lg text-xs leading-none cursor-pointer font-sans opacity-70 hover:opacity-100 transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Toast Dialog */}
      <AnimatePresence>
        {confirmState && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 pointer-events-auto"
          >
            <div className="flex flex-col p-4 rounded-2xl border shadow-2xl bg-[#ededdf] border-[#c4cbc5] text-[#161917] min-w-[300px] max-w-sm">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-red-100/80 rounded-xl shrink-0">
                    <AlertTriangle className="w-4 h-4 text-red-700 shrink-0" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#161917] font-sans">
                      Confirmation Required
                    </span>
                    <span className="text-xs text-[#626a64] font-sans font-medium mt-0.5">
                      {confirmState.message}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirmState.onCancel) confirmState.onCancel();
                    setConfirmState(null);
                  }}
                  className="p-1 hover:bg-[#c4cbc5]/40 rounded-lg text-xs opacity-60 hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2.5 border-t border-[#c4cbc5]/60 mt-1">
                <button
                  onClick={() => {
                    if (confirmState.onCancel) confirmState.onCancel();
                    setConfirmState(null);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs text-[#626a64] hover:text-[#161917] hover:bg-[#c4cbc5]/30 transition-colors cursor-pointer font-sans font-semibold"
                >
                  {confirmState.cancelLabel || "Cancel"}
                </button>
                <button
                  onClick={() => {
                    confirmState.onConfirm();
                    setConfirmState(null);
                  }}
                  className="px-3.5 py-1.5 rounded-lg text-xs bg-red-700 hover:bg-red-800 text-white font-sans font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  {confirmState.confirmLabel || "Delete"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
