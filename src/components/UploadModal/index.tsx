import React, { useState, useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { FiFilePlus } from 'react-icons/fi';

import filesize from 'filesize';

import api from '../../services/api';

import FileList from '../FileList';
import Upload from '../Upload';

import { ImportFileContainer, Footer } from './styles';
import alert from '../../assets/alert.svg';

import { useToast } from '../../hooks/toast';

interface ControlModalInterface {
  tccId: string;
  open: boolean;
  setOpen: Function;
  updatePapers: Function;
}

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const UploadModal: React.FC<ControlModalInterface> = ({
  tccId,
  open,
  setOpen,
  updatePapers,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);

  const { addToast } = useToast();

  async function handleUpload(): Promise<void> {
    const data = new FormData();

    data.append('file', uploadedFiles[0].file);

    try {
      await api.patch(`/papers/${tccId}`, data, {
        headers: {
          Authorization: localStorage.getItem('@TCC:token'),
        },
      });

      addToast({
        type: 'success',
        title: 'Arquivo atualizado com sucesso',
      });

      updatePapers();
      handleClose();
    } catch (err) {
      addToast({
        type: 'error',
        title: err.data.response.error,
      });
    }
  }

  function submitFile(files: File[]): void {
    const [file] = files;
    const { name, size } = file;
    const readableSize = filesize(size);
    setUploadedFiles([{ file, name, readableSize }]);
  }

  const handleClose = useCallback(() => {
    setOpen(false);
    setUploadedFiles([]);
  }, [setOpen]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
      fullWidth
      scroll="body"
    >
      <DialogTitle id="form-dialog-title">
        <FiFilePlus size={20} /> Alterar arquivo
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
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
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadModal;
