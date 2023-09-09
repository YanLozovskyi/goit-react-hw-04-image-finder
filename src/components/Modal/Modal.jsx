import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { modalImg, modalTags } = this.props;

    return createPortal(
      <div className={css.Modal__backdrop} onClick={this.handleBackdropClick}>
        <div className={css.Modal__content}>
          <img src={modalImg} alt={modalTags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
