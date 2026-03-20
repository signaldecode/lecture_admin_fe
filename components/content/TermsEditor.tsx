'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatDate } from '@/lib/format';
import type { Terms } from '@/types';

const mockTerms: Terms[] = [
  { id: 1, type: 'TERMS_OF_SERVICE', version: 'v2.1', content: '제1조 (목적)\n이 약관은 LMS 플랫폼이 제공하는 서비스의 이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.\n\n제2조 (정의)\n1. "서비스"란 회사가 제공하는 온라인 강의 플랫폼을 말합니다.\n2. "회원"이란 서비스에 가입하여 이용하는 자를 말합니다.', effectiveDate: '2026-01-01T00:00:00', createdAt: '2025-12-15T00:00:00' },
  { id: 2, type: 'PRIVACY_POLICY', version: 'v1.3', content: '1. 수집하는 개인정보 항목\n- 이메일, 이름, 전화번호, 결제 정보\n\n2. 개인정보의 수집 및 이용 목적\n- 서비스 제공, 회원 관리, 마케팅 활용', effectiveDate: '2026-02-01T00:00:00', createdAt: '2026-01-20T00:00:00' },
];

const typeLabels: Record<string, string> = {
  TERMS_OF_SERVICE: '이용약관',
  PRIVACY_POLICY: '개인정보처리방침',
};

export function TermsEditor() {
  const [activeTab, setActiveTab] = useState('TERMS_OF_SERVICE');
  const [contents, setContents] = useState<Record<string, string>>(
    Object.fromEntries(mockTerms.map((t) => [t.type, t.content])),
  );

  const currentTerms = mockTerms.find((t) => t.type === activeTab);

  function handleSave() {
    // TODO: apiClient.put(`content/terms/${currentTerms?.id}`, { content: contents[activeTab] })
    alert('저장되었습니다. (목 동작)');
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        {mockTerms.map((t) => (
          <TabsTrigger key={t.type} value={t.type}>
            {typeLabels[t.type]}
          </TabsTrigger>
        ))}
      </TabsList>

      {mockTerms.map((terms) => (
        <TabsContent key={terms.type} value={terms.type}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">{typeLabels[terms.type]}</CardTitle>
              <div className="flex items-center gap-2">
                <StatusBadge label={terms.version} variant="default" />
                <span className="text-sm text-muted-foreground">
                  시행일: {formatDate(terms.effectiveDate)}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={contents[terms.type] ?? ''}
                onChange={(e) =>
                  setContents((prev) => ({ ...prev, [terms.type]: e.target.value }))
                }
                rows={20}
                className="font-mono text-sm"
              />
              <Button onClick={handleSave}>저장</Button>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
