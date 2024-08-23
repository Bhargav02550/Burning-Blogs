import { useParams } from "react-router-dom";

const Postpage = () => {
  const { id } = useParams();
  return <div>This is the post page and is is{id}</div>;
};

export default Postpage;
