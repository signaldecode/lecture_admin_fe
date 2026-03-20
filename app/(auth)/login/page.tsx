import type { Metadata } from 'next';
import { LoginForm } from '@/components/common/LoginForm';
import uiData from '@/data/uiData.json';

export const metadata: Metadata = {
  title: uiData.login.title,
};

export default function LoginPage() {
  return <LoginForm />;
}
