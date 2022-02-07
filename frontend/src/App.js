import './App.css';
import TabelFavouriteLists from './components/FavouriteLists';
import FormularFavouriteList from "./components/FormularFavouriteList";
import TabelVideos from './components/Videos';
import FormularVideo from "./components/FormularVideo";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TabelFavouriteLists />} />
          <Route path="/formularFavouriteList" element={<FormularFavouriteList />} />
          <Route path="/videos" element={<TabelVideos />} />
          <Route path="/formularVideo" element={<FormularVideo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
