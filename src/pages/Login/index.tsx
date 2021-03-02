import React, { FormEvent, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLogIn, FiLock, FiUser } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import LogoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import { Container } from './styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      try {
        await signIn({ email, password });

        history.push('/dashboard');
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer login, verifique as credenciais',
        });
      }
    },
    [signIn, email, password, history],
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
            icon={FiUser}
          />
          <Input
            value={password}
            onChange={e => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Senha"
            icon={FiLock}
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
