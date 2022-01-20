import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import TcpSocket from 'react-native-tcp-socket';

const options = {
  port: 7070,
  host: '10.0.2.2',
};

export default function TcpSocketConnection(onConnected) {
  const client = TcpSocket.createConnection(options, () => {
    // Write on the socket
    console.log('Connected to server');
    // client.write('Hello server!');
    onConnected?.('Connected to server');

    // Close socket
    // client.destroy();
  });

  client.on('data', function (data) {
    console.log('message was received', data);
  });

  client.on('error', function (error) {
    console.log(error);
  });

  client.on('close', function () {
    console.log('Connection closed!');
  });

  const onSendMessage = (message) => {
    client.write(message);
  };

  const onCloseSocket = () => {
    client.destroy();
  };

  return { onSendMessage, onCloseSocket };
}
