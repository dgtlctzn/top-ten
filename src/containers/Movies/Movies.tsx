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
  saveMovies,
  delMovie,
  searchMovies,
  successMessage,
  deleteMessage,
  warningMessage,
  searchStatus,
  noResultsMessage,
  noSearchTermMessage,
  reorderMovie,
} from "../../actions";
import Nav from "../../components/Nav/Nav";
import SearchBar from "../../components/SearchBar/SearchBar";
import API from "../../utils/API";
import Sort from "../../utils/Sort"
import Card from "../../components/Card/Card";
import Alert from "../../components/Alert/Alert";
import RootState from "../../reducers/interface";
import { SavedItems } from "../Interfaces/Interfaces";
import axios from "axios";
const {
  DragDropContext,
  Draggable,
  Droppable,
} = require("react-beautiful-dnd");

const Movies = () => {
  // const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const savedMovies = useSelector(
    (state: RootState) => state.savedMoviesReducer
  );
  const sortedMovies = savedMovies.sort((a, b) => a.index - b.index);

  const searchedMovies = useSelector((state: RootState) => state.movieReducer);
  const search = useSelector((state: RootState) => state.searchReducer);

  useEffect(() => {
    const savedAsString = JSON.stringify(savedMovies);
    for (const [key, value] of Object.entries(localStorage)) {
      if (!savedAsString.includes(key)) {
        const parsedVal = JSON.parse(value);
        if (parsedVal.type === "movie") {
          dispatch(
            saveMovies({
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
    Sort.storage(savedMovies, "movie");
  }, [savedMovies])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.currentTarget.value));
    // setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) {
      dispatch(noSearchTermMessage(true, "movie"));
      setTimeout(() => {
        dispatch(noSearchTermMessage(false));
      }, 2000);
      return;
    }

    dispatch(searchStatus(true));

    API.searchImdb(search)
      .then((searchRes) => {
      // axios({
      //   method: "GET",
      //   url: `https://imdb-api.com/en/API/SearchMovie/${process.env.REACT_APP_IMBD_SECRET}/${search}`,
      // }).then((searchRes: any) => {
        const movies = searchRes.data.results;
        const found = [];

        if (!movies.length) {
          dispatch(noResultsMessage(true, "movie"));
          dispatch(searchStatus(false));
          setTimeout(() => {
            dispatch(noResultsMessage(false));
          }, 2000);
          return;
        }
        for (let i = 0; i < 10; i++) {
          if (movies[i]) {
            const item = {
              name: movies[i].title ? movies[i].title : "No Movie Name",
              image: movies[i].image
                ? movies[i].image
                : "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_497562.png&f=1&nofb=1",
              info: movies[i].description
                ? movies[i].description.replace(/[()]/g, "")
                : "",
            };
            found.push(item);
          }
        }
        dispatch(searchMovies(found));
        dispatch(searchStatus(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(searchStatus(false));
      });
  };

  const addMovie = (e: MouseEvent<HTMLButtonElement>) => {
    if (savedMovies.length === 10) {
      dispatch(warningMessage(true, "movie"));
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
        index: savedMovies.length,
        image: image,
        info: info,
        type: "movie",
      });
      localStorage.setItem(name, data);
    }
    dispatch(
      saveMovies({
        name: name,
        image: image,
        info: info,
        index: savedMovies.length,
        type: "movie",
      })
    );
    dispatch(successMessage(true, "movie"));
    setTimeout(() => {
      dispatch(successMessage(false));
    }, 1500);
  };

  const deleteMovie = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e?.currentTarget?.name;
    dispatch(
      delMovie({
        name: name,
        image: "",
        index: NaN,
        info: "",
        type: "movie",
      })
    );
    let i = 0;
    for (const item of savedMovies) {
      localStorage.removeItem(item.name);
      if (item.name !== name) {
        localStorage.setItem(
          item.name,
          JSON.stringify({
            index: i,
            image: item.image,
            info: item.info,
            type: "movie",
          })
        );
        i++;
      }
    }
    dispatch(deleteMessage(true, "movie"));
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
      reorderMovie(
        { name, image: "", info: "", index: NaN, type: "movie" },
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
        <h1 className="text-center">Movies</h1>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <SearchBar
              handleSearchSubmit={handleSearchSubmit}
              handleSearchChange={handleSearchChange}
              search={search}
              page="Movies"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <h2 className="text-center">Top Ten</h2>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="movie">
                {(provided: any) => (
                  <ul
                    className="characters"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {sortedMovies.map((movie, index) => {
                      return (
                        <Draggable
                          key={movie.name}
                          draggableId={movie.name}
                          index={index}
                        >
                          {(provided: any) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card
                                key={`movie ${index + 1}`}
                                addItem={addMovie}
                                deleteItem={deleteMovie}
                                page="movie"
                                saved={true}
                                name={movie.name}
                                image={movie.image}
                                info={movie.info}
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
          </div>
          <div className="col-sm-6">
            <h2 className="text-center">Search Results</h2>

            <ul>
              {searchedMovies.map((movie, index) => (
                <Card
                  key={`search result ${index + 1}`}
                  addItem={addMovie}
                  deleteItem={deleteMovie}
                  page="movie"
                  saved={false}
                  name={movie.name}
                  image={movie.image}
                  info={movie.info}
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

export default Movies;
