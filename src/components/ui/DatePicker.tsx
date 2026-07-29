"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface DatePickerProps {
  value: string; // "YYYY-MM-DD"
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className = "",
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper: Parse "YYYY-MM-DD" string into local Date object safely without UTC shift
  const parseLocalDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const parts = dateStr.split("-").map(Number);
    if (parts.length === 3 && !parts.some(isNaN)) {
      const [year, month, day] = parts;
      return new Date(year, month - 1, day);
    }
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  };

  const parsedDate = parseLocalDate(value);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    parsedDate || new Date(),
  );

  // Format date for display: e.g. "Jul 16, 2026"
  const formatDateDisplay = (dateStr: string) => {
    const date = parseLocalDate(dateStr);
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update currentMonth if value changes from parent
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    const d = parseLocalDate(value);
    if (d) {
      setCurrentMonth(d);
    }
  }

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const selectDay = (day: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
      day,
    ).padStart(2, "0")}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  // Generate days grid
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay(); // Day of week (0-6)
  const totalDays = new Date(year, month + 1, 0).getDate(); // Total days in month
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
  });

  const days: { day: number; currentMonth: boolean; key: string }[] = [];

  // Padding days from previous month
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    days.push({
      day: prevMonthTotalDays - i,
      currentMonth: false,
      key: `prev-${prevMonthTotalDays - i}`,
    });
  }

  // Days in current month
  for (let i = 1; i <= totalDays; i++) {
    days.push({
      day: i,
      currentMonth: true,
      key: `curr-${i}`,
    });
  }

  // Padding days for next month to complete the row grid (42 cells = 6 rows)
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      day: i,
      currentMonth: false,
      key: `next-${i}`,
    });
  }

  const isSelected = (day: number, isCurrMonth: boolean) => {
    if (!isCurrMonth || !parsedDate) return false;
    return (
      parsedDate.getDate() === day &&
      parsedDate.getMonth() === month &&
      parsedDate.getFullYear() === year
    );
  };

  const isToday = (day: number, isCurrMonth: boolean) => {
    if (!isCurrMonth) return false;
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  return (
    <div
      className={`relative w-full text-left ${className}`}
      ref={containerRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3.5 py-2 text-sm bg-[#f5f4ef] border border-[#c4cbc5] text-[#161917] hover:border-[#2b4c33] focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all rounded-lg outline-none cursor-pointer font-sans"
      >
        <span className={value ? "text-[#161917]" : "text-[#626a64]/60"}>
          {value ? formatDateDisplay(value) : placeholder}
        </span>
        <CalendarIcon className="w-4 h-4 text-[#2b4c33]" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-72 bg-[#f5f4ef] border border-[#c4cbc5] rounded-2xl shadow-xl z-50 p-4 font-sans text-[#161917]">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-[#ededdf] rounded-lg text-[#161917] cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-[#161917]">
              {monthName} {year}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-[#ededdf] rounded-lg text-[#161917] cursor-pointer transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-[#626a64] uppercase tracking-wider mb-2">
            <div>Su</div>
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {days.map(({ day, currentMonth: isCurr, key }) => {
              const selected = isSelected(day, isCurr);
              const today = isToday(day, isCurr);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={(e) => isCurr && selectDay(day, e)}
                  disabled={!isCurr}
                  className={`py-1.5 rounded-lg font-medium transition-all duration-200 ${
                    !isCurr
                      ? "text-[#c4cbc5] cursor-default"
                      : selected
                        ? "bg-[#2b4c33] text-white shadow-sm font-semibold hover:bg-[#161917] cursor-pointer"
                        : today
                          ? "bg-[#2b4c33]/15 text-[#2b4c33] font-semibold border border-[#2b4c33]/30 hover:bg-[#ededdf] cursor-pointer"
                          : "text-[#161917] hover:bg-[#ededdf] cursor-pointer"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
