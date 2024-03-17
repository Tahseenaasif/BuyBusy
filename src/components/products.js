import React, { useEffect, useState } from "react";
import "../Styles/products.css";
import Product from "./product.js"
import { useValue } from "../productContext.js";
import { useAuthValue } from "../authContext";
import{ ColorRing} from "react-loader-spinner";
function Products() {
    const {products, fetchProduct, searchProduct, setProducts } = useValue();
   
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [priceFilter, setPriceFilter] = useState(75000);
    const { isLoggedIn } = useAuthValue();
    const [categoryFilters, setCategoryFilters] = useState({
        mensFashion: false,
        womensFashion: false,
        jewelery: false,
        electronics: false,
    });
    useEffect(() => {
        if (Array.isArray(products)) {
            const filtered = products.filter((product) => {
                const passesPriceFilter = product.price <= priceFilter;
                const passesCategoryFilter =
                    (!categoryFilters.mensFashion || product.category["Men's Clothing"]) &&
                    (!categoryFilters.womensFashion || product.category["Women's Clothing"]) &&
                    (!categoryFilters.jewelery || product.category.Jewelery) &&
                    (!categoryFilters.electronics || product.category.Electronics);
                return passesPriceFilter && passesCategoryFilter;
            });
            setFilteredProducts(filtered);
        }
    }, [priceFilter, categoryFilters, products]);



    const handlePriceChange = (e) => {
        setPriceFilter(Number(e.target.value));
    };

    const handleCategoryChange = (e) => {
        const { name, checked } = e.target;
        setCategoryFilters(prevFilters => ({
            ...prevFilters,
            [name]: checked,
        }));
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <>
         {(products.length==0  && <ColorRing class="loader" visible={true} height="100" width="100" ariaLabel="color-ring-loading" wrapperStyle={{}}wrapperClass="color-ring-wrapper loader"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
  )}
            <form class="HomePage_form__S9Tra">
                <input type="search" placeholder="Search By Name" class="HomePage_searchInput__BPaB4" onChange={(e) => searchProduct(e)} />
            </form>
            <aside class="FilterSidebar_filterContainer__Dfwk-">
                <h2>Filter</h2>
                <div>
                    <form>
                        <label htmlFor="price">Price: {priceFilter}</label>
                        <input type="range" id="price" name="price" min="1" max="100000" step="10" value={priceFilter} onChange={handlePriceChange} />
                        <h2>Category</h2>
                        <div class="filt-cont">
                            <div>
                                <input type="checkbox" id="mensFashion" name="mensFashion" checked={categoryFilters.mensFashion} onChange={handleCategoryChange} />
                                <label htmlFor="mensFashion">Men's Clothing</label>
                            </div>
                            <div>
                                <input type="checkbox" id="womensFashion" name="womensFashion" checked={categoryFilters.womensFashion} onChange={handleCategoryChange} />
                                <label htmlFor="womensFashion">Women's Clothing</label>
                            </div>
                            <div>
                                <input type="checkbox" id="jewelery" name="jewelery" checked={categoryFilters.jewelery} onChange={handleCategoryChange} />
                                <label htmlFor="jewelery">Jewelery</label>
                            </div>
                            <div>
                                <input type="checkbox" id="electronics" name="electronics" checked={categoryFilters.electronics} onChange={handleCategoryChange} />
                                <label htmlFor="electronics">Electronics</label>
                            </div>
                        </div>
                    </form>

                </div>
            </aside>
            <div className="ProductGrid_grid__s2xpv">
                {Array.isArray(filteredProducts) &&
                    filteredProducts.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
            </div>
        </>
    );
}

export default Products;