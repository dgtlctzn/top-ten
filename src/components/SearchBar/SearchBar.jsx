import React from "react";

const SearchBar = ({ search, handleSearchSubmit, handleSearchChange }) => {
  return (
    <form onSubmit={handleSearchSubmit} className="text-center">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Search Albums
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default SearchBar;
