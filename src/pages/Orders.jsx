import { useState } from "react";
import {
  ArrowRight, ChartColumn, ChevronDown, CircleCheckBig, Clock, Globe, Headphones, Phone, Play, Shield, Star,
  TrendingUp, Users, Zap,
} from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ContactSection from "../components/ContactSection.jsx";
import Video from "../components/Video.jsx";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "../components/ui.jsx";
import { VIDEOS } from "../config.js";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const features = [
  { icon: Zap, color: "bg-yellow-100 text-yellow-600", title: "5-Minute Setup", text: "Sync your menu from Clover, select a phone number, and go live instantly. No technical setup, no waiting period." },
  { icon: Users, color: "bg-blue-100 text-blue-600", title: "Human-Like AI Voice", text: "Your customers won't know they're talking to AI. Natural conversations, accurate order taking, and friendly service every time." },
  { icon: Phone, color: "bg-green-100 text-green-600", title: "Never Miss a Call", text: "Handle unlimited simultaneous calls during rush hours. No more busy signals or missed orders." },
  { icon: Clock, color: "bg-purple-100 text-purple-600", title: "24/7 Availability", text: "Take orders before opening, after closing, and during staff breaks. Your AI never sleeps." },
  { icon: ArrowRight, color: "bg-indigo-100 text-indigo-600", title: "Automatic Menu Sync", text: "Your menu updates automatically from Clover. Add items, change prices, mark items out of stock—it all syncs in real-time." },
  { icon: Globe, color: "bg-pink-100 text-pink-600", title: "Multilingual Support", text: "Serve customers in 35 languages including Spanish, French, Chinese, and more. Plus 17 additional languages coming soon. (Professional & Enterprise)" },
  { icon: ChartColumn, color: "bg-orange-100 text-orange-600", title: "Real-Time Analytics", text: "Track call volume, order patterns, peak hours, and revenue. Make data-driven decisions." },
  { icon: Shield, color: "bg-teal-100 text-teal-600", title: "Grace Buffer Included", text: "Your first 25/50/100 overage calls are always free. We understand restaurants have busy days." },
  { icon: Headphones, color: "bg-red-100 text-red-600", title: "Dedicated Support", text: "Email support on Essential, priority support on Professional, and 24/7 phone support on Enterprise tiers." },
];

const plans = [
  {
    name: "Essential", monthly: 199, annual: 2030, annualFull: 2388,
    description: "Perfect for small restaurants just getting started",
    calls: "500 calls/month", perDay: "~17 calls/day", grace: "25 grace buffer calls (free)",
    features: ["1 phone number included", "Standard AI voice capabilities", "Clover POS integration", "Email support", "Real-time dashboard", "Additional calls: $0.50 each", "Additional phone numbers: $10/month each"],
    cta: "Start Free Trial",
  },
  {
    name: "Professional", monthly: 549, annual: 5600, annualFull: 6588, popular: true,
    description: "Most popular for growing restaurants",
    calls: "2,000 calls/month", perDay: "~67 calls/day", grace: "50 grace buffer calls (free)",
    features: ["1 phone number included", "Advanced human-like AI voice", "Clover POS integration", "Multilingual support (35 languages available, 17 coming soon)", "Priority email/chat support", "Advanced analytics", "Custom menu training", "Additional calls: $0.50 each", "Additional phone numbers: $10/month each"],
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise", monthly: 1599, annual: 16320, annualFull: 19188,
    description: "For high-volume and multi-location restaurants",
    calls: "6,000 calls/month", perDay: "~200 calls/day", grace: "100 grace buffer calls (free)",
    features: ["1 phone number included", "Custom AI voice training", "Clover POS integration", "Multi-location dashboard", "Dedicated account manager", "24/7 priority phone support", "99.9% uptime SLA", "Quarterly business reviews", "API access", "Additional calls: $0.50 each", "Additional phone numbers: $10/month each"],
    cta: "Schedule Demo",
  },
];

