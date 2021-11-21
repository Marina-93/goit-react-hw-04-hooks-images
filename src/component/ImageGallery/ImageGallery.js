import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import './ImageGallery.css'

export default function ImageGallery({images,showModal, modalData}) {
    return (
        <ul className="ImageGallery">
            {images.map(({ id, webformatURL, tags, largeImageURL }) =>
                <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    tags={tags}
                    largeImageURL={largeImageURL}
                    data={modalData}
                    showModal={showModal}
                />
            )}
        </ul>
    )
}

ImageGalleryItem.propTypes = {
    images: PropTypes.array,
    showModal: PropTypes.func,
    modalData: PropTypes.func,
}