import React from "react";
import "./Card.css"

const Card = ({ name, image, addAlbum }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-sm-3">
              <img className="images" src={image} alt={name}/>
          </div>
          <div className="col-sm-8">
            <h5 className="card-title">{name}</h5>
            {/* <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p> */}
          </div>
          <div className="col-sm-1">
            <button name={name} value={image} onClick={addAlbum}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
