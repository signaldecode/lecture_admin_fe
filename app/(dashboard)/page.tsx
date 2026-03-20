import { getServerUser } from '@/lib/auth';
import { DashboardContent } from '@/components/dashboard/DashboardContent';

export default async function DashboardPage() {
  const user = await getServerUser();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="text-muted-foreground">
          {user.name}님, 환영합니다.
        </p>
      </div>
      <DashboardContent role={user.role} />
    </div>
  );
}
