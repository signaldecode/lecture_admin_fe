'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import uiData from '@/data/uiData.json';

const formTexts = uiData.coupons.form;
const validationTexts = uiData.coupons.validation;
const typeLabels = uiData.coupons.typeLabels;

const couponFormSchema = z.object({
  name: z.string().min(1, validationTexts.nameRequired),
  code: z
    .string()
    .min(1, validationTexts.codeRequired)
    .regex(/^[A-Z0-9]+$/, validationTexts.codeUppercase),
  type: z.enum(['PERCENT', 'FIXED'], {
    error: validationTexts.typeRequired,
  }),
  discountValue: z
    .string()
    .min(1, validationTexts.discountValueRequired)
    .refine((val) => Number(val) >= 0, validationTexts.discountValueMin),
  maxDiscount: z.string().optional(),
  minPurchase: z.string().optional(),
  usageLimit: z.string().optional(),
  expiresAt: z.string().min(1, validationTexts.expiresAtRequired),
});

type CouponFormValues = z.infer<typeof couponFormSchema>;

export function CouponForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CouponFormValues>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      name: '',
      code: '',
      type: undefined,
      discountValue: '',
      maxDiscount: '',
      minPurchase: '',
      usageLimit: '',
      expiresAt: '',
    },
  });

  const typeValue = watch('type');

  const onSubmit = (data: CouponFormValues) => {
    // TODO: Call coupon creation API
    // await apiClient.post('/api/admin/coupons', {
    //   ...data,
    //   discountValue: Number(data.discountValue),
    //   maxDiscount: data.maxDiscount ? Number(data.maxDiscount) : undefined,
    //   minPurchase: data.minPurchase ? Number(data.minPurchase) : undefined,
    //   usageLimit: data.usageLimit ? Number(data.usageLimit) : undefined,
    // });
    console.log('Coupon form submitted:', data);
    router.push('/coupons');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{formTexts.submitButton}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="coupon-name">{formTexts.nameLabel}</Label>
            <Input
              id="coupon-name"
              placeholder={formTexts.namePlaceholder}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coupon-code">{formTexts.codeLabel}</Label>
            <Input
              id="coupon-code"
              placeholder={formTexts.codePlaceholder}
              {...register('code', {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.toUpperCase();
                },
              })}
            />
            {errors.code && (
              <p className="text-sm text-destructive">{errors.code.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coupon-type">{formTexts.typeLabel}</Label>
            <Select
              value={typeValue ?? ''}
              onValueChange={(value: string | null) => {
                const v = value ?? '';
                if (v === 'PERCENT' || v === 'FIXED') {
                  setValue('type', v, { shouldValidate: true });
                }
              }}
            >
              <SelectTrigger id="coupon-type">
                <SelectValue placeholder={formTexts.typePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PERCENT">{typeLabels.PERCENT}</SelectItem>
                <SelectItem value="FIXED">{typeLabels.FIXED}</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-destructive">{errors.type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coupon-discount-value">{formTexts.discountValueLabel}</Label>
            <Input
              id="coupon-discount-value"
              type="number"
              min="0"
              placeholder={formTexts.discountValuePlaceholder}
              {...register('discountValue')}
            />
            {errors.discountValue && (
              <p className="text-sm text-destructive">{errors.discountValue.message}</p>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="coupon-max-discount">{formTexts.maxDiscountLabel}</Label>
              <Input
                id="coupon-max-discount"
                type="number"
                min="0"
                placeholder={formTexts.maxDiscountPlaceholder}
                {...register('maxDiscount')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coupon-min-purchase">{formTexts.minPurchaseLabel}</Label>
              <Input
                id="coupon-min-purchase"
                type="number"
                min="0"
                placeholder={formTexts.minPurchasePlaceholder}
                {...register('minPurchase')}
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="coupon-usage-limit">{formTexts.usageLimitLabel}</Label>
              <Input
                id="coupon-usage-limit"
                type="number"
                min="0"
                placeholder={formTexts.usageLimitPlaceholder}
                {...register('usageLimit')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coupon-expires-at">{formTexts.expiresAtLabel}</Label>
              <Input
                id="coupon-expires-at"
                type="date"
                {...register('expiresAt')}
              />
              {errors.expiresAt && (
                <p className="text-sm text-destructive">{errors.expiresAt.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {formTexts.submitButton}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
