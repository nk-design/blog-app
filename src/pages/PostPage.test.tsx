import { render, screen, fireEvent } from '@testing-library/react';
import PostPage from './PostPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';

// Предварительно добавим пост в стор
store.dispatch({
  type: 'posts/fetch/fulfilled',
  payload: [{ id: '1', title: 'Редактируемый пост', content: 'Старое содержание' }],
});

test('редактирование поста отображает форму', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/posts/1']}>
        <Routes>
          <Route path="/posts/:id" element={<PostPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  fireEvent.click(screen.getByText(/✏️ Редактировать/i));
  const input = screen.getByDisplayValue('Редактируемый пост');
  expect(input).toBeInTheDocument();
});
