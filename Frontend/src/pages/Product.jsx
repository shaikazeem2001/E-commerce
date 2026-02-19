import { Shopcontext } from '../context/Shopcontext'
import { useParams } from 'react-router-dom';
import Breadcrums from '../components/breadcrums/Breadcrums';
import ProductDisplay from '../components/productdisplay/ProductDisplay';
import DescriptionBox from '../components/descriptionbox/DescriptionBox';
import RelatedProducts from '../components/relatedproducts/RelatedProducts';
import { Loader2 } from '../components/Icons';
import { useContext } from 'react';
const Product = () => {
  const { all_product } = useContext(Shopcontext);
  const { productID } = useParams();
  const product = all_product.find((e) => e.id === Number(productID))

  if (!product || all_product.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', flexDirection: 'column', gap: '20px' }}>
        <Loader2 size={50} className="spinner" style={{ color: 'var(--primary-color)' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', fontWeight: '500' }}>Loading product details...</p>
      </div>
    );
  }

  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts product={product} />
    </div>
  )
}

export default Product
