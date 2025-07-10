import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addComment } from '../store/commentsSlice';
import { AppDispatch } from '../store';

const CommentForm = ({ postId }: { postId: string }) => {
  const { register, handleSubmit, reset } = useForm<{ content: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: { content: string }) => {
    dispatch(addComment({ postId, content: data.content }));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '1rem' }}>
      <textarea {...register('content')} placeholder="Оставьте комментарий..." />
      <br />
      <button type="submit">Отправить</button>
    </form>
  );
};

export default CommentForm;
