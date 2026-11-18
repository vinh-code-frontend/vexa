import { Button, Form, Input, Typography } from 'antd';
import { Image as ImageIcon, Upload as UploadIcon, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import i18n from '@/i18n';

type LocalLogoPreview = {
  fileName: string;
  url: string;
};

type BrandLogoUploaderProps = {
  onLocalPreviewChange: (hasLocalPreview: boolean) => void;
};

const BrandLogoUploader = ({ onLocalPreviewChange }: BrandLogoUploaderProps) => {
  const [logoMode, setLogoMode] = useState<'upload' | 'url'>('url');
  const [localLogoPreview, setLocalLogoPreview] = useState<LocalLogoPreview | null>(null);
  const [logoUploadError, setLogoUploadError] = useState<string | null>(null);
  const [previewImageFailed, setPreviewImageFailed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoUrl = Form.useWatch('logoUrl') ?? '';
  const isLocalPreview = logoMode === 'upload' && localLogoPreview !== null;
  const previewUrl = isLocalPreview ? localLogoPreview.url : logoUrl.trim();
  const previewFileName =
    (isLocalPreview ? localLogoPreview.fileName : null) ??
    (previewUrl
      ? previewUrl.split(/[?#]/, 1)[0].split('/').pop() || previewUrl
      : i18n.t('brands.form.logo-no-preview'));

  useEffect(
    () => () => {
      if (localLogoPreview) URL.revokeObjectURL(localLogoPreview.url);
    },
    [localLogoPreview],
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setLogoUploadError(i18n.t('brands.form.logo-upload-invalid'));
      return;
    }

    setLogoUploadError(null);
    setPreviewImageFailed(false);
    setLocalLogoPreview({ fileName: file.name, url: URL.createObjectURL(file) });
    onLocalPreviewChange(true);
  };

  const clearLocalPreview = () => {
    setLocalLogoPreview(null);
    setLogoUploadError(null);
    onLocalPreviewChange(false);
  };

  return (
    <Form.Item
      label={<span className="text-[13px] font-medium">{i18n.t('brands.form.logo-image')}</span>}
    >
      <div className="brand-logo-uploader">
        <Typography.Text className="brand-logo-uploader__title">
          {i18n.t('brands.form.logo-preview-title')}
        </Typography.Text>

        <div className="brand-logo-uploader__tabs" role="tablist">
          {(['upload', 'url'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={logoMode === tab}
              className={`brand-logo-uploader__tab${logoMode === tab ? ' is-active' : ''}`}
              onClick={() => {
                setLogoMode(tab);
                onLocalPreviewChange(tab === 'upload' && localLogoPreview !== null);
              }}
            >
              {i18n.t(`brands.form.logo-${tab}-tab`)}
            </button>
          ))}
        </div>

        {logoMode === 'url' ? (
          <Form.Item
            name="logoUrl"
            rules={[
              { max: 500, message: i18n.t('brands.form.logo-url-too-long') },
              { type: 'url', message: i18n.t('brands.form.logo-url-invalid') },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Input
              type="url"
              placeholder={i18n.t('brands.form.logo-url-placeholder')}
              style={{ fontSize: 13 }}
            />
          </Form.Item>
        ) : (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              htmlType="button"
              icon={<UploadIcon size={14} aria-hidden="true" />}
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              {i18n.t('brands.form.logo-select-file')}
            </Button>
            <Typography.Text type="secondary">
              {i18n.t('brands.form.logo-upload-not-connected')}
            </Typography.Text>
            {logoUploadError && <Typography.Text type="danger">{logoUploadError}</Typography.Text>}
          </>
        )}

        <div className="brand-logo-uploader__preview">
          <div className="brand-logo-uploader__thumbnail">
            {previewUrl && !previewImageFailed ? (
              <img
                src={previewUrl}
                alt={previewFileName}
                onError={() => setPreviewImageFailed(true)}
                onLoad={() => setPreviewImageFailed(false)}
              />
            ) : (
              <ImageIcon size={18} aria-hidden="true" />
            )}
          </div>
          <div className="brand-logo-uploader__file">
            <Typography.Text className="brand-logo-uploader__filename">
              {previewFileName}
            </Typography.Text>
            <Typography.Text className="brand-logo-uploader__source">
              {isLocalPreview
                ? i18n.t('brands.form.logo-preview-from-device')
                : previewUrl
                  ? i18n.t('brands.form.logo-preview-from-url')
                  : i18n.t('brands.form.logo-no-preview')}
            </Typography.Text>
          </div>
          {isLocalPreview && (
            <Button
              htmlType="button"
              type="text"
              aria-label={i18n.t('brands.form.logo-remove-selected')}
              icon={<X size={14} />}
              onClick={clearLocalPreview}
            />
          )}
        </div>
      </div>
    </Form.Item>
  );
};

export default BrandLogoUploader;
