import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

export default function ImageGalleryItem({ id, webformatURL, tags, largeImageURL, showModal, data}) {
    return (
        <li className="ImageGalleryItem" key={id}
            onClick={() => data(largeImageURL, tags)}>
            <img
                className="ImageGalleryItem-image"
                src={webformatURL}
                alt={tags}
                onClick={showModal}
            />
        </li>)
}

ImageGalleryItem.propTypes = {
    id: PropTypes.number,
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
    largeImageURL: PropTypes.string,
    showModal: PropTypes.func,
    data: PropTypes.func,
}