import { createSlice } from '@reduxjs/toolkit'
import { allProducts } from './assets/products'

export const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
        page: 1,
        colorFilter: "",
        brandFilter: "",
        searchText: "",
        sortMethod: "",
        approveModal: false,
        itemToRemove: "",
        listOfAllProductsAtDataBase: localStorage.getItem('productNamesInBasket') ? allProducts.map((a) => localStorage.getItem('productNamesInBasket').includes(a.name) ? {...a, added: true} : a) : allProducts,
        inBasket: localStorage.getItem('productNamesInBasket') ? allProducts.filter((a) => localStorage.getItem('productNamesInBasket').includes(a.name)) : [],
        listOfProducts: localStorage.getItem('productNamesInBasket') ? allProducts.map((a) => localStorage.getItem('productNamesInBasket').includes(a.name) ? {...a, added: true} : a) : allProducts,
        productsToShow: localStorage.getItem('productNamesInBasket') ? allProducts.map((a) => localStorage.getItem('productNamesInBasket').includes(a.name) ? {...a, added: true} : a).slice(0, 12) : allProducts.slice(0, 12),
        maxPage: allProducts.length % 12 === 0 ? allProducts.length / 12 : parseInt(allProducts.length / 12) + 1,
    },
    reducers: {
        addToBasket: (state, action) => {
            let index = state.listOfAllProductsAtDataBase.findIndex(x => x.name === action.payload.name);
            if (index >= 0) {
                state.listOfAllProductsAtDataBase[index].added = true;
            }
            index = state.listOfProducts.findIndex(x => x.name === action.payload.name);
            if (index >= 0) {
                state.listOfProducts[index].added = true;
            }
            let x = localStorage.getItem('productNamesInBasket') ?? '';
            localStorage.setItem('productNamesInBasket', x + action.payload.name + ',');

            state.inBasket.push(action.payload);
            state.productsToShow = state.listOfProducts.slice((state.page - 1) * 12, state.page * 12);
        },
        sendItemToApproval: (state, action) => {
            state.approveModal = true;
            state.itemToRemove = action.payload;
        },
        cancelRemoval: (state) => {
            state.approveModal = false;
            state.itemToRemove = "";
        },
        removeFromBasket: (state, action) => {
            state.approveModal = false;
            let index = state.listOfAllProductsAtDataBase.findIndex(x => x.name === action.payload);
            if (index >= 0) {
                state.listOfAllProductsAtDataBase[index].added = false;
            }
            index = state.listOfProducts.findIndex(x => x.name === action.payload);
            if (index >= 0) {
                state.listOfProducts[index].added = false;
            }
            index = state.inBasket.findIndex(x => x.name === action.payload);
            if (index >= 0) {
                state.inBasket.splice(index, 1);
            }

            let x = localStorage.getItem('productNamesInBasket') ?? '';
            localStorage.setItem('productNamesInBasket', x.replace(action.payload + ',', ''));

            state.productsToShow = state.listOfProducts.slice((state.page - 1) * 12, state.page * 12);
        },
        sort: (state, action) => {
            switch (action.payload) {
                case 'lowPrice':
                    state.listOfProducts.sort((a, b) => (a.price - b.price));
                    break;
                case 'highPrice':
                    state.listOfProducts.sort((a, b) => (b.price - a.price));
                    break;
                case 'charA':
                    state.listOfProducts.sort((a, b) => (a.name > b.name ? 1 : -1));
                    break;
                case 'charZ':
                    state.listOfProducts.sort((a, b) => (a.name < b.name ? 1 : -1));
                    break;
                default:
                    break;
            }
            state.page = 1;
            state.productsToShow = state.listOfProducts.slice(0, 12);
            state.sortMethod = action.payload;
        },
        changePage: (state, action) => {
            state.page = action.payload;
            state.productsToShow = state.listOfProducts.slice((action.payload - 1) * 12, action.payload * 12);
        },
        saveFilter: (state, action) => {
            switch (action.payload.type) {
                case 'color':
                    if (state.colorFilter === action.payload.value) {
                        state.colorFilter = "";
                    }
                    else {
                        state.colorFilter = action.payload.value;
                    }
                    break;
                case 'brand':
                    if (state.brandFilter === action.payload.value) {
                        state.brandFilter = "";
                    }
                    else {
                        state.brandFilter = action.payload.value;
                    }
                    break;
                case 'search':
                    state.searchText = action.payload.value;
                    break;
                default:
                    break;
            }
        },
        filterAndSearch: (state) => {
            let filteredProducts = state.listOfAllProductsAtDataBase;
            if (state.colorFilter.length > 0) {
                filteredProducts = filteredProducts.filter((a) => a.color === state.colorFilter);
            }
            if (state.brandFilter.length > 0) {
                filteredProducts = filteredProducts.filter((a) => a.brand === state.brandFilter);
            }
            if (state.searchText.length > 0) {
                filteredProducts = filteredProducts.filter((a) => a.name.toLowerCase().includes(state.searchText.toLowerCase()));
            }
            state.listOfProducts = filteredProducts;
            state.maxPage = filteredProducts.length % 12 === 0 ? filteredProducts.length / 12 : parseInt(filteredProducts.length / 12) + 1;
            state.page = 1;
            state.productsToShow = filteredProducts.slice(0, 12);
        },
    },
})

export const { addToBasket, sendItemToApproval, cancelRemoval, removeFromBasket, sort, saveFilter, filterAndSearch, changePage } = productSlice.actions

export default productSlice.reducer