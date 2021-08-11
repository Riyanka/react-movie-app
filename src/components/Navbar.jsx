import React from "react";
import "../App.css";
function Navbar({ handleSearch,  sortByEpisode, sortByYear } ) {
  return (
    <div className="navbar">
      <ul className="nav nav-tabs">
        <li id="sortBy">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sort by
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <a
              className="dropdown-item"
              id="episode"
              onClick={sortByEpisode}
            >
              Episode
            </a>
            <a
              className=" dropdown-item"
              id="year"
              onClick={sortByYear}
             
            >
              Year
            </a>
          </div>
        </li>
        <li className="nav-item col-md-8">
          <input
            className="form-control"
            type="text"
            id="input"
            onChange={(event) => handleSearch(event)}
            placeholder="Type to search.."
          />
        </li>
      </ul>
    </div>
  );
}
export default Navbar;
