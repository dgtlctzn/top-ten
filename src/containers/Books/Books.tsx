import React, { ChangeEvent, FormEvent, MouseEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearch,
  saveBooks,
  delBook,
  searchBooks,
  successMessage,
  deleteMessage,
  warningMessage,
  searchStatus,
  noResultsMessage,
  noSearchTermMessage,
  reorderBook,
} from "../../actions";
import Nav from "../../components/Nav/Nav";
import SearchBar from "../../components/SearchBar/SearchBar";
import API from "../../utils/API";
import Sort from "../../utils/Sort";
import Card from "../../components/Card/Card";
import Alert from "../../components/Alert/Alert";
import axios from "axios";
import RootState from "../../reducers/interface";
import Socials from "../../components/Socials/Socials";
const {
  DragDropContext,
  Draggable,
  Droppable,
} = require("react-beautiful-dnd");

const Books = () => {
  const dispatch = useDispatch();
  const savedBooks = useSelector((state: RootState) => state.savedBooksReducer);
  const sortedBooks = savedBooks.sort((a, b) => a.index - b.index);

  const search = useSelector((state: RootState) => state.searchReducer);

  const searchedBooks = useSelector((state: RootState) => state.bookReducer);

  useEffect(() => {
    const savedAsString = JSON.stringify(savedBooks);
    for (const [key, value] of Object.entries(localStorage)) {
      if (!savedAsString.includes(key)) {
        const parsedVal = JSON.parse(value);
        if (parsedVal.type === "book") {
          dispatch(
            saveBooks({
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
    Sort.storage(savedBooks, "book");
  }, [savedBooks])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.currentTarget.value));
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) {
      dispatch(noSearchTermMessage(true, "book"));
      setTimeout(() => {
        dispatch(noSearchTermMessage(false));
      }, 2000);
      return;
    }

    dispatch(searchStatus(true));

    // API.searchGoogleBooks(search)
    //   .then((searchRes) => {
        axios({
          method: "GET",
          url: `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${process.env.REACT_APP_GOOGLE_KEY}`,
        }).then((searchRes) => {
        const books = searchRes.data.items;
        const found = [];
        if (!books) {
          dispatch(noResultsMessage(true, "book"));
          dispatch(searchStatus(false));
          setTimeout(() => {
            dispatch(noResultsMessage(false));
          }, 2000);
          return;
        }
        for (let i = 0; i < 10; i++) {
          const item = {
            name: books[i].volumeInfo.title
              ? books[i].volumeInfo.title
              : "No Book Name",
            image: books[i].volumeInfo.imageLinks
              ? books[i].volumeInfo.imageLinks.thumbnail
              : "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_323457.png&f=1&nofb=1",
            info: books[i].volumeInfo.authors
              ? books[i].volumeInfo.authors.join(", ")
              : "unknown author",
          };
          found.push(item);
        }
        dispatch(searchBooks(found));
        dispatch(searchStatus(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(searchStatus(false));
      });
  };

  const addBook = (e: MouseEvent<HTMLButtonElement>) => {
    if (savedBooks.length === 10) {
      dispatch(warningMessage(true, "book"));
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
        index: savedBooks.length,
        image: image,
        info: info,
        type: "book",
      });
      localStorage.setItem(name, data);
    }
    dispatch(
      saveBooks({
        name: name,
        image: image,
        index: savedBooks.length,
        info: info,
        type: "book",
      })
    );
    dispatch(successMessage(true, "book"));
    setTimeout(() => {
      dispatch(successMessage(false));
    }, 1500);
  };

  const deleteBook = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e?.currentTarget?.name;
    dispatch(
      delBook({
        name: name,
        image: "",
        index: NaN,
        info: "",
        type: "book",
      })
    );
    let i = 0;
    for (const item of savedBooks) {
      localStorage.removeItem(item.name);
      if (item.name !== name) {
        localStorage.setItem(
          item.name,
          JSON.stringify({
            index: i,
            image: item.image,
            info: item.info,
            type: "book",
          })
        );
        i++;
      }
    }
    dispatch(deleteMessage(true, "book"));
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
      reorderBook(
        { name, image: "", info: "", index: NaN, type: "book" },
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
        <h1 className="text-center">Books</h1>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <SearchBar
              handleSearchSubmit={handleSearchSubmit}
              handleSearchChange={handleSearchChange}
              search={search}
              page="Books"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <h2 className="text-center">Top Ten</h2>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="book">
                {(provided: any) => (
                  <ul
                    className="characters"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {sortedBooks.map((book, index) => {
                      return (
                        <Draggable
                          key={book.name}
                          draggableId={book.name}
                          index={index}
                        >
                          {(provided: any) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card
                                key={`book ${index + 1}`}
                                addItem={addBook}
                                deleteItem={deleteBook}
                                page="book"
                                saved={true}
                                name={book.name}
                                image={book.image}
                                info={book.info}
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
              {searchedBooks.map((book, index) => (
                <Card
                  key={`search result ${index + 1}`}
                  addItem={addBook}
                  deleteItem={deleteBook}
                  page="book"
                  saved={false}
                  name={book.name}
                  image={book.image}
                  info={book.info}
                  index={index}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 text-center">
            <Socials/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;
