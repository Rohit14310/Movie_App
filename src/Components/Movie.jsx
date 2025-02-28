import React, { useEffect, useState } from "react";
import Topnav from "./partials/Topnav";
import DropDown from "./partials/DropDown";
import { useNavigate } from "react-router-dom";
import axios from "../utils/Axios";
import Loading from "../Components/Loading";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

function Movie() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing");
  const [Movie, setMovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);

  document.title = "MovieApp | Movie" + category.toUpperCase();

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > 0) {
        setMovie((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      } else {
        sethasmore(false);
      }
    } catch (err) {
      console.log("Error is ", err);
    }
  };

  const refreshHandler = () => {
    if (Movie.length === 0) {
      GetMovie();
    } else {
      setpage(1);
      setMovie([]);
      GetMovie();
    }
  };

  useEffect(() => {
    // Getpopular();
    refreshHandler();
  }, [category]);

  return Movie.length > 0 ? (
    <div className="px-6 w-screen h-screen">
      <div className="w-full flex items-center justify-between ">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line p-3"
          ></i>
          Movie{" "}
          <small className="ml-1 text-sm text-zinc-500">
            ({category.toUpperCase()})
          </small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <DropDown
            title="Category"
            options={["popular", "top_rated", "upcoming"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={Movie.length}
        next={GetMovie}
        hasMore={true}
        loader={<h1 className="text-white">Loading ...</h1>}
      >
        <div className="w-full">
          <Cards data={Movie} title="movie" />
        </div>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Movie;
