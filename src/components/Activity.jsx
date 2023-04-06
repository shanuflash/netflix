import { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { DataContext } from "../context/DataProvider";
import { Link } from "react-router-dom";
import tmdb from "../tmdb";

function Activity() {
  const { User, WatchList, History } = useContext(DataContext);
  const [HistoryData, setHistoryData] = useState([]);
  const [WatchListData, setWatchListData] = useState([]);
  useEffect(() => {
    History.map((movie) => {
      const method =
        movie.charAt(movie.length - 1) === "m" ? "movieInfo" : "tvInfo";

      tmdb[method]({ id: movie })
        .then((res) => {
          res.id += movie.charAt(movie.length - 1);
          setHistoryData((prev) => [...prev, res]);
        })
        .catch(console.error);
    });

    WatchList.map((movie) => {
      const method =
        movie.charAt(movie.length - 1) === "m" ? "movieInfo" : "tvInfo";
      tmdb[method]({ id: movie })
        .then((res) => {
          res.id += movie.charAt(movie.length - 1);
          setWatchListData((prev) => [...prev, res]);
        })
        .catch(console.error);
    });
  }, [History, WatchList]);

  return (
    <div>
      <Nav />
      <div className="activity">
        <div className="activity-header">
          <div>Your Activity</div>
        </div>
        <div className="activity-body">
          <div className="title">Watch List</div>
          <div className="popular">
            {WatchListData.map((movie) => (
              <>
                <Link
                  to={`/${movie.id}`}
                  className="card"
                  style={{
                    background: `url(${
                      "https://image.tmdb.org/t/p/w300" + movie.backdrop_path
                    })`,
                  }}
                >
                  <div className="card-info">
                    <div className="card-title">
                      {movie.title || movie.name}
                    </div>
                    <div className="card-rating">
                      {movie.vote_average} &#9733;
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
        <div className="activity-body">
          <div className="title">History</div>
          <div className="popular">
            {HistoryData.map((movie) => (
              <>
                <Link
                  to={`/${movie.id}`}
                  className="card"
                  style={{
                    background: `url(${
                      "https://image.tmdb.org/t/p/w300" + movie.backdrop_path
                    })`,
                  }}
                >
                  <div className="card-info">
                    <div className="card-title">{movie.title}</div>
                    <div className="card-rating">
                      {movie.vote_average} &#9733;
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activity;
