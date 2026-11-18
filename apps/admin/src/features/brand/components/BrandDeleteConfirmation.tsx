import { Modal } from 'antd';
import { useState } from 'react';

import { QueryModels } from '@/api';
import i18n from '@/i18n';
import { DeleteIcon } from '@/shared/components/motions';

type BrandDeleteConfirmationProps = {
  brand: QueryModels.BrandResponse;
  deletingBrandId: number | null;
  onDelete: (brand: QueryModels.BrandResponse) => Promise<void>;
};

const BrandDeleteConfirmation = ({
  brand,
  deletingBrandId,
  onDelete,
}: BrandDeleteConfirmationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const brandId = Number(brand.id);
  const hasValidBrandId = Number.isSafeInteger(brandId) && brandId > 0;
  const isDeleting = deletingBrandId !== null;

  return (
    <>
      <button
        type="button"
        className="cursor-pointer rounded p-1 text-primary hover:text-primary-300 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={i18n.t('brands.actions.delete-brand', { name: brand.name })}
        disabled={isDeleting || !hasValidBrandId}
        onClick={() => setIsOpen(true)}
      >
        <DeleteIcon size={18} aria-hidden="true" />
      </button>
      <Modal
        title={i18n.t('brands.actions.delete')}
        open={isOpen}
        okText={i18n.t('brands.actions.delete')}
        cancelText={i18n.t('common.actions.cancel')}
        okButtonProps={{
          loading: deletingBrandId === brandId,
        }}
        cancelButtonProps={{ disabled: isDeleting }}
        closable={!isDeleting}
        keyboard={!isDeleting}
        onCancel={() => setIsOpen(false)}
        onOk={async () => {
          await onDelete(brand);
          setIsOpen(false);
        }}
      >
        {i18n.t('brands.actions.delete-confirmation', { name: brand.name })}
      </Modal>
    </>
  );
};

export default BrandDeleteConfirmation;
