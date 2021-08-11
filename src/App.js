import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [movie, setMovies] = useState(null);
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setMovies(null);
    let value = event.target.value.toLowerCase();
    setSearch(value);
  };

  const showDescription = (episode_id) => {
    const check = items.filter((item) => item.fields.episode_id === episode_id);
    setMovies(check[0].fields);
  };

  const sortByEpisode = () => {
    const sortedByEpisode = items.sort((a, b) =>
      a.fields.episode_id > b.fields.episode_id
        ? 1
        : b.fields.episode_id > a.fields.episode_id
        ? -1
        : 0
    );

    setItems(sortedByEpisode);
  };

  const sortByYear = () => {
    const sortedByYear = items.sort((a, b) =>
      a.fields.release_date > b.fields.release_date
        ? 1
        : b.fields.release_date > a.fields.release_date
        ? -1
        : 0
    );
    console.log(sortedByYear);
    setItems(sortedByYear);
  };

  useEffect(() => {
    fetch("https://star-wars-api.herokuapp.com/films")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Navbar
          handleSearch={handleSearch}
          sortByEpisode={sortByEpisode}
          sortByYear={sortByYear}
        />
        <div id="main" class="row mt-3">
          <div id="movieList" className="col-md-5">
            {items.map(
              (item) =>
                item.fields.title.toLowerCase().includes(search) && (
                  <div
                    className="movieRow"
                    id="movieRow"
                    key={item.id}
                    onClick={() => showDescription(item.fields.episode_id)}
                  >
                    {item.fields.episode_id} {item.fields.title}{" "}
                    {item.fields.release_date}
                  </div>
                )
            )}
          </div>

          {movie != null ? (
            <div id="description" class="col-md-5">
              <h1 id="descriptionText">{movie.title}</h1>

              <p className="opening" id="moviedescription">
                {movie.opening_crawl}
              </p>
              <p>Director: {movie.director}</p>
            </div>
          ) : (
            <h1 id="nomovie">No movie selected</h1>
          )}
        </div>
      </div>
    );
  }
}

export default App;
