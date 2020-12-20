import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearch,
  saveAlbums,
  delAlbum,
  addToken,
  searchAlbums,
  sendAlbumUp,
  sendAlbumDown,
  successMessage,
  deleteMessage,
  warningMessage,
} from "../../actions";
import Nav from "../../components/Nav/Nav";
import SearchBar from "../../components/SearchBar/SearchBar";
import API from "../../utils/API";
import Card from "../../components/Card/Card";
import Alert from "../../components/Alert/Alert"

const Albums = () => {
  // const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const savedAlbums = useSelector((state) => state.savedAlbumsReducer);
  const sortedAlbums = savedAlbums.sort((a, b) => a.index - b.index);

  const search = useSelector((state) => state.searchReducer);

  const token = useSelector((state) => state.tokenReducer);
  const searchedAlbums = useSelector((state) => state.albumReducer);

  useEffect(() => {
    const savedAsString = JSON.stringify(savedAlbums);
    for (const [key, value] of Object.entries(localStorage)) {
      if (!savedAsString.includes(key)) {
        const parsedVal = JSON.parse(value);
        if (parsedVal.type === "album") {
          dispatch(
            saveAlbums({
              name: key,
              image: parsedVal.image,
              index: parsedVal.index,
              type: parsedVal.type,
            })
          );
        }
      }
    }
  }, []);

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value))
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
            image: albums[i].images[0]
              ? albums[i].images[0].url
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
    console.log(savedAlbums.length)
    if (savedAlbums.length === 10) {
      dispatch(warningMessage(true, "album"))
      setTimeout(() => {
        dispatch(warningMessage(false))
      }, 2000);
      return;
    }
    const name = e.target.parentNode.name || e.target.name;
    const value = e.target.parentNode.value || e.target.value
    if (!localStorage.getItem(name)) {
      const data = JSON.stringify({
        index: savedAlbums.length,
        image: value,
        type: "album",
      });
      localStorage.setItem(name, data);
    }
    dispatch(
      saveAlbums({
        name: name,
        image: value,
        index: savedAlbums.length,
        type: "album",
      })
    );
    dispatch(successMessage(true, "album"))
    setTimeout(() => {
      dispatch(successMessage(false))
    }, 1500);
  };

  const deleteAlbum = (e) => {
    const name = e.target.parentNode.name || e.target.name
    dispatch(
      delAlbum({
        name: name,
      })
    );
    let i = 0;
    for (const item of savedAlbums) {
      localStorage.removeItem(item.name);
      if (item.name !== name) {
        localStorage.setItem(
          item.name,
          JSON.stringify({
            index: i,
            image: item.image,
            type: "album",
          })
        );
        i++;
      }
    }
    dispatch(deleteMessage(true, "album"))
    setTimeout(() => {
      dispatch(deleteMessage(false))
    }, 1500);
  };

  const sortStorage = (index, saved, increase = true) => {
    let change;
    increase ? (change = -1) : (change = 1);
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
          type: "album",
        })
      );
    }
  };

  const handleAlbumUp = (e) => {
    const name = e.target.parentNode.name || e.target.name;
    const index = parseInt(e.target.parentNode.value || e.target.value);
    if (index) {
      dispatch(sendAlbumUp(name, index));
      sortStorage(index, savedAlbums);
    }
  };

  const handleAlbumDown = (e) => {
    const name = e.target.parentNode.name || e.target.name;
    const index = parseInt(e.target.parentNode.value || e.target.value);
    if (index !== savedAlbums.length - 1) {
      dispatch(sendAlbumDown(name, index));
      sortStorage(index, savedAlbums, false);
    }
  };

  return (
    <>
      <Nav />
      <Alert/>
      <div className="container">
        <h1 className="text-center">Albums</h1>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <SearchBar
              handleSearchSubmit={handleSearchSubmit}
              handleSearchChange={handleSearchChange}
              search={search}
              page="Albums"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <h2 className="text-center">Top Ten</h2>
            <ul>
              {sortedAlbums.map((album, index) => (
                <Card
                  key={`album ${index + 1}`}
                  {...album}
                  deleteItem={deleteAlbum}
                  handleItemUp={handleAlbumUp}
                  handleItemDown={handleAlbumDown}
                  page="album"
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
                  addItem={addAlbum}
                  page="album"
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Albums;
