import React, { useEffect, useState } from "react";
import Topnav from "./partials/Topnav";
import DropDown from "./partials/DropDown";
import { useNavigate } from "react-router-dom";
import axios from "../utils/Axios";
import Loading from "../Components/Loading";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

function Popular() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);

  document.title = "MovieApp | Popular" + category.toUpperCase();

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      // console.log(data.results);
      // setpopular(data.results);
      if (data.results.length > 0) {
        setpopular((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      } else {
        sethasmore(false);
      }
    } catch (err) {
      console.log("Error is ", err);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      GetPopular();
    } else {
      setpage(1);
      setpopular([]);
      GetPopular();
    }
  };

  useEffect(() => {
    // Getpopular();
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="px-6 w-screen h-screen">
      <div className="w-full flex items-center justify-between ">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line p-3"
          ></i>
          POPULAR{" "}
          <small className="ml-1 text-sm text-zinc-500">
            ({category.toUpperCase()})
          </small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <DropDown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={true}
        loader={<h1 className="text-white">Loading ...</h1>}
      >
        <div className="w-full">
          <Cards data={popular} title={category} />
        </div>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Popular;
