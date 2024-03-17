import { createContext, useState, useContext, useEffect } from "react";
import { db } from "./firebaseinit.js";
import { collection, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import { useAuthValue } from "./authContext";
import { redirect } from "react-router-dom";

const productContext = createContext();
function useValue() {
    const value = useContext(productContext);
    return value;
}
function ProductContext({ children }) {
    const { isLoggedIn } = useAuthValue();
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState([]);
    const [cartItem, setcartItem] = useState([
    ]);
    const [item, setItem] = useState(0);
    const fetchProduct = async () => {
        try {
            const unsub = onSnapshot(collection(db, "products"), (snapShot) => {
                const products = snapShot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(products);
            });
        } catch (error) {
            console.error("Error fetching folders from Firestore: ", error);
        }
    };
    const searchProduct = (e) => {
        if (e.target.value == "") {
            fetchProduct()
        } else {
            const filteredProducts = products.filter(product => product.name.includes(e.target.value));
            setProducts(filteredProducts);

        }

    }
    const addToCart = (productId) => {
        if (localStorage.getItem("isLoggedIn")) {
            const existingProductIndex = cartItem.findIndex((prod) => prod.id === productId);
            if (existingProductIndex !== -1) {
                const updatedCart = [...cartItem];
                updatedCart[existingProductIndex].quantity += 1;
                setcartItem(updatedCart);
                toast.success("Product Quatity Increased");
            } else {
                const product = products.find((prod) => prod.id === productId);
                product.quantity = 1;
                if (product && product.quantity > 0) {
                    setcartItem([...cartItem, { ...product }]);
                } else {
                    console.log("Invalid product or insufficient quantity");
                }

                toast.success("Product Added To Cart");
            }

        } else {
            toast.warn("please logIn first...");

        }
    }
    const getTotalCartItemPrice = () => {
        let total = 0
        if (cartItem.length != 0) {
            cartItem.forEach((prod) => {
                total += prod.price * prod.quantity
            })
        }
        return total;
    }
    const makeOrder = () => {
        if (cartItem.length != 0) {
            const dateObject = new Date();
            const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(dateObject);
            const orderData = {
                orderdate: formattedDate,
                products: cartItem,
                total: getTotalCartItemPrice()
            };
            setOrder((prevOrders) => [...prevOrders, orderData]);
            toast.success("Order Placed Sucessfully");
            setcartItem([]);
        }
    };


    const removeItemFromCart = (id) => {
        const index = cartItem.findIndex((prod) => prod.id === id);
        if (index !== -1) {
            const updatedCart = [...cartItem.slice(0, index), ...cartItem.slice(index + 1)];
            toast.success("Product Removed From the Cart");
            setcartItem(updatedCart);
        }
    };

    const incDecProductQty = (id, type) => {
        const productIndex = cartItem.findIndex((prod) => prod.id === id);

        if (productIndex !== -1) {
            const updatedCart = [...cartItem];

            if (type === "inc") {
                updatedCart[productIndex].quantity += 1;
                toast.success("Product Quantity Increased ");
            } else if (type === "dec" && updatedCart[productIndex].quantity > 1) {
                toast.success("Product Quantity Decreased ");
                updatedCart[productIndex].quantity -= 1;
            }

            setcartItem(updatedCart);
        }
    };


    return (
        <productContext.Provider
            value={{ products, setProducts, fetchProduct, item, searchProduct, setItem, addToCart, cartItem,setcartItem, getTotalCartItemPrice, makeOrder, removeItemFromCart, order, incDecProductQty,setOrder }}
        >
            {children}
        </productContext.Provider>
    );
}

export { useValue };
export default ProductContext;