import React, { useContext, useEffect, useRef, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { useParams } from 'react-router-dom';
import Breadcrums from '../components/Breadcrums/Breadcrums';
import ProductDisplay from '../components/ProductDisplay.jsx/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';

const Product = () => {
const {all_product}=useContext(Shopcontext);
const {productID}=useParams();
const product=all_product.find((e)=>e.id === Number(productID))
  return (
    <div>
      <Breadcrums product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts product={product}/>
    </div>
  )
}

export default Product
