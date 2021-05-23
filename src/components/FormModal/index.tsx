/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
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
import { FiEdit, FiPlus, FiX } from 'react-icons/fi';

import { ptBR } from 'date-fns/locale';
import IconButton from '@material-ui/core/IconButton';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

interface KeywordInterface {
  word: string;
}

interface TccInterface {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  professor: string;
  path: string;
  abstract: string;
  publicationDate: Date | null;
  keyWords?: KeywordInterface[] | null;
}

interface ControlModalInterface {
  tcc?: TccInterface;
  open: boolean;
  setOpen: Function;
}

const FormDialog: React.FC<ControlModalInterface> = ({
  open,
  setOpen,
  tcc: currentTcc,
}) => {
  const [tcc, setTcc] = useState<TccInterface>({} as TccInterface);
  const [newKeyword, setNewKeyword] = useState('');

  const { addToast } = useToast();

  useEffect(() => {
    if (currentTcc) {
      setTcc(currentTcc);
    }
  }, [currentTcc]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();

      try {
        await api.put(`/papers/${tcc.id}`, {
          params: {
            ...tcc,
            keywords: JSON.stringify(tcc.keyWords?.map((element) => element.word)),
          },

        }, {
          headers: {
            Authorization: localStorage.getItem('@TCC:token'),
          },
        });

        setOpen(false);
      } catch (err) {
        addToast({
          type: 'error',
          title: err.response.data.message,
        });
      }
    },
    [tcc, addToast, setOpen],
  );

  const handleDateChange = useCallback(
    (date: Date | null) => {
      setTcc({ ...tcc, publicationDate: date });
    },
    [tcc],
  );

  const handleAddKeyword = useCallback(
    keyword => {
      if (keyword !== '' && tcc.keyWords) {

        const keywordExists = tcc.keyWords.filter((element) => element.word === keyword);

        if (keywordExists.length < 1) {
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

  return tcc ? (
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
          <FiEdit size={20} /> Editar
        </DialogTitle>
        <DialogContent>
          <Grid style={{ overflow: 'hidden' }} container spacing={3}>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="titleEdit"
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
                id="subtitleEdit"
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
                  id="date-picker-dialog"
                  label="Data de publicação"
                  format="dd/MM/yyyy"
                  maxDate={new Date()}
                  maxDateMessage="A data selecionada não pode ser uma data futura"
                  value={tcc.publicationDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="authorEdit"
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
                id="professorEdit"
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
                id="professorEdit"
                label="Orientador(a)"
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
                id="resumoEdit"
                label="Resumo"
                fullWidth
                value={tcc.abstract}
                onChange={e => setTcc({ ...tcc, abstract: e.target.value })}
                multiline
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ) : null;
};

export default FormDialog;
