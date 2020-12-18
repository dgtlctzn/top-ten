import React from "react";
import "./Card.css";

const Card = ({ type, name, image, index, addItem, deleteItem, handleItemUp, handleItemDown }) => {
  return (
    <div className="row">
      <div className="col-sm-2 place">{addItem ? <></> : <h2 >#{index + 1}</h2>}</div>
      <div className="col-sm-10">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <img className={type === "album" ? "album-image" : "movie-image"} src={image} alt={name} />
              </div>
              <div className="col-sm-7">
                <h5 className="card-title">{name}</h5>
              </div>
              {addItem ? (
                <div className="col-sm-2">
                  <button
                    name={name}
                    value={image}
                    onClick={(e) => addItem(e)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <div className="col-sm-1">
                  <button
                    name={name}
                    value={image}
                    onClick={(e) => deleteItem(e)}
                  >
                    x
                  </button>
                  <button name={name} value={index} onClick={(e) => handleItemUp(e)}>^</button>
                  <button name={name} value={index} onClick={(e) => handleItemDown(e)}>v</button>
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
