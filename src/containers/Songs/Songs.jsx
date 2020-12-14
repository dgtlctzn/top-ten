import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSong, delSong } from "../../actions";
import { NavLink } from "react-router-dom";

const Songs = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const songList = useSelector((state) => state.songReducer);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSong(input));
    setInput("");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(e.target.name)
    dispatch(delSong(e.target.name));
    setInput("");
  };
  return (
    <>
    <h1>Songs</h1>
        <NavLink to="/movies">
            Movies
        </NavLink>
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
          {songList.map((song, index) => (
            <li key={index}>
              {song}
              <button name={song} onClick={handleDelete}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Songs;