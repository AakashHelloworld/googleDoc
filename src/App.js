import './App.css';
import {Route, Routes} from "react-router-dom"
import Editor from "./Page/Editor"
function App() {
  return (
    <div className="App">
    <Routes>
    <Route path="/doc" element={<Editor />} />
    </Routes>
    </div>
  );
}

export default App;
