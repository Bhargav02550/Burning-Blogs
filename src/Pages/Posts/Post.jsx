import React, { useEffect, useState } from "react";
import "../../assets/scss/Post.scss";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { BiArrowToRight } from "react-icons/bi";
import io from "socket.io-client";
import Postchip from "./Postchip";
import { ShimmerCard } from "react-shimmer-effects";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const uploadTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const monthName = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const present = new Date();
    if (
      present.getDate() === day &&
      present.getMonth() === date.getMonth() &&
      present.getFullYear() === year
    ) {
      return `Uploaded today`;
    } else if (
      Math.abs(day - present.getDate()) <= 7 &&
      present.getMonth() === date.getMonth() &&
      present.getFullYear() === year
    ) {
      return `Uploaded ${Math.abs(day - present.getDate())} days ago`;
    } else {
      return `${monthName} ${day}, ${year}`;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}` + `/get_posts`
        );
        if (!response.ok) {
          throw new Error("Error gettings blogs");
        }
        const data = await response.json();
        setPosts(data);
        // socket.on("newPost", (newPost) => {
        // setPosts((prevPosts) => [newPost, ...prevPosts]);
        // });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loader"></div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="Postpage">
      <div className="Verticalscroll">
        {/* {posts.map((post) => (
          <div className="Postcard" key={post._id}>
            <div className="Postheader">
              <img src="../profile.jpg" alt="profile" />
              <div className="Postinfo">
                <div className="Posttitle">{post.title}</div>
                <div className="Postauthor">
                  {post.author} · {uploadTimestamp(post.created_date)}
                </div>
              </div>
            </div>
            <p>{post.content.slice(0, 150)}...</p>
            <div className="Postactions">
              <div className="PostLikes">
                <FcLike></FcLike>
                {post.likes}
              </div>
              <button>Read More...</button>
            </div>
          </div>
        ))} */}
        {posts.map((post) => (
          <Postchip key={post._id} {...post} isLoading={loading} />
        ))}
      </div>
      <div>Hello</div>
    </div>
  );
};

export default Post;
