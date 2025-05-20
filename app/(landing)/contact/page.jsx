import NextImage from "next/image"
import { Mail, MapPin, Phone, CheckCircle } from "lucide-react"
import { Card, CardBody, Link, Button, Input, Textarea } from "@heroui/react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Contact our Friendly Team</h1>
        <p className="text-slate-600">Let us know how can we help.</p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card>
          <CardBody className="flex flex-col items-center p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="font-medium text-slate-800 mb-1">Chat to support</h3>
            <p className="text-sm text-slate-500 mb-2">We are here to help.</p>
            <Link href="mailto:support@example.com" className="text-sm text-blue-500">
              support@example.com
            </Link>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-col items-center p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="font-medium text-slate-800 mb-1">Visit Us</h3>
            <p className="text-sm text-slate-500 mb-2">Visit our office.</p>
            <span className="text-sm text-blue-500">Phoenix Park</span>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-col items-center p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="font-medium text-slate-800 mb-1">Contact us</h3>
            <p className="text-sm text-slate-500 mb-2">Mon-Fri from 8 AM-5 PM.</p>
            <Link href="tel:+1555-123-4567" className="text-sm text-blue-500">
              +1 (555) 123-4567
            </Link>
          </CardBody>
        </Card>
      </div>

      {/* Get In Touch Section */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Get In Touch with Us</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm">
          Get in touch to discuss how we can help you enhance your work and provide solutions tailored to your needs
          about our services.
        </p>
      </div>

      {/* Contact Form and Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card className="bg-slate-50">
          <CardBody className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-800">Have Questions? We're Just a Message Away!</h3>
              <p className="text-sm text-slate-600">
                Fill out the form below and one of our team members will get back to you shortly.
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Your Name
                </label>
                <Input id="name" placeholder="Your name" className="w-full bg-white" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <Input id="phone" type="tel" placeholder="(555) 123-4567" className="w-full bg-white" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="Email address" className="w-full bg-white" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message here" className="w-full min-h-[120px] bg-white" />
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Send Message
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Features */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <NextImage
              src="/placeholder.svg?height=200&width=200"
              alt="Customer Support"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>

          <div className="space-y-6">
            <FeatureItem
              icon={<CheckCircle className="h-5 w-5 text-blue-500" />}
              title="Task Management"
              description="Track tasks and get things done with clarity."
            />

            <FeatureItem
              icon={<CheckCircle className="h-5 w-5 text-blue-500" />}
              title="Calendar & Scheduling"
              description="Stay on top of your schedule with a personalized calendar."
            />

            <FeatureItem
              icon={<CheckCircle className="h-5 w-5 text-blue-500" />}
              title="Document Collaboration"
              description="Work on files, folders, and documents without leaving the platform."
            />

            <FeatureItem
              icon={<CheckCircle className="h-5 w-5 text-blue-500" />}
              title="Notification & Team Communication"
              description="Keep everyone aligned and in sync."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">{icon}</div>
      <div>
        <h4 className="font-medium text-slate-800 mb-1">{title}</h4>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  )
}
