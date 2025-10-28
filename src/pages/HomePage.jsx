import { Hero } from "@/components/sections/Hero"
import { Features } from "@/components/sections/Features"
import { ContactForm } from "@/components/sections/ContactForm"
import { Footer } from "@/components/sections/Footer"

export function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <ContactForm />
      <Footer />
    </>
  )
}