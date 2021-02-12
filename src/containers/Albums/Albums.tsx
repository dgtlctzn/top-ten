import React, { ChangeEvent, FormEvent, MouseEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearch,
  saveAlbums,
  delAlbum,
  reorderAlbum,
  addToken,
  searchAlbums,
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
import Sort from "../../utils/Sort";
import Card from "../../components/Card/Card";
import Alert from "../../components/Alert/Alert";
import RootState from "../../reducers/interface";
import { SavedItems } from "../Interfaces/Interfaces";
import Socials from "../../components/Socials/Socials";
const {
  DragDropContext,
  Draggable,
  Droppable,
} = require("react-beautiful-dnd");

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

  useEffect(() => {
    Sort.storage(savedAlbums, "album");
  }, [savedAlbums]);

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

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const originalPos: number = result.source.index;
    const position: number = result.destination.index;
    const name: string = result.destination.draggableId;
    dispatch(
      reorderAlbum(
        { name, image: "", info: "", index: NaN, type: "album" },
        originalPos,
        position
      )
    );
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
            {sortedAlbums.length ? (
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="album">
                  {(provided: any) => (
                    <ul
                      className="characters"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {sortedAlbums.map((album, index) => {
                        return (
                          <Draggable
                            key={album.name}
                            draggableId={album.name}
                            index={index}
                          >
                            {(provided: any) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card
                                  key={`album ${index + 1}`}
                                  addItem={addAlbum}
                                  deleteItem={deleteAlbum}
                                  page="album"
                                  saved={true}
                                  name={album.name}
                                  image={album.image}
                                  info={album.info}
                                  index={index}
                                />
                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <p className="text-center description">No albums added yet. Search and add</p>
            )}
          </div>
          <div className="col-sm-6">
            <h2 className="text-center">Search Results</h2>

            <ul>
              {searchedAlbums.map((album, index) => (
                <Card
                  key={`search result ${index + 1}`}
                  addItem={addAlbum}
                  deleteItem={deleteAlbum}
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
        <div className="row">
          <div className="col-sm-12 text-center">
            <Socials />
          </div>
        </div>
      </div>
    </>
  );
};

export default Albums;
