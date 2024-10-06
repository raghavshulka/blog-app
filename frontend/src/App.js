import "./App.css";
import AllBlogs from "./components/AddBlogs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateBlog from "./components/CreateBLog";
import BlogDetail from "./components/Blogdetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllBlogs />} />
        <Route path="/createPage" element={<CreateBlog/> } />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
