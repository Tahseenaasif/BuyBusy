import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar.js';
import Products from './components/products.js';
import SignUp from './components/singup.js';
import Signin from "./components/signinpage.js"
import ProductContext from './productContext.js';
import Cart from './components/cart.js';
import Order from './components/order.js';
import Error from './components/error.js';
import {AuthContext} from "./authContext.js"
function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Navbar />,
            errorElement: <Error />,
            children: [
                { index: true, element: <Products /> },
                { path: '/myorder', element: <Order /> },
                { path: '/cart', element: <Cart /> },
                  { path:"/signin", element: <Signin />},
                  { path:"/signup", element: <SignUp />},
            ]
        }
    ]);

    return (
        <AuthContext>
           <ProductContext>
            <RouterProvider router={router} />
        </ProductContext>
        </AuthContext>
        
    );
}

export default App;
