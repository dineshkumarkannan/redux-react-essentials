import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hook";
import { postUpdated, selectPostById, type Post } from "./postsSlice";
import { useForm } from "react-hook-form";

const EditPost = () => {
  const navigate = useNavigate();
  const dipatch = useAppDispatch();
  const { postId } = useParams();
  const post = useAppSelector((state) => selectPostById(state, postId!));

  const { register, handleSubmit, reset } = useForm({ defaultValues: post });

  const onSumbit = (data: Post) => {
    dipatch(postUpdated(data));
    reset();
    console.log(postId);
    navigate(`/posts-list/${postId}`);
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
      <button type="submit">Update</button>
    </form>
  );
};

export default EditPost;
