import React, { ChangeEvent, MouseEvent } from "react";
import "./Card.css";
// import {useSelector} from "react-redux";

interface Props {
  page: "album" | "book" | "movie";
  name: string;
  image: string;
  info: string;
  index: number;
  saved: boolean;
  addItem: (e: MouseEvent<HTMLButtonElement>) => void;
  deleteItem: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Card = ({
  page,
  name,
  image,
  info,
  index,
  saved,
  addItem,
  deleteItem,
}: Props) => {

  return (
    <div className="row">
      <div className="col-sm-2 place">
        {saved ? <h2>#{index + 1}</h2> : <></>}
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
              {!saved ? (
                <div className="col-sm-2 text-right">
                  <button name={name} value={`${image},${info}`} onClick={addItem}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              ) : (
                <div className="col-sm-2 text-right">
                  <button
                    name={name}
                    value={image}
                    onClick={deleteItem}
                  >
                    <i className="fas fa-times"></i>
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
