import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToBasket } from '../reducer';
import './product.css'

function Product() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productSlice.productsToShow);

    return (
        <div className="products">
            {
                products.map((item) =>
                    <div className="product" key={item.name}>
                        <img src={item.img} alt="product"/>
                        <p className="name"> {item.name}</p>
                        <div className="sameLine">
                            <p className="title">Marka: </p>
                            <p className="description">{item.brand}</p>
                        </div>
                        <div className="sameLine">
                            <p className="title">Renk: </p>
                            <p className="description">{item.color}</p>
                        </div>
                        <p className="price"> {item.price} TL</p>
                        <button
                            aria-label="Sepet"
                            onClick={() => {
                                if (!item.added)
                                    dispatch(addToBasket(item))
                            }}
                            className={item.added ? "disabled" : ""}
                        >
                            {item.added ? 'Bu ürünü sepete ekleyemezsiniz' : 'Sepete Ekle'}
                        </button>
                    </div>
                )}
        </div>
    );
}

export default Product;
