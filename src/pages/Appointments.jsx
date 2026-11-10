import { ArrowRight, CircleCheckBig, Clock, Copy, Globe, Mail, MessageSquare, Phone, TrendingUp, Users } from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import VideoDialog from "../components/VideoDialog.jsx";
import { Badge, Card, CardContent, CardHeader, CardTitle, SectionHeading, btn } from "../components/ui.jsx";
import { useCopy } from "../components/Toast.jsx";
import { CONTACT, VIDEOS, portal } from "../config.js";
import { LANGUAGE_COUNT } from "../data/languages.js";

const steps = [
  { icon: Users, title: "Enter Business Info", text: "Enter your business and user name to get started" },
  { icon: Phone, title: "Choose Your Number", text: "Choose a local or toll-free number for your business" },
  { icon: TrendingUp, title: "Top Up Account", text: "Add funds to your account for call credits" },
  { icon: MessageSquare, title: "Define Services", text: "Set up your services and what your AI can help with" },
  { icon: Clock, title: "Set Business Hours", text: "Configure your operating hours and availability" },
  { icon: CircleCheckBig, title: "You're All Set", text: "Your AI receptionist is ready to handle calls in 52+ languages" },
];

const features = [
  { icon: Clock, title: "Smart Appointment Booking", text: "AI schedules appointments directly into your calendar with conflict detection" },
  { icon: Phone, title: "24/7 Availability", text: "Never miss a call - your AI receptionist works around the clock" },
  { icon: Users, title: "Customer Information Capture", text: "Automatically collect and organize customer details and inquiries" },
  { icon: Globe, title: "Multi-Language Support", text: "Communicate with customers in 52+ languages automatically" },
  { icon: TrendingUp, title: "Call Analytics", text: "Track call volume, customer satisfaction, and business insights" },
  { icon: CircleCheckBig, title: "Easy Integration", text: "Works with your existing calendar, CRM, and business tools" },
];

const faqs = [
  ["What exactly am I paying for with the $20 starter pack?", "The $20 starter pack covers your phone number setup, first month's $10 platform fee, $10 in calling credits (equivalent to 40 calls), and complete AI configuration. After your first month, you'll pay $10/month platform fee plus $0.25 per call handled by your AI."],
  ["Are there any monthly minimums or contracts?", "No contracts or monthly minimums required. You only pay the $10/month platform fee and $0.25 for each call your AI successfully handles. You can cancel anytime."],
  ["What counts as a 'call' for billing purposes?", "You're only charged for calls where your AI successfully answers and engages with the caller. Missed calls, hang-ups before the AI responds, or calls that go to voicemail are not charged."],
  ["Can I have multiple phone numbers for different locations?", "Yes! Each additional phone number requires its own $20 setup fee and follows the same pricing structure. You can manage multiple locations from one dashboard."],
  ["What languages does the AI support?", "Our AI receptionist supports 52+ languages and automatically detects the caller's language to respond appropriately. This includes major languages like Spanish, French, Mandarin, Arabic, Portuguese, and many more."],
  ["How does the AI handle appointment booking?", "The AI integrates with your calendar system to check availability in real-time, book appointments, send confirmations, and handle rescheduling requests. It can also collect customer information during the booking process."],
  ["What happens if the AI can't handle a call?", "If the AI determines a call requires human intervention, it can transfer the call to you or take a detailed message. You have full control over when transfers should happen based on your business needs."],
  ["Is there a setup fee for additional features?", "No additional setup fees. All features including multi-language support, appointment booking, customer data collection, and analytics are included in the platform fee."],
  ["How do I get started?", "Click 'Get Started for $20' to create your account, choose your phone number, and configure your AI receptionist. The process takes about 10-15 minutes and your AI will be ready to handle calls immediately."],
];

const Check = ({ children }) => (
  <li className="flex items-center">
    <CircleCheckBig className="h-5 w-5 text-green-500 mr-3" />
    <span>{children}</span>
  </li>
);

