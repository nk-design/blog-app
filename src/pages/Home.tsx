import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../store/postsSlice';
import { RootState, AppDispatch } from '../store';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const tags = Array.from(new Set(posts.map(p => p.tag).filter(Boolean))) as string[];

  const filtered = selectedTag
    ? posts.filter(p => p.tag === selectedTag)
    : posts;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📚 Блог</h1>
      <PostForm />

      {tags.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <strong>Фильтровать по тегу:</strong>{' '}
          <button
            onClick={() => setSelectedTag(null)}
            style={{ marginRight: '0.5rem' }}
          >
            Все
          </button>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              style={{
                marginRight: '0.5rem',
                background: selectedTag === tag ? '#0056b3' : '#007bff',
                color: 'white',
                padding: '0.3rem 0.6rem',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <PostList posts={filtered} />
    </div>
  );
};

export default Home;
