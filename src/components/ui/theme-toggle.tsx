"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Sun, Moon, Laptop, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  if (!mounted) return null;

  const Icon =
    (resolvedTheme === "light" && Sun) ||
    (resolvedTheme === "dark" && Moon) ||
    Laptop;

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="outline"
        size="sm"
        className="h-9 rounded-lg flex items-center gap-1 opacity-60 hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        title="Alterar tema"
        aria-label="Alterar tema"
      >
        <Icon className="h-4 w-4" />
        <ChevronDown className="h-3 w-3" />
      </Button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-44 rounded-md border bg-white shadow-lg
                     dark:bg-neutral-900 dark:border-neutral-800 p-1 z-50"
        >
          <MenuItem onClick={() => setTheme("light")} active={theme === "light"}>
            <span className="flex items-center gap-2">
              <Sun className="h-4 w-4" /> Claro
            </span>
          </MenuItem>

          <MenuItem onClick={() => setTheme("dark")} active={theme === "dark"}>
            <span className="flex items-center gap-2">
              <Moon className="h-4 w-4" /> Escuro
            </span>
          </MenuItem>

          <MenuItem onClick={() => setTheme("system")} active={theme === "system"}>
            <span className="flex items-center gap-2">
              <Laptop className="h-4 w-4" /> Sistema
            </span>
          </MenuItem>
        </div>
      )}
    </div>
  );
}

function MenuItem({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm
                 hover:bg-neutral-100 dark:hover:bg-neutral-800"
    >
      {children}
      {active && <Check className="h-4 w-4" />}
    </button>
  );
}

