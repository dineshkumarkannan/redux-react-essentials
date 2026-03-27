import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import { selectPostById } from "./postsSlice";
import { selectCurrentUser } from "../auth/authSlice";

const SinglePost = () => {
  const { postId } = useParams();
  const currentUserName = useAppSelector(selectCurrentUser);

  const post = useAppSelector((state) => selectPostById(state, postId!));

  if (!post) {
    return (
      <div>
        <h3>Post not found!</h3>
      </div>
    );
  }

  const canEdit = currentUserName === post.user;

  return (
    <div>
      <h2>{post?.title}</h2>
      <p>{post?.content}</p>
      {canEdit && <Link to={`/edit-post/${post.id}`}>Edit Post</Link>}
    </div>
  );
};

export default SinglePost;
