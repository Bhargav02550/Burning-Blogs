import { useContext, useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/scss/Post.scss";
import toast from "react-hot-toast";
import { AppContext } from "../../ContextAPI/ContextAPI";

const Postpage = () => {
  const { id } = useParams();

  const [postData, setPostData] = useState({});

  const [authorData, setAuthorData] = useState({});

  const { user } = useContext(AppContext);

  const apiUrl = `${
    import.meta.env.VITE_BACKEND_API_ONLINE
  }/get_individual_post`;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`${apiUrl}?id=${id}`);
        setPostData(response.data);
        document.title = response.data.title;

        if (response.data.authorId) {
          const authorResponse = await axios.get(
            `${import.meta.env.VITE_BACKEND_API_ONLINE}/get_user_byuid/${
              response.data.authorId
            }`
          );
          setAuthorData(authorResponse.data);
        }
        setLoading(false);
      } catch (error) {
        toast.error("Error getting data");
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="PostMainPage">
        <div className="PostInnerPage">
          <h1 className="Posttitle-2">{postData.title}</h1>
          <img src={postData.image} alt="" />
          <div className="PostDetails">
            <div className="Postauth">
              {loading ? (
                <div className="PostAuthImage shimmer"></div>
              ) : (
                <img
                  className="PostAuthImage"
                  src={
                    !authorData.profile_picture
                      ? "/profilePics/profile-placeholder.jpg"
                      : `/profilePics/${authorData.profile_picture}`
                  }
                  alt=""
                />
              )}
              {authorData.firstname === undefined
                ? "Unknown"
                : authorData.firstname}
            </div>
            <div className="Postdate">{formatDate(postData.created_date)}</div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.htmlContent }}></div>
        </div>
        <div className="editor-output" />
      </div>
    </>
  );
};

export default Postpage;
