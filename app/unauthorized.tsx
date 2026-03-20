import Link from 'next/link';
import uiData from '@/data/uiData.json';

const texts = uiData.unauthorized;

export default function Unauthorized() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">401</h1>
      <p className="text-xl text-muted-foreground">{texts.title}</p>
      <p className="text-muted-foreground">{texts.description}</p>
      <Link
        href="/login"
        className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/80"
      >
        {texts.loginButton}
      </Link>
    </main>
  );
}
