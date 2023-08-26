import './App.css';


import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import {Home} from "./pages/home/Home";
import {ImageProcessPage} from "./pages/img_process/ImageProcessPage";
import {ImgFilterPage} from "./pages/img_filter/ImgFilterPage";
import {ImageSpacialFilter} from "./pages/img_spacial_filter/ImageSpacialFilter";

function App() {
  return (
      <Router>
          <Routes>
                <Route path="/" exact element={<Home/>} />
              <Route path="/img_process" element={<ImageProcessPage/>} />
              <Route path="/img_filter" element={<ImgFilterPage/>} />
              <Route path="/img_spacial" element={<ImageSpacialFilter/>} />
          </Routes>
      </Router>
  );
}

export default App;
