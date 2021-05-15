import React, { useCallback } from 'react';

import { FiFileText, FiDownload } from 'react-icons/fi';
import api from '../../services/api';
import { Container } from './styles';

interface DocumentDTO {
  title: string;
  subtitle: string;
  author: string;
  professor: string;
  downloadPath: string;
}

const Document: React.FC<DocumentDTO> = ({
  title,
  subtitle,
  author,
  professor,
  downloadPath,
}) => {
  const handleDownload = useCallback(async (fileTitle, path) => {
    const response = await api.get('/papers/download', {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileTitle}.docx`); // or any other extension
    document.body.appendChild(link);
    link.click();
  }, []);

  return (
    <Container>
      <FiFileText size={100} />
      <div>
        <strong>{title}</strong>
        <div className="separator" />
        <span>Autor(a): {author}</span>
        <span>Orientador(a): {professor}</span>
      </div>
      <button type="button" onClick={() => handleDownload(title, downloadPath)}>
        <FiDownload size={50} />
      </button>
    </Container>
  );
};

export default Document;
