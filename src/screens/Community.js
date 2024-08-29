import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { UserContext } from "../components/UserProvider";
import Map from "../components/Map";

const Community = ({ navigation }) => {
  const { user } = useContext(UserContext);

  return (
    <View style={{ flex: 1, backgroundColor: "#EFF0F5" }}>
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "25%",
          padding: 5,
          borderRadius: 10,
          shadowColor: "rgba(180,180,180,0.4)",
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 10,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {/* <Image
            style={{
              width: 60,
              height: 40,
              marginTop: 60,
              marginHorizontal: 15,
            }}
            source={require("../../assets/images/logoword.png")}
          /> */}
          <View style={{ flexDirection: "row" }}>
            {/* <TouchableOpacity onPress={() => handleMyPage()}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 60,
                  marginHorizontal: 10,
                }}
                source={require("../../assets/images/icon-03.png")}
              />
            </TouchableOpacity> */}

            <Image
              style={{
                width: 25,
                height: 25,
                marginTop: 60,
                marginHorizontal: 10,
              }}
              source={require("../../assets/images/icon-27.png")}
            />
          </View>
        </View>
        <View style={{ margin: 15 }}>
          <Text
            style={{
              marginBottom: 1,
              fontSize: 24,
              fontFamily: "B",
              color: "#2E4B8F",
            }}
          >
            안녕하세요. {user ? user.name : "묘사"}님
          </Text>
          <Text style={{ fontSize: 20, fontFamily: "B", color: "#000000" }}>
            매물의 실거래가를 알아보세요.
          </Text>
        </View>
      </View>
      <Map />
    </View>
  );
};

export default Community;
