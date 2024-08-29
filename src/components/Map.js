import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const MyWebPage = () => {
  // JavaScript to disable scrolling
  const disableScrolling = `
    document.body.style.overflow = 'hidden'; 
    document.documentElement.style.overflow = 'hidden';
    true; // Required for injectedJavaScript to work
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: "https://rt.molit.go.kr/pt/gis/gis.do?srhThingSecd=A&mobileAt=",
        }}
        style={{ flex: 1, marginTop: -50 }}
        injectedJavaScript={disableScrolling}
        // Optionally, if you need to ensure JavaScript runs after the document loads:
        javaScriptEnabled={true}
      />
    </View>
  );
};

export default MyWebPage;
