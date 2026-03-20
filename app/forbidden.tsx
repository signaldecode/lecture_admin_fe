import Link from 'next/link';
import uiData from '@/data/uiData.json';

const texts = uiData.forbidden;

export default function Forbidden() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">403</h1>
      <p className="text-xl text-muted-foreground">{texts.title}</p>
      <p className="text-muted-foreground">{texts.description}</p>
      <Link
        href="/"
        className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
      >
        {texts.backButton}
      </Link>
    </main>
  );
}
