import { useDispatch } from 'react-redux';
import { addReaction } from './postsRedux/postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        onClick={() => {
          dispatch(addReaction({ name, id: post.id }));
        }}
        key={name}
        type="button"
        className="muted-button reaction-button"
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export { ReactionButtons };
