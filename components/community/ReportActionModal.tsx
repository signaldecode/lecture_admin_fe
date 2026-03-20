'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { CommunityReport } from '@/types';
import uiData from '@/data/uiData.json';

const reportTexts = uiData.community.report;

interface ReportActionModalProps {
  report: CommunityReport;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReportActionModal({
  report,
  open,
  onOpenChange,
}: ReportActionModalProps) {
  const handleWarn = () => {
    // TODO: Call warn API - POST /api/admin/community/reports/{report.id}/action { action: 'WARN' }
    console.log('Report action: WARN', { reportId: report.id, postId: report.postId });
    onOpenChange(false);
  };

  const handleDelete = () => {
    // TODO: Call delete API - POST /api/admin/community/reports/{report.id}/action { action: 'DELETE' }
    console.log('Report action: DELETE', { reportId: report.id, postId: report.postId });
    onOpenChange(false);
  };

  const handleSuspend = () => {
    // TODO: Call suspend API - POST /api/admin/community/reports/{report.id}/action { action: 'SUSPEND' }
    console.log('Report action: SUSPEND', { reportId: report.id, postId: report.postId });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{reportTexts.title}</DialogTitle>
          <DialogDescription>{reportTexts.description}</DialogDescription>
        </DialogHeader>
        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="text-muted-foreground">{reportTexts.postTitleLabel}</dt>
            <dd className="font-medium">{report.postTitle}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{reportTexts.reasonLabel}</dt>
            <dd>{report.reason}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{reportTexts.reporterLabel}</dt>
            <dd>{report.reporterName}</dd>
          </div>
        </dl>
        <Separator />
        <DialogFooter>
          <Button variant="outline" onClick={handleWarn}>
            {reportTexts.warnButton}
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            {reportTexts.deleteButton}
          </Button>
          <Button variant="destructive" onClick={handleSuspend}>
            {reportTexts.suspendButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
