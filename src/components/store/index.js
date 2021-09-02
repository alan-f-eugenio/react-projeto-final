import React, { useEffect, useState } from "react";
import CartButton from "../cartButton";
import './style.css';

function Store(props) {
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

    function converCurrency(number) {
        const currency = number.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        return currency;
    }

    return (
        <div>
            <nav className="menu">
                {cartTotalItems} itens no carrinho
            </nav>
            <div className="product">
                {
                    products.map((product) => (
                        <div className="productItem" key={product.id}>
                            <div className="productImage">
                                <img src={product.image} alt="" />
                            </div>
                            <h2 className="productTitle">{product.title}</h2>
                            <div className="productPrice">{converCurrency(product.price)}</div>
                            <CartButton isActive={isCart(product.id)} handleButonClick={(event) => { handleClick(product.id) }} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Store;