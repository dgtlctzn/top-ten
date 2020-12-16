import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAlbums, delAlbum, addToken, searchAlbums, sendAlbumUp } from "../../actions";
import { NavLink } from "react-router-dom";
import API from "../../utils/API";
import Card from "../../components/Card/Card";

const Albums = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const savedAlbums = useSelector((state) => state.savedAlbumsReducer);
  // const sortedAlbums = savedAlbums.sort((a, b) => a.index - b.index);

  const token = useSelector((state) => state.tokenReducer);
  const searchedAlbums = useSelector((state) => state.albumReducer);

  useEffect(() => {
    const savedAsString = JSON.stringify(savedAlbums)
    let i = 0;
    for (const [key, value] of Object.entries(localStorage)) {
      if (savedAsString.includes(key)) {
        console.log(key)
      } else {
        const image = JSON.parse(value).image
        dispatch(saveAlbums({ name: key, image: image, index: i}));
        i++;
      }
    }
  }, []);

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
    const { name, value } = e.target;
    if (!localStorage.getItem(name)) {
      const data = JSON.stringify({
        index: localStorage.length,
        image: value
      })
      localStorage.setItem(name, data);
    }
    dispatch(
      saveAlbums({
        name: name,
        image: value,
        index: localStorage.length - 1
      })
    );
  };

  const deleteAlbum = (e) => {
    const { name } = e.target;
    localStorage.removeItem(name)
    dispatch(delAlbum({
      name: name,
    }));
  };

  const handleAlbumUp = (e) => {
    const {name, value} = e.target;
    dispatch(sendAlbumUp(name, value))
  }

  return (
    <div className="container">
      <NavLink to="/movies">Movies</NavLink>

      <h1 className="text-center">Albums</h1>
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
      <div className="row">
        <div className="col-sm-6">
          <h2 className="text-center">Top Ten</h2>
          <ul>
            {savedAlbums.map((album, index) => (
              <Card
                key={`album ${index + 1}`}
                {...album}
                deleteAlbum={deleteAlbum}
                handleAlbumUp={handleAlbumUp}
                index={index}
              />
            ))}
          </ul>
        </div>
        <div className="col-sm-6">
          <h2 className="text-center">Search Results</h2>

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
