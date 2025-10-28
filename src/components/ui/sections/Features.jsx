import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function Features() {
  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fast Setup</CardTitle>
            <CardDescription>Get started in minutes</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Responsive</CardTitle>
            <CardDescription>Works on all devices</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customizable</CardTitle>
            <CardDescription>Make it yours</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  )
}