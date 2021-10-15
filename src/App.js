import {useSelector} from 'react-redux'
import './App.css';
import Product from './product/product';
import Filter from './filter/filter';
import Search from './search/search';
import Sort from './sort/sort';
import Basket from './basket/basket';
import Pages from './pages/pages';
import ApproveModal from './approveModal/approveModal'
import logo from './assets/logo.png'

function App() {
  const searchText = useSelector((state) => state.productSlice.searchText)
  return (
    <div className="App">
      <div className="head-grid">
        <div className="logo">
         <img className="logoImg" src={logo} alt="logo"/>
        </div>
        <div className="search">
          <Search />
        </div>
        <div className="basket">
          <Basket />
        </div>
      </div>

      <div className="sub-head-grid">
        <div className="headText">
          <h2>Telefon</h2>
          <div className="sameLine">
            <p className="searchTitle">Aranan Kelime:</p>
            <p className="searchText">{searchText}</p>
          </div>
        </div>
        <div className="sort">
          <Sort />
        </div>
      </div>

      <div className="body-grid">
        <ApproveModal/>
        <div className="filter">
          <Filter />
        </div>
        <div className="products">
          <Product />
        </div>
      </div>
      <div className="footer-grid">
        <div className="pages">
          <Pages />
        </div>
      </div>
    </div>
  );
}

export default App;
