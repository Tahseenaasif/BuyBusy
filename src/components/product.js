import React from "react";
import "../Styles/product.css";
import { ToastContainer, toast } from 'react-toastify';
import { useValue } from "../productContext.js";
import { useAuthValue } from "../authContext";
import { useNavigate } from "react-router-dom";
function Product({ product }) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
 
  const { addToCart } = useValue();
  const navigate = useNavigate();
  return (
    <div className="prod-cont">
      <div className="ProductImage_imageContainer__oUd9d">
        <img
          src={product.photo}
          alt="Product"
          width="100%"
          height="100%"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="ProductDetails_productDetails__enV28">
        <div className="ProductDetails_productName__+v5pg">
          <p>{product.name}</p>
        </div>
        <div className="ProductDetails_productOptions__8UN4q">
          <p>₹ {product.price}</p>
        </div>
        <button
          className="ProductDetails_addBtn__6U9LF"
          title="Add to Cart"
          onClick={() => {
            if (isLoggedIn) {
              addToCart(product.id);
            } else {
              toast.warn("please logIn first...");
              navigate("/signin");
            }
          }}
        >
          Add to Cart
        </button>

      </div>
    </div>

  );
}

export default Product;
