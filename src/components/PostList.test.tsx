import { render, screen, fireEvent } from '@testing-library/react';
import PostList from './PostList';
import { MemoryRouter } from 'react-router-dom';

const mockPosts = [
  { id: '1', title: 'Первый пост', tag: 'frontend' },
  { id: '2', title: 'Второй пост', tag: 'backend' },
];

test('отображает список постов', () => {
  render(
    <MemoryRouter>
      <PostList posts={mockPosts} />
    </MemoryRouter>
  );

  expect(screen.getByText('Первый пост')).toBeInTheDocument();
  expect(screen.getByText('Второй пост')).toBeInTheDocument();
  expect(screen.getByText('frontend')).toBeInTheDocument();
  expect(screen.getByText('backend')).toBeInTheDocument();
});