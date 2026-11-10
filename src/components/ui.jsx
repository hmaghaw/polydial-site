// Lightweight equivalents of the shadcn/ui primitives the live site uses.
const cx = (...c) => c.filter(Boolean).join(" ");

export const Card = ({ className, children, ...p }) => (
  <div className={cx("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...p}>
    {children}
  </div>
);
export const CardHeader = ({ className, children }) => (
  <div className={cx("flex flex-col space-y-1.5 p-6", className)}>{children}</div>
);
export const CardTitle = ({ className, children }) => (
  <div className={cx("font-semibold tracking-tight", className)}>{children}</div>
);
export const CardContent = ({ className, children }) => <div className={cx("p-6 pt-0", className)}>{children}</div>;

export const Badge = ({ className, children }) => (
  <div
    className={cx(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
      className
    )}
  >
    {children}
  </div>
);

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export const btn = {
  primary: cx(base, "h-10 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"),
  ghost: cx(base, "h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground"),
  outlineLg: cx(base, "border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 group"),
  outlineSm: cx(base, "border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"),
};

export const Section = ({ id, className, children }) => (
  <section id={id} className={className}>
    {children}
  </section>
);

export const SectionHeading = ({ title, subtitle, className = "mb-16", subClass = "max-w-3xl mx-auto" }) => (
  <div className={cx("text-center", className)}>
    <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
    {subtitle && <p className={cx("text-xl text-gray-600", subClass)}>{subtitle}</p>}
  </div>
);

export { cx };
