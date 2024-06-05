import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="input-group mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search employees..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
