import { Clock, Copy, Mail, Phone, Users } from "lucide-react";
import SubPageLayout from "../components/SubPageLayout.jsx";
import { Card, CardContent, CardHeader } from "../components/ui.jsx";
import { useCopy } from "../components/Toast.jsx";
import { CONTACT } from "../config.js";

const copyBtn = "inline-flex items-center justify-center rounded-md h-6 w-6 p-0 hover:bg-gray-100 transition-colors";

export default function Support() {
  const copy = useCopy();
  return (
    <SubPageLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Customer Support</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help you get the most out of PolyDial. Find answers, get support, and connect with our team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          <Card className="border-gray-200">
            <CardHeader>
              <div className="text-2xl font-semibold leading-none tracking-tight flex items-center space-x-2 text-gray-900">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>Email Support</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <p className="text-gray-600">{CONTACT.supportEmail}</p>
                <button className={copyBtn} onClick={() => copy(CONTACT.supportEmail, "Email address")} aria-label="Copy email">
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
              <p className="text-sm text-gray-600">Best for: Account issues, billing questions, technical problems</p>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardHeader>
              <div className="text-2xl font-semibold leading-none tracking-tight flex items-center space-x-2 text-gray-900">
                <Phone className="w-5 h-5 text-purple-600" />
                <span>Phone Support</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <p className="text-gray-600 font-medium">{CONTACT.phoneShort}</p>
                <button className={copyBtn} onClick={() => copy(CONTACT.phoneShort, "Phone number")} aria-label="Copy phone number">
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              <p className="text-sm text-gray-500">Available during business hours</p>
              <p className="text-sm text-gray-500">
                Monday-Friday: 9:00 AM - 6:00 PM EST
                <br />
                Saturday: 10:00 AM - 4:00 PM EST
              </p>
              <p className="text-sm text-gray-600">Best for: Complex issues, urgent support, direct assistance</p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-gray-200">
            <CardHeader>
              <div className="text-2xl font-semibold leading-none tracking-tight text-gray-900 text-center">Company Information</div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM EST</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Company</h3>
                  <p className="text-gray-600">IdeationMax Inc.</p>
                  <p className="text-sm text-gray-500">(Owner of PolyDial.com)</p>
                  <p className="text-sm text-gray-500">Based in Canada.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SubPageLayout>
  );
}
