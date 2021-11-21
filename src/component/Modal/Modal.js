import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root')

export default function Modal({ onClose, src, alt }) {
    const onCloseByClick = (e) => {
        if (e.target.nodeName === 'DIV') {
            onClose()
        }
    }

    const onCloseByKedown = (e) => {
        if (e.code === 'Escape') {
            onClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', onCloseByClick)
        window.addEventListener('keydown', onCloseByKedown)
        return (
            window.removeEventListener('keydown', onCloseByKedown)
        )
    })
    
    return createPortal(
            <div className="Overlay" onClose={onClose}>
                <div className="Modal">
                    <img
                        src={src}
                        alt={alt}
                    />
                </div>
            </div>,
            modalRoot
        )
}

Modal.propTypes = {
  onClose: PropTypes.func,
}