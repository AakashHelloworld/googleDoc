import './App.css';
import {Route, Routes} from "react-router-dom"
import Editor from "./Page/Editor"
import Doc from './Page/Doc';
import Home from './Page/Home';
function App() {





  return (
    <div className="App">
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/home' element={<Doc />} />
    <Route path="/doc/:id" element={<Editor />} />
    </Routes>

    </div>
  );
}

export default App;
