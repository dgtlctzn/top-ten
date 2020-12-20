import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearch,
  saveBooks,
  delBook,
  searchBooks,
  sendBookUp,
  sendBookDown,
  successMessage,
  deleteMessage,
  warningMessage
} from "../../actions";
import Nav from "../../components/Nav/Nav";
import SearchBar from "../../components/SearchBar/SearchBar";
import API from "../../utils/API";
import Card from "../../components/Card/Card";
import Alert from "../../components/Alert/Alert"


const Books = () => {
  // const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const savedBooks = useSelector((state) => state.savedBooksReducer);
  const sortedBooks = savedBooks.sort((a, b) => a.index - b.index);

  const search = useSelector((state) => state.searchReducer);

  const searchedBooks = useSelector((state) => state.bookReducer);

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
              index: parsedVal.index,
              type: parsedVal.type,
            })
          );
        }
      }
    }
  }, []);

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    API.searchGoogleBooks(search).then((searchRes) => {
      const books = searchRes.data.items;
      const found = [];
      for (let i = 0; i < 10; i++) {
        const item = {
          name: books[i].volumeInfo.title
            ? books[i].volumeInfo.title
            : "No Book Name",
          image: books[i].volumeInfo.imageLinks
            ? books[i].volumeInfo.imageLinks.thumbnail
            : "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_323457.png&f=1&nofb=1",
        };
        found.push(item);
      }
      dispatch(searchBooks(found));
    });
  };

  const addBook = (e) => {
    if (savedBooks.length === 10) {
      dispatch(warningMessage(true, "book"))
      setTimeout(() => {
        dispatch(warningMessage(false))
      }, 2000);
      return;
    }
    const name = e.target.parentNode.name || e.target.name;
    const value = e.target.parentNode.value || e.target.value;
    if (!localStorage.getItem(name)) {
      const data = JSON.stringify({
        index: savedBooks.length,
        image: value,
        type: "book",
      });
      localStorage.setItem(name, data);
    }
    dispatch(
      saveBooks({
        name: name,
        image: value,
        index: savedBooks.length,
        type: "book",
      })
    );
    dispatch(successMessage(true, "book"))
    setTimeout(() => {
      dispatch(successMessage(false))
    }, 1500);
  };

  const deleteBook = (e) => {
    const name = e.target.parentNode.name || e.target.name;
    dispatch(
      delBook({
        name: name,
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
            type: "book",
          })
        );
        i++;
      }
    }
    dispatch(deleteMessage(true, "book"))
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
          type: "book",
        })
      );
    }
  };

  const handleBookUp = (e) => {
    const name = e.target.parentNode.name || e.target.name;
    const index = parseInt(e.target.parentNode.value || e.target.value);
    if (index) {
      dispatch(sendBookUp(name, index));
      sortStorage(index, savedBooks);
    }
  };

  const handleBookDown = (e) => {
    const name = e.target.parentNode.name || e.target.name;
    const index = parseInt(e.target.parentNode.value || e.target.value);
    if (index !== savedBooks.length - 1) {
      dispatch(sendBookDown(name, index));
      sortStorage(index, savedBooks, false);
    }
  };

  return (
    <>
      <Nav />
      <Alert/>
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
            <ul>
              {sortedBooks.map((book, index) => (
                <Card
                  key={`book ${index + 1}`}
                  {...book}
                  deleteItem={deleteBook}
                  handleItemUp={handleBookUp}
                  handleItemDown={handleBookDown}
                  page="book"
                  index={index}
                />
              ))}
            </ul>
          </div>
          <div className="col-sm-6">
            <h2 className="text-center">Search Results</h2>

            <ul>
              {searchedBooks.map((book, index) => (
                <Card
                  key={`search result ${index + 1}`}
                  {...book}
                  addItem={addBook}
                  page="book"
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;
