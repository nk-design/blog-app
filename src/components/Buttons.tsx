import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Button = styled.button<{ color?: string }>`
  padding: 0.5rem 1rem;
  border: none;
  background: ${({ color }) => color || '#007bff'};
  color: white;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  margin-right: 0.5rem;

  &:hover {
    background: ${({ color }) => (color === 'red' ? '#b30000' : '#0056b3')};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: inherit;
  font-size: 1rem;
  margin-bottom: 1rem;
  resize: vertical;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: inherit;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export {
  Container,
  Title,
  Button,
  Textarea,
  Input,
};
