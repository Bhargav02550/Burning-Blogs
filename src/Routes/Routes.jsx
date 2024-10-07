import { Routes, Route } from "react-router-dom";
import Post from "../Pages/Posts/Post";
import Login from "../Pages/Auth/Login";
import PostPage from "../Pages/Posts/PostPage";
import MDE from "../Pages/MDE/blogMde";
import RegisterPage from "../Pages/Auth/Register";
import PostPreview from "../Pages/Posts/PostPreview";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Post />} />
      <Route path="/login" element={<Login />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="*" element={<h1>Not Found</h1>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/new-burn" element={<MDE />} />
      <Route path="/post-preview" element={<PostPreview />} />
    </Routes>
  );
};

export default PageRoutes;
