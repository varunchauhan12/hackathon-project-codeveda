import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-amber-50 to-green-100">
        {/* Nature-inspired decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-amber-400 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
        </div>

        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

        <div className="relative flex items-center justify-center min-h-screen py-10 px-4">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}