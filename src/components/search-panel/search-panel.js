import React from 'react';

import './search-panel.css';

const SearchPanel = props => {
  const { onFiltered } = props
  return (<input
    type="text"
    className="form-control search-input"
    placeholder="type to search"
    onChange={(e) => onFiltered(e.target.value)}
  />);
}


export default SearchPanel;