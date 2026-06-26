import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import TopTracks from "./pages/TopTracks/TopTracks";
import TopArtists from "./pages/TopArtists/TopArtists";
import Playlists from "./pages/Playlists/Playlists";
import Insights from "./pages/Insights/Insights";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-tracks" element={<TopTracks />} />
          <Route path="/top-artists" element={<TopArtists />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
