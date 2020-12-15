import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSong, delSong, addToken, searchArtists } from "../../actions";
import { NavLink } from "react-router-dom";
import API from "../../utils/API";

const Songs = () => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const songList = useSelector((state) => state.songReducer);
  const token = useSelector((state) => state.tokenReducer);
  const searchedArtists = useSelector((state) => state.artistReducer);

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

    dispatch(delSong(e.target.name));
    setInput("");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const searchSpotifyArtists = (search, token) => {
    API.searchSpotify(search, token)
      .then((searchRes) => {
        const artists = searchRes.data.artists.items;
        const found = [];
        for (let i = 0; i < 10; i++) {
          const item = {
            name: artists[i].name ? artists[i].name : "",
            image: artists[i].images[2] ? artists[i].images[2].url : "",
          };
          found.push(item);
        }
        dispatch(searchArtists(found));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      API.getToken()
        .then((tokenRes) => {
          dispatch(addToken(tokenRes.data.access_token));
          searchSpotifyArtists(search, tokenRes.data.access_token);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      searchSpotifyArtists(search, token);
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
      <div>
        <ul>
          {searchedArtists.map((artist, index) => (
            <li key={index}>
              {artist.name}
              <img src={artist.image} alt={artist.name} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Songs;
