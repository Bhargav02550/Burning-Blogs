import { useLocation } from "react-router-dom";
import "../../assets/scss/PostPreview.scss";

const PostPreview = () => {
  const param = useLocation().state;

  // console.log(param);

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
    </>
  );
};

export default PostPreview;
