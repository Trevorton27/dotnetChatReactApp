import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ChannelDisplay = ({}) => {
  const [channel, setChannel] = useState([]);

  useEffect(() => {
    createNewChannel();
  }, []);

  const channelData = {
    name: 'another new Channel'
  };

  const createNewChannel = () => {
    const response = axios.post('/api/newchannel', channelData);
    console.log('response from createNewChannel: ', response);
  };
  return (
    <div>
      <h2>Channel Display</h2>
    </div>
  );
};

export default ChannelDisplay;
