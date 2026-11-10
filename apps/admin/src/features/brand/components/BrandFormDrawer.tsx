import { useEffect } from 'react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Drawer, Form, Input, InputNumber, Upload, Typography } from 'antd';
import { Upload as UploadIcon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';
import i18n from '@/i18n';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import type { BrandResponse } from '@/api/generated/query/model';
import {
  getGetApiAdminBrandsIdQueryKey,
  getGetApiAdminBrandsQueryKey,
  usePostApiAdminBrands,
  usePutApiAdminBrandsId,
} from '@/api';
import { QueryErrorAlert } from '@/shared/components/ui';
import '../styles/BrandFormDrawer.css';

type BrandFormValues = {
  name: string;
  slug: string;
  description?: string;
  displayOrder?: number;
  logo?: UploadFile[];
};

type BrandFormDrawerProps = {
  open: boolean;
  brand?: BrandResponse | null;
  onClose: () => void;
};

const defaultValues: BrandFormValues = {
  name: '',
  slug: '',
  description: '',
  displayOrder: 1,
  logo: [],
};

const getUploadFileList = (event: UploadChangeParam<UploadFile>) => event.fileList;

const getLogoFileList = (brand: BrandResponse): BrandFormValues['logo'] => {
  const url = brand.logoUrl?.trim();
  if (!url) return [];

  return [
    {
      uid: uuidv4(),
      name: brand.name,
      url,
    },
  ];
};

const getBrandDefaultValues = (mode: 'create' | 'edit', brand?: BrandResponse): BrandFormValues => {
  if (mode !== 'edit' || !brand) return defaultValues;

  return {
    name: brand.name ?? '',
    slug: brand.slug ?? '',
    description: brand.description ?? '',
    displayOrder: Number(brand.displayOrder ?? 1),
    logo: getLogoFileList(brand),
  };
};

const BrandFormDrawer = ({ open, brand, onClose }: BrandFormDrawerProps) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm<BrandFormValues>();
  const [submitError, setSubmitError] = useState<unknown>(null);
  const createBrandMutation = usePostApiAdminBrands();
  const updateBrandMutation = usePutApiAdminBrandsId();
  const mode = brand ? 'edit' : 'create';
  const isSubmitting = createBrandMutation.isPending || updateBrandMutation.isPending;

  useEffect(() => {
    if (!open) return;

    form.resetFields();
    form.setFieldsValue(getBrandDefaultValues(mode, brand ?? undefined));
  }, [open, mode, brand, form]);

  const handleClose = () => {
    setSubmitError(null);
    onClose();
  };

  const handleValuesChange = (changedValues: Partial<BrandFormValues>) => {
    if (typeof changedValues.name === 'string') {
      form.setFieldValue('slug', slugify(changedValues.name, { lower: true, strict: true }));
    }
  };

  const handleFinish = async (values: BrandFormValues) => {
    setSubmitError(null);

    const payload = {
      name: values.name,
      description: values.description || null,
      displayOrder: values.displayOrder ?? 1,
      logoUrl: values.logo?.[0]?.url ?? null,
    };

    try {
      if (brand) {
        const brandId = Number(brand.id);
        if (!Number.isSafeInteger(brandId) || brandId <= 0) {
          throw new Error('Cannot update a brand without a valid ID.');
        }

        await updateBrandMutation.mutateAsync({
          id: brandId,
          data: { ...payload, isActive: brand.isActive ?? true },
        });
        await queryClient.invalidateQueries({
          queryKey: getGetApiAdminBrandsIdQueryKey(brandId),
        });
      } else {
        await createBrandMutation.mutateAsync({
          data: { ...payload, isActive: true },
        });
      }

      await queryClient.invalidateQueries({ queryKey: getGetApiAdminBrandsQueryKey() });
      handleClose();
    } catch (error) {
      setSubmitError(error);
    }
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      placement="right"
      closable={{ placement: 'end' }}
      size={480}
      title={
        <div>
          <Typography.Title level={3} style={{ fontWeight: 700, margin: 0 }}>
            {i18n.t(`brands.form.title.${mode}`)}
          </Typography.Title>
          <Typography.Text style={{ fontSize: 12, color: '#6C757D', fontWeight: 400 }}>
            {i18n.t('brands.form.description')}
          </Typography.Text>
        </div>
      }
      styles={{
        header: { padding: 24, borderBottom: '1px solid #E9ECEF' },
        body: { padding: 24 },
        footer: { padding: 24, borderTop: '1px solid #E9ECEF' },
      }}
      footer={
        <div className="flex justify-end gap-4">
          <Button onClick={onClose}>{i18n.t('common.actions.cancel')}</Button>
          <Button type="primary" htmlType="submit" form="brand-form" loading={isSubmitting}>
            {i18n.t('brands.actions.save')}
          </Button>
        </div>
      }
    >
      {submitError !== null && (
        <div style={{ marginBottom: 16 }}>
          <QueryErrorAlert title={i18n.t('brands.form.submit-error')} error={submitError} />
        </div>
      )}
      <Form<BrandFormValues>
        id="brand-form"
        form={form}
        layout="vertical"
        initialValues={{ displayOrder: 1, logo: [] }}
        onValuesChange={handleValuesChange}
        onFinish={handleFinish}
        className="brand-form-drawer flex flex-col gap-4"
        requiredMark={false}
      >
        <Form.Item
          label={
            <span className="text-[13px] font-medium">
              {i18n.t('brands.form.name')} <span className="text-red-500">*</span>
            </span>
          }
          name="name"
          rules={[{ required: true, message: i18n.t('brands.form.name-required') }]}
        >
          <Input placeholder={i18n.t('brands.form.name-placeholder')} style={{ fontSize: 13 }} />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-[13px] font-medium">{i18n.t('brands.form.slug-preview')}</span>
          }
          name="slug"
        >
          <Input
            readOnly
            disabled
            prefix={i18n.t('brands.form.slug-prefix')}
            className="brand-slug-input bg-[#F8F9FA]"
            style={{ fontSize: 13 }}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-[13px] font-medium">
              {i18n.t('brands.form.description-label')}
            </span>
          }
          name="description"
        >
          <Input.TextArea
            rows={2}
            placeholder={i18n.t('brands.form.description-placeholder')}
            style={{ fontSize: 13 }}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-[13px] font-medium">{i18n.t('brands.form.display-order')}</span>
          }
          name="displayOrder"
        >
          <InputNumber min={0} style={{ width: '100%', fontSize: 13 }} />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-[13px] font-medium">{i18n.t('brands.form.logo-image')}</span>
          }
          name="logo"
          valuePropName="fileList"
          getValueFromEvent={getUploadFileList}
        >
          <Upload.Dragger
            accept="image/*"
            maxCount={1}
            beforeUpload={() => false}
            style={{ border: '1px dashed', borderColor: '#CED4DA' }}
          >
            <div className="flex items-center justify-center gap-2 text-[13px] text-[#6C757D]">
              <UploadIcon size={14} aria-hidden="true" />
              <span>{i18n.t('brands.form.logo-drop-image')}</span>
            </div>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default BrandFormDrawer;
