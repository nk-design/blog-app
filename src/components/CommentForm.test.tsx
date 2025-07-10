import { render, screen, fireEvent } from '@testing-library/react';
import CommentForm from './CommentForm';
import { Provider } from 'react-redux';
import { store } from '../store';

test('пишем и отправляем комментарий', () => {
  render(
    <Provider store={store}>
      <CommentForm postId="test123" />
    </Provider>
  );

  const textarea = screen.getByPlaceholderText(/ваш комментарий/i);
  fireEvent.change(textarea, { target: { value: 'Комментарий' } });
  fireEvent.click(screen.getByRole('button', { name: /отправить/i }));

  expect(textarea).toHaveValue('');
});
