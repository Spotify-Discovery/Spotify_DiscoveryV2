import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Modal = () => {
  const modal = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  return (
    <>
      {modal.isOpen &&
        <div id="modal" className="modal">
          Modal
        </div>}
    </>
  )
}

export default Modal;