import { LoadMoreButton } from './Button.styled';

import PropTypes from 'prop-types';

export const Button = ({ onLoadMore, showed }) => {
  const handleIncreaseAmountOfPage = evt => {
    onLoadMore();
  };

  return (
    showed && (
      <LoadMoreButton type="button" onClick={handleIncreaseAmountOfPage}>
        Load more
      </LoadMoreButton>
    )
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  showed: PropTypes.bool.isRequired,
};
