import React, { useState, useEffect } from 'react';
import './ChatBody.css';
import { Avatar, IconButton } from '@material-ui/core';
import { createImage } from '../SidebarChat/SidebarChat';
import { SearchOutlined, AttachFile, MoreVert } from '@material-ui/icons';
import Message from '../Message/Message';
import ChatFooter from '../ChatFooter/ChatFooter';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase';

const ChatBody = () => {
  const roomId = useParams().roomId;
  const [x, setX] = useState(40);
  const [y, setY] = useState(40);
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomId)
    {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
        setRoomName(snapshot.data().name);
        setX(createImage().x);
        setY(createImage().y);
      });
      db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()))
        });
    }
  }, [roomId]);
  return (
    <div className="chatBody">
      <div className="chatBody__header">
        <Avatar src={`https://source.unsplash.com/user/erondu/${x}x${y}`} alt="avatar" />
        <div className="chatBody__header-info">
          <h3> {roomName} </h3>
          <p>
            Last seen {" "}  {messages.length > 0 &&
              new Date(messages[messages.length - 1].timestamp?.toDate()).toUTCString()}
          </p>
        </div>
        <div className="chatBody__header-right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chatBody__body">
        {
          messages && messages.map((msg, id) => (
            <Message key={id} msg={msg} />
          ))
        }
      </div>
      <div className="chat__footer">
        <ChatFooter roomId={roomId} />
      </div>
    </div>
  )
}

export default ChatBody;
