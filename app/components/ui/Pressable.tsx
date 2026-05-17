"use client";

import { type ReactNode } from "react";

interface PressableProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export function Pressable({ children, className = "", scale = 0.97 }: PressableProps) {
  return (
    <span
      className={`inline-block transition-transform duration-150 ease-out ${className}`}
      style={{ transformOrigin: "center" }}
    >
      <span className="block" style={{ transformOrigin: "center" }}>
        <span
          className="block transition-transform duration-150 ease-out active:scale-[var(--press-scale)]"
          style={{ "--press-scale": scale } as React.CSSProperties}
        >
          {children}
        </span>
      </span>
    </span>
  );
}

export function PressableLink({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block transition-transform duration-150 ease-out active:scale-[0.97]">
      {children}
    </span>
  );
}
