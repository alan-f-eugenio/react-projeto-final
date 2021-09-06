import React, { useRef, useEffect, useState } from "react";
import ConvertCurrency from "../../functions";

function inCart(props) {
    return props.cart.find(prod => prod.id === props.productId);
}

function CartButton(props) {
    const [hoverRef, isHovered] = useHover();
    function useHover() {
        const [value, setValue] = useState(false);
        const ref = useRef(null);
        const handleMouseOver = () => setValue(true);
        const handleMouseOut = () => setValue(false);
        useEffect(
            () => {
                const el = ref.current;
                if (el) {
                    el.addEventListener("mouseover", handleMouseOver);
                    el.addEventListener("mouseout", handleMouseOut);
                    return () => {
                        el.removeEventListener("mouseover", handleMouseOver);
                        el.removeEventListener("mouseout", handleMouseOut);
                    };
                }
            },
        );
        return [ref, value];
    }

    return (
        <button className={`btn btn-lg ${props.isActive ? 'btn-outline-danger' : 'btn-outline-light'}`} onClick={() => props.handleCartButonClick()}>
            <i ref={hoverRef} className={`bi ${props.isActive ? (isHovered ? 'bi-bag-x-fill' : 'bi-bag-x') : (isHovered ? 'bi-bag-plus-fill' : 'bi-bag-plus')}`}></i>
        </button>
    );
}

function CartModal(props) {

    const [totalCart, setTotalCart] = useState(0);

    useEffect(() => {
        setTotalCart(props.cart.reduce((totalCart, cartProd) => totalCart + (cartProd.price), 0));
    }, [props.cart]);

    return (
        <div>
            <div className={`modal fade ${props.showCart}`} onClick={(e) => e.target.classList.contains('show') ? props.handleCartClick() : ''}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myLargeModalLabel">Carrinho</h4>
                        </div>
                        <div className="modal-body">
                            {totalCart
                                ? <div className="table-responsive">
                                    <table className="table table-striped table-responsive">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Produto</th>
                                                <th scope="col">Preço</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                props.cart.map((cartProd) => (
                                                    <tr key={cartProd.id}>
                                                        <th scope="row">
                                                            <div className="cartProdImage d-block img-thumbnail">
                                                                <img src={cartProd.image} alt="" />
                                                            </div>
                                                        </th>
                                                        <td className="align-middle">{cartProd.title}</td>
                                                        <td className="align-middle">{ConvertCurrency(cartProd.price)}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th scope="row" colSpan="2" className="text-end">Total:</th>
                                                <td><b>{ConvertCurrency(totalCart)}</b></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                : <h6>Seu carrinho está vazio</h6>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { inCart, CartButton, CartModal };