import { Link } from "react-router-dom";
import { Copy } from "lucide-react";
import Logo from "./Logo.jsx";
import { useCopy } from "./Toast.jsx";
import { CONTACT } from "../config.js";

const linkCls = "block text-sm text-gray-600 hover:text-blue-600 transition-colors";

export default function Footer() {
  const copy = useCopy();
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Logo />
            </div>
            <p className="text-sm text-gray-600 mb-3">AI Calls in Every Language</p>
            <p className="text-sm text-gray-500">
              Transform your business communication with AI-powered multilingual calling solutions.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <div className="space-y-3">
              <Link to="/privacy-policy" className={linkCls}>Privacy Policy</Link>
              <Link to="/terms-of-service" className={linkCls}>Terms of Service</Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <div className="space-y-3">
              <Link to="/customer-support" className={linkCls}>Help Center</Link>
              <button
                onClick={() => copy(CONTACT.supportEmail, "Email address")}
                className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Copy className="w-3 h-3 mr-1" />
                Contact Us
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="text-sm text-gray-500 text-center">
            <p>© 2025 PolyDial.com. All rights reserved.</p>
            <p className="mt-1">PolyDial.com is owned and operated by IdeationMax Inc.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
