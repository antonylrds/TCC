import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface ControlModalInterface {
  open: boolean;
  setOpen: Function;
  id: string;
  removeTCC: Function;
}

const AlertDialog: React.FC<ControlModalInterface> = ({
  open,
  setOpen,
  removeTCC,
  id,
}) => {
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleRemove = useCallback(() => {
    removeTCC(id);
    setOpen(false);
  }, [setOpen, removeTCC, id]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Após excluir esse <b>TCC</b> não será possível recupera-lo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleRemove} color="secondary" autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
