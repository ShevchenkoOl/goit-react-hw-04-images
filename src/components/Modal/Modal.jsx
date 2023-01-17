//import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ src, alt, closeModal }) => {
  useEffect(() => {
    const onEscPress = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onEscPress);

    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  }, [closeModal]);

  const onkBackdropClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

    return createPortal(
      <div className={css.Overlay} onClick={onkBackdropClick}>
        <div className={css.Modal}>
          <img src={src} alt={alt} />
          <p>{alt}</p>
        </div>
      </div>,
      modalRoot
    );
  }

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
