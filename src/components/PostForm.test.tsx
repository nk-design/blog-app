import { render, screen, fireEvent } from '@testing-library/react';
import PostForm from './PostForm';
import { Provider } from 'react-redux';
import { store } from '../store';

test('форма отправляется при валидном вводе', () => {
  render(
    <Provider store={store}>
      <PostForm />
    </Provider>
  );

  fireEvent.change(screen.getByPlaceholderText(/тег/i), {
    target: { value: 'frontend' },
  });
  fireEvent.change(screen.getByPlaceholderText(/текст поста/i), {
    target: { value: 'Это текст длиннее 10 символов' },
  });
  fireEvent.submit(screen.getByRole('button', { name: /создать пост/i }));

  expect(screen.getByPlaceholderText(/текст поста/i)).toHaveValue('');
});
