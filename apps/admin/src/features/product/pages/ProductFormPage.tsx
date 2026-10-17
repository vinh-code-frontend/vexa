type ProductFormPageProps = {
  mode: 'create' | 'edit';
};

const ProductFormPage = ({ mode }: ProductFormPageProps) => {
  return (
    <div>
      <h2>ProductFormPage</h2>
      <p>{mode}</p>
    </div>
  );
};

export default ProductFormPage;
