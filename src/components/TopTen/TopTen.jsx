import React from "react";

const TopTen = ({}) => {
  return (
    <div className="container">
      <h1 className="text-center">Albums</h1>
      {/* <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <form onSubmit={handleSearchSubmit} className="text-center">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Search Albums
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={search}
                onChange={handleSearchChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div> */}
      <div className="row">
        <div className="col-sm-6">
          <h2 className="text-center">Top Ten</h2>
          <ul>
            {sortedAlbums.map((album, index) => (
              <Card
                key={`album ${index + 1}`}
                {...album}
                deleteAlbum={deleteAlbum}
                handleAlbumUp={handleAlbumUp}
                handleAlbumDown={handleAlbumDown}
                index={index}
              />
            ))}
          </ul>
        </div>
        <div className="col-sm-6">
          <h2 className="text-center">Search Results</h2>

          <ul>
            {searchedAlbums.map((album, index) => (
              <Card
                key={`search result ${index + 1}`}
                {...album}
                addAlbum={addAlbum}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopTen;
