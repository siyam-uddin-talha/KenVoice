"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Box,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Items", href: "/items", icon: Box },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("kenvoice_sidebar_collapsed") === "true";
    }
    return false;
  });

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("kenvoice_sidebar_collapsed", String(next));
      return next;
    });
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f5f4ef] print:bg-white print:min-h-0 print:block">
      {/* Collapsible Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col flex-shrink-0 border-r border-[#c4cbc5] bg-[#ededdf] transition-all duration-300 ease-in-out print:hidden ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Sidebar Header */}
        <div
          className={`flex h-16 items-center border-b border-[#c4cbc5] ${
            isCollapsed ? "justify-between px-3" : "justify-between px-5"
          }`}
        >
          {!isCollapsed ? (
            <>
              <Link href="/" className="flex items-center gap-2.5 min-w-0">
                <Image
                  src="/logo.png"
                  alt="KenVoice"
                  width={28}
                  height={28}
                  className="rounded-md flex-shrink-0 object-contain"
                  priority
                />
                <span className="font-serif font-bold text-lg tracking-tight text-[#161917] truncate">
                  Ken<span className="text-[#2b4c33]">Voice</span>
                </span>
              </Link>
              <button
                type="button"
                onClick={toggleSidebar}
                className="p-1.5 text-[#626a64] hover:text-[#161917] hover:bg-[#d1ded3]/60 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div className="flex items-center justify-between w-full">
              <Link href="/" aria-label="KenVoice Home">
                <Image
                  src="/logo.png"
                  alt="KenVoice"
                  width={30}
                  height={30}
                  className="rounded-md object-contain"
                  priority
                />
              </Link>
              <button
                type="button"
                onClick={toggleSidebar}
                className="p-1.5 text-[#626a64] hover:text-[#161917] hover:bg-[#d1ded3]/60 rounded-lg transition-colors cursor-pointer"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-3 space-y-1.5 flex-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative group flex items-center rounded-lg transition-all duration-200 ${
                  isCollapsed
                    ? "justify-center p-3"
                    : "gap-3 px-4 py-2.5 text-sm"
                } ${
                  isActive
                    ? "bg-[#d1ded3] text-[#2b4c33] font-semibold"
                    : "text-[#626a64] hover:bg-[#d1ded3]/50 hover:text-[#161917]"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span className="truncate">{item.name}</span>}

                {/* Tooltip on Collapsed State */}
                {isCollapsed && (
                  <span className="absolute left-full ml-3 px-2.5 py-1 bg-[#161917] text-white text-xs font-serif rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Credit */}
        <div className="p-3 border-t border-[#c4cbc5] text-xs text-[#626a64]">
          {!isCollapsed ? (
            <p className="text-center truncate">
              Built by{" "}
              <a
                href="https://www.sutio.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2b4c33] font-semibold hover:underline"
              >
                sutio.co
              </a>
            </p>
          ) : (
            <a
              href="https://www.sutio.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center text-[#2b4c33] font-serif font-bold text-xs hover:underline"
              title="Built by sutio.co"
            >
              SUTIO
            </a>
          )}
        </div>
      </aside>

      {/* Mobile Top Navigation Bar */}
      <header className="md:hidden flex h-16 items-center justify-between px-4 border-b border-[#c4cbc5] bg-[#ededdf] sticky top-0 z-30 print:hidden">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="KenVoice"
            width={26}
            height={26}
            className="rounded-md object-contain"
            priority
          />
          <span className="font-serif font-bold text-lg tracking-tight text-[#161917]">
            Ken<span className="text-[#2b4c33]">Voice</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[#161917] hover:bg-[#d1ded3]/50 rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </header>

      {/* Mobile Menu Drawer & Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex print:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#ededdf] border-r border-[#c4cbc5] z-50 p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#c4cbc5] mb-4">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="KenVoice"
                  width={26}
                  height={26}
                  className="rounded-md object-contain"
                />
                <span className="font-serif font-bold text-lg tracking-tight text-[#161917]">
                  Ken<span className="text-[#2b4c33]">Voice</span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#626a64] hover:text-[#161917] rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-1 flex-1">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base transition-all duration-200 ${
                      isActive
                        ? "bg-[#d1ded3] text-[#2b4c33] font-semibold"
                        : "text-[#626a64] hover:bg-[#d1ded3]/50 hover:text-[#161917]"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-[#c4cbc5] text-xs text-center text-[#626a64]">
              Built by{" "}
              <a
                href="https://www.sutio.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2b4c33] font-semibold hover:underline"
              >
                sutio.co
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] md:h-screen md:overflow-y-auto bg-[#f5f4ef] print:bg-white print:h-auto print:min-h-0 print:overflow-visible print:p-0">
        <div className="flex-1 p-4 sm:p-6 md:p-12 max-w-6xl mx-auto w-full print:p-0 print:max-w-none">
          {children}
        </div>
        <footer className="py-4 text-center text-xs text-[#626a64] border-t border-[#c4cbc5]/30 print:hidden">
          Powered by{" "}
          <a
            href="https://www.sutio.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2b4c33] font-semibold hover:underline"
          >
            sutio.co
          </a>
        </footer>
      </main>
    </div>
  );
}
