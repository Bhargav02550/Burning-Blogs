import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/scss/Post.scss";
import toast from "react-hot-toast";

const Postpage = () => {
  const { id } = useParams();

  const [postData, setPostData] = useState({});

  const apiUrl = `${import.meta.env.VITE_BACKEND_API_ONLINE}/get_individual_post`;

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

  return (
    <>
      <div className="PostMainPage">
        <div
          className="PostInnerPage"
          dangerouslySetInnerHTML={{ __html: postData.htmlContent }}
        ></div>
        <div className="editor-output" />
      </div>
    </>
  );
};

export default Postpage;
