import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  saveMovies,
  delMovie,
  // addToken,
  searchMovies,
  sendMovieUp,
  sendMovieDown,
} from "../../actions";
import Nav from "../../components/Nav/Nav";
import SearchBar from "../../components/SearchBar/SearchBar";
import API from "../../utils/API";
import Card from "../../components/Card/Card";

const Movies = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const savedMovies = useSelector((state) => state.savedMoviesReducer);
  const sortedMovies = savedMovies.sort((a, b) => a.index - b.index);

  // const token = useSelector((state) => state.tokenReducer);
  const searchedMovies = useSelector((state) => state.movieReducer);

  useEffect(() => {
    const savedAsString = JSON.stringify(savedMovies);
    for (const [key, value] of Object.entries(localStorage)) {
      if (!savedAsString.includes(key)) {
        const parsedVal = JSON.parse(value);
        dispatch(
          saveMovies({
            name: key,
            image: parsedVal.image,
            index: parsedVal.index,
          })
        );
      }
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // const searchSpotifyAlbums = (search, token) => {
  //   API.searchSpotify(search, token)
  //     .then((searchRes) => {
  //       console.log(searchRes);
  //       const albums = searchRes.data.albums.items;
  //       const found = [];
  //       for (let i = 0; i < 10; i++) {
  //         const item = {
  //           name: albums[i].name ? albums[i].name : "No Artist Name",
  //           image: albums[i].images[2]
  //             ? albums[i].images[2].url
  //             : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/1024px-Disque_Vinyl.svg.png",
  //         };
  //         found.push(item);
  //       }
  //       dispatch(searchAlbums(found));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    API.searchImdb(search)
    .then((searchRes) => {
      console.log(searchRes)
      const movies = searchRes.data.results;
      const found = [];
      for (let i = 0; i < 10; i++) {
        const item = {
          name: movies[i].title ? movies[i].title : "No Movie Name",
          image: movies[i].image
            ? movies[i].image.url
            : "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_497562.png&f=1&nofb=1",
        };
        found.push(item);
      }
      console.log(found)
      dispatch(searchMovies(found));
    })
    .catch((err) => {
      console.log(err);
    });
    // if (!token) {
    //   API.getToken()
    //     .then((tokenRes) => {
    //       dispatch(addToken(tokenRes.data.access_token));
    //       searchSpotifyAlbums(search, tokenRes.data.access_token);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } else {
    //   searchSpotifyAlbums(search, token);
    // }
  };

  const addMovie = (e) => {
    const { name, value } = e.target;
    if (!localStorage.getItem(name)) {
      const data = JSON.stringify({
        index: localStorage.length,
        image: value,
      });
      localStorage.setItem(name, data);
    }
    dispatch(
      saveMovies({
        name: name,
        image: value,
        index: localStorage.length - 1,
      })
    );
  };

  const deleteMovie = (e) => {
    const { name } = e.target;
    dispatch(
      delMovie({
        name: name,
      })
    );
    // localStorage.clear();
    let i = 0;
    for (const item of savedMovies) {
      localStorage.removeItem(item.name);
      if (item.name !== name) {
        localStorage.setItem(
          item.name,
          JSON.stringify({
            index: i,
            image: item.image,
          })
        );
        i++;
      }
    }
  };

  const sortStorage = (index, saved, increase = true) => {
    let change;
    increase ? (change = -1) : (change = 1);
    // localStorage.clear();
    for (const item of saved) {
      let newIndex;
      if (item.index === index) {
        newIndex = index;
      } else if (item.index === index + change) {
        newIndex = index + change;
      } else {
        newIndex = item.index;
      }
      localStorage.removeItem(item.name);
      localStorage.setItem(
        item.name,
        JSON.stringify({
          index: newIndex,
          image: item.image,
        })
      );
    }
  };

  const handleMovieUp = (e) => {
    const name = e.target.name;
    const index = parseInt(e.target.value);
    if (index) {
      dispatch(sendMovieUp(name, index));
      sortStorage(index, savedMovies);
    }
  };

  const handleMovieDown = (e) => {
    const name = e.target.name;
    const index = parseInt(e.target.value);
    if (index !== savedMovies.length - 1) {
      dispatch(sendMovieDown(name, index));
      sortStorage(index, savedMovies, false);
    }
  };

  return (
    <>
      <Nav />
      <div className="container">
        <h1 className="text-center">Movies</h1>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <SearchBar
              handleSearchSubmit={handleSearchSubmit}
              handleSearchChange={handleSearchChange}
              search={search}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <h2 className="text-center">Top Ten</h2>
            <ul>
              {sortedMovies.map((movie, index) => (
                <Card
                  key={`movie ${index + 1}`}
                  {...movie}
                  deleteItem={deleteMovie}
                  handleItemUp={handleMovieUp}
                  handleItemDown={handleMovieDown}
                  index={index}
                />
              ))}
            </ul>
          </div>
          <div className="col-sm-6">
            <h2 className="text-center">Search Results</h2>

            <ul>
              {searchedMovies.map((movie, index) => (
                <Card
                  key={`search result ${index + 1}`}
                  {...movie}
                  addItem={addMovie}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
