import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, CircleCheckBig, Stethoscope, UtensilsCrossed } from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ContactSection from "../components/ContactSection.jsx";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "../components/ui.jsx";
import { portal } from "../config.js";

const solutions = [
  {
    id: "appointments",
    title: "Polydial Appointments",
    description: "Automate your bookings and scheduling with a 24/7 AI receptionist.",
    icon: Calendar,
    href: "/appointments",
    available: true,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "orders",
    title: "Polydial Orders",
    description: "Capture every takeout order, even during the dinner rush, and stop paying high commissions.",
    icon: UtensilsCrossed,
    href: "/orders",
    available: true,
    color: "from-green-500 to-green-600",
  },
  {
    id: "health",
    title: "Polydial Health",
    description: "Manage patient intake and book appointments with a HIPAA-compliant AI agent.",
    icon: Stethoscope,
    available: false,
    color: "from-gray-400 to-gray-500",
  },
];

const stats = [
  { value: "24/7", title: "Always Available", text: "Your AI agent never sleeps, ensuring every call is answered professionally." },
  { value: "52+", title: "Languages Supported", text: "Communicate naturally with customers worldwide in their preferred language." },
  { value: "∞", title: "Industry Specialized", text: "Each solution is tailored to your specific business needs and workflows." },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <Header
        logoLinks={false}
        tagline="AI Voice Agents for Every Business"
        solutions
        links={[
          { label: "About", href: "#about" },
          { label: "Languages", to: "/languages" },
          { label: "Contact", href: "#contact" },
        ]}
        cta={{ label: "Login to Portal", href: portal("/login") }}
      />

      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
              An AI Voice Agent for Every Business
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              From booking appointments to taking takeout orders, Polydial provides a specialized AI agent that answers
              every call, delights your customers, and grows your revenue.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find the Right Solution for Your Business</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the AI voice agent that fits your industry and watch your business grow
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {solutions.map(({ id, title, description, icon: Icon, href, available, color }) => (
              <Card
                key={id}
                onClick={() => available && navigate(href)}
                className={`group relative overflow-hidden transition-all duration-200 transform hover:scale-105 ${
                  available
                    ? "cursor-pointer hover:shadow-xl border-2 hover:border-blue-300"
                    : "cursor-not-allowed opacity-60"
                }`}
              >
                {!available && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="border-transparent bg-gray-200 text-gray-600">Coming Soon</Badge>
                  </div>
                )}
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`} />
                <CardHeader className="relative z-10 pb-4">
                  <div className={`mb-4 p-3 rounded-full w-fit bg-gradient-to-br ${color} text-white shadow-lg`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl mb-3 text-gray-900">{title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
                  <div className="flex items-center justify-between">
                    {available ? (
                      <div className="flex items-center text-blue-600 font-medium">
                        <span>Learn More</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-400 font-medium">
                        <span>Notify Me</span>
                        <CircleCheckBig className="ml-2 h-4 w-4" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Why Choose PolyDial?</h2>
          <p className="text-xl text-gray-600 mb-12">
            We're building the future of business communication with AI that speaks every language and understands every
            industry.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {stats.map((s) => (
              <Card key={s.title} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{s.value}</div>
                  <div className="text-2xl font-semibold leading-none tracking-tight">{s.title}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{s.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
