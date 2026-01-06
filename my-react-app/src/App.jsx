import LevelOne from "./components/level1/LevelOne";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LevelTwo from "./components/level2/LevelTwo";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LevelOne />} />
       
       <Route path="/level2" element={<LevelTwo/>}>

       </Route>

      </Routes>
    </Router>
  );
}
