import React from "react";

export default function Home() {
  return (
    <div className="w-full flex min-h-screen flex-col">
      {/* Features Section */}
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-500">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Everything You Need to Succeed
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl">
                Our platform provides all the tools you need to streamline your
                workflow and boost productivity.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Powerful Analytics",
                description:
                  "Gain valuable insights with our advanced analytics tools.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-rose-500"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                ),
              },
              {
                title: "Secure Platform",
                description:
                  "Your data is protected with enterprise-grade security.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-rose-500"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
              },
              {
                title: "24/7 Support",
                description: "Our dedicated team is always ready to help you.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-rose-500"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                ),
              },
              {
                title: "Easy Integration",
                description:
                  "Seamlessly connect with your favorite tools and services.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-rose-500"
                  >
                    <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ),
              },
              {
                title: "Automated Workflows",
                description:
                  "Save time with our intelligent automation features.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-rose-500"
                  >
                    <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
                    <path d="M2 20h20" />
                    <path d="M14 12v.01" />
                  </svg>
                ),
              },
              {
                title: "Scalable Solution",
                description:
                  "Grow your business without worrying about limitations.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-rose-500"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm"
              >
                {feature.icon}
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-center text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-500">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                What Our Customers Say
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl">
                Don't just take our word for it. Here's what our customers have
                to say about our platform.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "This platform has completely transformed how we operate. The analytics tools are incredible!",
                author: "Sarah Johnson",
                role: "CEO, TechStart",
              },
              {
                quote:
                  "The customer support is unmatched. They're always there when we need them, day or night.",
                author: "Michael Chen",
                role: "CTO, GrowthLabs",
              },
              {
                quote:
                  "We've seen a 40% increase in productivity since implementing this solution. Highly recommend!",
                author: "Emily Rodriguez",
                role: "Operations Manager, Innovate Inc",
              },
              {
                quote:
                  "The integration capabilities are seamless. It works perfectly with all our existing tools.",
                author: "David Kim",
                role: "IT Director, FutureTech",
              },
              {
                quote:
                  "This platform scales with our business. As we've grown, it's grown with us without any issues.",
                author: "Lisa Thompson",
                role: "Founder, ScaleUp",
              },
              {
                quote:
                  "The automated workflows have saved us countless hours. It's been a game-changer for our team.",
                author: "James Wilson",
                role: "Project Manager, Efficiency Co",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col justify-between space-y-4 rounded-lg border bg-white p-6 shadow-sm"
              >
                <p className="text-gray-500">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-500">
                FAQ
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl">
                Find answers to common questions about our platform.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl space-y-4 py-12">
            {[
              {
                question: "How does the 14-day free trial work?",
                answer:
                  "Our 14-day free trial gives you full access to all features of the platform. No credit card required. At the end of the trial, you can choose to subscribe to one of our plans or your account will automatically downgrade to the free tier.",
              },
              {
                question: "Can I change my plan later?",
                answer:
                  "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new rate will be prorated for the remainder of your billing cycle. If you downgrade, the new rate will take effect at the start of your next billing cycle.",
              },
              {
                question: "Is there a setup fee?",
                answer:
                  "No, there are no setup fees for any of our plans. You only pay the monthly or annual subscription fee for your chosen plan.",
              },
              {
                question: "Do you offer discounts for non-profits?",
                answer:
                  "Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information.",
              },
              {
                question: "How secure is your platform?",
                answer:
                  "Security is our top priority. We use industry-standard encryption, regular security audits, and follow best practices to ensure your data is safe. Our platform is SOC 2 Type II compliant.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold">{faq.question}</h3>
                <p className="mt-2 text-gray-500">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-rose-500 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to Transform Your Business?
              </h2>
              <p className="max-w-[900px] md:text-xl">
                Join thousands of satisfied customers who have taken their
                business to the next level.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <button className="rounded-md bg-white px-4 py-2 text-sm font-medium text-rose-500 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500">
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 inline-block h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
              <button className="rounded-md border border-white bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Stay Updated
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Subscribe to our newsletter to get the latest updates, news,
                  and special offers.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <form className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                <button
                  type="submit"
                  className="rounded-md bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                >
                  Subscribe
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 inline-block h-4 w-4"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </form>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-white py-6 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-rose-500"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <span>Acme Inc</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Transforming businesses with innovative solutions since 2010.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-sm font-medium">Product</h3>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Features
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Pricing
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Integrations
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Changelog
              </a>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-sm font-medium">Company</h3>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                About
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Blog
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Careers
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Contact
              </a>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-sm font-medium">Legal</h3>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Cookies
              </a>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Licenses
              </a>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
            <p className="mb-4 text-center text-sm text-gray-500 md:mb-0 md:text-left">
              &copy; {new Date().getFullYear()} Acme Inc. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
