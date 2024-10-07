import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/scss/Post.scss";

const Postpage = () => {
  const { id } = useParams();

  const [postData, setPostData] = useState({});

  const apiUrl = "http://localhost:4050/api/get_individual_post";

  useEffect(() => {
    axios
      .get(`${apiUrl}?id=${id}`)
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  console.log(postData);

  return (
    <>
      <div className="PostInnerPage">This is the post page and is is{id}</div>
      <div
        className="editor-output"
        dangerouslySetInnerHTML={{ __html: postData.content }}
      />
    </>
  );
};

export default Postpage;
