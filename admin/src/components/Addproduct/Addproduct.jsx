import React, { useState } from "react";
import "./Addproduct.css";
import upload_image from "../../assets/upload_area.svg";

const Addproduct = () => {
  const [Image, setImage] = useState(false);
  const [Productdetails, setProductdetails] = useState({
    name: "",
    image: "",
    category: "",
    old_price: "",
    new_price: "",
  });

  const imagehandler = (e) => setImage(e.target.files[0]);
  const changehandler = (e) =>
    setProductdetails({ ...Productdetails, [e.target.name]: e.target.value });

  const add_product = async () => {
    try {
      console.log("Uploading image...");

      const formdata = new FormData();
      formdata.append("image", Image); 

      const uploadResp = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formdata, 
      });

      const responsedata = await uploadResp.json();
      console.log("Upload response:", responsedata);

      if (responsedata.success) {
        const product = {
          ...Productdetails,
          image: responsedata.image_url, // ✅ from backend
        };

        console.log("Adding product:", product);

        const addResp = await fetch("http://localhost:4000/addproduct", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        const data = await addResp.json();
        data.success
          ? alert("✅ Product Added")
          : alert("❌ Failed to Add Product");
      } else {
        alert("❌ Image upload failed");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={Productdetails.name}
          onChange={changehandler}
          type="text"
          placeholder="type here"
          name="name"
        />
      </div>

      <div className="addproduct-itemfield">
        <p>Price</p>
        <input
          value={Productdetails.old_price}
          onChange={changehandler}
          type="text"
          placeholder="type here"
          name="old_price"
        />
      </div>

      <div className="addproduct-itemfield">
        <p>Offer Price</p>
        <input
          value={Productdetails.new_price}
          onChange={changehandler}
          type="text"
          placeholder="type here"
          name="new_price"
        />
      </div>

      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select
          value={Productdetails.category}
          onChange={changehandler}
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      <div className="add-product-itemfield">
        <label htmlFor="file-input">
          <img
            src={Image ? URL.createObjectURL(Image) : upload_image}
            className="addproduct-thumbnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imagehandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      <button onClick={add_product} className="add-product-btn">
        Add
      </button>
    </div>
  );
};

export default Addproduct;