const faqs = [
  ["How many calls can I handle simultaneously?", "Unlimited. Unlike human staff, our AI can handle as many calls as you receive at the same time, so you'll never get a busy signal during rush hours."],
  ["What if I go over my call limit?", "Your first 25/50/100 overage calls are free (depending on tier). After that, it's just $0.50 per call. You can upgrade anytime to a higher tier."],
  ["How do I handle multiple locations?", "Each location is set up as a separate merchant in Clover with its own PolyDial subscription. This ensures each location has its own menu, phone number, and analytics. Contact us for multi-location pricing."],
  ["What POS systems do you integrate with?", "Currently Clover is fully available. Square and Toast integrations are coming soon. Contact us for custom integrations."],
  ["How long does setup take?", "Setup takes just 5 minutes! Your menu syncs automatically from Clover in a few minutes, select your phone number, and you're live instantly. No waiting, no technical setup required."],
  ["How do I select my pricing tier?", "Pricing tiers are selected and managed directly through your Clover dashboard. Simply choose the plan that fits your call volume and you're all set."],
  ["Can I cancel anytime?", "Yes, no long-term contracts. Cancel anytime with 30 days notice."],
  ["Do you offer a free trial?", "Yes! 14-day free trial on the Professional tier. No credit card required."],
  ["What languages are supported?", "Professional and Enterprise tiers include multilingual support with 35 languages currently available (including Spanish, French, Chinese, and more), plus 17 additional languages coming soon. This allows you to serve a broader customer base effortlessly."],
];

