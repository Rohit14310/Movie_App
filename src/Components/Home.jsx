import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import Header from "./partials/Header";
import axios from "../utils/Axios";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";
import DropDown from "./partials/DropDown";

function Home() {
  document.title = "MovieApp | HomePage";

  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      // console.log(data);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    } catch (err) {
      console.log("error is ", err);
    }
  };

  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
  }, []);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      // console.log(data);
      settrending(data.results);
    } catch (err) {
      console.log("error is ", err);
    }
  };

  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
    // !trending && GetTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className=" flex justify-between p-4">
          <h1 className="text-4xl font-bold text-white">🔥 Trending Now</h1>
          <br />
          <DropDown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
