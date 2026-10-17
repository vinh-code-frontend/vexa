import { DeleteIcon, EditIcon } from '@/shared/components/motions';
import { Card } from 'antd';

const ProductListPage = () => {
  return (
    <div>
      <Card>
        <h2>Product List</h2>
        <EditIcon />
        <DeleteIcon />
      </Card>
    </div>
  );
};

export default ProductListPage;