function Faq() {
  const [open, setOpen] = useState(null);
  return (
    <div className="w-full">
      {faqs.map(([q, a], i) => (
        <div key={q} className="border-b">
          <h3 className="flex">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex flex-1 items-center justify-between py-4 transition-all hover:underline text-left text-lg font-semibold"
            >
              {q}
              <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
            </button>
          </h3>
          {open === i && (
            <div className="overflow-hidden text-sm">
              <div className="pb-4 pt-0 text-gray-600 text-base">{a}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const pill = "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium h-11 text-lg rounded-full transition-all duration-200";

export default function Orders() {
  const [billing, setBilling] = useState("monthly");
  const annual = billing === "annual";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <Header
        solutions
        chevron
        links={[
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Demo", href: "#demo" },
          { label: "FAQ", href: "#faq" },
          { label: "Contact", href: "#contact" },
        ]}
        cta={{ label: "Start Free Trial", href: "#pricing", hideOnMobile: true }}
      />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent leading-tight pb-2">
              AI Phone Ordering That Saves You Thousands Every Month
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
              Automate your phone orders, never miss a call, and recover labor costs starting day one. No setup fees, no
              long-term contracts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollTo("pricing")}
                className={`${pill} bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 shadow-lg hover:shadow-xl transform hover:scale-105`}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => scrollTo("demo")}
                className={`${pill} bg-background px-8 py-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-50`}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo Video
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-500">14-day free trial • No credit card required</p>
          </div>
          <div className="max-w-5xl mx-auto mt-12">
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <Video src={VIDEOS.cloverDemo} />
            </div>
            <p className="text-center mt-4 text-gray-600">Watch how PolyDial integrates seamlessly with Clover POS</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Save Money, Make Money</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">Positive ROI from Day One</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-12">
            {[
              { icon: Users, title: "Labor Savings", value: "$39,726", sub: "average savings", text: "Never pay staff to answer phones again. Our AI handles orders 24/7 with no breaks, no sick days, no turnover." },
              { icon: TrendingUp, title: "Revenue Recovery", value: "$118,625", sub: "average recovery", text: "Capture every call, even during rush hours. Never lose another order to a busy signal or missed call." },
            ].map(({ icon: Icon, title, value, sub, text }) => (
              <div key={title} className="rounded-lg border shadow-sm bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-white/20 rounded-full w-fit">
                    <Icon className="h-10 w-10" />
                  </div>
                  <div className="tracking-tight text-3xl font-bold mb-2">{title}</div>
                  <div className="text-5xl font-black mt-4">
                    {value}
                    <span className="text-2xl font-normal">/year</span>
                  </div>
                  <p className="text-blue-100 mt-2">{sub}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-lg text-blue-50">{text}</p>
                </CardContent>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <CircleCheckBig className="h-8 w-8 mr-4 shrink-0" />
              <div className="text-left">
                <div className="text-2xl font-bold">Positive ROI from Day One</div>
                <div className="text-blue-100 mt-1">
                  Professional tier at $549/month saves you $3,310/month in labor costs alone. That's 6x return on your
                  subscription.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">POS Integrations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI seamlessly integrates with your existing POS system to process orders automatically
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-lg bg-card text-card-foreground shadow-sm border-2 border-green-500">
              <CardHeader className="text-center">
                <Badge className="border-transparent bg-green-600 text-white mb-4 mx-auto w-fit">Currently Available</Badge>
                <CardTitle className="text-2xl">Clover POS</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex justify-center mb-4">
                  <CircleCheckBig className="h-16 w-16 text-green-500" />
                </div>
                <p className="text-gray-600">
                  Full integration available now with automatic menu sync, real-time order processing, and seamless payment
                  handling.
                </p>
              </CardContent>
            </div>
            <Card>
              <CardHeader className="text-center">
                <Badge className="text-foreground mb-4 mx-auto w-fit">Coming Soon</Badge>
                <CardTitle className="text-2xl">Square &amp; Toast</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex justify-center gap-4 mb-4">
                  <Clock className="h-16 w-16 text-gray-400" />
                </div>
                <p className="text-gray-600">
                  Square and Toast integrations are in development. More integrations coming soon based on customer demand.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Restaurants Choose PolyDial</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to automate phone orders and grow your business
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, color, title, text }) => (
              <Card key={title} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className={`p-3 rounded-full w-fit mb-4 ${color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl mb-2">{title}</CardTitle>
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
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose the plan that fits your call volume. All plans include grace buffer calls and can be upgraded anytime.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-lg ${!annual ? "font-bold text-gray-900" : "text-gray-500"}`}>Monthly</span>
              <button
                onClick={() => setBilling(annual ? "monthly" : "annual")}
                role="switch"
                aria-checked={annual}
                aria-label="Toggle annual billing"
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${annual ? "bg-blue-600" : "bg-gray-300"}`}
              >
                <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${annual ? "translate-x-7" : "translate-x-1"}`} />
              </button>
              <span className={`text-lg ${annual ? "font-bold text-gray-900" : "text-gray-500"}`}>
                Annual
                <Badge className="ml-2 border-transparent bg-green-600 text-white">Save 15%</Badge>
              </span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-lg bg-card text-card-foreground relative hover:shadow-lg transition-shadow duration-200 ${
                  p.popular ? "border-2 border-blue-600 shadow-xl" : "border shadow-sm"
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="border-transparent bg-blue-600 text-white px-6 py-1 text-sm">
                      <Star className="h-3 w-3 inline mr-1" />
                      MOST POPULAR
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <div className="tracking-tight text-2xl font-bold mb-2">{p.name}</div>
                  <div className="text-muted-foreground text-sm mb-4">{p.description}</div>
                  <div className="mb-4">
                    <div className="text-5xl font-bold text-gray-900">
                      ${annual ? p.annual : p.monthly}
                      <span className="text-lg font-normal text-gray-500">/{annual ? "yr" : "mo"}</span>
                    </div>
                    {annual && <div className="text-sm text-gray-500 line-through mt-1">${p.annualFull}/yr</div>}
                  </div>
                  <div className="space-y-1 mb-4">
                    <div className="text-lg font-semibold text-gray-900">{p.calls}</div>
                    <div className="text-sm text-gray-500">{p.perDay}</div>
                    <div className="text-sm text-green-600 font-medium">{p.grace}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start">
                        <CircleCheckBig className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollTo("contact")}
                    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full text-white ${
                      p.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"
                    }`}
                  >
                    {p.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </CardContent>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-sm text-gray-500">
              All plans include unlimited simultaneous calls • Pricing tiers are managed through your Clover dashboard
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Install from Clover App Market</h3>
          <a
            href="https://www.clover.com/global-developer/coming-soon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <div className="inline-flex items-center gap-3 bg-white border-2 border-gray-300 rounded-lg px-8 py-4 hover:shadow-lg transition-shadow">
              <CircleCheckBig className="h-8 w-8 text-green-600" />
              <span className="text-xl font-semibold text-gray-900">Get PolyDial on Clover App Market</span>
            </div>
          </a>
        </div>
      </section>

      <section id="demo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">See PolyDial in Action</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how our AI handles real restaurant orders, from simple pickups to complex customizations
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              { src: VIDEOS.multilingual, title: "Multilingual Support", text: "Serve customers in 35 languages with natural, human-like conversations" },
              { src: VIDEOS.callForwarding, title: "Smart Call Forwarding", text: "Seamlessly forward calls when needed while AI handles routine orders" },
            ].map((v) => (
              <div key={v.title}>
                <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-xl mb-4">
                  <Video src={v.src} />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-600">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about PolyDial</p>
          </div>
          <Faq />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Automate Your Phone Orders?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">Start your 14-day free trial today. No credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => scrollTo("pricing")} className={`${pill} bg-white text-blue-600 hover:bg-gray-100 px-10 py-6 shadow-lg`}>
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button onClick={() => scrollTo("contact")} className={`${pill} bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-6`}>
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
