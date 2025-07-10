import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  tag?: string;
}

interface Props {
  posts: Post[];
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;

const Title = styled.h3`
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const Tag = styled.span`
  display: inline-block;
  background: #007bff;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
`;

const PostList: React.FC<Props> = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <List>
      {posts.map(post => (
        <Item key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
          <Title>{post.title}</Title>
          {post.tag && <Tag>{post.tag}</Tag>}
        </Item>
      ))}
    </List>
  );
};

export default PostList;
