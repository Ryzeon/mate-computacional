import './App.css';

import {Routes, Route} from 'react-router-dom';
import {Home} from "./pages/home/Home";
import {ImageProcessPage} from "./pages/img_process/ImageProcessPage";
import {ImgFilterPage} from "./pages/img_filter/ImgFilterPage";
import {ImageSpacialFilter} from "./pages/img_spacial_filter/ImageSpacialFilter";

function App() {
    return (
            <Routes>
                <Route index path="/" element={<Home/>}/>
                <Route  path="/img_process" element={<ImageProcessPage/>}/>
                <Route  path="/img_filter" element={<ImgFilterPage/>}/>
                <Route  path="/img_spacial" element={<ImageSpacialFilter/>}/>
            </Routes>
    );
}

export default App;
