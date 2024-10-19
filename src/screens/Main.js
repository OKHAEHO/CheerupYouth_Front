import React, { useContext, useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../components/UserProvider";
//import BottomTabNavigationApp from "./BottomBar";
import * as S from "../../style/MainStyle";
import Header from "../components/Hearder";
import SearchScreen from "../components/SearchScreen";
import axios from "axios";
import { SERVER_URL } from "../components/ServerAddress";
import * as Font from "expo-font";

const Main = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [mainPolicy, setMainPolicy] = useState([]);
  const getPolicy = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/policy`);
      // console.log("Response data:", response.data);
      setMainPolicy(response.data);

      return response.data;
    } catch (error) {
      if (error.response) {
        // 서버가 응답했지만 상태 코드가 2xx 범위가 아닙니다.
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        // 요청이 이루어졌지만 응답을 받지 못했습니다.
        console.error("Request error:", error.request);
      } else {
        // 요청을 설정하는 동안 발생한 문제
        console.error("Error:", error.message);
      }
      console.error("Error config:", error.config, error.message);
    }
  };

  useEffect(() => {
    getPolicy();
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        // 화면이 포커스를 잃을 때 실행할 작업
      };
    }, [user]) // user가 변경될 때마다 콜백 함수를 다시 생성
  );

  const btnData = [
    {
      id: 1,
      imageSource: require("../../assets/images/icon-22.png"),
      title: "부동산 계약\n튜토리얼",
      url: "TutorialScreen",
    },
    {
      id: 2,
      imageSource: require("../../assets/images/icon-13.png"),
      title: "부동산\n용어 리스트",
      url: "LawWordList",
    },
  ];

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
            청년독립만세에 오신 걸 환영합니다.
          </Text>
        </View>
      </View>

      <View showsVerticalScrollIndicator={false}>
        <View style={{ margin: 20, marginBottom: 6 }}>
          <Text style={{ fontSize: 20, fontFamily: "B", color: "#2E4B8F" }}>
            {user ? user.name : "묘사"} 님의 맞춤 정책 추천
          </Text>
          <Text style={{ marginTop: 5, color: "#4F5150", fontFamily: "R" }}>
            상세 정보를 입력하시면 더욱 자세한 맞춤 정보를 확인할 수 있어요.
          </Text>
        </View>

        <View
          style={{ flexDirection: "row", marginTop: 10, paddingHorizontal: 5 }}
        >
          <ScrollView
          // horizontal
          // showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{ alignItems: "center" }}
          >
            {mainPolicy.slice(0, 2).map((item) => (
              <View key={item.key} style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("policyMain", { key: item.key });
                  }}
                  style={{
                    backgroundColor: "white",
                    height: 120,
                    width: "90%",
                    borderRadius: 10,
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={{ uri: item.img }}
                    style={{
                      width: 100,
                      height: 120,
                      borderRadius: 10,
                    }}
                  />
                  <View style={{ margin: 10, width: "64%" }}>
                    <Text style={{ fontFamily: "SB", fontSize: 15 }}>
                      {item.title}
                    </Text>
                    <View
                      style={{
                        marginTop: 8,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ color: "#71777C" }}>{item.sub_title}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
            <View
              style={{
                margin: 15,
                marginBottom: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("policyMain")}
              >
                <Text
                  style={{ fontFamily: "B", fontSize: 16, color: "#71777C" }}
                >
                  더보기 ↓
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <View style={{ margin: 20 }}>
          <Text
            style={{
              marginBottom: 1,
              fontFamily: "SB",
              fontSize: 16,
              color: "#4F5150",
            }}
          >
            복잡한 부동산 계약
          </Text>
          <Text
            style={{
              fontFamily: "B",
              fontSize: 18,
              color: "#4F5150",
              marginBottom: 5,
            }}
          >
            조금
            <Text style={{ color: "#2E4B8F" }}> 더 쉽게 준비</Text>
            해요!
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {btnData.map((item) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(item.url);
              }}
              style={{
                backgroundColor: "white",
                marginHorizontal: "auto",
                padding: 13,
                width: "40%",
                height: 80,
                borderRadius: 5,
                overflow: "hidden", // 부모 TouchableOpacity에 추가
                shadowColor: "rgba(180,180,180,0.4)",
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                shadowOpacity: 10,
                shadowRadius: 3,
                elevation: 5,
              }}
              key={item.id}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 18, fontFamily: "B", color: "#2E4B8F" }}
                >
                  {item.title}
                </Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative", // 위치를 조정하기 위해 position 추가
                  top: -20, // 이미지를 위로 10px 올리기 위해 top 값을 음수로 설정
                  right: 6,
                }}
              >
                <Image
                  source={item.imageSource}
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: "cover", // 이미지를 넘치는 부분 없이 잘리도록 설정
                    opacity: 0.3,
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Main;
