import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import { selectPostById } from "./postsSlice";

const SinglePost = () => {
  const { postId } = useParams();

  const post = useAppSelector((state) => selectPostById(state, postId!));

  if (!post) {
    return (
      <div>
        <h3>Post not found!</h3>
      </div>
    );
  }

  return (
    <div>
      <h2>{post?.title}</h2>
      <p>{post?.content}</p>
      <Link to={`/edit-post/${post.id}`}>Edit Post</Link>
    </div>
  );
};

export default SinglePost;
