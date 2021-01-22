import React, { MouseEvent } from "react";
import "./Card.css";
// import {useSelector} from "react-redux";

// interface Props {
//   page: "album" | "book" | "movie";
//   name: string;
//   image: string;
//   info: string;
//   index: number;
//   addItem: (e: MouseEvent<HTMLButtonElement>) => void;
//   handleItemUp: (e: MouseEvent<HTMLButtonElement>) => void;
//   handleItemDown: (e: MouseEvent<HTMLButtonElement>) => void;
//   deleteItem: (e: MouseEvent<HTMLButtonElement>) => void;
// }

const Card = ({
  page,
  name,
  image,
  info,
  index,
  addItem,
  deleteItem,
  handleItemUp,
  handleItemDown,
}) => {

  // let data = {image: image, info: info};
  // console.log(data)
  return (
    <div className="row">
      <div className="col-sm-2 place">
        {<h2>#{index + 1}</h2>}
      </div>
      <div className="col-sm-10">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <a href={image} target="_blank" rel="noreferrer">
                  <img
                    className={page === "album" ? "album-image" : "movie-image"}
                    src={image}
                    alt={name}
                  />
                </a>
              </div>
              <div className="col-sm-7">
                <h5 className="card-title">{name}</h5>
                <p className="artist-name">{info}</p>
              </div>
              {addItem ? (
                <div className="col-sm-2 text-right">
                  <button name={name} value={`${image},${info}`} onClick={(e) => addItem(e)}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              ) : (
                <div className="col-sm-2">
                  <button
                    name={name}
                    value={image}
                    onClick={(e) => deleteItem(e)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                  <button
                    name={name}
                    value={index}
                    onClick={(e) => handleItemUp(e)}
                  >
                    <i className="fas fa-chevron-up"></i>
                  </button>
                  <button
                    name={name}
                    value={index}
                    onClick={(e) => handleItemDown(e)}
                  >
                    <i className="fas fa-chevron-down"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
