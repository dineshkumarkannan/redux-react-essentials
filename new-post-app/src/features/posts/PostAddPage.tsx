import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import PostForm from "./PostForm";
import { createPostThunk } from "./postsSlice";

export default function PostAddPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { title: string; body: string }) => {
    setLoading(true);
    setError(null);
    try {
      const newPost = await dispatch(createPostThunk(values)).unwrap();
      navigate("/posts", { state: { highlightId: newPost.id } });
    } catch {
      setError("Failed to add post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">Add New Post</h2>
      <PostForm
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Add Post"
      />
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
