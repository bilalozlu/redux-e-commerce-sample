import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sort } from '../reducer';
import './sort.css'

function Sort() {
    const dispatch = useDispatch();
    const sortMethod = useSelector((state) => state.productSlice.sortMethod);

    return (
        <div className="sort">
            <select onChange={(e) => dispatch(sort(e.target.value))}>
                <option disabled selected hidden>Sıralama</option>
                <option selected={sortMethod === 'lowPrice'} value = 'lowPrice'>{sortMethod === 'lowPrice' && '\u2713 '}En Düşük Fiyat</option>
                <option selected={sortMethod === 'highPrice'} value = 'highPrice'>{sortMethod === 'highPrice' && '\u2713 '} En Yüksek Fiyat</option>
                <option selected={sortMethod === 'charA'} value = 'charA'>{sortMethod === 'charA' && '\u2713 '}İsme Göre (A{'>'}Z)</option>
                <option selected={sortMethod === 'charZ'} value = 'charZ'>{sortMethod === 'charZ' && '\u2713 '}İsme Göre (Z{'>'}A)</option>
            </select>
        </div>
    );
}

export default Sort;
