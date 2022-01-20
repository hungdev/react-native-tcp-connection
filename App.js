import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import TcpSocket from 'react-native-tcp-socket';

const options = {
  port: 7070,
  host: '10.0.2.2',
};
export default function App() {
  const client = TcpSocket.createConnection(options, () => {
    // Write on the socket
    console.log('eeeeeeeee');
    client.write('Hello server!');

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

  const onSendMessage = () => {
    client.write('Hello! This is message from client!');
  };


  return (
    <View>
      <Text>Demo of TCP connection</Text>
      <TouchableOpacity onPress={onSendMessage}>
        <Text>Send Message</Text>
      </TouchableOpacity>
    </View>
  );
}
