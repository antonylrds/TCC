import React, { useCallback, useState, FormEvent, useEffect } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';

import Button from '@material-ui/core/Button';
import FormInput from '../../components/FormInput';
import Document from '../../components/Document';
import KeyWord from '../../components/KeyWord';
import Pagination from '../../components/Pagination';
import Header from '../../components/Header';
import EditModal from '../../components/EditModal';
import CreateModal from '../../components/CreateModal';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import { Container } from './styles';

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
  keyWords: KeywordInterface[] | null;
}

const Admin: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [professor, setProfessor] = useState('');
  const [keywords, setKeywords] = useState<String[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [documentArray, setDocumentArray] = useState<DocumentDTO[]>(
    [] as DocumentDTO[],
  );
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<DocumentDTO>(
    {} as DocumentDTO,
  );

  const currentYear = new Date().getFullYear();

  const limit = 10;

  const { addToast } = useToast();

  const getPapers = useCallback(async () => {
    try {
      if (
        publicationDate !== '' &&
        (Number(publicationDate) > currentYear || Number(publicationDate) < 1)
      ) {
        throw new Error('Ano de publicação inválido');
      }

      const response = await api.get('/papers', {
        params: {
          page,
          limit,
          title,
          author,
          publicationYear: publicationDate,
          professor,
          keywords: JSON.stringify(keywords),
        },
      });
      setDocumentArray(response.data.papers);
      setTotal(response.data.total);
    } catch (e) {
      addToast({
        title: e.response.data.message,
        type: 'info',
      });
      setDocumentArray([] as DocumentDTO[]);
      setTotal(0);
    }
  }, [
    addToast,
    publicationDate,
    currentYear,
    page,
    title,
    author,
    professor,
    keywords,
  ]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      setPage(1);
      getPapers();
    },
    [getPapers],
  );

  useEffect(() => {
    getPapers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleAddKeyword = useCallback(
    keyword => {
      if (keyword !== '') {
        setKeywords([...keywords, keyword]);
        setNewKeyword('');
      }
    },
    [keywords],
  );

  const handleRemoveKeyword = useCallback(
    keywordtoRemove => {
      const newKeywordsArray = keywords.filter(
        keyword => keyword !== keywordtoRemove,
      );

      setKeywords(newKeywordsArray);
    },
    [keywords],
  );

  return (
    <>
      <Header />
      <Container>
        <h1>Repositório de TCCs de Sistemas de Informação - UniFAP </h1>
        <div className="separator" />
        <form onSubmit={handleSubmit}>
          <FormInput
            labelName="Título"
            name="title"
            id="title-input"
            value={title}
            placeholder="Insira o título da obra"
            onChange={e => setTitle(e.target.value)}
          />

          <div>
            <FormInput
              labelName="Autor(a)"
              name="author"
              id="author-input"
              value={author}
              placeholder="Quem escreveu a obra"
              onChange={e => setAuthor(e.target.value)}
            />
          </div>

          <div className="half-width">
            <FormInput
              type="number"
              max={currentYear}
              min={1}
              labelName="Ano de publicação"
              name="publicationDate"
              id="publication_dt-input"
              value={publicationDate}
              placeholder="Ano da publicação"
              onChange={e => setPublicationDate(e.target.value)}
            />

            <FormInput
              labelName="Orientador(a)"
              name="professor"
              id="professor-input"
              value={professor}
              placeholder="Quem orientou o(a) autor(a)"
              onChange={e => setProfessor(e.target.value)}
            />
          </div>
          <KeyWord
            labelName="Palavra-chave"
            name="keyword"
            id="keyword-input"
            value={newKeyword}
            placeholder="Insira as palavras-chaves contidas na obra"
            onChange={e => setNewKeyword(e.target.value)}
            keywords={keywords}
            handleRemoveKeyword={handleRemoveKeyword}
            handleAddKeyword={handleAddKeyword}
          />
          <div className="right-aligned">
            <button type="submit">
              <FiSearch size={20} />
              Buscar
            </button>
          </div>
        </form>

        <div className="document-list">
          <div className="results">
            <Button
              variant="text"
              color="default"
              startIcon={<FiPlus />}
              onClick={() => setOpenCreateModal(true)}
            >
              Adicionar TCC
            </Button>
            <h2>Resultado(s): {total}</h2>
          </div>
          <div className="separator" />
          {!!documentArray &&
            documentArray.map(document => (
              <Document
                key={document.id}
                tcc={document}
                updateDocuments={getPapers}
                openModal={setOpenEditModal}
                setTcc={setCurrentDocument}
              />
            ))}
        </div>

        {total > 0 && (
          <Pagination
            page={page}
            totalResults={total}
            pageLimit={limit}
            setPage={setPage}
          />
        )}
      </Container>
      <EditModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        tcc={currentDocument}
      />
      <CreateModal open={openCreateModal} setOpen={setOpenCreateModal} />
    </>
  );
};

export default Admin;
