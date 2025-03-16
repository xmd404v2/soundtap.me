'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Create', href: '/create' },
  { name: 'Remix', href: '/remix' },
  { name: 'Explore', href: '/explore' },
]

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  SoundTap
                </span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-foreground ${
                      pathname === item.href 
                        ? 'text-foreground' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-screen-xl">
          {children}
        </div>
      </main>

      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Link href="/" className="flex items-center">
                <span className="text-lg font-bold">
                  SoundTap
                </span>
              </Link>
              <p className="text-sm text-muted-foreground text-center md:text-left">
                Create, remix, and share your audio creations with the world.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-4">
              <nav className="flex items-center gap-6">
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </nav>
              <p className="text-sm text-muted-foreground">
                © 2024 SoundTap. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  )
} 