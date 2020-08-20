import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Avatar } from '@material-ui/core';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import ForumIcon from '@material-ui/icons/Forum';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from '../SidebarChat/SidebarChat';
import { db } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';

const Sidebar = () => {
  const [{ user }] = useStateValue();
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot => {
      setRooms(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
    });
    return () => {
      console.log('CLEAN');
    };
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photoURL} alt="John" className="sidebar__avatar" />
        <div className="sidebar__header-icons">
          <IconButton>
            <DonutSmallIcon />
          </IconButton>
          <IconButton>
            <ForumIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <SearchOutlinedIcon />
        <input type="text" placeholder="Search or start a new chat" />
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {
          rooms && rooms.map(room => (
            <Link key={room.id} to={`/room/${room.id}`}>
              <SidebarChat roomId={room.id} name={room.data.name} />
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Sidebar;
