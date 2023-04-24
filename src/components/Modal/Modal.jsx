import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');
export const Modal = ({ onCloseModal, children }) => {
  const handleCloseModalByEscape = evt => {
    if (evt.code === 'Escape') {
      onCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleCloseModalByEscape);

    return () => {
      window.removeEventListener('keydown', handleCloseModalByEscape);
    };
  });

  const handleCloseModalClick = evt => {
    if (evt.currentTarget === evt.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleCloseModalClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};
