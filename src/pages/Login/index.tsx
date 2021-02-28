import React, { FormEvent, useCallback, useState } from 'react';
import { FiLogIn } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import LogoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import { Container } from './styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      await signIn({ email, password });
    },
    [signIn, email, password],
  );

  return (
    <>
      <Container>
        <img src={LogoImg} alt="logomarca" width={350} />
        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="E-mail"
          />
          <Input
            value={password}
            onChange={e => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Senha"
          />

          <button type="submit">
            <FiLogIn /> Entrar
          </button>
        </form>
        <div />
      </Container>
    </>
  );
};

export default Login;
