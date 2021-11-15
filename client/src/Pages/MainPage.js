import ChatPage from './ChatPage';
import ChannelDisplay from '../Components/ChannelDisplay';
import { Container, Row, Col } from 'react-bootstrap';

const Mainpage = (userId, userName, isLoggedIn) => {
  return (
    <Container fluid>
      {isLoggedIn ? 
       ( <Row>
          <Col>
            <ChannelDisplay />
          </Col>
          <Col>
            <ChatPage
              userId={userId}
              userName={userName}
              isLoggedIn={isLoggedIn}
            />
          </Col>
        </Row>)
       : 
       ( 'You are not authorized to view this page')
      }
    </Container>
  );
};

export default Mainpage;
