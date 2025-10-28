import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const testimonials = [
  {
    quote: "This builder made creating my portfolio effortless and polished.",
    name: "Alex Rivera",
    role: "Product Designer"
  },
  {
    quote: "I launched a client-ready site in a single afternoon—game changer.",
    name: "Morgan Blake",
    role: "Freelance Developer"
  },
  {
    quote: "The responsive templates impressed every stakeholder on our team.",
    name: "Jamie Lee",
    role: "Creative Director"
  }
]

export function Testimonials() {
  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.name} className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{testimonial.name}</CardTitle>
              <CardDescription>{testimonial.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">“{testimonial.quote}”</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
