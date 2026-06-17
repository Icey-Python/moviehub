"use client";

import { useState, useRef, useEffect } from "react";
import { IconChevronDown } from "@tabler/icons-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function Select({ value, onValueChange, options, className = "", placeholder, disabled = false }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`carousel-dot w-full h-7 xs:h-8 sm:h-9 px-2 xs:px-3 rounded-lg text-[10px] xs:text-xs font-medium bg-background-elevated/80 border border-border/50 text-foreground focus:outline-none focus:ring-1 focus:ring-accent flex items-center justify-between transition-colors ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:border-accent/50"
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={placeholder || "Select"}
      >
        <span className="truncate pr-6">
          {selectedOption?.label || placeholder || "Select"}
        </span>
        <IconChevronDown className={`w-3.5 h-3.5 xs:w-4 xs:h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} stroke={2} />
      </button>

      {isOpen && !disabled && (
        <div className="absolute right-0 top-full mt-1.5 z-50 w-full min-w-[180px] glass rounded-xl border border-border/50 shadow-lg overflow-hidden">
          <ul className="py-1.5 max-h-60 overflow-y-auto" role="listbox">
            {options.map((option) => (
              <li key={option.value} role="option" aria-selected={option.value === value}>
                <button
                  type="button"
                  onClick={() => {
                    onValueChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-[10px] xs:text-xs text-left transition-colors ${
                    option.value === value
                      ? "bg-accent/20 text-accent font-medium"
                      : "text-foreground-secondary hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}