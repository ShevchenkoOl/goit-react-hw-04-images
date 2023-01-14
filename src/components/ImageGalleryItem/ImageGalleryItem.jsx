import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  showModal,
}) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => showModal(largeImageURL, tags)}>
      <div>
        <img src={webformatURL} alt={tags} loading="lazy" />
      </div>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};
