import React from "react";
import "./Card.css"

const Card = ({ name, image }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-sm-3">
              <img className="images" src={image} alt={name}/>
          </div>
          <div className="col-sm-9">
            <h5 className="card-title">{name}</h5>
            {/* <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
