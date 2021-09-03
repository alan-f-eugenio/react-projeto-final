function CartButton(props) {
    return (
        <button className={`btn btn-lg ${props.isActive ? 'btn-outline-danger' : 'btn-outline-light'}`} onClick={() => props.handleButonClick()}>
            {props.isActive ? <i className='bi bi-bag-x'></i> : <i className='bi bi-bag-plus'></i>}
        </button>
    );
}

export default CartButton;