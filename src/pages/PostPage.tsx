import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { useEffect, useState } from 'react';
import {
  fetchPostById,
  deletePost,
  updatePost,
} from '../store/postsSlice';
import { fetchComments } from '../store/commentsSlice';
import CommentForm from '../components/CommentForm';
import { Container, Title, Button, Textarea, Input } from '../components/Buttons';

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const post = useSelector((state: RootState) =>
    state.posts.posts.find((p) => p.id === id)
  );
  const loading = useSelector((state: RootState) => state.posts.loading);
  const comments = useSelector((state: RootState) => state.comments.items);

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchComments(id));
      if (!post) {
        dispatch(fetchPostById(id));
      } else {
        setTitle(post.title);
        setContent(post.content);
      }
    }
  }, [dispatch, id, post]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleUpdate = () => {
    if (id) {
      dispatch(updatePost({ id, title, content }));
      setEditMode(false);
    }
  };

  const handleDelete = () => {
    if (id) {
      dispatch(deletePost(id));
      navigate('/');
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (!post) return <p>Пост не найден</p>;

  return (
    <Container>
      {editMode ? (
        <>
          <Input value={title} onChange={e => setTitle(e.target.value)} />
          <Textarea value={content} onChange={e => setContent(e.target.value)} />
          <Button onClick={handleUpdate}>Сохранить</Button>
          <Button onClick={() => setEditMode(false)}>Отмена</Button>
        </>
      ) : (
        <>
          <Title>{post.title}</Title>
          <p>{post.content}</p>
          <Button onClick={() => setEditMode(true)}>✏️ Редактировать</Button>
          <Button onClick={handleDelete} color="red">🗑️ Удалить</Button>
        </>
      )}

      <h4 style={{ marginTop: '2rem' }}>Комментарии</h4>
      {comments.map(c => (
        <div key={c.id} style={{ borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
          <p>{c.content}</p>
        </div>
      ))}

      <CommentForm postId={id!} />
    </Container>
  );
};

export default PostPage;
