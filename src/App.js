import './App.css';
// import {Route, Routes} from "react-router-dom"
// import Editor from "./Page/Editor"
import Navbar from './Components/Editor/Navbar';
import TextEditor from './Components/Editor/TextEditor/TextEditor';
function App() {
  return (
    <div className="App">
    {/* <Routes>
    <Route path="/doc" element={<Editor />} />
    </Routes> */}
    <Navbar/>
    <TextEditor/>
    </div>
  );
}

export default App;
