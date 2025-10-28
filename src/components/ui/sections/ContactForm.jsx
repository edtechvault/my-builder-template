import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactForm() {
  return (
    <section className="container mx-auto px-4 py-20 max-w-xl">
      <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
      <form className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Your message" rows={5} />
        </div>
        <Button type="submit" className="w-full">Send Message</Button>
      </form>
    </section>
  )
}