import React, { useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../components/UserProvider";
//import BottomTabNavigationApp from "./BottomBar";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
// import Icon from "react-native-vector-icons/MaterialIcons";

const Main = ({ navigation }) => {
  const { user, logout } = useContext(UserContext);
  const { userDataP, setUserDataP } = useContext(UserContext);
  const { userDataPlusP } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigation.navigate("LoginScreen");
  };

  // const LogoutBtn = async () => {
  //   try {
  //     await AsyncStorage.removeItem("userData");
  //     await AsyncStorage.removeItem("styleChange");
  //     await AsyncStorage.removeItem("styleChangePg3");
  //     await AsyncStorage.removeItem("styleChangePg4");
  //     console.log("userData가 삭제되었습니다.");
  //     setUserDataP(null);
  //   } catch (error) {
  //     console.error("데이터를 삭제하는 중 오류가 발생했습니다:", error);
  //   }
  //   navigation.navigate("BottomBar");
  // };

  const handleMyPage = () => {
    if (user) {
      navigation.navigate("BottomBar");
    } else {
      navigation.navigate("LoginScreen");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "35%",
          padding: 5,
          borderRadius: 10,
          // shadowColor: "rgba(180,180,180,0.4)",
          // shadowOffset: {
          //   width: 2,
          //   height: 2,
          // },
          // shadowOpacity: 10,
          // shadowRadius: 3,
          // elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("BottomBar")}>
            <Image
              style={{
                width: 60,
                height: 40,
                marginTop: 60,
                marginHorizontal: 15,
              }}
              source={require("../../assets/images/mainLogo.png")}
            />
          </TouchableOpacity>
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

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
            marginTop: 30,
          }}
        >
          {/* <Image
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 100,
              marginVertical: 20,
              borderRadius: 50,
            }}
            source={require("../../assets/images/profile.png")}
          /> */}
          <Icon name="user-circle" size={100} color="#2E4B8F" />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 20,
              marginTop: 20,
              textAlign: "center",
            }}
          >
            {user ? user.name : "묘사"}
          </Text>
        </View>
        <View style={{ marginBottom: 10, marginHorizontal: 25 }}>
          <View style={{ paddingVertical: 15 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("InfoDetail")}
                style={{ flexDirection: "row", alignItems: "center" }} // 추가된 부분
              >
                <Icon name="edit" size={20} color="#626262" />
                <Text
                  style={{
                    color: "#626262",
                    fontWeight: "bold",
                    marginLeft: 10, // 조정된 부분
                  }}
                >
                  상세정보 수정
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#626262",
                marginTop: 25,
              }}
            />
          </View>
          <View style={{ paddingVertical: 15 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("InfoSet")}
                style={{ flexDirection: "row", alignItems: "center" }} // 추가된 부분
              >
                <Icon name="user" size={20} color="#626262" />
                <Text
                  style={{
                    color: "#626262",
                    fontWeight: "bold",
                    marginLeft: 10, // 조정된 부분
                  }}
                >
                  내 정보 확인
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#626262",
                marginTop: 25,
              }}
            />
          </View>

          <View style={{ paddingVertical: 15 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={handleLogout}
                style={{ flexDirection: "row", alignItems: "center" }} // 추가된 부분
              >
                <Icon name="sign-out" size={20} color="#626262" />
                <Text
                  style={{
                    color: "#626262",
                    fontWeight: "bold",
                    marginLeft: 10, // 조정된 부분
                  }}
                >
                  로그아웃
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Main;
