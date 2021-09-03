import React, { useEffect, useState } from "react";
import CartButton from "../cart";
import ConvertCurrency from "../../functions";
import './style.css';

function Store() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartTotalItems, setCartTotalItems] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://fakestoreapi.com/products/')
            const products = await response.json();
            setProducts(products);
        }
        fetchData();
    }, []);

    useEffect(() => {
        setCartTotalItems(cart.length);
    }, [cart]);

    function isCart(productId) {
        return cart.find(id => id === productId);
    }

    function handleClick(productId) {
        const itemIndex = cart.findIndex(id => id === productId)
        if (itemIndex > -1) {
            setCart(cart.filter(id => id !== productId));
        } else {
            setCart([...cart, productId])
        }
    }

    return (
        <div>
            <nav className="navbar fixed-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <h1 className="navbar-brand m-0">Menu</h1>
                    <button className="btn btn-outline-light py-0 px-1">
                        <i className="bi bi-cart2 pe-1"></i>
                        {cartTotalItems}
                    </button>
                </div>
            </nav>
            <main className="container pt-5 mt-5">
                <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 text-center">
                    {
                        products.map((product) => (
                            <div className="col mb-5">
                                <div className="card h-100 text-white bg-dark shadow" key={product.id}>
                                    <div className="productImage d-block img-thumbnail">
                                        <img className="card-img-top" src={product.image} alt="" />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                    </div>
                                    <div className="card-footer px-2">
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-auto">
                                                <div className="card-text"><h5 className="mb-0">{ConvertCurrency(product.price)}</h5></div>
                                            </div>
                                            <div className="col-auto">
                                                <CartButton isActive={isCart(product.id)} handleButonClick={(event) => { handleClick(product.id) }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="product">

                </div>
            </main>
        </div>
    )
}

export default Store;