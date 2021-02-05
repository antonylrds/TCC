import React from 'react';

import { FiLogIn } from 'react-icons/fi';
import LogoImg from '../../assets/logo.png';

// import { FiUser } from 'react-icons/fi';
// import { FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import { Container } from './styles';

const Login: React.FC = () => (
  <>
    <Container>
      <img src={LogoImg} alt="logomarca" width={350} />
      <form>
        <h1>Entrar</h1>
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">
          <FiLogIn /> Entrar
        </button>
      </form>
      <div />
    </Container>
  </>
);

export default Login;
