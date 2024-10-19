import { useEffect, useState, useRef } from "react";
import "../../assets/scss/Post.scss";
import Postchip from "../../components/Posts/Postchip";
import { useNavigate, Link } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState({
    posts: [],
    currentPage: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const observerRef = useRef();
  const isFirstRender = useRef(true);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_LOCAL}/get_posts?page=${page}`
      );
      if (!response.ok) {
        throw new Error("Error getting posts");
      }
      const data = await response.json();

      setPosts((prevPosts) => ({
        posts: [...prevPosts.posts, ...data.posts],
        currentPage: data.currentPage,
        totalPages: data.totalPages,
      }));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!observerRef.current || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && posts.currentPage < posts.totalPages) {
          fetchData(posts.currentPage + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.disconnect();
    };
  }, [posts, loading]);

  useEffect(() => {
    if (posts.currentPage === 0) {
      fetchData(1);
    }
  }, []);

  return (
    <div className="Postpage">
      <div className="Verticalscroll">
        <div className="Postcontainer">
          {posts.posts.map((post) => (
            <Link
              key={post._id}
              to={`/post/${post._id}`}
              className="custom-link"
            >
              <Postchip {...post} />
            </Link>
          ))}
        </div>
        <div
          ref={observerRef}
          style={{ height: "20px", background: "transparent" }}
        />
        {loading && (
          <div className="loading-indicator">
            <p>Loading more posts...</p>
          </div>
        )}
        {error && <p>{error.message}</p>}
      </div>
    </div>
  );
};

export default Post;
