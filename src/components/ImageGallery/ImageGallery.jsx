import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ pics, showModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {pics.map(pic => {
        return (
          <ImageGalleryItem
            key={pic.id}
            webformatURL={pic.webformatURL}
            tags={pic.tags}
            largeImageURL={pic.largeImageURL}
            showModal={showModal}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  pics: PropTypes.arrayOf(PropTypes.object).isRequired,
  showModal: PropTypes.func.isRequired,
};
