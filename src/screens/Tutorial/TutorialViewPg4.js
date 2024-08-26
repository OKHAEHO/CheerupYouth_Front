import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { UserContext } from "../../components/UserProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderComponent from "../../components/HeaderComponent";
import { SERVER_URL } from "../../components/ServerAddress";

function TutorialViewPg4({ navigation }) {
  const [dbdata, setDbData] = useState([]);
  const { user } = useContext(UserContext);
  const [styleChange, setStyleChange] = useState([]);
  const [clickItems, setClickItems] = useState([]);

  console.log("styleChange", styleChange);

  const dbControl = (pgname) => {
    const userPlusChange = {
      user_id: user.id,
      user_checkData: styleChange.includes("check")
        ? styleChange.filter((item) => item !== "check")
        : styleChange.length > 0
        ? styleChange
        : ["check"],
    };
    axios
      .post(`${SERVER_URL}/TVP4/insert`, userPlusChange)
      .then(() => {
        navigation.navigate(pgname);
      })
      .catch((error) => {
        console.error("잘못됐어요 ? : ", error);
      });
  };

  const nextBtn = () => {
    dbControl("TVP5");
    AsyncStorage.removeItem("styleChangePg4");
  };

  const backBtn = () => {
    navigation.navigate("TutorialScreen");
    AsyncStorage.removeItem("styleChangePg4");
  };

  const beforeBtn = () => {
    navigation.goBack();
  };

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/TVP4/data`)
      .then((response) => {
        const dbdata = response.data;
        const valueData = response.data.map((item) => item.value);
        setDbData(dbdata);
        setStyleChange(valueData);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      });
  }, []); // DB 불러오기

  useEffect(() => {
    axios
      .post(`${SERVER_URL}/TVP4/select`, {
        user_id: user ? user.id : null,
      })
      .then((response) => {
        const dbdata = response.data;
        console.log("dbdata", dbdata);
        const userdata = dbdata.map((item) => item.user_checkData);
        const user = dbdata.map((item) => item.user_id);
        if (user.length > 0) {
          setStyleChange(userdata);
        }
      })

      .catch((error) => {
        console.error("비동기 작업 중 오류가 발생했습니다:", error);
      });
  }, [user]);

  useEffect(() => {
    const checkItemData = async () => {
      try {
        const savedStyleChange = await AsyncStorage.getItem("styleChangePg4");
        if (savedStyleChange !== null) {
          setStyleChange(JSON.parse(savedStyleChange));
        }
      } catch (error) {
        console.error("로컬 데이터 불러오기 오류:", error);
      }
    };

    checkItemData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(
          "styleChangePg4",
          JSON.stringify(styleChange)
        );
      } catch (error) {
        console.error("로컬 데이터 저장 오류:", error);
      }
    };
    saveData();
  }, [styleChange]);

  const toggleItem = (title) => {
    setClickItems((prevState) =>
      prevState.includes(title)
        ? prevState.filter((item) => item !== title)
        : [...prevState, title]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderComponent onPress={backBtn} headerText="전세 계약 튜토리얼" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, height: 500 }}
      >
        <View style={{ margin: 25, marginTop: 20, marginBottom: 0 }}>
          <View
            style={{
              backgroundColor: "rgba(45,75,145,1.0)",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              width: "18%",
              padding: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "SB",
                color: "white",
                fontSize: 15,
              }}
            >
              STEP 4
            </Text>
          </View>
        </View>
        <View style={{ margin: 25, marginBottom: 10, marginTop: 5 }}>
          <Text
            style={{
              fontFamily: "B",
              fontSize: 20,
            }}
          >
            계약 준비하기
          </Text>
        </View>

        <View
          style={{ width: "85%", margin: 10, marginTop: 0, marginBottom: 0 }}
        >
          <Text
            style={{
              color: "gray",
              fontSize: 15,
              fontFamily: "M",
              margin: 5,
              marginLeft: 15,
            }}
          >
            계약을 할 때 확인해야할 것들이 있어요.
          </Text>
          <Text
            style={{
              color: "gray",
              fontSize: 15,
              fontFamily: "M",
              margin: 5,
              marginLeft: 15,
            }}
          >
            서류별로 어떤 서류인지 확인하고 무엇을 확인해야하는 지 알아보아요.
          </Text>
        </View>
        <View
          style={{
            marginTop: 15,
            marginRight: 10,
            marginLeft: 10,
            height: 1,
            backgroundColor: "rgba(237,237,237,1.0)",
          }}
        ></View>

        {[...new Set(dbdata.map((data) => data.title))].map(
          (title, index) =>
            title && (
              <View
                key={index}
                style={{
                  backgroundColor: "white",
                  margin: 25,
                  marginTop: 20,
                  marginBottom: title === "등기부등본" ? 60 : 0,
                  borderRadius: 5,
                  shadowColor: "rgba(45, 75, 142,0.3)",
                  shadowOffset: {
                    width: 1,
                    height: 0,
                  },
                  shadowOpacity: 5,
                  shadowRadius: 3,
                  elevation: 5,
                }}
              >
                <View style={{ margin: 20, marginBottom: 28 }}>
                  <Text style={{ fontFamily: "SB", fontSize: 20 }}>
                    {title}
                  </Text>
                  <View
                    style={{
                      height: 0.9,
                      backgroundColor: "rgba(238,238,238,1.0)",
                      marginTop: 20,
                    }}
                  ></View>
                  <View
                    style={{
                      marginTop: 20,
                      marginRight: 20,
                      marginBottom: -20,
                    }}
                  >
                    {dbdata
                      .filter((data) => data.title.includes(title))
                      .map((data, idx) => (
                        <TouchableOpacity
                          key={`${title}-${idx}`}
                          onPress={() => {
                            setStyleChange((prevState) => {
                              if (prevState.includes(data.value)) {
                                return prevState.filter(
                                  (item) => item !== data.value
                                );
                              } else {
                                return [...prevState, data.value];
                              }
                            });
                          }}
                          style={{
                            flexDirection: "row",
                            paddingBottom: 20,
                            marginRight: 20,
                            marginTop: 0,
                            marginLeft: 0,
                            marginBottom: 0,
                          }}
                        >
                          <Icon
                            name={
                              styleChange.includes(data.value)
                                ? "check-box-outline-blank"
                                : "check-box"
                            }
                            size={18}
                            color={
                              styleChange.includes(data.value)
                                ? "gray"
                                : "#2D4B8E"
                            }
                            style={{ marginTop: 3, marginRight: 5 }}
                          />
                          <Text
                            style={{
                              marginTop: 1,
                              fontSize: 17,
                              fontFamily: "M",
                            }}
                          >
                            {data.value}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                </View>
              </View>
            )
        )}
        <View
          style={{
            // position: "absolute",
            // bottom: -60,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "50%",
              height: 80,
              backgroundColor: "#DEDEDE",
              alignItems: "center",
            }}
            onPress={beforeBtn}
          >
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  color: "rgba(112,112,112,1.0)",
                  fontSize: 23,
                  fontFamily: "B",
                }}
              >
                이전
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "50%",
              height: 80,
              backgroundColor: "#2D4B8E",
              alignItems: "center",
            }}
            onPress={nextBtn}
          >
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 23, fontFamily: "B", color: "white" }}>
                다음
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default TutorialViewPg4;
