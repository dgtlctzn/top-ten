import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMovie, delMovie } from "../../actions";

const Movies = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieReducer);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMovie(input));
    setInput("");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(e.target.name)
    dispatch(delMovie(e.target.name));
    setInput("");
  };
  return (
    <>
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
          {movieList.map((movie, index) => (
            <li key={index}>
              {movie}
              <button name={movie} onClick={handleDelete}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Movies;
