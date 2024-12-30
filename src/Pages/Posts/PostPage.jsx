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

  useEffect(() => {
    axios
      .get(`${apiUrl}?id=${id}`)
      .then((response) => {
        setPostData(response.data);
        document.title = response.data.title;
      })
      .catch((error) => {
        toast.error("Error getting post data");
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_API_LOCAL}/get_user_byuid/${
          postData.authorId
        }`
      )
      .then((response) => {
        setAuthorData(response.data);
      });
  }, [postData]);

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
              <img
                className="PostAuthImage"
                src={authorData.profile_picture}
                alt=""
              />
              {authorData.firstname}
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
