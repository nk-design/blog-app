import commentsReducer, {
  addComment,
  fetchComments,
} from './commentsSlice';

const initialState = {
  items: [],
  loading: false,
};

test('обрабатывает fetchComments.fulfilled', () => {
  const action = {
    type: fetchComments.fulfilled.type,
    payload: [{ id: 'c1', content: 'Комментарий', postId: 'p1' }],
  };

  const state = commentsReducer(initialState, action);
  expect(state.items).toHaveLength(1);
  expect(state.items[0].content).toBe('Комментарий');
});

test('обрабатывает addComment.fulfilled', () => {
  const action = {
    type: addComment.fulfilled.type,
    payload: { id: 'c2', content: 'Новый комментарий', postId: 'p1' },
  };

  const state = commentsReducer(initialState, action);
  expect(state.items[0].content).toBe('Новый комментарий');
});
