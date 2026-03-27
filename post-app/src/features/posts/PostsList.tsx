import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import PostExcerpt from "./PostExcerpt";
import {
  fetchPosts,
  selectAllPosts,
  selectPostsError,
  selectPostsStatus,
} from "./postsSlice";

const PostsList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const postsStatus = useAppSelector(selectPostsStatus);
  const postsError = useAppSelector(selectPostsError);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  const renderPosts = orderedPosts.map((post) => (
    <PostExcerpt
      key={post.id}
      id={post.id}
      title={post.title}
      content={post.content}
      date={post.date}
      reactions={post.reactions}
    />
  ));

  let content = renderPosts;
  if (postsStatus === "pending") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }

  return (
    <div>
      <h2>Posts List</h2>
      {content}
    </div>
  );
};

export default PostsList;
