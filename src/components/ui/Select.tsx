"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  isAction?: boolean;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function Select({
  value,
  onChange,
  options,
  placeholder = "Select an option...",
  className = "",
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value && !opt.isAction);

  // Close dropdown on click outside
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

  const handleSelect = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div
      className={`relative w-full text-left ${className}`}
      ref={containerRef}
    >
      {/* Custom Select Trigger Field */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 sm:py-2 text-sm bg-[#f5f4ef] border border-[#c4cbc5] text-[#161917] transition-all rounded-lg outline-none font-sans ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:border-[#2b4c33] focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] cursor-pointer"
        } ${isOpen ? "border-[#2b4c33] ring-1 ring-[#2b4c33]" : ""}`}
      >
        <span
          className={`truncate ${
            selectedOption && selectedOption.value !== ""
              ? "text-[#161917] font-medium"
              : "text-[#626a64]/70"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        {/* Custom Dropdown Arrow */}
        <ChevronDown
          className={`w-4 h-4 shrink-0 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#2b4c33]" : "text-[#626a64]"
          }`}
        />
      </button>

      {/* Custom Options Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 max-h-60 overflow-y-auto bg-[#f5f4ef] border border-[#c4cbc5] rounded-xl shadow-xl z-50 py-1.5 font-sans text-[#161917] animate-in fade-in duration-150">
          {options.length === 0 ? (
            <div className="px-3.5 py-2.5 text-xs text-[#626a64] text-center">
              No options available
            </div>
          ) : (
            options.map((option) => {
              const isSelected = option.value === value && !option.isAction;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={(e) => handleSelect(option.value, e)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 sm:py-2 text-sm text-left transition-colors cursor-pointer ${
                    option.isAction
                      ? "text-[#2b4c33] font-semibold border-t border-[#c4cbc5] mt-1 bg-[#d1ded3]/40 hover:bg-[#d1ded3]"
                      : isSelected
                        ? "bg-[#2b4c33] text-white font-semibold"
                        : "hover:bg-[#ededdf] text-[#161917]"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {option.icon}
                    <span className="truncate">{option.label}</span>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 shrink-0 ml-2 text-white" />
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
