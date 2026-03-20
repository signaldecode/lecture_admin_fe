import { getIcon } from '@/lib/iconMap';
import uiData from '@/data/uiData.json';

const commonTexts = uiData.common;

interface EmptyStateProps {
  icon?: string;
  message?: string;
  children?: React.ReactNode;
}

export function EmptyState({
  icon = 'List',
  message = commonTexts.noResults,
  children,
}: EmptyStateProps) {
  const Icon = getIcon(icon);

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <Icon className="size-10 text-muted-foreground/50" />
      <p className="text-sm text-muted-foreground">{message}</p>
      {children}
    </div>
  );
}
