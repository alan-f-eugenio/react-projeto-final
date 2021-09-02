function CartButton(props) {
    return (
        <button className={`${props.isActive ? 'remove' : ''}`} onClick={() => props.handleButonClick()}>
            {props.isActive ? 'Remover do carrinho' : 'Adicionar ao carrinho'}
        </button>
    );
}

export default CartButton;