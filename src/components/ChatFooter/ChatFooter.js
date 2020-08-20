import React, { useState } from 'react';
import './ChatFooter.css';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useStateValue } from '../../context/StateProvider';
import firebase from 'firebase';
import { db } from '../../firebase/firebase';

const ChatFooter = ({ roomId }) => {
  const [{ user }] = useStateValue();
  const [message, setMessage] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (roomId)
    {
      db.collection('rooms').doc(roomId).collection('messages').add({
        name: user.displayName,
        text: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(err => console.log(err));
    }
    setMessage('');
  }
  return (
    <div className="chatFooter">
      <InsertEmoticonIcon />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Type a message..."
          value={message} onChange={e => setMessage(e.target.value)} />
        <button disabled={!message ? true : false} type="submit">Send</button>
      </form>
      <MicIcon />
    </div>
  )
}

export default ChatFooter;
