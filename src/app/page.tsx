import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    title: 'Create',
    description: 'Record audio directly in your browser with professional-grade quality.',
    href: '/create',
  },
  {
    title: 'Remix',
    description: 'Edit and remix your recordings with an intuitive interface.',
    href: '/remix',
  },
  {
    title: 'Share',
    description: 'Share your creations instantly with a global audience.',
    href: '/explore',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-16 px-4">
      <section className="flex flex-col items-center text-center max-w-[85ch]">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          Create. Remix. Share.
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-[42rem] leading-relaxed">
          Your audio creation studio in the browser. Record, remix, and share your sound with the world.
        </p>
        <div className="mt-8 flex gap-4">
          <Button asChild size="lg">
            <Link href="/create">Start Creating</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/explore">Explore Sounds</Link>
          </Button>
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="px-0">
                  <Link href={feature.href}>
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
