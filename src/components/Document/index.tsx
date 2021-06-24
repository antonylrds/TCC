import React, { useCallback, useState } from 'react';

import {
  FiFileText,
  FiDownload,
  FiChevronDown,
  FiEdit,
  FiTrash,
} from 'react-icons/fi';
import Chip from '@material-ui/core/Chip';
import api from '../../services/api';
import { Container, ActionButtons, DocumentDetails, Abstract } from './styles';

import ConfirmDialog from '../ConfirmDialog';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface KeywordInterface {
  word: string;
}

interface DocumentDTO {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  professor: string;
  path: string;
  abstract: string;
  publicationDate: Date;
  keyWords?: KeywordInterface[] | null;
}

interface DocumentAdminDTO {
  tcc: DocumentDTO;
  updateDocuments?: Function;
  openModal?: Function;
  setTcc?: Function;
}

const Document: React.FC<DocumentAdminDTO> = ({
  tcc,
  updateDocuments,
  openModal,
  setTcc,
}) => {
  const {
    id,
    title,
    subtitle,
    publicationDate,
    professor,
    author,
    abstract,
    keyWords,
    path,
  } = tcc;

  const [show, setShow] = useState(false);

  const { user } = useAuth();
  const { addToast } = useToast();

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const iconSize = user ? 20 : 50;

  const handleDownload = useCallback(
    async (paperId, fileTitle) => {
      const response = await api.get(`/papers/download/${paperId}`, {
        responseType: 'blob',
      });

      const regex = /^([^\\]*)\.(\w+)$/;
      const matches = path.match(regex);

      if (matches) {
        const extension = matches[2];
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileTitle}.${extension}`);
        document.body.appendChild(link);
        link.click();
      }
    },
    [path],
  );

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

        if (updateDocuments) {
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

  const handleModalOpen = useCallback(() => {
    if (openModal && setTcc) {
      setTcc(tcc);
      openModal(true);
    }
  }, [openModal, setTcc, tcc]);

  return (
    <>
      <Container>
        <FiFileText size={100} />
        <DocumentDetails>
          <strong>{title}</strong>
          <small>{subtitle}</small>
          <div className="separator" />
          <div>
            {keyWords &&
              keyWords.map(keyword => (
                <Chip size="small" label={keyword.word} />
              ))}
          </div>
          <span>Autor(a): {author}</span>
          <span>Orientador(a): {professor}</span>
          <span>
            Data de publicação:{' '}
            {new Date(publicationDate).toLocaleDateString('pt-BR')}
          </span>
        </DocumentDetails>
        <ActionButtons>
          {user && (
            <>
              <button type="button" onClick={handleModalOpen}>
                <FiEdit size={iconSize} />
                Editar
              </button>
              <button type="button" onClick={() => setOpenConfirmModal(true)}>
                <FiTrash size={iconSize} />
                Apagar
              </button>
            </>
          )}
          <button type="button" onClick={() => handleDownload(id, title)}>
            <FiDownload size={iconSize} />
            Baixar
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
      <ConfirmDialog
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        removeTCC={handleRemove}
        id={id}
      />
    </>
  );
};

export default Document;
