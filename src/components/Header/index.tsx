import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';
import { Container, IconButton, IconButtonAdmin } from './style';

import { useAuth } from '../../hooks/auth';

import LogoImg from '../../assets/logo.png';

interface UserDTO {
  user: {
    name: string;
  };
  signOut: Function;
}

const Header: React.FC = () => {
  const { user, signOut } = useAuth() as UserDTO;

  const history = useHistory();

  const handleRedirect = useCallback(() => {
    window.open('https://www.fapce.edu.br/index.html');
  }, []);

  return (
    <Container>
      <img src={LogoImg} alt="LogoMarca" />
      {user ? (
        <div className="userInfo">
          <div>
            <FiUser size={30} /> Bem-vindo, {user.name}
          </div>
          <IconButtonAdmin onClick={() => signOut()} type="button">
            <FiLogOut size={20} />
            Sair
          </IconButtonAdmin>
        </div>
      ) : (
        <div>
          <button onClick={handleRedirect} type="button">
            Acessar site da Unifap
          </button>
          <IconButton onClick={() => history.push('/login')} type="button">
            <FiLogIn size={20} />
            Entrar
          </IconButton>
        </div>
      )}
    </Container>
  );
};

export default Header;
