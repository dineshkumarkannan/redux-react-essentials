import type { Post } from "./postsSlice";
import { Link } from "react-router-dom";

interface PostListTableProps {
  posts: Post[];
  onDelete: (id: number) => void;
  onEdit?: (id: number) => void;
  formLoading: boolean;
}

export default function PostListTable({
  posts,
  onDelete,
  onEdit,
  formLoading,
}: PostListTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded shadow text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Body</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{post.id}</td>
              <td className="px-4 py-2 border font-medium max-w-xs truncate">
                {post.title}
              </td>
              <td className="px-4 py-2 border max-w-xs truncate">
                {post.body}
              </td>
              <td className="px-4 py-2 border flex gap-2">
                {onEdit ? (
                  <button
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    onClick={() => onEdit(post.id)}
                  >
                    Edit
                  </button>
                ) : (
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </Link>
                )}
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => onDelete(post.id)}
                  disabled={formLoading}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
