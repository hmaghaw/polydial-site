import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, ChevronDown, Home as HomeIcon, Menu, UtensilsCrossed, X } from "lucide-react";
import Logo from "./Logo.jsx";
import { btn } from "./ui.jsx";

const navLink = "text-gray-700 hover:text-blue-600 transition-colors";

function SolutionsMenu({ chevron = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const go = (to) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <div className="relative" ref={ref}>
      <button className={`${btn.ghost} text-gray-700 hover:text-blue-600`} onClick={() => setOpen((o) => !o)}>
        Solutions
        {chevron ? <ChevronDown className="ml-1 h-4 w-4" /> : <ArrowRight className="ml-1 h-4 w-4 rotate-90" />}
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-48 rounded-md border bg-white p-1 shadow-md z-50">
          <button onClick={() => go("/appointments")} className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent">
            <Calendar className="mr-2 h-4 w-4" />
            For Professionals
          </button>
          <button onClick={() => go("/orders")} className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent">
            <UtensilsCrossed className="mr-2 h-4 w-4" />
            For Restaurants
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Sticky header used across the site.
 * - tagline: small text beside the logo
 * - solutions: show the Solutions dropdown (chevron style on /orders)
 * - links: [{label, href} | {label, to}] — #anchors or router paths
 * - cta: {label, href} button on the right
 * - back: show a "Back to Home" button instead of nav (sub-pages)
 */
export default function Header({ tagline, solutions, chevron, links = [], cta, back, logoLinks = true }) {
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();

  const renderLink = (l, cls, onClick) =>
    l.to ? (
      <Link key={l.label} to={l.to} className={cls} onClick={onClick}>
        {l.label}
      </Link>
    ) : (
      <a key={l.label} href={l.href} className={cls} onClick={onClick}>
        {l.label}
      </a>
    );

  const logo = <Logo className={`h-8 w-auto ${logoLinks ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`} />;

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            {logoLinks ? <Link to="/" title="Back to PolyDial homepage">{logo}</Link> : logo}
            {tagline && <div className="text-sm text-gray-600 hidden md:block">{tagline}</div>}
          </div>

          {back ? (
            <button onClick={() => navigate("/")} className={`${btn.ghost} flex items-center space-x-2`}>
              <HomeIcon className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          ) : (
            <>
              <nav className="hidden md:flex items-center space-x-8">
                {solutions && <SolutionsMenu chevron={chevron} />}
                {links.map((l) => renderLink(l, navLink))}
              </nav>
              <div className="flex items-center space-x-4">
                {cta && (
                  <a href={cta.href} className={`${btn.primary} ${cta.hideOnMobile ? "hidden md:inline-flex" : ""}`}>
                    {cta.label}
                  </a>
                )}
                <button className="md:hidden" onClick={() => setMobile((m) => !m)} aria-label="Toggle menu">
                  {mobile ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
                </button>
              </div>
            </>
          )}
        </div>

        {mobile && !back && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-1">
            {solutions && (
              <>
                <Link to="/appointments" className="block px-2 py-2 text-gray-700 hover:text-blue-600" onClick={() => setMobile(false)}>
                  For Professionals
                </Link>
                <Link to="/orders" className="block px-2 py-2 text-gray-700 hover:text-blue-600" onClick={() => setMobile(false)}>
                  For Restaurants
                </Link>
              </>
            )}
            {links.map((l) => renderLink(l, "block px-2 py-2 text-gray-700 hover:text-blue-600", () => setMobile(false)))}
            {cta && (
              <a href={cta.href} className={`${btn.primary} w-full mt-2`}>
                {cta.label}
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
