import React, { useState, useEffect, useContext } from "react";
import { View, Image, StatusBar, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../components/UserProvider";

function OnBoardingPage() {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0)); // 투명도 초기값 0 (안보임)
  const { user } = useContext(UserContext);

  useEffect(() => {
    // 페이드 인 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // 1초 동안 페이드 인
      useNativeDriver: true,
    }).start(() => {
      // 페이드 인이 끝나면 일정 시간 대기 후 페이드 아웃 애니메이션 시작
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500, // 1초 동안 페이드 아웃
          useNativeDriver: true,
        }).start(() => {
          // user 정보를 통해 네비게이션 수행
          if (user && user.id) {
            navigation.replace("BottomBar");
          } else {
            navigation.replace("LoginScreen");
          }
        });
      }, 1000); // 2초 대기
    });
  }, [fadeAnim, navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#2A4886",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar barStyle="light-content" />
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          style={{
            width: 350,
            height: 350,
          }}
          source={require("../../assets/images/logoColor.png")}
        />
      </Animated.View>
    </View>
  );
}

export default OnBoardingPage;
