import React, { useEffect, useRef } from 'react';

const MessageDisplay = ({ messages }) => {
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  return (
    <div ref={messageRef} className='message-container'>
      {messages.map((m, index) => (
        <div key={index} className='user-message'>
          <div className='message bg-primary'>{m.text}</div>
          <div className='from-user'>From {m.username}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageDisplay;