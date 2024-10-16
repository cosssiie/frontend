import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log('Form submitted:', { username, password });
    if (username === 'liza2' && password === 'liza2') {
      document.cookie = 'user=authenticated';
      navigate('./Dashboard');
    } else {
      console.error('Invalid credentials');
    }
  };

  return (
    <SignInForm>
      <Form onSubmit={handleSubmit}>
        <H1>Sign In</H1>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </Form>
    </SignInForm>
  );
};


const SignInForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const H1 = styled.h1`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 4px;

  &:hover {
    background-color: darkblue;
  }
`;


export default LoginForm;
