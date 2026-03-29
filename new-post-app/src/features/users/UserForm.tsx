import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

type UserFormValues = z.infer<typeof schema>;

interface UserFormProps {
  initialValues?: UserFormValues;
  onSubmit: (values: UserFormValues) => void;
  loading?: boolean;
  submitLabel?: string;
}

export default function UserForm({
  initialValues,
  onSubmit,
  loading,
  submitLabel = "Save",
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">First Name</label>
        <input
          {...register("firstName")}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>
      <div>
        <label className="block font-medium mb-1">Last Name</label>
        <input
          {...register("lastName")}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
        )}
      </div>
      <div>
        <label className="block font-medium mb-1">Email</label>
        <input
          {...register("email")}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
