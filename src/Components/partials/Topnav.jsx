import axios from "../../utils/Axios";
import React, { useEffect, useState } from "react";
import { Await, Link } from "react-router-dom";
import noimage from "/no_image.jpeg";

function Topnav() {
  const [query, setquery] = useState([]);
  const [searches, setsearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      console.log(data);
      setsearches(data.results);
    } catch (err) {
      console.log("error is ", err);
    }
  };
  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-[87%] h-[10vh] relative flex mx-auto items-center  ">
      <i className="text-2xl text-zinc-400 ri-search-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[50%] text-zinc-200  p-5 text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="Search Anything . . ."
      />

      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="text-zinc-400 text-2xl ri-close-fill"
        ></i>
      )}

      <div className="absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[90%] overflow-auto">
        {searches.map((item, index) => (
          <Link
            key={index}
            className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100"
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
              src={
                item.backdrop_path || item.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      item.backdrop_path || item.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <span>
              {item.original_title ||
                item.title ||
                item.name ||
                item.original_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Topnav;
