import React from 'react';
import { useDispatch } from 'react-redux';
import { saveFilter, filterAndSearch } from '../reducer';
import './search.css'

function Search() {
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        if (e.target.value.length > 1) {
            dispatch(saveFilter({type:'search', value:e.target.value}));
            dispatch(filterAndSearch());
        }
        else {
            dispatch(saveFilter({type:'search', value:''}));
            dispatch(filterAndSearch());
        }
    }

     return (
        <div>
            <input
                onChange={handleSearch}
                type="text"
                placeholder={'\u{1F50D} Ara'}
            />
        </div>
    );
}

export default Search;
