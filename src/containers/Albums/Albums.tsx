import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
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
  searchStatus,
  noResultsMessage,
  noSearchTermMessage,
} from "../../actions";
import Nav from "../../components/Nav/Nav";
import SearchBar from "../../components/SearchBar/SearchBar";
import API from "../../utils/API";
import Card from "../../components/Card/Card";
import Alert from "../../components/Alert/Alert";
import RootState from "../../reducers/interface";
import { SavedItems } from "../Interfaces/Interfaces";

const Albums = () => {
  // const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const savedAlbums = useSelector(
    (state: RootState) => state.savedAlbumsReducer
  );
  const sortedAlbums = savedAlbums.sort((a, b) => a.index - b.index);

  const search = useSelector((state: RootState) => state.searchReducer);

  const token = useSelector((state: RootState) => state.tokenReducer);
  const searchedAlbums = useSelector((state: RootState) => state.albumReducer);

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
              info: parsedVal.info,
              index: parsedVal.index,
              type: parsedVal.type,
            })
          );
        }
      }
    }
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.currentTarget.value));
  };

  const searchSpotifyAlbums = (search: string, token: string): void => {
    API.searchSpotify(search, token)
      .then((searchRes) => {
        const albums = searchRes.data.albums.items;
        const found = [];
        if (!albums.length) {
          dispatch(noResultsMessage(true, "album"));
          dispatch(searchStatus(false));
          setTimeout(() => {
            dispatch(noResultsMessage(false));
          }, 2000);
          return;
        }
        for (let i = 0; i < 10; i++) {
          const item = {
            name: albums[i].name ? albums[i].name : "No Artist Name",
            image: albums[i].images[0]
              ? albums[i].images[0].url
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/1024px-Disque_Vinyl.svg.png",
            info: albums[i].artists[0].name,
          };
          found.push(item);
        }
        dispatch(searchAlbums(found));
        dispatch(searchStatus(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(searchStatus(false));
      });
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) {
      dispatch(noSearchTermMessage(true, "album"));
      setTimeout(() => {
        dispatch(noSearchTermMessage(false));
      }, 2000);
      return;
    }

    dispatch(searchStatus(true));

    if (!token) {
      API.getToken()
        .then((tokenRes) => {
          dispatch(addToken(tokenRes.data.access_token));
          searchSpotifyAlbums(search, tokenRes.data.access_token);
        })
        .catch((err) => {
          console.log(err);
          dispatch(searchStatus(false));
        });
    } else {
      searchSpotifyAlbums(search, token);
    }
  };

  const addAlbum = (e: MouseEvent<HTMLButtonElement>) => {
    if (savedAlbums.length === 10) {
      dispatch(warningMessage(true, "album"));
      setTimeout(() => {
        dispatch(warningMessage(false));
      }, 2000);
      return;
    }
    const name = e?.currentTarget?.name;
    const value = e?.currentTarget?.value;
    const [image, info] = value.split(",");
    if (!localStorage.getItem(name)) {
      const data = JSON.stringify({
        index: savedAlbums.length,
        image: image,
        info: info,
        type: "album",
      });
      localStorage.setItem(name, data);
    }
    dispatch(
      saveAlbums({
        name: name,
        image: image,
        index: savedAlbums.length,
        info: info,
        type: "album",
      })
    );
    dispatch(successMessage(true, "album"));
    setTimeout(() => {
      dispatch(successMessage(false));
    }, 1500);
  };

  const deleteAlbum = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e?.currentTarget?.name;
    dispatch(
      delAlbum({
        name: name,
        image: "",
        index: NaN,
        info: "",
        type: "album",
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
            info: item.info,
            type: "album",
          })
        );
        i++;
      }
    }
    dispatch(deleteMessage(true, "album"));
    setTimeout(() => {
      dispatch(deleteMessage(false));
    }, 1500);
  };

  const sortStorage = (
    index: number,
    saved: Array<SavedItems>,
    increase = true
  ): void => {
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
          info: item.info,
          type: "album",
        })
      );
    }
  };

  const handleAlbumUp = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e?.currentTarget?.name;
    const index = parseInt(e?.currentTarget?.value);
    if (index) {
      dispatch(
        sendAlbumUp(
          { name, image: "", info: "", index: NaN, type: "album" },
          index
        )
      );
      sortStorage(index, savedAlbums);
    }
  };

  const handleAlbumDown = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e?.currentTarget?.name;
    const index = parseInt(e?.currentTarget?.value);
    if (index !== savedAlbums.length - 1) {
      dispatch(
        sendAlbumDown(
          { name, image: "", info: "", index: NaN, type: "album" },
          index
        )
      );
      sortStorage(index, savedAlbums, false);
    }
  };

  return (
    <>
      <Nav />
      <Alert />
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
                  addItem={addAlbum}
                  deleteItem={deleteAlbum}
                  handleItemUp={handleAlbumUp}
                  handleItemDown={handleAlbumUp}
                  page="album"
                  saved={false}
                  name={album.name}
                  image={album.image}
                  info={album.info}
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
                  addItem={addAlbum}
                  deleteItem={deleteAlbum}
                  handleItemUp={handleAlbumUp}
                  handleItemDown={handleAlbumUp}
                  page="album"
                  saved={false}
                  name={album.name}
                  image={album.image}
                  info={album.info}
                  index={index}
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
