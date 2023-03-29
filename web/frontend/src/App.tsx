import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SingleStream from "./SingleStream";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stream/:streamId" element={<SingleStream />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
