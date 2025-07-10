import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/postsSlice';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
  max-width: 500px;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  resize: vertical;
  font-family: inherit;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background: #007bff;
  color: white;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: #d93025;
  font-size: 0.85rem;
  margin: -0.5rem 0 0.5rem 0;
`;

const schema = z.object({
  title: z.string().min(3, 'Минимум 3 символа'),
  content: z.string().min(10, 'Минимум 10 символов'),
  tag: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type PostFormProps = {
  onSubmit?: (data: FormData) => void;
};

const PostForm: React.FC<PostFormProps > = ({ onSubmit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitHandler = (data: FormData) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      dispatch(addPost(data));
    }
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <Input {...register('title')} placeholder="Заголовок" />
      {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}

      <Textarea {...register('content')} placeholder="Текст поста" />
      {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}

      <Input {...register('tag')} placeholder="Тег (например: frontend)" />

      <Button type="submit">Создать пост</Button>
    </Form>
  );
};

export default PostForm;
