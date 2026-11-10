import { useState } from "react";
import { PlayCircle } from "lucide-react";

// A <video> that shows a tidy placeholder when the file hasn't been added yet.
export default function Video({ src, className = "w-full h-full", autoPlay = false }) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center text-gray-400 bg-gray-900 text-center p-6">
        <PlayCircle className="h-12 w-12 mb-3" />
        <p className="text-sm">Video not bundled yet</p>
        <p className="text-xs text-gray-500 mt-1 break-all">{src.split("/").pop()}</p>
      </div>
    );
  }

  return (
    <video controls autoPlay={autoPlay} className={className} preload="metadata" onError={() => setMissing(true)}>
      <source src={src} type="video/mp4" onError={() => setMissing(true)} />
      Your browser does not support the video tag.
    </video>
  );
}
