import React from "react";
import "./Card.css";

const Card = ({ name, image, index, addAlbum, deleteAlbum, handleAlbumUp }) => {
  console.log(index)
  return (
    <div className="row">
      <div className="col-sm-2 place">{addAlbum ? <></> : <h2 >#{index + 1}</h2>}</div>
      <div className="col-sm-10">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <img className="images" src={image} alt={name} />
              </div>
              <div className="col-sm-7">
                <h5 className="card-title">{name}</h5>
              </div>
              {addAlbum ? (
                <div className="col-sm-2">
                  <button
                    name={name}
                    value={image}
                    onClick={(e) => addAlbum(e)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <div className="col-sm-1">
                  <button
                    name={name}
                    value={image}
                    onClick={(e) => deleteAlbum(e)}
                  >
                    x
                  </button>
                  <button name={name} value={index} onClick={(e) => handleAlbumUp(e)}>^</button>
                  <button name={name} value={index}>v</button>
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
