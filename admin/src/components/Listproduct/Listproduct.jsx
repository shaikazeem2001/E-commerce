import React, { useEffect, useState } from "react";
import "./Listproduct.css";
import cross_icon from '../../assets/cross_icon.png'
const Listproduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const fetchinfo = async () => {
    await fetch("https://e-commerce-production-687b.up.railway.app/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });

    };
    useEffect(()=>{
      fetchinfo()
    },[])
    const remove_product=async (id)=>{
      await fetch("https://e-commerce-production-687b.up.railway.app/removeproduct", {
        method: 'POST',
        headers : {
        Accept: 'application/json',
        'Content-Type' : 'application/json',
        },
        body: JSON.stringify({id : id})
        })
        await fetchinfo();
    }
  return (
    <div className="list-products">
      <h1>All Products</h1>
      <div className="listproduct-fromat-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproducts-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
          return <> <div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
          <p>{product.name}</p>
          <p>${product.old_price}</p>
          <p>${product.new_price}</p>
          <p>{product.category}</p>
          <img src={cross_icon} onClick={()=>{remove_product(product.id)}} alt="" className="list-remove-icon" />
          </div>
          </>
        })}
      </div>
    </div>
  );
};

export default Listproduct;
