/* eslint-disable prettier/prettier */
import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import filesize from 'filesize';

import { FiFilePlus, FiPlus, FiX } from 'react-icons/fi';
import { ptBR } from 'date-fns/locale';
import IconButton from '@material-ui/core/IconButton';
import FileList from '../FileList';
import Upload from '../Upload';

import { ImportFileContainer, Footer } from './styles';
import alert from '../../assets/alert.svg';


import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface KeywordInterface {
  word: string;
}

interface TccInterface {
  title: string;
  subtitle: string;
  author: string;
  professor: string;
  abstract: string;
  publicationDate: Date | null;
  keyWords: KeywordInterface[];
}

interface ControlModalInterface {
  open: boolean;
  setOpen: Function;
}

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}


const CreateModal: React.FC<ControlModalInterface> = ({
  open,
  setOpen,
}) => {
  const [tcc, setTcc] = useState<TccInterface>({
    title: '',
    subtitle: '',
    author: '',
    professor: '',
    abstract: '',
    publicationDate: new Date(),
    keyWords: [] as KeywordInterface[],
  });
  const [newKeyword, setNewKeyword] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);


  const { addToast } = useToast();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleDateChange = useCallback(
    (date: Date | null) => {
      setTcc({ ...tcc, publicationDate: date });
    },
    [tcc],
  );

  async function handleUpload(): Promise<void> {
    const data = new FormData();


    data.append('file', uploadedFiles[0].file);
    data.append('title', tcc.title);
    data.append('subtitle', tcc.subtitle);
    data.append('author', tcc.author);
    data.append('professor', tcc.professor);
    data.append('abstract', tcc.abstract);
    data.append('publicationDate', tcc.publicationDate?.toISOString() || '');
    data.append('keywords', JSON.stringify(tcc.keyWords?.map((element) => element.word)));

    try {
      await api.post(`/papers`, data, {
        headers: {
          Authorization: localStorage.getItem('@TCC:token'),
        },
      });

      addToast({
        type: 'success',
        title: 'Arquivo atualizado com sucesso',
      });

      handleClose();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Campos inválidos',
        description: (err.response.data.message)
      });
    }
  }

  function submitFile(files: File[]): void {
    const [file] = files;
    const { name, size } = file;
    const readableSize = filesize(size);
    setUploadedFiles([{ file, name, readableSize }]);
  }

  const handleAddKeyword = useCallback(
    keyword => {
      if (keyword !== '') {

        if (tcc.keyWords.length > 0) {
          const keywordExists = tcc.keyWords.filter((element) => element.word === keyword);
          if (keywordExists.length < 1) {
            setTcc({ ...tcc, keyWords: [...tcc.keyWords, { word: keyword }] });
          }
        } else {
          setTcc({ ...tcc, keyWords: [...tcc.keyWords, { word: keyword }] });
        }

        setNewKeyword('');
      }
    },
    [tcc],
  );

  const handleRemoveKeyword = useCallback(
    keywordtoRemove => {
      if (tcc.keyWords) {
        const newKeywordsArray = tcc.keyWords.filter(
          keyword => keyword.word !== keywordtoRemove,
        );

        setTcc({ ...tcc, keyWords: newKeywordsArray });
      }
    },
    [tcc],
  );

  const handleEnterPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleAddKeyword(newKeyword)
    }
  }, [newKeyword, handleAddKeyword])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth
        scroll="body"
      >
        <DialogTitle id="form-dialog-title">
          <FiFilePlus /> Novo TCC
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="titleCreate"
                label="Título"
                type="text"
                fullWidth
                value={tcc.title}
                onChange={e => setTcc({ ...tcc, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                margin="dense"
                id="subtitleCreate"
                label="Subtítulo"
                type="text"
                fullWidth
                value={tcc.subtitle}
                onChange={e => setTcc({ ...tcc, subtitle: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="dense"
                  id="date-picker-dialogCreate"
                  label="Data de publicação"
                  format="dd/MM/yyyy"
                  maxDate={new Date()}
                  maxDateMessage="A data selecionada não pode ser uma data futura"
                  value={tcc.publicationDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'Alterar data',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="authorCreate"
                label="Autor(a)"
                type="text"
                fullWidth
                value={tcc.author}
                onChange={e => setTcc({ ...tcc, author: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="professorCreate"
                label="Orientador(a)"
                type="text"
                fullWidth
                value={tcc.professor}
                onChange={e => setTcc({ ...tcc, professor: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="palavraCreate"
                label="Palavra-chave"
                type="text"
                fullWidth
                value={newKeyword}
                placeholder="Insira a nova palavra chave"
                onChange={e => setNewKeyword(e.target.value)}
                onKeyPress={handleEnterPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {tcc.keyWords
                        ? tcc.keyWords.map(element => {
                          return (
                            <Chip
                              key={element.word}
                              deleteIcon={<FiX />}
                              onDelete={() => handleRemoveKeyword(element.word)}
                              label={element.word}
                            />
                          );
                        })
                        : null}
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleAddKeyword(newKeyword)}
                      ><FiPlus />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="resumoCreate"
                label="Resumo"
                fullWidth
                value={tcc.abstract}
                onChange={e => setTcc({ ...tcc, abstract: e.target.value })}
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <ImportFileContainer>
                <Upload onUpload={submitFile} />
                {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

                <Footer>
                  <p>
                    <img src={alert} alt="Alert" />
                    Permitido apenas arquivos .doc, .docx, .odt, .pdf
                  </p>
                </Footer>
              </ImportFileContainer>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleUpload} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateModal;
