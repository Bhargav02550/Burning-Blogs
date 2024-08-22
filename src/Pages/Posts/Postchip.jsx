import React from "react";
import "../../assets/scss/Post.scss";
import { FcLike } from "react-icons/fc";

const Postchip = (props) => {
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

  return (
    <div className="Postcard" key={props._id}>
      <div className="Postheader">
        <img src="../profile.jpg" alt="Profile picture" />
        <div className="Postinfo">
          <div className="Posttitle">{props.title}</div>
          <div className="Postauthor">
            {props.author} · {uploadTimestamp(props.created_date)}
          </div>
        </div>
      </div>
      <p>{props.content.slice(0, 150)}...</p>
      <div className="Postactions">
        <div className="PostLikes">
          <FcLike></FcLike>
          {props.likes}
        </div>
        {/* <button onClick={}>Read More...</button> */}
      </div>
    </div>
  );
};

export default Postchip;
