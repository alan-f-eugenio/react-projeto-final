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

export { CartButton, inCart };