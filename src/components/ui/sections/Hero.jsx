import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-5xl font-bold mb-6">
        Build Beautiful Portfolios Fast
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Your tagline goes here
      </p>
      <div className="flex gap-4 justify-center">
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">View Work</Button>
      </div>
    </section>
  )
}