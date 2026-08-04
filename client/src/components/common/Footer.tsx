import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-3 py-10 pb-8 border-t border-cream-400/50">
      <div className="flex items-center gap-2 text-navy/40 text-[14px]">
        <Heart className="h-4 w-4 text-orange-300 fill-orange-200" />
        <span>Built with passion to make learning easier.</span>
      </div>
      <p className="text-xs text-navy/25">
        © {new Date().getFullYear()} Lexi. Dictionary AI.
      </p>
    </footer>
  );
}
