import { Routes, Route } from "react-router-dom"
import './App.scss';
import Portfolio from "./components/portfolio/portfolio";
import Blogs from "./components/blogs/blogs";
import "./utils/initializeSetup";
function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="blogs" element={<Blogs />} />
      </Routes>
    </div>
  );
}

export default App;
