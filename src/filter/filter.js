import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sort, saveFilter, filterAndSearch } from '../reducer';
import './filter.css'

function Filter() {
  const dispatch = useDispatch();
  const listOfProducts = useSelector((state) => state.productSlice.listOfProducts);
  const sortMethod = useSelector((state) => state.productSlice.sortMethod);
  const colorFilter = useSelector((state) => state.productSlice.colorFilter);
  const brandFilter = useSelector((state) => state.productSlice.brandFilter);

  const [colorNumbers, setColorNumbers] = useState([]);
  const [brandNumbers, setBrandNumbers] = useState([]);

  useEffect(() => {
    setColorNumbers([]);
    setBrandNumbers([]);
    let colorNumbersTemp = [];
    let brandNumbersTemp = [];
    for (let i = 0; i < listOfProducts.length; i++) {
      let indexBrand = brandNumbersTemp.findIndex(x => x.name === listOfProducts[i].brand);
      if (indexBrand >= 0) {
        brandNumbersTemp[indexBrand].number += 1;
      }
      else {
        brandNumbersTemp.push({ name: listOfProducts[i].brand, number: 1 });
      }

      let indexColor = colorNumbersTemp.findIndex(x => x.name === listOfProducts[i].color);
      if (indexColor >= 0) {
        colorNumbersTemp[indexColor].number += 1;
      }
      else {
        colorNumbersTemp.push({ name: listOfProducts[i].color, number: 1 });
      }
    }
    setBrandNumbers(brandNumbersTemp);
    setColorNumbers(colorNumbersTemp);
  }, [listOfProducts]);

  const handleFilter = (type, value) => {
    dispatch(saveFilter({ type: type, value: value }));
    dispatch(filterAndSearch());
  };

  return (
    <div className="filter">
      <p className="filterTitle">Renk</p>
      {colorNumbers.map((one) =>
        <p className={`${ colorFilter === one.name && 'chosen'} item`} key={one.name} onClick={() => handleFilter('color', one.name)}> {one.name} ({one.number})</p>
      )}

      <p className="filterTitle">Sıralama</p>
      <p className={`${ sortMethod === 'lowPrice' && 'chosen'} item`} onClick={() => dispatch(sort('lowPrice'))}>En Düşük Fiyat</p>
      <p className={`${ sortMethod === 'highPrice' && 'chosen'} item`} onClick={() => dispatch(sort('highPrice'))}>En yüksek Fiyat</p>
      <p className={`${ sortMethod === 'charA' && 'chosen'} item`} onClick={() => dispatch(sort('charA'))}>İsme Göre (A{'>'}Z)</p>
      <p className={`${ sortMethod === 'charZ' && 'chosen'} item`} onClick={() => dispatch(sort('charZ'))}>İsme Göre (Z{'>'}A)</p>

      <p className="filterTitle">Marka</p>
      {brandNumbers.map((one) =>
        <p className={`${ brandFilter === one.name && 'chosen'} item`} key={one.name} onClick={() => handleFilter('brand', one.name)}> {one.name} ({one.number})</p>
      )}
    </div>
  );
}

export default Filter;
