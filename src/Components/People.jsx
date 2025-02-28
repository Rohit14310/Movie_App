import React, { useEffect, useState } from "react";
import Topnav from "./partials/Topnav";
import { useNavigate } from "react-router-dom";
import axios from "../utils/Axios";
import Loading from "../Components/Loading";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

function People() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);

  document.title = "MovieApp | people" + category.toUpperCase();
  const Getpeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setpeople((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      } else {
        sethasmore(false);
      }
    } catch (err) {
      console.log("Error is ", err);
    }
  };

  const refreshHandler = () => {
    if (people.length === 0) {
      Getpeople();
    } else {
      setpage(1);
      setpeople([]);
      Getpeople();
    }
  };

  useEffect(() => {
    // Getpeople();
    refreshHandler();
  }, [category]);

  return people.length > 0 ? (
    <div className="px-6 w-screen h-screen">
      <div className="w-full flex items-center justify-between ">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line p-3"
          ></i>
          people{" "}
          <small className="ml-1 text-sm text-zinc-500">
            ({category.toUpperCase()})
          </small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <div className="w-[2%]"></div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={people.length}
        next={Getpeople}
        hasMore={true}
        loader={<h1 className="text-white">Loading ...</h1>}
      >
        <div className="w-full">
          <Cards data={people} title="people" />
        </div>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default People;
