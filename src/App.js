import './App.css';
import {Route, Routes} from "react-router-dom"
import Editor from "./Page/Editor"
import Doc from './Page/Doc';
import Home from './Page/Home';
import ProjectRoute from './Components/Editor/ProjectRoute';
function App() {

  return (
    <div className="App">
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route element={<ProjectRoute/>}>
    <Route path='/home' element={<Doc />} />
    </Route>
    <Route element={<ProjectRoute/>}>
    <Route path="/doc/:id/:shared" element={<Editor />} />
    </Route>
    </Routes>
    </div>
  );
}

export default App;
