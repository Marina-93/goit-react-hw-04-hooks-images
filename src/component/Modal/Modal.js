import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root')

export default function Modal({ onClose, src, alt }) {

    useEffect(() => {
        window.addEventListener('click', onCloseByClick)
        window.addEventListener('keydown', onCloseByKeydown)
        return () => {
            window.removeEventListener('keydown', onCloseByKeydown)
        }
    },[])

    const onCloseByClick = (e) => {
        if (e.target.nodeName === 'DIV') {
            onClose()
        }
    }

    const onCloseByKeydown = (e) => {
        if (e.code === 'Escape') {
            onClose()
        }
    }
    
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