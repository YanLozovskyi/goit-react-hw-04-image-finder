import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGallery = ({ results, onClick }) => (
  <ul className={css.ImageGallery}>
    {results.map(({ id, webformatURL, tags, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        src={webformatURL}
        alt={tags}
        onImgClick={() => {
          onClick(largeImageURL, tags);
        }}
      />
    ))}
  </ul>
);

export default ImageGallery;

ImageGallery.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
