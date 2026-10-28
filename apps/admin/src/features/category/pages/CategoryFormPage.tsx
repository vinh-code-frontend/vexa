import { Button, Form, Input, InputNumber, Select, Typography } from 'antd';
import { X } from 'lucide-react';
import slugify from 'slugify';
import { useLocation, useNavigate } from 'react-router';

import type { CategoryResponse } from '@/api/generated/query/model/types/category';
import i18n from '@/i18n';

type CategoryFormPageProps = {
  mode: 'create' | 'edit';
};

const CategoryFormPage = ({ mode }: CategoryFormPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const category = (location.state as { category?: CategoryResponse } | null)?.category;
  const slug = slugify(category?.name ?? '', { lower: true, strict: true });

  const closePage = () => navigate('/category');

  return (
    <section className="flex min-h-[600px] w-full flex-col border border-[#e9ecef] bg-white">
      <header className="flex items-center justify-between border-b border-[#e9ecef] px-4 py-3">
        <div>
          <Typography.Title level={5} style={{ margin: 0, fontSize: 14 }}>
            {i18n.t(`categories.form.title.${mode}`)}
          </Typography.Title>
          {category && (
            <Typography.Text type="secondary" style={{ fontSize: 11 }}>
              {category.name}
            </Typography.Text>
          )}
        </div>
        <Button
          type="text"
          size="small"
          aria-label={i18n.t('common.actions.cancel')}
          icon={<X size={14} />}
          onClick={closePage}
        />
      </header>

      <div className="flex-1 px-4 py-3">
        <Form layout="vertical" initialValues={{ name: category?.name, description: category?.description ?? '', displayOrder: category?.displayOrder ?? 0 }}>
          <Form.Item
            label={i18n.t('categories.form.name')}
            name="name"
            style={{ marginBottom: 10 }}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            label={i18n.t('categories.form.parent')}
            name="parentId"
            style={{ marginBottom: 10 }}
          >
            <Select
              size="small"
              placeholder={i18n.t('categories.form.root-category')}
              options={[{ value: '', label: i18n.t('categories.form.root-category') }]}
            />
          </Form.Item>
          <Form.Item label={i18n.t('categories.form.slug-preview')} style={{ marginBottom: 10 }}>
            <Input
              size="small"
              value={slug}
              readOnly
              prefix="vexa.co/categories/"
              style={{ background: '#f8f9fa' }}
            />
          </Form.Item>
          <Form.Item
            label={i18n.t('categories.form.description')}
            name="description"
            style={{ marginBottom: 10 }}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            label={i18n.t('categories.form.display-order')}
            name="displayOrder"
            style={{ marginBottom: 10 }}
          >
            <InputNumber size="small" min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </div>

      <footer className="flex justify-end gap-2 border-t border-[#e9ecef] px-4 py-3">
        <Button size="small" onClick={closePage}>
          {i18n.t('common.actions.cancel')}
        </Button>
        <Button type="primary" size="small">
          {i18n.t('categories.actions.save')}
        </Button>
      </footer>
    </section>
  );
};

export default CategoryFormPage;
