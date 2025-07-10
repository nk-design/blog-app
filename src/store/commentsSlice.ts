import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface Comment {
  id?: string;
  postId: string;
  content: string;
}

interface State {
  items: Comment[];
  loading: boolean;
}

const initialState: State = {
  items: [],
  loading: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: string) => {
    const snapshot = await getDocs(collection(db, `posts/${postId}/comments`));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Comment[];
  }
);

export const addComment = createAsyncThunk(
  'comments/add',
  async ({ postId, content }: { postId: string; content: string }) => {
    const ref = collection(db, `posts/${postId}/comments`);
    const doc = await addDoc(ref, { content });
    return { id: doc.id, postId, content };
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default commentsSlice.reducer;
