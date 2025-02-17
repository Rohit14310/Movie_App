import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Loading from "./Components/Loading";
import Trending from "./Components/Trending";

function App() {
  return (
    <>
      <div className="bg-[#1f1e24] w-full  h-auto  flex">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/loading" element={<Loading />}></Route> */}
          <Route path="/trending" element={<Trending />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
