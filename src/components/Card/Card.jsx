import React from "react";
import "./Card.css";
import {useSelector} from "react-redux";

const Card = ({
  page,
  name,
  image,
  index,
  addItem,
  deleteItem,
  handleItemUp,
  handleItemDown,
}) => {

  return (
    <div className="row">
      <div className="col-sm-2 place">
        {addItem ? <></> : <h2>#{index + 1}</h2>}
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
              </div>
              {addItem ? (
                <div className="col-sm-2 text-right">
                  <button name={name} value={image} onClick={(e) => addItem(e)}>
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              ) : (
                <div className="col-sm-2">
                  <button
                    name={name}
                    value={image}
                    onClick={(e) => deleteItem(e)}
                  >
                    <i class="fas fa-times"></i>
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
