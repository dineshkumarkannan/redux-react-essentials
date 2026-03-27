import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { selectCurrentUser } from "../auth/authSlice";
import { addNewPost } from "./postsSlice";
import { useState } from "react";

const AddPost = () => {
  const [addRequestStatus, setAddRequestStatus] = useState<"idle" | "pending">(
    "idle",
  );
  const dipatch = useAppDispatch();
  const userId = useAppSelector(selectCurrentUser);
  const { register, handleSubmit, reset } = useForm();

  const onSumbit = async (data: Post) => {
    try {
      setAddRequestStatus("pending");
      await dipatch(
        addNewPost({ title: data.title, content: data.content, userId }),
      ).unwrap();
    } catch (err) {
      console.error("Failed to save the post:", err);
    } finally {
      setAddRequestStatus("idle");
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSumbit)}>
      <section>
        <label htmlFor="title">Title</label>
        <input type="text" {...register("title", { required: true })} />
      </section>
      <section>
        <label htmlFor="content">Content</label>
        <textarea {...register("content")} />
      </section>
      <button type="submit">Post</button>
    </form>
  );
};

export default AddPost;
