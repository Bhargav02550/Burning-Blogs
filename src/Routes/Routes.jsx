import { Routes, Route } from "react-router-dom";
import Post from "../Pages/Posts/Post";
import Login from "../Pages/Auth/Login";
import PostPage from "../Pages/Posts/PostPage";
import MDE from "../Pages/MDE/blogMde";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Post />} />
      <Route path="/login" element={<Login />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="*" element={<h1>Not Found</h1>} />
      <Route path="/mde" element={<MDE />} />
    </Routes>
  );
};

export default PageRoutes;
