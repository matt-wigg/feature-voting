import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";

export const metadata: Metadata = {
  title: "Feature Voting",
  description: "What to Build — Feature Voting System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <ReactQueryProvider>
          <div className="flex min-h-dvh flex-col">
            <header className="border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container mx-auto max-w-5xl flex h-14 sm:h-16 items-center justify-between px-4">
                <a href="/" className="font-semibold tracking-tight">
                  Feature Voting
                </a>
                <nav className="flex items-center gap-4 text-sm">
                  <a href="/dashboard/features" className="hover:underline">
                    Dashboard
                  </a>
                  <button className="text-muted-foreground text-xs" disabled>
                    Sign in
                  </button>
                </nav>
              </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t">
              <div className="container mx-auto max-w-5xl px-4 py-6 text-xs text-muted-foreground">
                Built with Next.js • shadcn/ui • Sonner
              </div>
            </footer>
          </div>
        </ReactQueryProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
