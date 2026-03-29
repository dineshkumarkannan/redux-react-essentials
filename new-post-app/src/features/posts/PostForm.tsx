import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  body: z.string().min(5, "Body is required"),
});

type PostFormValues = z.infer<typeof schema>;

interface PostFormProps {
  initialValues?: PostFormValues;
  onSubmit: (values: PostFormValues) => void;
  loading?: boolean;
  submitLabel?: string;
}

export default function PostForm({
  initialValues,
  onSubmit,
  loading,
  submitLabel = "Save",
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          {...register("title")}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label className="block font-medium mb-1">Body</label>
        <textarea
          {...register("body")}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
        />
        {errors.body && (
          <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
