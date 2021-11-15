import React, { useState, useEffect } from 'react';
import SendMessageForm from '../Components/SendMessageForm';
import MessageDisplay from '../Components/MessageDisplay';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import { HubConnectionBuilder } from '@microsoft/signalr';

//import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const ChatPage = ({ isLoggedIn, userName, userId }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  // const getUsers = async () => {
  //   axios.get('api/users');
  // };

  useEffect(() => {
    if (isLoggedIn) {
      try {
        const connection = new HubConnectionBuilder()
          .withUrl('hubs/chat')
          .withAutomaticReconnect()
          .build();

        connection.start().then(() => {
          console.log('Connected!');
          const newMessage = {
            Username: userName,
            Text: messages,
            UserId: userId
          };
          connection.on('ReceiveMessage', (username, text) => {
            const updateChat = [...messages];
            updateChat.push(newMessage);
            getAllMessages();
          });
        });
      } catch (e) {
        console.log('Connection failed: ', e);
      }
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getAllMessages();
    }
  }, []);

  const sendMessage = async (message, userName, userId) => {
    try {
      const response = await axios.post('/api/message', {
        Username: userName,
        Text: message,
        UserId: userId
      });
      console.log('response: ', response.data);
      getAllMessages();
    } catch (error) {
      console.log('error response: ', error.response.data);
    }
  };

  const getAllMessages = async () => {
    try {
      const response = await axios.get('/api/getallmessages', {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('response from getAllMessages: ', response);
      setMessages(response.data);

      console.log('messages: ', messages);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <div className='chat'>
        Welcome to the chat page {userName}.
        <MessageDisplay messages={messages} />
        <SendMessageForm
          userId={userId}
          userName={userName}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatPage;
