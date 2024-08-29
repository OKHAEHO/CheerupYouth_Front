import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { UserContext } from "../components/UserProvider";
import Map from "../components/Map";

const Community = ({ navigation }) => {
  const { user } = useContext(UserContext);

  return (
    <View style={{ flex: 1, backgroundColor: "#EFF0F5" }}>
      <View style={{ flex: 1, marginTop: 130, overflow: "hidden" }}>
        <Map />
      </View>
      
      {/* 상단 부분을 가리는 레이어1 */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "21%", // 높이를 원하는 만큼 조정
          backgroundColor: "white",
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
            justifyContent: "space-between",
          }}
        >
          <Image
            style={{
              width: 60,
              height: 40,
              marginTop: 60,
              marginHorizontal: 15,
            }}
            source={require("../../assets/images/mainLogo.png")}
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => handleMyPage()}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 60,
                  marginHorizontal: 10,
                }}
                source={require("../../assets/images/icon-03.png")}
              />
            </TouchableOpacity>

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
              marginBottom: 5,
              fontSize: 20,
              fontWeight: "bold",
              color: "#2E4B8F",
            }}
          >
            안녕하세요. {user ? user.name : "로그인"}님
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#2E4B8F" }}>
            최신 매물들을 확인 해보세요!
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Community;
