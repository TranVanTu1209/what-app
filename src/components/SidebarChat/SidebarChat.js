import React, { useState, useEffect } from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { db } from '../../firebase/firebase';

const randomImageSize = [40, 41, 39, 42, 43, 38, 44, 45, 46];

export const createImage = () => {
  const x = randomImageSize[Math.round(Math.random() * randomImageSize.length)];
  const y = randomImageSize[Math.round(Math.random() * randomImageSize.length)];
  return {
    x, y
  };
}

const SidebarChat = ({ addNewChat, name, roomId }) => {
  const [open, setOpen] = React.useState(false);
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (roomId)
    {
      db.collection('rooms').doc(roomId).collection('messages')
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => ({ text: doc.data().text })));
        });
    }
  }, [roomId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreateRoom = () => {
    db.collection('rooms').add({ name: room });
    setOpen(false);
  };
  return (
    <React.Fragment>
      {
        !addNewChat ? <div className="sidebarChat">
          <Avatar src={`https://source.unsplash.com/user/erondu/${createImage().x}x${createImage().y}`} alt="Avatar" />
          <div className="sidebarChat__info">
            <h2>{name}</h2>
            <p>
              {messages[messages.length - 1] && messages[messages.length - 1].text}
            </p>
          </div>
        </div> : <div className="sidebarChat" onClick={handleClickOpen}>
            <div />
            <div className="sidebarChat__info">
              <h3>Add new chat</h3>
            </div>
          </div>
      }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle >Add a room name</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Room name"
            type="text"
            fullWidth
            value={room}
            onChange={e => setRoom(e.target.value)}
          />
          <Button className="mt-3" disabled={!room} onClick={handleCreateRoom} variant="contained" color="primary">
            Add
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default SidebarChat;
