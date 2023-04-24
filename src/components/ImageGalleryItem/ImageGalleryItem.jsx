import { Img, ImageItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { useMyContext } from 'hooks/useDataContext';
export const ImageGalleryItem = ({ getLargePhoto }) => {
  const foundPhoto = largeImageURL => getLargePhoto(largeImageURL);
  const data = useMyContext();
  return data.map(data => {
    const { id, webformatURL, tags, largeImageURL } = data;
    return (
      <ImageItem key={id}>
        <Img
          src={webformatURL}
          alt={tags}
          onClick={() => foundPhoto(largeImageURL)}
        />
      </ImageItem>
    );
  });
};

ImageGalleryItem.propTypes = {
  getLargePhoto: PropTypes.func.isRequired,
};
