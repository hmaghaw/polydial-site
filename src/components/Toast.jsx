import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant }) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, title, description, variant }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ol className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] pointer-events-none">
        {toasts.map((t) => (
          <li
            key={t.id}
            className={`pointer-events-auto mb-2 w-full rounded-md border p-4 pr-6 shadow-lg ${
              t.variant === "destructive" ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-900"
            }`}
          >
            <div className="text-sm font-semibold">{t.title}</div>
            {t.description && <div className="text-sm opacity-90">{t.description}</div>}
          </li>
        ))}
      </ol>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

export function useCopy() {
  const toast = useToast();
  return async (text, what = "Text") => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied to clipboard", description: `${what} copied successfully` });
    } catch {
      toast({ title: "Copy failed", description: "Please copy it manually", variant: "destructive" });
    }
  };
}
