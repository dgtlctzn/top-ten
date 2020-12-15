import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSong, delSong, addToken } from "../../actions";
import { NavLink } from "react-router-dom";
import API from "../../utils/API";

const Songs = () => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const songList = useSelector((state) => state.songReducer);
  const token = useSelector((state) => state.tokenReducer);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSong(input));
    setInput("");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    dispatch(delSong(e.target.name));
    setInput("");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    console.log(search)
    if (!token) {
      API.getToken()
        .then((tokenRes) => {
          console.log(tokenRes);
          dispatch(addToken(tokenRes.data.access_token));
          API.searchSpotify(search, tokenRes.data.access_token)
            .then((searchRes) => {
              console.log(searchRes);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      API.searchSpotify(search, token)
        .then((searchRes) => {
          console.log(searchRes);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <h1>Songs</h1>
      <NavLink to="/movies">Movies</NavLink>

      <form onSubmit={handleSearchSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Search Music
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

      <form className="input-group" onSubmit={handleSubmit} value={input}>
        <span className="input-group-text">With textarea</span>
        <input
          type="text"
          onChange={handleInputChange}
          className="form-control"
        ></input>
        <button type="submit">Submit</button>
      </form>
      <div>
        <ul>
          {songList.map((song, index) => (
            <li key={index}>
              {song}
              <button name={song} onClick={handleDelete}>
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Songs;
