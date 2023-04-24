import { useState } from 'react';
import {
  HeaderSearchbar,
  Form,
  SearchInput,
  SearchFormButton,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ getQueryandResetPageAndData, page }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = evt => {
    const { value } = evt.currentTarget;

    setQuery(value.toLocaleString());
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    if (query.trim() === '') {
      return;
    }
    getQueryandResetPageAndData(query);
    resetState();
  };

  const resetState = () => {
    setQuery('');
  };
  return (
    <HeaderSearchbar>
      <Form onSubmit={handleFormSubmit}>
        <SearchFormButton type="submit">Search</SearchFormButton>

        <SearchInput
          onChange={handleInputChange}
          type="text"
          name="query"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </HeaderSearchbar>
  );
};

Searchbar.propTypes = {
  getQueryandResetPageAndData: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};
