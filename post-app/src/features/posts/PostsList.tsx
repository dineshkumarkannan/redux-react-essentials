import { useAppSelector } from "../../app/hook";
import PostExcerpt from "./PostExcerpt";
import { selectAllPosts } from "./postsSlice";

const PostsList = () => {
  const posts = useAppSelector(selectAllPosts);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

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

  return (
    <div>
      <h2>Posts List</h2>
      {renderPosts}
    </div>
  );
};

export default PostsList;
