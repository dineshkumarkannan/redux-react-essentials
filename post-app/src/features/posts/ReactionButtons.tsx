import { useAppDispatch } from "../../app/hook";
import { reactionsAdded, type ReactionName } from "./postsSlice";

const reactionEmoji: Record<ReactionName, string> = {
  likes: "👍",
  dislikes: "👎",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useAppDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(
    ([stringName, emoji]) => {
      const reaction = stringName as ReactionName;

      return (
        <button
          key={stringName}
          onClick={() =>
            dispatch(reactionsAdded({ postId: post.id, reaction }))
          }
        >
          {emoji}
          {post.reactions[reaction]}
        </button>
      );
    },
  );

  return <div className="reaction-buttons">{reactionButtons}</div>;
};

export default ReactionButtons;
