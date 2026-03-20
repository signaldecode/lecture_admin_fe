import Link from 'next/link';
import uiData from '@/data/uiData.json';

const texts = uiData.sidebar;

export function AdminLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-bold text-lg"
      aria-label={texts.logoAriaLabel}
    >
      <span>{texts.logoText}</span>
    </Link>
  );
}
