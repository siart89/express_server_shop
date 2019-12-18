import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SearchForm, SearchInput } from '../headerStyles';
import setSearchText from '../../../store/actions/setSearchText';

const SearchField = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const handleSetSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchText(searchValue));
  };

  return (
    <SearchForm onSubmit={handleSetSearch}>
      <SearchInput
        isFocus={isFocus}
        type="text"
        placeholder="Поиск"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </SearchForm>
  );
};

export default SearchField;
