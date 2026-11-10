import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import Video from "./Video.jsx";
import { btn } from "./ui.jsx";

export default function VideoDialog({ label, title, description, src }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button className={btn.outlineLg} onClick={() => setOpen(true)}>
        <Play className="mr-2 h-5 w-5 group-hover:text-blue-600" />
        {label}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setOpen(false)} />
          <div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-4xl rounded-lg border bg-background p-6 shadow-lg">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
              <h2 className="text-lg font-semibold leading-none tracking-tight">{title}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <Video src={src} autoPlay className="w-full rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
