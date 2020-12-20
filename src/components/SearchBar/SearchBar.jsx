import React, { useEffect, useRef } from "react";
import {useSelector} from "react-redux";
import "./SearchBar.css";

const SearchBar = ({
  page,
  search,
  handleSearchSubmit,
  handleSearchChange,
}) => {
  const searchEl = useRef(null);

  const searching = useSelector(state => state.searchStatusReducer);

  useEffect(() => {
    if (searchEl) {
      searchEl.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSearchSubmit} className="text-center">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          {`Search ${page}`}
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={search}
          onChange={handleSearchChange}
          ref={searchEl}
        />
      </div>

      <button type="submit" className="btn btn-primary search-button">
        {searching ? 
         (
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden"></span>
        </div>
        ) : "Search"
}
      </button>
    </form>
  );
};

export default SearchBar;
