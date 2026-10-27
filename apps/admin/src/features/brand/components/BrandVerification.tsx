import { Typography } from 'antd';
import { ClipboardCheck, Info } from 'lucide-react';
import i18n from '@/i18n';

export const BrandVerification = () => {
  return (
    <div className="flex min-h-80 flex-col">
      <Typography.Text className="text-sm font-semibold text-[#212529]">
        {i18n.t('brands.verification.title')}
      </Typography.Text>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F8F9FA]">
          <ClipboardCheck size={20} className="text-[#ADB5BD]" aria-hidden="true" />
        </div>
        <Typography.Text className="font-semibold text-[#212529]">
          {i18n.t('brands.verification.empty-title')}
        </Typography.Text>
        <Typography.Text className="text-xs leading-4" styles={{ root: { color: '#6C757D' } }}>
          {i18n.t('brands.verification.empty-description')}
        </Typography.Text>
      </div>

      <div className="flex items-start gap-2 rounded-md bg-[#F8F9FA] p-3">
        <Info size={14} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
        <Typography.Text className="text-xs leading-4" styles={{ root: { color: '#6C757D' } }}>
          {i18n.t('brands.verification.notice')}
        </Typography.Text>
      </div>
    </div>
  );
};
