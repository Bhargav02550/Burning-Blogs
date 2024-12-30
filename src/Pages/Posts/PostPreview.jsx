import { useLocation } from "react-router-dom";
import "../../assets/scss/PostPreview.scss";
import axios from "axios";

const PostPreview = () => {
  const param = useLocation().state;

  console.log(param);

  // console.log(param);

  const api = "http://localhost:4050/api/upload_post";

  const handlePublish = () => {
    axios
      .post(api, {
        title: param.title,
        htmlContent: param.html,
        image: param.thumbnail,
        content: param.content,
        author: param.author,
        authorId: param.authorId,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
        }}
      >
        <div className="PostPreview">
          {/*  <div className="title-preview">{param.title}</div> */}
          <h1 className="title-preview">{param.title}</h1>
          <div>
            <img src={param.thumbnail} className="image-preview" />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: param.html }}
            className="editor-output"
          />
        </div>
      </div>
      <button
        onClick={() => {
          handlePublish();
        }}
      >
        Publish Post
      </button>
    </>
  );
};

export default PostPreview;