export default function Appointments() {
  const copy = useCopy();
  const onboarding = portal("/onboarding");
  const bigCta =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium h-11 bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <Header
        tagline="Polydial Appointments"
        links={[
          { label: "Features", href: "#features" },
          { label: "Languages", to: "/languages" },
          { label: "Pricing", href: "#pricing" },
          { label: "About", href: "#about" },
          { label: "Contact", href: "#contact" },
          { label: "FAQ", href: "#faq" },
        ]}
        cta={{ label: "Get Started", href: onboarding }}
      />

      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight pb-2">
              Polydial Appointments
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-700 mb-6 leading-relaxed">
              Your 24/7 AI Receptionist - Start Today for $20
            </h2>
            <div className="text-lg md:text-xl text-blue-600 font-semibold mb-8 max-w-4xl mx-auto">
              Best for: Barbers, Salons, Consultants, Tutors, and any professional who schedules appointments.
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Handle appointments, customer service, and business calls in any language with our AI receptionist. Get
              started with our $20 starter pack, then pay just $10/month + $0.25 per call.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
              <a href={onboarding} className={`${bigCta} transform hover:scale-105`}>
                Get Started for $20
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Set up your AI receptionist in minutes and start handling calls automatically
            </p>
            <div className="flex justify-center mb-12">
              <VideoDialog
                label="Watch Setup Demo"
                title="PolyDial Appointments Setup Demo"
                description="Follow along as we walk through the complete setup process step by step"
                src={VIDEOS.appointmentsSetup}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <Card key={title} className="text-center hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                    <div className="text-blue-600">
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{i + 1}</div>
                  <CardTitle className="text-xl mb-3">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Speak Every Customer's Language</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Our AI receptionist automatically detects and responds in your customer's preferred language
            </p>
            <div className="flex justify-center mb-12">
              <span>{LANGUAGE_COUNT}+</span>
            </div>
            <div className="flex justify-center mb-8">
              <VideoDialog
                label="Watch Multilingual Demo"
                title="Multilingual AI Receptionist Demo"
                description="See how our AI automatically handles calls in different languages"
                src={VIDEOS.multilingual}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Everything You Need" subtitle="Powerful features to handle all your business calls" subClass="" />
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, text }) => (
              <Card key={title} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="mb-4 p-3 bg-blue-100 rounded-full w-fit">
                    <div className="text-blue-600">
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-3">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Simple, Fair Pricing" subtitle="No contracts, no hidden fees. Pay only for what you use." />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-lg bg-card text-card-foreground shadow-sm relative border-2 border-blue-500 hover:shadow-xl transition-shadow duration-200">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="border-transparent bg-blue-600 text-white px-4 py-1">Get Started</Badge>
              </div>
              <CardHeader className="text-center pt-8">
                <div className="tracking-tight text-2xl font-bold text-gray-900">Starter Pack</div>
                <div className="text-4xl font-bold text-blue-600 mt-4">$20</div>
                <p className="text-gray-600 mt-2">One-time setup</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <Check>Phone number setup</Check>
                  <Check>First month platform fee included</Check>
                  <Check>$10 calling credit included</Check>
                  <Check>AI setup and configuration</Check>
                </ul>
                <a href={onboarding} className={`${btn.primary} w-full mt-6`}>
                  Get Started Now
                </a>
              </CardContent>
            </div>
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="text-center">
                <div className="tracking-tight text-2xl font-bold text-gray-900">Ongoing Usage</div>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  $10<span className="text-lg text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mt-2">Platform fee</p>
                <div className="text-2xl font-bold text-gray-900 mt-4">
                  +$0.25<span className="text-lg text-gray-600">/call</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <Check>Unlimited call minutes</Check>
                  <Check>52+ languages supported</Check>
                  <Check>Advanced analytics</Check>
                  <Check>24/7 AI availability</Check>
                </ul>
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Only pay for calls your AI actually handles. No charges for missed calls or hang-ups.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="space-y-8">
            {faqs.map(([q, a]) => (
              <Card key={q} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">{q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">About Polydial Appointments</h2>
          <p className="text-xl text-gray-600 mb-8">
            Polydial Appointments is designed specifically for professionals who need reliable appointment booking and
            customer communication. Our AI receptionist speaks every language and helps you serve clients globally with
            intelligent, automated phone support.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              ["24/7", "Always Available", "Your AI receptionist never sleeps, ensuring every call is answered professionally."],
              ["52+", "Languages Supported", "Communicate naturally with customers worldwide in their preferred language."],
              ["$0.25", "Per Call", "Transparent pricing with no hidden fees - pay only for calls handled by AI."],
            ].map(([v, t, d]) => (
              <Card key={t} className="text-center">
                <CardHeader>
                  <div className="text-3xl font-bold text-blue-600">{v}</div>
                  <div className="text-2xl font-semibold leading-none tracking-tight">{t}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Contact Us" subtitle="Have questions? We're here to help you get started." subClass="" />
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Mail, title: "Email Support", text: "Get in touch with our support team for any questions or assistance.", value: CONTACT.supportEmail, what: "Email address" },
              { icon: Phone, title: "Phone Support", text: "Call us directly for immediate assistance with your account or setup.", value: CONTACT.phone, what: "Phone number" },
            ].map(({ icon: Icon, title, text, value, what }) => (
              <Card key={title}>
                <CardHeader>
                  <div className="text-2xl font-semibold leading-none tracking-tight flex items-center">
                    <Icon className="mr-2 h-5 w-5" />
                    {title}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{text}</p>
                  <div className="flex items-center space-x-2">
                    <code className="bg-gray-100 px-3 py-1 rounded text-sm">{value}</code>
                    <button className={btn.outlineSm} onClick={() => copy(value, what)} aria-label={`Copy ${what}`}>
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-8">Ready to transform your business communications?</p>
            <a href={onboarding} className={bigCta}>
              Start Your 24/7 AI Receptionist
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
