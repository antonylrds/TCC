import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLogIn, FiLock, FiUser, FiAtSign } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import LogoImg from '../../assets/logo-quadrada.png';

import Input from '../../components/Input';
import { Container } from './styles';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signUp } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      try {
        if (password !== confirmPassword) {
          addToast({
            type: 'error',
            title: 'Erro na cadastro',
            description: 'As senhas não são compatíveis',
          });
        } else if (!name || !email || !password || !confirmPassword) {
          addToast({
            type: 'error',
            title: 'Erro na cadastro',
            description: 'Todos dos campos devem ser preenchidos',
          });
        } else {
          await signUp({ name, email, password });

          addToast({
            type: 'success',
            title: 'Usuário cadastrado com sucesso',
          });
          history.push('/dashboard');
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na cadastro',
          description: 'Ocorreu um erro ao cadastrar, verifique os dados',
        });
      }
    },
    [signUp, addToast, name, email, password, history, confirmPassword],
  );

  return (
    <>
      <Container>
        <img src={LogoImg} alt="logomarca" width={250} />
        <form onSubmit={handleSubmit}>
          <h1>Cadastrar usuário</h1>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            name="name"
            type="text"
            placeholder="Nome"
            icon={FiUser}
          />

          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="E-mail"
            icon={FiAtSign}
          />
          <Input
            value={password}
            onChange={e => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Senha"
            icon={FiLock}
          />

          <Input
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            type="password"
            placeholder="Confirme a senha"
            icon={FiLock}
          />

          <button type="submit">
            <FiLogIn /> Cadastrar
          </button>
        </form>
        <div />
      </Container>
    </>
  );
};

export default Signup;
