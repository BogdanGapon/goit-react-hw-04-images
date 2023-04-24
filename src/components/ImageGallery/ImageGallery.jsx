import { ImageList } from './ImageGallery.styled';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ data, query }) => {
  const [largePhoto, setLargePhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const closeModal = evt => {
    setShowModal(false);
  };

  const getLargePhoto = largePhoto => {
    setLargePhoto(largePhoto);
    setShowModal(true);
  };

  return (
    <>
      <ImageList>
        <ImageGalleryItem getLargePhoto={getLargePhoto} />
      </ImageList>
      {showModal && (
        <Modal onCloseModal={closeModal}>
          <img src={largePhoto} alt={query} />
        </Modal>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.array,
};
