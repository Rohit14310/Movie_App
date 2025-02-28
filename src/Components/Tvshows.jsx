import React, { useEffect, useState } from "react";
import Topnav from "./partials/Topnav";
import DropDown from "./partials/DropDown";
import { useNavigate } from "react-router-dom";
import axios from "../utils/Axios";
import Loading from "../Components/Loading";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

function Tvshows() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tvshows, settvshows] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);

  document.title = "MovieApp | TV-Shows" + category.toUpperCase();

  const Gettvshows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      // console.log(data.results);
      // setpopular(data.results);
      if (data.results.length > 0) {
        settvshows((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      } else {
        sethasmore(false);
      }
    } catch (err) {
      console.log("Error is ", err);
    }
  };

  const refreshHandler = () => {
    if (tvshows.length === 0) {
      Gettvshows();
    } else {
      setpage(1);
      settvshows([]);
      Gettvshows();
    }
  };

  useEffect(() => {
    // Getpopular();
    refreshHandler();
  }, [category]);

  return tvshows.length > 0 ? (
    <div className="px-6 w-screen h-screen">
      <div className="w-full flex items-center justify-between ">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line p-3"
          ></i>
          TV-SHOW
          <small className="ml-1 text-sm text-zinc-500">
            ({category.toUpperCase()})
          </small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <DropDown
            title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={tvshows.length}
        next={Gettvshows}
        hasMore={true}
        loader={<h1 className="text-white">Loading ...</h1>}
      >
        <div className="w-full">
          <Cards data={tvshows} title="tv" />
        </div>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Tvshows;
