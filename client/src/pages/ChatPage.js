import React, { useEffect, useState, useCallback } from 'react';
import ChannelDisplay from './ChannelDisplay';
import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

const ChatPage = () => {
  const [channelId, setChannelId] = useState();
  const [user, setUser] = useState('');
  const [channelName, setChannelName] = useState('');
  const [users, setUsers] = useState([]);
  const [redirect, setRedirect] = useState(false);

  // // useEffect(() => {
  // //   if (!token) {
  // //     setRedirect(true);
  // //   }
  // // }, [token]);
  // console.log('user in ChatPage: ', user);
  // const redirectToLogin = useCallback(() => {
  //   sessionStorage.removeItem('token');
  //   setRedirect(true);
  // }, []);

  const getUser = useCallback(async () => {
    await axios
      .get('api/user', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      .then((response) => {
        const responseData = response.data;
        console.log('userData: ', responseData);

        setUser(responseData);
      });
  }, []);

  return redirect ? (
    <Redirect to='/login' />
  ) : (
    <Container lg={2} fluid>
      <Row>
        <Header setUser={setUser} user={user} setRedirect={setRedirect} />
      </Row>
      <Row>
        <h4 style={{ textAlign: 'center', marginTop: '2em' }}>Channels</h4>
        <Col lg={10}>
          <ChannelDisplay
            classname='bg-dark'
            setChannelId={setChannelId}
            getUser={getUser}
            user={user}
            setChannelName={setChannelName}
            channelName={channelName}
            channelId={channelId}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
