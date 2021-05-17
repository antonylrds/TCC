import React, { useCallback, useState } from 'react';

import { FiFileText, FiDownload, FiChevronDown } from 'react-icons/fi';
import api from '../../services/api';
import { Container, ActionButtons, DocumentDetails, Abstract } from './styles';

interface DocumentDTO {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  professor: string;
  downloadPath: string;
  abstract: string;
}

const Document: React.FC<DocumentDTO> = ({
  id,
  title,
  author,
  professor,
  abstract,
}) => {
  const [show, setShow] = useState(false);

  const handleDownload = useCallback(async (paperId, fileTitle) => {
    const response = await api.get(`/papers/download/${paperId}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileTitle}.docx`);
    document.body.appendChild(link);
    link.click();
  }, []);

  const handleCollapse = (): void => {
    console.log(show);
    setShow(!show);
  };

  return (
    <>
      <Container>
        <FiFileText size={100} />
        <DocumentDetails>
          <strong>{title}</strong>
          <div className="separator" />
          <span>Autor(a): {author}</span>
          <span>Orientador(a): {professor}</span>
        </DocumentDetails>
        <ActionButtons>
          <button type="button" onClick={() => handleDownload(id, title)}>
            <FiDownload size={50} />
          </button>
          <button type="button" onClick={handleCollapse}>
            <FiChevronDown size={50} />
          </button>
        </ActionButtons>
      </Container>
      <Abstract show={show}>
        <div>
          <h3>Resumo</h3>
          {abstract}
        </div>
      </Abstract>
    </>
  );
};

export default Document;
