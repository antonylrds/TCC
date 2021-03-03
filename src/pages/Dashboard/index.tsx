import React, { useCallback, useState, FormEvent } from 'react';
import { FiSearch } from 'react-icons/fi';
import FormInput from '../../components/FormInput';
import Document from '../../components/Document';

import { Container, Header } from './styles';
import LogoImg from '../../assets/logo.png';

const DashBoard: React.FC = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [professor, setProfessor] = useState('');
  const [keywords, setKeywords] = useState<String[]>([]);

  const handleRedirect = useCallback(() => {
    window.open('https://www.fapce.edu.br/index.html');
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      console.log(title);
    },
    [title],
  );

  const handleAddKeywords = useCallback(
    (newKeyword: String) => {
      setKeywords([...keywords, newKeyword]);
    },
    [keywords],
  );

  return (
    <>
      <Header>
        <img src={LogoImg} alt="LogoMarca" />
        <button onClick={handleRedirect} type="button">
          Acessar site da Unifap
        </button>
      </Header>
      <Container>
        <h1>Biblioteca Online - UniFAP</h1>
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
          <div className="half-width">
            <FormInput
              labelName="Subtítulo"
              name="subtitle"
              id="subtitle-input"
              value={subtitle}
              placeholder="Insira o subtítulo da obra"
              onChange={e => setSubtitle(e.target.value)}
            />

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
              labelName="Data de publicação"
              name="publicationDate"
              id="publication_dt-input"
              value={publicationDate}
              placeholder="Publicação entre..."
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
          <FormInput
            labelName="Palavra-chave"
            name="keyword"
            id="keyword-input"
            value={keywords as string[]}
            placeholder="Insira as palavras-chaves contidas na obra"
            onChange={e => handleAddKeywords(e.target.value)}
          />
          <div className="right-aligned">
            <button type="button">
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
