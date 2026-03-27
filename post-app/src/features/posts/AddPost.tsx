import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { postAdded, type Post } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { selectCurrentUser } from "../auth/authSlice";

const AddPost = () => {
  const dipatch = useAppDispatch();
  const userId = useAppSelector(selectCurrentUser);
  const { register, handleSubmit, reset } = useForm();

  const onSumbit = (data: Post) => {
    dipatch(postAdded(data.title, data.content, userId));
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
