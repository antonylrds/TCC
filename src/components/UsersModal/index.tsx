/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import { FiTrash, FiUser, FiUserPlus, FiUsers } from 'react-icons/fi';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

interface ControlModalInterface {
  open: boolean;
  setOpen: Function;
}

interface UserInterface {
  id: string;
  name: string;
  email: string;
}

const CreateModal: React.FC<ControlModalInterface> = ({
  open,
  setOpen,
}) => {

  const [users, setUsers] = useState<UserInterface[]>([] as UserInterface[]);

  const { addToast } = useToast();
  const history = useHistory();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const getUsers = useCallback(async () => {
    try {
      const response = await api.get('/users', {
        headers: {
          Authorization: localStorage.getItem('@TCC:token')
        }
      });

      setUsers(response.data);
    } catch (err) {
      addToast({
        type: 'error',
        title: err.response.data.message
      })
    }
  }, [addToast])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const handleDelete = useCallback(async (id: string) => {
    try {
      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: localStorage.getItem('@TCC:token')
        }
      })

      getUsers();
    } catch (err) {
      addToast({
        type: 'error',
        title: err.response.data.message
      })
    }
  }, [addToast, getUsers])

  const handleRedirect = useCallback(() => {
    history.push('/signup');
  }, [history])


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
          <FiUsers /> Usuários
        </DialogTitle>
        <DialogContent>
          <Grid container justify="flex-start">
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                color="default"
                startIcon={<FiUserPlus />}
                onClick={handleRedirect}
              >
                Novo usuário
              </Button>
            </Grid>
            <Grid item xs={12}>
              <List dense>
                {users && users.map((element) => (
                  <ListItem key={element.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <FiUser />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={element.name}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(element.id)}>
                        <FiTrash />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateModal;
