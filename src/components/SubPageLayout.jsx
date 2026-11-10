import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

// Layout for Languages, Help Center and the legal pages: logo + tagline + "Back to Home".
export default function SubPageLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <Header tagline="AI Calls in Every Language" back logoLinks={false} />
      {children}
      <Footer />
    </div>
  );
}
