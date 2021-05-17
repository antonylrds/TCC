import React, { useCallback, useState } from 'react';

import {
  FiFileText,
  FiDownload,
  FiChevronDown,
  FiEdit,
  FiTrash,
} from 'react-icons/fi';
import api from '../../services/api';
import { Container, ActionButtons, DocumentDetails, Abstract } from './styles';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface DocumentDTO {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  professor: string;
  path: string;
  abstract: string;
}

interface DocumentAdminDTO extends DocumentDTO {
  updateDocuments?: Function;
}

const Document: React.FC<DocumentAdminDTO> = ({
  id,
  title,
  author,
  professor,
  abstract,
  updateDocuments,
}) => {
  const [show, setShow] = useState(false);

  const { user } = useAuth();
  const { addToast } = useToast();

  const iconSize = user ? 30 : 50;

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
    setShow(!show);
  };

  const handleRemove = useCallback(
    async paperId => {
      try {
        await api.delete(`/papers/${paperId}`, {
          headers: {
            Authorization: localStorage.getItem('@TCC:token'),
          },
        });
        addToast({
          type: 'success',
          title: 'TCC removido com sucesso.',
        });

        console.log(updateDocuments);

        if (updateDocuments) {
          console.log('testeste');
          updateDocuments();
        }
      } catch (e) {
        addToast({
          type: 'error',
          title: e.response.data.message,
        });
      }
    },
    [addToast, updateDocuments],
  );

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
          {user && (
            <>
              <button type="button" onClick={() => handleDownload(id, title)}>
                <FiEdit size={iconSize} />
              </button>
              <button type="button" onClick={() => handleRemove(id)}>
                <FiTrash size={iconSize} />
              </button>
            </>
          )}
          <button type="button" onClick={() => handleDownload(id, title)}>
            <FiDownload size={iconSize} />
          </button>
          <button type="button" onClick={handleCollapse}>
            <FiChevronDown size={iconSize + 10} />
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
