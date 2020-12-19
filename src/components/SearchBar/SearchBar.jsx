import React, {useEffect, useRef} from "react";

const SearchBar = ({ page, search, handleSearchSubmit, handleSearchChange }) => {

  const searchEl = useRef(null);

  useEffect(() => {
    if(searchEl) {
      searchEl.current.focus();
    }
  }, [])

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

      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
