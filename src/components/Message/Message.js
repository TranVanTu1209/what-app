import React from 'react';
import './Message.css';
import { useStateValue } from '../../context/StateProvider';

const Message = ({ msg }) => {
  const [{ user }] = useStateValue()
  const { name, text, timestamp } = msg;
  return (
    <div className={`message ${name === user.displayName && 'message__receiver'}`}>
      <div className="message__container">
        <h5 className="message__name">
          {name}
        </h5>
        <div className="message__text">
          <p>
            <span className="text"> {text} </span>
          </p>
          <small className="message__time">
            {new Date(timestamp?.toDate()).toUTCString()}
          </small>
        </div>
      </div>
    </div>
  )
}

export default Message;
