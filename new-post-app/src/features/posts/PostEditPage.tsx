import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useEffect, useState } from "react";
import { fetchPostThunk, updatePostThunk } from "./postsSlice";
import PostForm from "./PostForm";

export default function PostEditPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [initialValues, setInitialValues] = useState<{
    title: string;
    body: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    dispatch(fetchPostThunk(Number(id)))
      .unwrap()
      .then((post) => setInitialValues({ title: post.title, body: post.body }))
      .catch(() => setError("Failed to load post"))
      .finally(() => setLoading(false));
  }, [dispatch, id]);

  const handleSubmit = async (values: { title: string; body: string }) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      await dispatch(
        updatePostThunk({ id: Number(id), data: values }),
      ).unwrap();
      // Restore scroll position after edit if available
      navigate("/posts", {
        state: {
          highlightId: Number(id),
          fromScroll: location.state?.fromScroll,
        },
      });
    } catch {
      setError("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialValues) return <div>Loading...</div>;
  if (error && !initialValues)
    return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">Edit Post</h2>
      {initialValues && (
        <PostForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Update Post"
        />
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
