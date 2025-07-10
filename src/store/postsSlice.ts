import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Post {
  id: string;
  title: string;
  content: string;
  tag?: string;
}

interface State {
  posts: Post[];
  loading: boolean;
}

const initialState: State = {
  posts: [],
  loading: false,
};

export const fetchPosts = createAsyncThunk('posts/fetch', async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  const posts: Post[] = [];
  querySnapshot.forEach((docSnap) =>
    posts.push({ id: docSnap.id, ...docSnap.data() } as Post)
  );
  return posts;
});

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id: string) => {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Post not found');
    }
    return { id: docSnap.id, ...docSnap.data() } as Post;
  }
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (post: Omit<Post, 'id'>) => {
    const docRef = await addDoc(collection(db, 'posts'), post);
    return { id: docRef.id, ...post } as Post;
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (post: Post) => {
    const docRef = doc(db, 'posts', post.id);
    await updateDoc(docRef, {
      title: post.title,
      content: post.content,
      tag: post.tag || '',
    });
    return post;
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: string) => {
    await deleteDoc(doc(db, 'posts', id));
    return id;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        const existingIndex = state.posts.findIndex(
          (p) => p.id === action.payload.id
        );
        if (existingIndex !== -1) {
          state.posts[existingIndex] = action.payload;
        } else {
          state.posts.push(action.payload);
        }
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
