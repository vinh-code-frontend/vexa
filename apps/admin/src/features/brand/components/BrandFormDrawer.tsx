import { useEffect } from 'react';

import { Button, Drawer, Form, Input, InputNumber, Upload, Typography } from 'antd';
import type { FormInstance } from 'antd';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import { Upload as UploadIcon } from 'lucide-react';
import slugify from 'slugify';

import i18n from '@/i18n';
import '../styles/BrandFormDrawer.css';

export type BrandFormValues = {
  name: string;
  slug: string;
  description?: string;
  displayOrder?: number;
  logo?: UploadFile[];
};

type BrandFormDrawerProps = {
  open: boolean;
  mode: 'create' | 'edit';
  onClose: () => void;
};

const getUploadFileList = (event: UploadChangeParam<UploadFile>) => event.fileList;

type BrandFormApi = FormInstance<BrandFormValues> & {
  resetFields: () => void;
  setFieldsValue: (values: Partial<BrandFormValues>) => void;
  setFieldValue: (name: keyof BrandFormValues, value: unknown) => void;
};

const BrandFormDrawer = ({ open, mode, onClose }: BrandFormDrawerProps) => {
  const [form] = Form.useForm<BrandFormValues>();
  const brandForm = form as BrandFormApi;

  useEffect(() => {
    if (!open) {
      return;
    }

    brandForm.resetFields();
    brandForm.setFieldsValue({
      name: '',
      slug: '',
      description: '',
      displayOrder: 1,
      logo: [],
    });
  }, [brandForm, mode, open]);

  const handleValuesChange = (changedValues: Partial<BrandFormValues>) => {
    if (typeof changedValues.name === 'string') {
      brandForm.setFieldValue('slug', slugify(changedValues.name, { lower: true, strict: true }));
    }
  };

  const handleFinish = (_values: BrandFormValues) => {
    onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
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
          <Button type="primary" htmlType="submit" form="brand-form">
            {i18n.t('brands.actions.save')}
          </Button>
        </div>
      }
    >
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
