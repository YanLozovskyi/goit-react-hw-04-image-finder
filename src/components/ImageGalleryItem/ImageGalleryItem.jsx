import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, onImgClick }) => (
  <li className={css.ImageGalleryItem} onClick={onImgClick}>
    <img className={css['ImageGalleryItem-image']} src={src} alt={alt} />
  </li>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onImgClick: PropTypes.func.isRequired,
};
