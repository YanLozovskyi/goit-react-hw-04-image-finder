import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ modalImg, modalTags, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Modal__backdrop} onClick={handleBackdropClick}>
      <div className={css.Modal__content}>
        <img src={modalImg} alt={modalTags} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalImg: PropTypes.string.isRequired,
  modalTags: PropTypes.string.isRequired,
};

// const Modal = ({ modalImg, modalTags, onClose }) => {
//   useEffect(() => {
//     window.addEventListener('keydown', handleKeyDown);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   });

//   const handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       onClose();
//     }
//   };

//   const handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       onClose();
//     }
//   };

//   return createPortal(
//     <div className={css.Modal__backdrop} onClick={handleBackdropClick}>
//       <div className={css.Modal__content}>
//         <img src={modalImg} alt={modalTags} />
//       </div>
//     </div>,
//     modalRoot
//   );
// };
