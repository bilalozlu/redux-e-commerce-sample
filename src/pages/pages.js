import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../reducer';
import './pages.css'

function Pages() {
    const dispatch = useDispatch();
    const page = useSelector((state) => state.productSlice.page);
    const maxPage = useSelector((state) => state.productSlice.maxPage);
    let pageList = [];
    for (var i =1; i <= maxPage; i++) {
        pageList.push(i);
    };

    return (
        <div className="pages">
            {page > 1 &&
                <span onClick={() => dispatch(changePage(page - 1))}>{"<"}</span>
            }
            
            { pageList.map((i) =>
                <span className={page === i ? 'selected' : ''} key={i} onClick={() => dispatch(changePage(i))}> {i} </span>
            )}

            {page < maxPage &&
                <span onClick={() => dispatch(changePage(page + 1))}>{">"}</span>
            }
        </div>
    );
}

export default Pages;
