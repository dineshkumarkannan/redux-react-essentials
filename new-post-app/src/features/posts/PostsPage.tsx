import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import PostListTable from "./PostListTable";
import {
  fetchPostsThunk,
  deletePostThunk,
  selectPosts,
  selectPostsLoading,
  selectPostsError,
} from "./postsSlice";

export default function PostsPage() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectPostsLoading);
  const error = useAppSelector(selectPostsError);
  const navigate = useNavigate();
  const location = useLocation();
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPostsThunk());
    }
  }, [dispatch, posts.length]);

  // Scroll to and highlight the updated post if coming from edit, or restore scroll position
  useEffect(() => {
    // Restore scroll from sessionStorage if available
    const savedScroll = sessionStorage.getItem("postsScrollY");
    if (savedScroll) {
      window.scrollTo({ top: Number(savedScroll), behavior: "auto" });
      sessionStorage.removeItem("postsScrollY");
      return;
    }
    if (location.state && location.state.highlightId) {
      const row = document.getElementById(
        `post-row-${location.state.highlightId}`,
      );
      if (row) {
        row.scrollIntoView({ behavior: "smooth", block: "center" });
        row.classList.add("bg-green-100");
        setTimeout(() => row.classList.remove("bg-green-100"), 2000);
      }
      window.history.replaceState(
        { ...location.state, highlightId: undefined },
        "",
      );
    }
  }, [location.state]);

  const handleAdd = () => {
    sessionStorage.setItem("postsScrollY", String(window.scrollY));
    navigate("/posts/add");
  };

  // Handler to preserve scroll position when navigating to edit
  const handleEdit = (id: number) => {
    sessionStorage.setItem("postsScrollY", String(window.scrollY));
    navigate(`/posts/edit/${id}`);
  };

  // ...existing code...

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAdd}
        >
          Add New Post
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <PostListTable
          posts={posts}
          onDelete={async (id) => {
            if (!window.confirm("Delete this post?")) return;
            setFormLoading(true);
            try {
              await dispatch(deletePostThunk(id)).unwrap();
            } finally {
              setFormLoading(false);
            }
          }}
          onEdit={handleEdit}
          formLoading={formLoading}
        />
      )}
    </div>
  );
}
