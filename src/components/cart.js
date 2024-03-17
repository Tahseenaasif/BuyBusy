import React from "react";
import { useValue } from "../productContext.js";
import "../Styles/cart.css";

function Cart() {
  const { cartItem, getTotalCartItemPrice, makeOrder, removeItemFromCart,incDecProductQty } = useValue();

  return (
    <div className="CartPage_cartPageContainer__Ekysb">
      <aside className="CartPage_totalPrice__mNo2l">
        <p>TotalPrice:- ₹{getTotalCartItemPrice()}/-</p>
        <button className="CartPage_purchaseBtn__X3QIJ" onClick={makeOrder}>
          Purchase
        </button>
      </aside>

      <div className="ProductGrid_grid__s2xpv">
        {cartItem.map((product) => (
          <div className="ProductContainer_productContainer__Z8v13" key={product.id}>
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
                <p>{product.name}-...</p>
              </div>
              <div className="ProductDetails_productOptions__8UN4q">
              <p>₹ {product.price}</p>
                {/* <div>
                <p>₹ {product.price}</p>
                <div className="ProductDetails_quantityContainer__4iWJP">
                  <img src="data:image/" alt="" />
                </div>
                  </div> */}
                  <div class="btn-connn">
                    <button class="qty-btn" onClick={()=>incDecProductQty(product.id,"dec")}><h1>-</h1></button>
                    <span class="qnty-size">{product.quantity}</span>
                    <button class="qty-btn"  onClick={()=>incDecProductQty(product.id,"inc")}><h1>+</h1></button>
                  </div>
              </div>
              <button
                className="ProductDetails_removeBtn__8ZwRH"
                title="Remove from Cart"
                onClick={() => removeItemFromCart(product.id)}
              >
                Remove From Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
