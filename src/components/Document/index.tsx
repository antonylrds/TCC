import React from 'react';

import { FiFileText, FiDownload } from 'react-icons/fi';
import { Container } from './styles';

const Document: React.FC = () => {
  return (
    <Container>
      <FiFileText size={100} />
      <div>
        <strong>
          Protótipo de Ferramenta para Armazenamento e Acesso à Produção
          Científica do Curso de Sistemas de Informação da UNIFAP
        </strong>
        <div className="separator" />
        <span>Autor(a): Antony Luan Rodrigues dos Santos</span>
        <span>Orientador(a): Cesar Augusto Cusin</span>
      </div>
      <button type="button">
        <FiDownload size={30} />
      </button>
    </Container>
  );
};

export default Document;
