import { Link } from "react-router-dom";
import SubPageLayout from "../components/SubPageLayout.jsx";
import { btn } from "../components/ui.jsx";

export default function NotFound() {
  return (
    <SubPageLayout>
      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">We couldn't find that page.</p>
        <Link to="/" className={btn.primary}>Back to Home</Link>
      </div>
    </SubPageLayout>
  );
}
