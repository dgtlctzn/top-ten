import React, { useEffect, useRef, FormEvent, ChangeEvent } from "react";
import {useSelector} from "react-redux";
import "./SearchBar.css";
import RootState from "../../reducers/interface";

interface Props {
  page: string;
  search: string;
  handleSearchSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({
  page,
  search,
  handleSearchSubmit,
  handleSearchChange,
}: Props) => {
  const searchEl = useRef<HTMLInputElement | null>(null);

  const searching = useSelector((state: RootState) => state.searchStatusReducer);

  useEffect(() => {
    if (searchEl) {
      searchEl?.current?.focus();
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
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden"></span>
        </div>
        ) : "Search"
}
      </button>
    </form>
  );
};

export default SearchBar;
