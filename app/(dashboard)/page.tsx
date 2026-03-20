import { getServerUser } from '@/lib/auth';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import uiData from '@/data/uiData.json';

const texts = uiData.dashboard;

export default async function DashboardPage() {
  const user = await getServerUser();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
        <p className="text-muted-foreground">
          {user.name}{texts.welcomeMessage}
        </p>
      </div>
      <DashboardContent role={user.role} />
    </div>
  );
}
