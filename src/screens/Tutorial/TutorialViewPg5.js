import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import TutorialPg5Data from "../../../utils/TutorialPg5Data.js";
import Tutorial5Tip from "../../../utils/Tutorial5Tip.js";
import { SERVER_URL } from "../../components/ServerAddress";
import axios from "axios";
import HeaderComponent from "../../components/HeaderComponent";
import { UserContext } from "../../components/UserProvider";

function TutorialViewPg5({ navigation }) {
  const [dbdata, setDbData] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.id) {
      const user_id = user.id;

      // 해당 user_id 데이터 삭제
      axios
        .delete(`${SERVER_URL}/TVP6/delete/${user_id}`)
        .then(() => {
          // 데이터 삭제 성공 후 삽입 요청
          return axios.post(`${SERVER_URL}/TVP6/insert`, { user_id });
        })
        .then((response) => {
          console.log("데이터 삽입 성공");
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) {
              console.log("이미 존재하는 user_id입니다.");
            } else {
              console.error("데이터 삽입 중 오류 발생:", error);
            }
          } else {
            console.error("네트워크 오류:", error);
          }
        });
    }
  }, []); // 컴포넌트가 처음 로드될 때만 실행

  // useEffect(() => {
  //   const user_id = user ? user.id : null;
  //   axios
  //     .post(`${SERVER_URL}/TVP6/insert`, { user_id })
  //     .then((response) => {
  //       console.log("데이터 삽입 성공");
  //     })
  //     .catch((error) => {
  //       if (error.response.status === 400) {
  //         console.log("이미 존재하는 user_id입니다.");
  //       } else {
  //         console.error("데이터 삽입 중 오류 발생:", error);
  //       }
  //     });
  // }, []); // 컴포넌트가 처음 로드될 때만 실행

  const [styleChange, setStyleChange] = useState("");
  const [textItem, setTextItem] = useState("");
  const beforeBtn = () => {
    navigation.goBack();
  };
  const nextBtn = () => {
    navigation.navigate("TVP6");
  };
  const backBtn = () => {
    navigation.navigate("TutorialScreen");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderComponent onPress={backBtn} headerText="전세 계약 튜토리얼" />
      <ScrollView showsVerticalScrollIndicator={false}>
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
              STEP 5
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
            계약하기
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
            집주인, 공인중개사와 실제 계약하는 단계에요.
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
            잔금을 처리하고 확인했던 것들을 다시한번 살피고 특약사항을 적으며
            계약을 마무리해보아요.
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
        <View style={{ margin: 25, marginTop: 20, marginBottom: 5 }}>
          <Text
            style={{
              fontFamily: "SB",
              fontSize: 20,
            }}
          >
            나와있는 사람이 누구인가요?
          </Text>
        </View>
        <SectionList
          style={{ paddingBottom: 15 }}
          scrollEnabled={false}
          sections={TutorialPg5Data}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.name}
              style={{
                backgroundColor: "white",
                margin: 25,
                marginTop: 15,
                marginBottom: 0,
                borderRadius: 5,
                shadowColor:
                  textItem === item
                    ? "rgba(45, 75, 142,0.3)"
                    : "rgba(147,147,147,0.7)",
                shadowOffset: {
                  width: 1,
                  height: 0,
                },
                shadowOpacity: 5,
                shadowRadius: 3,
                elevation: 5,
              }}
              onPress={() => {
                setTextItem(textItem === item.name ? "" : item.name);
              }}
            >
              <View style={{ margin: 20 }}>
                <View
                  style={{
                    height: 25,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontFamily: "SB", fontSize: 20 }}>
                    {item.name}
                  </Text>
                  <Icon
                    name={
                      textItem === item.name ? "expand-less" : "expand-more"
                    }
                    size={30}
                    color={
                      textItem === item.name
                        ? "rgba(45, 75, 142,0.8)"
                        : "#979797"
                    }
                    style={{ bottom: 3 }}
                  />
                </View>
                {textItem === item.name && (
                  <>
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
                        marginRight: 0,
                        marginBottom: -20,
                      }}
                    >
                      {[
                        item.value1,
                        item.value2,
                        item.value3,
                        item.value4,
                        item.value5,
                        item.value6,
                        item.value7,
                      ].map(
                        (value, index) =>
                          value && (
                            <View
                              style={{
                                marginBottom: 20,
                              }}
                            >
                              <Text style={{ fontSize: 15, fontFamily: "R" }}>
                                {value}
                              </Text>
                            </View>
                          )
                      )}
                    </View>
                  </>
                )}
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, idx) => idx.toString()}
        />
        <View style={{ margin: 25, marginTop: 20, marginBottom: 5 }}>
          <Text
            style={{
              fontFamily: "SB",
              fontSize: 20,
            }}
          >
            계약서 작성할 때 !
          </Text>
        </View>

        <SectionList
          style={{ paddingBottom: 15 }}
          scrollEnabled={false}
          sections={Tutorial5Tip}
          renderItem={({ item }) => (
            <View
              key={item.title}
              style={{
                backgroundColor: "white",
                margin: 25,
                marginTop: 15,
                marginBottom: 0,
                paddingTop: 0,
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
              <View style={{ margin: 20, marginBottom: 23 }}>
                <Text style={{ fontSize: 18, fontFamily: "SB" }}>
                  {item.title}
                </Text>
                {[
                  item.tip1,
                  item.tip2,
                  item.tip3,
                  item.tip4,
                  item.tip5,
                  item.tip6,
                  item.tip7,
                ].map(
                  (tip, index) =>
                    tip && (
                      <View style={{ marginTop: 10 }} key={index}>
                        <Text style={{ fontSize: 14, fontFamily: "R" }}>
                          {tip}
                        </Text>
                      </View>
                    )
                )}
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={{
            // position: "absolute",
            // bottom: -60,
            marginTop: 45,
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

export default TutorialViewPg5;
