import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="flex justify-center pt-8 pb-2">
      <div className="inline-flex items-center gap-2 rounded-full bg-card px-5 py-2 shadow-soft border border-border text-sm">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <ChevronRight className="h-3 w-3 text-cream-500" />}
            {item.active ? (
              <span className="text-orange-500 font-medium">{item.label}</span>
            ) : item.href ? (
              <Link
                to={item.href}
                className="text-navy/60 transition-colors hover:text-orange-500"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-navy/60">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
