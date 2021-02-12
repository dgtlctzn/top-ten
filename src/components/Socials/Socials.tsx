import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";
import { useSelector } from "react-redux";
import RootState from "../../reducers/interface";
import { SavedItems } from "../../containers/Interfaces/Interfaces";
import "./Socials.css";

const Social = () => {
  const topTenAlbums = useSelector(
    (state: RootState) => state.savedAlbumsReducer
  );
  const topTenMovies = useSelector(
    (state: RootState) => state.savedMoviesReducer
  );
  const topTenBooks = useSelector(
    (state: RootState) => state.savedBooksReducer
  );

  // formats top ten lists into single shareable string
  const stringList = (
    albums: Array<SavedItems>,
    movies: Array<SavedItems>,
    books: Array<SavedItems>
  ): string => {
    const categories: Array<Array<SavedItems>> = [albums, movies, books];
    let topTenString: string = "";
    for (const category of categories) {
      if (category.length) {
        category.forEach((item, index) => {
          if (!index) {
            topTenString +=
              `My Top ${category.length} ${
                item.type.slice(0, 1).toUpperCase() +
                item.type.slice(1, item.type.length)
              }s:` +
              "\n" +
              `${index + 1}. ${item.name}` +
              "\n";
          } else if (index === category.length - 1)
            topTenString += `${index + 1}. ${item.name}` + "\n" + "\n";
          else {
            topTenString += `${index + 1}. ${item.name}` + "\n";
          }
        });
      }
    }
    return topTenString;
  };

  const topTenList: string = stringList(
    topTenAlbums,
    topTenMovies,
    topTenBooks
  );
  // share is disabled if no books/movies/albums are added
  const isContent: boolean = Boolean(topTenList);

  return (
    <div className="socials">
      {isContent ? (
        <h5 className="description">
          Finished creating your Top Ten? Share on Social Media!
        </h5>
      ) : (
        <h5 className="description">
          Go add movies, albums, or books to share
        </h5>
      )}

      <FacebookShareButton
        url="https://top-ten.netlify.app/"
        quote={topTenList}
        disabled={!isContent}
      >
        <FacebookIcon className="shareable" size={100} round={true} />
      </FacebookShareButton>
      <TwitterShareButton
        url="https://top-ten.netlify.app/"
        title={topTenList}
        disabled={!isContent}
      >
        <TwitterIcon className="shareable" size={100} round={true} />
      </TwitterShareButton>
      <RedditShareButton
        url="https://top-ten.netlify.app/"
        title={topTenList}
        disabled={!isContent}
      >
        <RedditIcon className="shareable" size={100} round={true} />
      </RedditShareButton>
    </div>
  );
};

export default Social;
