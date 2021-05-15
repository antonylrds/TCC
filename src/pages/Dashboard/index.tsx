import React, { useCallback, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { FiSearch, FiLogIn } from 'react-icons/fi';
import FormInput from '../../components/FormInput';
import Document from '../../components/Document';
import KeyWord from '../../components/KeyWord';

import { useToast } from '../../hooks/toast';

import { Container, Header, IconButton } from './styles';
import LogoImg from '../../assets/logo.png';

const DashBoard: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [professor, setProfessor] = useState('');
  const [keywords, setKeywords] = useState<String[]>([]);
  const [newKeyword, setNewKeyword] = useState('');

  const currentYear = new Date().getFullYear();

  const { addToast } = useToast();

  const history = useHistory();

  const handleRedirect = useCallback(() => {
    window.open('https://www.fapce.edu.br/index.html');
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();

      try {
        if (
          Number(publicationDate) > currentYear ||
          Number(publicationDate) < 1
        ) {
          throw new Error('Ano de publicação inválido');
        }
      } catch (e) {
        addToast({
          title: e.message,
          type: 'error',
        });
      }
    },
    [addToast, publicationDate, currentYear],
  );

  const handleAddKeyword = useCallback(
    keyword => {
      setKeywords([...keywords, keyword]);
      setNewKeyword('');
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
      <Header>
        <img src={LogoImg} alt="LogoMarca" />
        <div>
          <button onClick={handleRedirect} type="button">
            Acessar site da Unifap
          </button>
          <IconButton onClick={() => history.push('/login')} type="button">
            <FiLogIn size={20} />
            Entrar
          </IconButton>
        </div>
      </Header>
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
            <h2>Resultado(s): 0</h2>
          </div>
          <div className="separator" />
          <Document />
          <Document />
        </div>
      </Container>
    </>
  );
};

export default DashBoard;
