import React from "react";
import "../../assets/scss/Auth.scss";
import { useLoading } from "../../ContextAPI/LoadingContext";

const Loading = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <div className="load"></div>
    </div>
  );
};

export default Loading;
