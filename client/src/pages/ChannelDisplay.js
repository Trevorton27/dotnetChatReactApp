import React, { useEffect, useState, useCallback } from 'react';
import MessageContainer from './MessageContainer';
import SendMessageForm from '../components/SendMessageForm';
//import LoggedInUsers from '../components/LoggedInUsers';
import './ChannelDisplay.css';
//import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Col,
  Row,
  TabPane
} from 'reactstrap';
import axios from 'axios';

const ChannelDisplay = ({
  redirectToLogin,
  user,
  getUser,
  setChannelId,
  channelId
}) => {
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  console.log('users: ', users);
  const [message, setMessage] = useState('');

  const returnNewMessage = useCallback(async () => {
    await axios.get(`/api/getmessagebyid/${message.id}`).then((response) => {
      console.log('new message response: ', response.data);
      const newMessage = response.data;
      setMessages((messages) => [...messages, newMessage]);
    });
  }, [message.id]);

  useEffect(() => {
    returnNewMessage();
  }, [returnNewMessage]);

  const sendMessage = async (message, user) => {
    try {
      const response = await axios.post('/api/message', {
        channelId: channelId,
        userId: user.id,
        text: message,
        userName: user.firstname
      });
      // connection.on('ReceiveMessage',
      console.log('sendmessage response: ', response.data);
      setMessage(response.data);
      setMessage('');
    } catch (e) {
      console.log(e);
    }
  };

  const getAllMessagesByChannel = useCallback(async () => {
    // console.log('channelId in getAllMessagesByChannel: ', channelId);
    await axios
      .get(`/api/getmessagesbychannel/${channelId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        // console.log('getMessagesByChannel response: ', response);
        setMessages(response.data);
      })
      .catch((error) => {
        if (error) {
          console.log('error in getAllMessagesByChannel: ', error);
        }
      });
  }, [channelId]);

  useEffect(() => {
    getAllMessagesByChannel();
  }, [getAllMessagesByChannel]);

  const getChannels = useCallback(async () => {
    await axios
      .get('/api/channels')
      .then((response) => {
        const channels = response.data;
        setChannels(channels);

        //  console.log('channels response: ', channels);
      })
      .catch((error) => {
        if (error) {
          console.log('error: ', error);
          redirectToLogin();
          return;
        }
      });
  }, [redirectToLogin]);
  console.log('user: ', user);

  useEffect(() => {
    getChannels();
    getUser();
  }, [getChannels, getUser, channels.channelName]);

  // useEffect(() => {
  //   returnNewMessage();
  //   // console.log('message in sendform: ', message);
  // });

  //returnNewMessage();
  return (
    <div style={{ textAlign: 'center' }}>
      <Nav tabs>
        {channels.map((channel) => {
          //console.log('channels in channelDisplay: ', channel);
          const toggleChannel = () => {
            setChannelId(channel.id);
            console.log('channel id: ', channel.id);
          };

          return (
            <NavItem key={channel.id}>
              <NavLink
                className={`${channelId === channel.id ? 'active' : ''}`}
                id={channel.id}
                onClick={() => toggleChannel(channel.id)}
              >
                {channel.channelName}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
      <TabContent activeTab={channelId}>
        {console.log('activeTab: ', channelId)}
        {channels.map((channel) => (
          <TabPane key={channel.id} tabId={channel.id}>
            <Row>
              <Col className='col-8 '>
                <>
                  <MessageContainer
                    messages={messages}
                    // returnNewMessage={returnNewMessage}
                    className='bg-dark'
                  />
                  <SendMessageForm
                    user={user}
                    channelId={channelId}
                    sendMessage={sendMessage}
                    message={message}
                    setMessage={setMessage}
                  />
                </>
              </Col>
              <Col className='col-4'>
                {/* <LoggedInUsers users={users} /> */}
              </Col>
            </Row>
          </TabPane>
        ))}
      </TabContent>
    </div>
  );
};

export default ChannelDisplay;
