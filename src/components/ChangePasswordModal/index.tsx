/* eslint-disable prettier/prettier */
import React, { useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


import { FiLock } from 'react-icons/fi';

import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

interface ControlModalInterface {
  open: boolean;
  setOpen: Function;
  id: string;
}

const CreateModal: React.FC<ControlModalInterface> = ({
  open,
  setOpen,
  id
}) => {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const { addToast } = useToast();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleSubmit = useCallback(async () => {

    try {
      if (newPassword !== newPasswordConfirm) {
        throw new Error('Senhas não são compatíveis')
      }
      await api.patch(`/users/${id}`, {
        oldPassword,
        newPassword
      }, {
        headers: {
          Authorization: localStorage.getItem('@TCC:token')
        }
      });
      addToast({
        type: 'success',
        title: 'Senha alterada com sucesso',
      })

      setNewPassword('');
      setOldPassword('');
      setNewPasswordConfirm('');
      handleClose();
    } catch (err) {
      addToast({
        type: 'error',
        title: err.response?.data?.message || err.message
      })
    }


  }, [addToast, id, newPassword, newPasswordConfirm, oldPassword, handleClose])


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
          <FiLock /> Alterar senha
        </DialogTitle>
        <DialogContent>
          <Grid container justify="flex-start">
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="oldPassword"
                label="Senha antiga"
                type="text"
                fullWidth
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="newPassword"
                label="Nova senha"
                type="text"
                fullWidth
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="newPasswordConfirm"
                label="Confirme a nova senha"
                type="text"
                fullWidth
                value={newPasswordConfirm}
                onChange={e => setNewPasswordConfirm(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateModal;
