import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendItemToApproval } from '../reducer';
import './basket.css'

function Basket() {
    const productsInBasket = useSelector((state) => state.productSlice.inBasket);
    const dispatch = useDispatch();
    return (
        <div className="basket">
            <span>Sepetim</span>
            {productsInBasket.length > 0 &&
                <button className="itemNumber">{productsInBasket.length}</button>
            }
            <div className="basketList">
                {productsInBasket.length > 0 ?
                    productsInBasket.map((item) =>
                        <div className="basketItems" key={item.name}>
                            <img src={item.img} alt="img" />
                            <div className="item">
                                <p>{item.name}</p>
                                <button onClick={() => dispatch(sendItemToApproval(item.name))}> Kaldır </button>
                            </div>
                        </div>
                    ) :
                    <p>Sepetinizde ürün bulunmamaktadır.</p>
                }
            </div>
        </div>
    );
}

export default Basket;
