import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const badgeSizes = {
  sm: 'h-10 w-10 rounded-[12px]',
  md: 'h-12 w-12 rounded-[14px]',
  lg: 'h-14 w-14 rounded-[16px]',
};

const textSizes = {
  sm: 'text-[22px]',
  md: 'text-[28px]',
  lg: 'text-[32px]',
};

export function Logo({ className, size = 'md', onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="D. Dictionary AI"
      className={cn(
        'group flex shrink-0 items-center justify-center bg-navy transition-all duration-200 hover:scale-[1.03]',
        badgeSizes[size],
        className,
      )}
    >
      <span
        className={cn(
          "font-['Plus_Jakarta_Sans',Inter,sans-serif] font-black leading-none tracking-[-1px] text-white select-none",
          textSizes[size],
        )}
      >
        D
        <span className="text-[#F97316] transition-all duration-200 group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.9)]">
          .
        </span>
      </span>
    </Link>
  );
}
