import LevelOne from "./components/level1/LevelOne";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LevelTwo from "./components/level2/LevelTwo";
import LevelThree from "./components/level3/LevelThree";
import LevelFour from "./components/level4/levelfour";
import LevelFive from "./components/level5/LevelFive";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LevelOne />} />

        <Route path="/level2" element={<LevelTwo />}> </Route>

        <Route path="/level3" element={<LevelThree />} />

        <Route path="/level4" element ={<LevelFour/>} />

        <Route path="/level5" element ={<LevelFive/>}/>


      </Routes>
    </Router>
  );
}
