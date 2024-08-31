import React from "react";
import "../../assets/scss/Post.scss";
import { FcLike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import {
  ShimmerThumbnail,
  ShimmerText,
  ShimmerTitle,
} from "react-shimmer-effects";

const Postchip = (props) => {
  const navigate = useNavigate();

  const uploadTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const present = new Date();

    const diffMs = present - date;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    // console.log({ diffMinutes, diffHours, diffDays });

    if (diffSeconds >= 0 && diffSeconds < 60) {
      return `${diffSeconds} second${diffSeconds !== 1 ? "s" : ""} ago`;
    } else if (diffMinutes >= 0 && diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    } else if (diffHours >= 0 && diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else if (diffDays >= 0 && diffDays <= 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    } else if (present.getFullYear() === date.getFullYear()) {
      const monthName = date.toLocaleString("default", { month: "short" });
      return `${monthName} ${date.getDate()}`;
    } else {
      const monthName = date.toLocaleString("default", { month: "short" });
      return `${monthName} ${date.getDate()}, ${date.getFullYear()}`;
    }
  };

  return (
    <article className="Article">
      {props.isLoading ? (
        // renderShimmerLoader()
        <div style={{ color: "black" }}>Loading</div>
      ) : (
        <div className="Postcard" key={props._id}>
          <div className="Postauthor">
            <img className="Useravatar" src="./profile.jpg" />
            {props.author}
          </div>
          <div className="Postmain">
            <div>
              <div className="Postheader">
                <div className="Postinfo">
                  <div className="Posttitle">{props.title}</div>
                </div>
              </div>
              <p className="Postdata">{props.content}</p>
              <div className="Postactions">
                <BsStars color="gold" style={{ paddingRight: "15px" }} />
                <div className="Postdate">
                  {uploadTimestamp(props.created_date)}
                </div>
              </div>
            </div>
            <div className="Postimage">
              <img src={props.image} />
            </div>
          </div>
          <div></div>
        </div>
      )}
    </article>
  );
};

export default Postchip;
