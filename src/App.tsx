import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shorts from "./pages/shorts/Shorts";
import TradingVideos from "./pages/tradingVideos/TradingVideos";
import YouTube from "./pages/youTube/YouTube";
import YouTube2 from "./pages/deatils/YouTube";
import YouTube3 from "./pages/channel/YouTube";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<YouTube />} />
          <Route path="/shorts" element={<Shorts />} />
          <Route path="/channel/:id" element={<YouTube3 />} />
          <Route path="/tradingVideos" element={<TradingVideos />} />
          <Route path="/videos/:id" element={<YouTube2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
