import React from "react";
import { useValue } from "../productContext.js";
import "../Styles/order.css";

function Order() {
    const { order } = useValue();
    return (
        <div className="OrdersPage_ordersContainer__Zlhzb">
            <h1>Your Orders</h1>
            {order.map((oData) => (  
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <h2>Ordered On:-{oData.orderdate}</h2>
                <table className="OrderTable_table__lm-UR">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {oData.products.map((product) => ( 
                        <tr>
                            <td>{product.name}</td>
                            <td>₹ {product.price} </td>
                            <td>{product.quantity} </td>
                            <td>₹ {product.price*product.quantity}</td>
                        </tr>
                           ))}
                    </tbody>
                    <tr className="OrderTable_totalPrice__qoqQw">
                        <td>₹ {oData.total}</td>
                    </tr>
                </table>
               
            </div>
               ))}
        </div>
    );
}

export default Order;
