import React from "react";
import "../../assets/scss/Post.scss";
import { FcLike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { BsStars } from "react-icons/bs";

const Postchip = (props) => {
  const navigate = useNavigate();

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
    } else if (year == present.getFullYear()) {
      return `${monthName}${day}`;
    } else {
      return `${monthName} ${day}, ${year}`;
    }
  };

  return (
    <article>
      <div className="Postcard" key={props._id}>
        <div className="Postheader">
          <div className="Postinfo">
            <div className="Postauthor">
              <img
                src="./profile.jpg"
                style={{ width: "20px", height: "20px", borderRadius: "50%" }}
              />
              {props.author}
            </div>
            <div className="Posttitle">{props.title}</div>
          </div>
        </div>
        <p className="Postdata">{props.content}</p>
        <div className="Postactions">
          <BsStars color="gold" style={{ paddingRight: "15px" }} />
          <div className="Postdate">{uploadTimestamp(props.created_date)}</div>
        </div>
      </div>
    </article>
  );
};

export default Postchip;
