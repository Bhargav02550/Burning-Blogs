import { Routes, Route } from "react-router-dom";
import Post from "../Pages/Posts/Post";
import Login from "../Pages/Auth/Login";
import PostPage from "../Pages/Posts/PostPage";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Post />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>Not Found</h1>} />
      <Route path="/post/:id" element={<PostPage />} />
    </Routes>
  );
};

export default PageRoutes;
