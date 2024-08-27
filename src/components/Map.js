import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MyWebPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView 
        source={{ uri: 'https://rt.molit.go.kr/pt/gis/gis.do?srhThingSecd=A&mobileAt=' }} 
        style={{ flex: 1 }}
      />
    </View>
  );
}

export default MyWebPage;
