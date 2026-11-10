import { Copy, Mail, Phone } from "lucide-react";
import { Card, CardContent, btn } from "./ui.jsx";
import { useCopy } from "./Toast.jsx";
import { CONTACT } from "../config.js";

// The "Contact Us" block shared by the home and Orders pages.
export default function ContactSection() {
  const copy = useCopy();
  const items = [
    {
      icon: Mail,
      title: "Sales & Demos",
      text: "Send us an email and we'll respond within 24 hours.",
      value: CONTACT.salesEmail,
      what: "Email address",
    },
    {
      icon: Phone,
      title: "Phone Support",
      text: "Call us directly for immediate assistance with your account or setup.",
      value: CONTACT.phone,
      what: "Phone number",
      note: CONTACT.hours,
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600">
            Ready to get started? We're here to help you transform your business communications.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {items.map(({ icon: Icon, title, text, value, what, note }) => (
              <Card key={title} className="hover:shadow-lg transition-shadow duration-200">
                <div className="p-6 flex flex-row items-center space-y-0 pb-3">
                  <Icon className="h-6 w-6 text-blue-600 mr-3" />
                  <div className="font-semibold tracking-tight text-xl">{title}</div>
                </div>
                <CardContent>
                  <p className="text-gray-600 mb-4">{text}</p>
                  <div className="flex items-center space-x-2">
                    <code className="bg-gray-100 px-3 py-1 rounded text-sm">{value}</code>
                    <button className={btn.outlineSm} onClick={() => copy(value, what)} aria-label={`Copy ${what}`}>
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  {note && <p className="text-sm text-gray-500 mt-2">{note}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
