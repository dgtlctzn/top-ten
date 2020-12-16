import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAlbums, delSong, addToken, searchAlbums } from "../../actions";
import { NavLink } from "react-router-dom";
import API from "../../utils/API";
import Card from "../../components/Card/Card";

const Albums = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const savedAlbums = useSelector((state) => state.savedAlbumsReducer);
  const token = useSelector((state) => state.tokenReducer);
  const searchedAlbums = useSelector((state) => state.albumReducer);

  useEffect(() => {
    const savedAsString = JSON.stringify(savedAlbums)
    for (const [key, value] of Object.entries(localStorage)) {
      if (savedAsString.includes(key)) {
        console.log(key)
      } else {
        dispatch(saveAlbums({ name: key, image: value }));
      }
    }
  }, []);

  // const handleInputChange = (e) => {
  //   setInput(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(addSong(input));
  //   setInput("");
  // };

  // const handleDelete = (e) => {
  //   e.preventDefault();

  //   dispatch(delSong(e.target.name));
  //   setInput("");
  // };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const searchSpotifyAlbums = (search, token) => {
    API.searchSpotify(search, token)
      .then((searchRes) => {
        console.log(searchRes);
        const albums = searchRes.data.albums.items;
        const found = [];
        for (let i = 0; i < 10; i++) {
          const item = {
            name: albums[i].name ? albums[i].name : "No Artist Name",
            image: albums[i].images[2]
              ? albums[i].images[2].url
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/1024px-Disque_Vinyl.svg.png",
          };
          found.push(item);
        }
        dispatch(searchAlbums(found));
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
          searchSpotifyAlbums(search, tokenRes.data.access_token);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      searchSpotifyAlbums(search, token);
    }
  };

  const addAlbum = (e) => {
    console.log('click')
    const { name, value } = e.target;
    if (!localStorage.getItem(name)) {
      localStorage.setItem(name, value);
    }
    dispatch(
      saveAlbums({
        name: name,
        image: value,
      })
    );
  };

  const deleteAlbum = (e) => {};

  return (
    <div className="container">
      <NavLink to="/movies">Movies</NavLink>

      <h1 className="text-center">Songs</h1>
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
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
        </div>
      </div>

      {/* <form className="input-group" onSubmit={handleSubmit} value={input}>
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
      </div> */}
      <div className="row">
        <div className="col-sm-6">
          <h2>Top Ten</h2>
          <ul>
            {savedAlbums.map((album, index) => (
              <Card
                key={`search result ${index + 1}`}
                {...album}
                deleteAlbum={deleteAlbum}
              />
            ))}
          </ul>
        </div>
        <div className="col-sm-6">
          <h2>Search Results</h2>

          <ul>
            {searchedAlbums.map((album, index) => (
              <Card
                key={`search result ${index + 1}`}
                {...album}
                addAlbum={addAlbum}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Albums;
