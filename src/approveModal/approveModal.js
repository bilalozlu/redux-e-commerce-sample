import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromBasket, cancelRemoval } from '../reducer';
import Modal from 'react-modal'
import './approveModal.css'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#eee'
    },
};

function ApproveModal() {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.productSlice.approveModal);
    const itemToRemove = useSelector((state) => state.productSlice.itemToRemove);

    return (
        <div>
            <Modal
                isOpen={isModalOpen}
                style={customStyles}>
                <p className="modalTitle">Ürünü silmek istediğinize emin misiniz?</p>
                <div className="button-area">
                    <button className="approve" onClick={() => dispatch(removeFromBasket(itemToRemove))}>EVET</button>
                    <button className="cancel" onClick={() => dispatch(cancelRemoval())}>HAYIR</button>
                </div>
            </Modal >
        </div>
    );
}

export default ApproveModal;
