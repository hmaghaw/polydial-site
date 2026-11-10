import { CircleCheckBig, Clock, Copy, Globe, Mail } from "lucide-react";
import SubPageLayout from "../components/SubPageLayout.jsx";
import { Badge, Card, CardContent, CardHeader } from "../components/ui.jsx";
import { useCopy } from "../components/Toast.jsx";
import { CONTACT, portal } from "../config.js";
import { COMING_SOON, LANGUAGE_COUNT, SUPPORTED } from "../data/languages.js";

const faqs = [
  ["Does PolyDial support my language?", <>Check the "Currently Supported" list above. If your language is in the "Coming Soon" section, it will be available in the next few months. Contact us if you need a specific language prioritized.</>],
  ["How accurate is the AI in different languages?", <>Our AI maintains high accuracy across all supported languages, with native-level understanding and natural-sounding responses. Popular languages like English, Spanish, French, and Chinese have the highest accuracy rates.</>],
  ["Can I request a new language?", <>Yes! We're always expanding our language support based on customer demand. Contact us at <a href={`mailto:${CONTACT.supportEmail}`} className="text-blue-600 hover:underline">{CONTACT.supportEmail}</a> to request a new language.</>],
  ["Do you support regional dialects?", <>Yes, we support major regional dialects and variations. For example, we distinguish between Mandarin Chinese and Cantonese, and can handle different Spanish dialects from various countries.</>],
];

function LangList({ items, badgeCls, hoverCls }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map(([code, name]) => (
        <div key={code} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${hoverCls}`}>
          <Badge className={`font-mono w-10 justify-center ${badgeCls}`}>{code}</Badge>
          <span className="text-gray-700 font-medium">{name}</span>
        </div>
      ))}
    </div>
  );
}

export default function Languages() {
  const copy = useCopy();
  return (
    <SubPageLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Globe className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{LANGUAGE_COUNT}+ Supported Languages</h1>
          <p className="text-xl text-gray-600 mb-8">
            Communicate with customers worldwide in their native language with AI-powered multilingual support
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">{SUPPORTED.length}</div>
              <div className="text-green-800 font-medium">Currently Supported</div>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{COMING_SOON.length}</div>
              <div className="text-blue-800 font-medium">Coming Soon</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-green-200 overflow-hidden">
            <CardHeader className="bg-green-50">
              <div className="tracking-tight text-2xl font-semibold text-green-800 flex items-center gap-3">
                <CircleCheckBig className="w-6 h-6" />
                Currently Supported ({SUPPORTED.length})
              </div>
              <p className="text-green-700 text-sm">These languages are fully operational and ready to handle customer calls</p>
            </CardHeader>
            <div className="p-6">
              <LangList items={SUPPORTED} badgeCls="border-transparent bg-green-100 text-green-800" hoverCls="hover:bg-green-50" />
            </div>
          </Card>
          <Card className="border-blue-200 overflow-hidden self-start">
            <CardHeader className="bg-blue-50">
              <div className="tracking-tight text-2xl font-semibold text-blue-800 flex items-center gap-3">
                <Clock className="w-6 h-6" />
                Coming Soon ({COMING_SOON.length})
              </div>
              <p className="text-blue-700 text-sm">These languages are in development and will be available soon</p>
            </CardHeader>
            <div className="p-6">
              <LangList items={COMING_SOON} badgeCls="border-blue-300 text-blue-800" hoverCls="hover:bg-blue-50" />
            </div>
          </Card>
        </div>

        <div className="mt-16">
          <Card>
            <CardHeader>
              <div className="tracking-tight text-2xl font-semibold text-gray-900">Frequently Asked Questions</div>
            </CardHeader>
            <CardContent className="space-y-6">
              {faqs.map(([q, a]) => (
                <div key={q}>
                  <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                  <p className="text-gray-600">{a}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-16">
          <div className="rounded-lg border shadow-sm border-orange-200 bg-orange-50">
            <div className="p-8 text-center">
              <div className="flex justify-center items-center mb-4">
                <Mail className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold text-orange-800 mb-4">Don't See Your Language?</h3>
              <p className="text-orange-700 mb-6 max-w-2xl mx-auto">
                If you don't find your language in our supported or coming soon lists, we'd love to help! Contact us and
                we'll prioritize adding your language.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <div className="flex items-center space-x-2 text-orange-800">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">{CONTACT.supportEmail}</span>
                </div>
                <button
                  onClick={() => copy(CONTACT.supportEmail, "Email address")}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors border bg-background h-9 rounded-md px-3 border-orange-300 text-orange-700 hover:bg-orange-100"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy Email
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Go Global?</h2>
          <p className="text-xl mb-6 text-blue-100">Start serving customers in their native language today</p>
          <a
            href={portal("/onboarding")}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors h-11 rounded-md bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            Get Started for $20
          </a>
        </div>
      </div>
    </SubPageLayout>
  );
}
