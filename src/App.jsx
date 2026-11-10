import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Appointments from "./pages/Appointments.jsx";
import Orders from "./pages/Orders.jsx";
import Languages from "./pages/Languages.jsx";
import Legal from "./pages/Legal.jsx";
import Support from "./pages/Support.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/privacy-policy" element={<Legal doc="privacy" />} />
        <Route path="/terms-of-service" element={<Legal doc="terms" />} />
        <Route path="/customer-support" element={<Support />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
