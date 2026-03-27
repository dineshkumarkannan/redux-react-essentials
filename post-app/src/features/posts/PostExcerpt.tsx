import { useNavigate } from "react-router-dom";
import type { Post } from "./postsSlice";
import { TimeAgo } from "../../components/TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostExcerpt = ({ id, title, content, date, reactions }: Post) => {
  const navigate = useNavigate();
  const handleViewPost = () => {
    navigate(`/posts-list/${id}`);
  };

  return (
    <article id={id}>
      <h3>{title}</h3>
      <p>{content}</p>
      <TimeAgo timestamp={date} />
      <br />
      <ReactionButtons post={{ id, reactions }} />
      <br />
      <button onClick={handleViewPost}>View Post</button>
    </article>
  );
};

export default PostExcerpt;
