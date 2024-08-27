import React, { useContext, useCallback } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import Main from "../screens/Main";
import Community from "../screens/Community";
import MyPage from "../screens/MyPage";

import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../components/UserProvider";

const Tab = createBottomTabNavigator();

const BottomBar = ({ navigation }) => {
  const { userDataP, setUserDataP } = useContext(UserContext);
  useFocusEffect(
    useCallback(() => {
      return () => {
        // 화면이 포커스를 잃을 때 실행할 작업
      };
    }, [userDataP]) // userDataP가 변경될 때마다 콜백 함수를 다시 생성
  );
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // 상단 바 숨기기
      }}
    >
      <Tab.Screen
        name="홈"
        component={Main}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/images/icon-Home.png")} // 이미지의 경로
              style={{ tintColor: color, width: size, height: size, }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="매물지도"
        component={Community}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/images/청년독립만세_icon-09.png")} // 이미지의 경로
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="내정보"
        component={MyPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/images/icon-03.png")} // 이미지의 경로
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBar;