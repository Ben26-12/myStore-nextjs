"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out h-header-height flex items-center",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2 translate-y-0"
          : "bg-transparent py-4 -translate-y-1",
      )}
    >
      {children}
    </header>
  );
}
