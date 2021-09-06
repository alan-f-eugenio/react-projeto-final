import React, { useRef, useEffect, useState } from "react";

function inCart(props) {
    return props.cart.find(id => id === props.productId);
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
        <button className={`btn btn-lg ${props.isActive ? 'btn-outline-danger' : 'btn-outline-light'}`} onClick={() => props.handleButonClick()}>
            <i ref={hoverRef} className={`bi ${props.isActive ? (isHovered ? 'bi-bag-x-fill' : 'bi-bag-x') : isHovered ? 'bi-bag-plus-fill' : 'bi-bag-plus'}`}></i>
        </button>
    );
}

function CartModal(props) {
    return (
        <div>
            <div className="modal fade">
                <div className="modal-dialog modal-lg">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myLargeModalLabel">Carrinho</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span>×</span>
                        </button>
                    </div>
                    <div className="modal-content">
                        ...
                    </div>
                </div>
            </div>
        </div>
    );
}

export { inCart, CartButton, CartModal };