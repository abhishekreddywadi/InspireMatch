import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Publish from "./pages/Publish";
import "./App.css";
import Quotes from "./pages/Quotes";
import SavedQuotes from "./pages/SavedQuotes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/quote" element={<Quotes />} />
          <Route path="/savedquote" element={<SavedQuotes />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
