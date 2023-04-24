import { LoadMoreButton } from './Button.styled';
import { useRef } from 'react';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore, showed }) => {
  const btnRef = useRef();

  const handleIncreaseAmountOfPage = evt => {
    onLoadMore();
    updateScroll(btnRef.current.offsetTop);
  };

  const updateScroll = height => {
    return window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  };
  /// Почему не работает метод ?

  return (
    showed && (
      <LoadMoreButton
        type="button"
        ref={btnRef}
        onClick={handleIncreaseAmountOfPage}
      >
        Load more
      </LoadMoreButton>
    )
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  showed: PropTypes.bool.isRequired,
};
