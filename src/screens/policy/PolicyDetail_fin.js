import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as P from "../../../style/policy";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SERVER_URL } from "../../components/ServerAddress";
import MatchAI from "./MatchAI";

const PolicyDetail_fin = ({ route, navigation }) => {
  const { key } = route.params;
  const [policy, setPolicy] = useState({});
  const [isSupportedOpen, setIsSupportedOpen] = useState(false);
  const [isExcludedOpen, setIsExcludedOpen] = useState(false);
  const scrollViewRef = useRef(null);
  const supportedRef = useRef(null);
  const excludedRef = useRef(null);
  const purposeRef = useRef(null);
  const contentRef = useRef(null);
  const supportedPeriodRef = useRef(null);
  const applicationPeriodRef = useRef(null);
  const wayRef = useRef(null);

  const getSelectPolicy = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/policy/${key}`);
      setPolicy(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSelectPolicy();
  }, [key]);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.measureLayout(
        scrollViewRef.current,
        (x, y) => {
          const offset = 45; // 여백을 위해 y값을 약간 줄입니다.
          scrollViewRef.current?.scrollTo({ y: y - offset, animated: true });
        },
        () => {
          console.error("Failed to measure layout.");
        }
      );
    }
  };

  const btnSection = [
    { title: "사업목적", ref: purposeRef },
    { title: "지원대상", ref: supportedRef },
    { title: "제외대상", ref: excludedRef },
    { title: "지원내용", ref: contentRef },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* 세부정책 헤더 */}
      <View
        style={{
          backgroundColor: "white",
          paddingTop: 60,
          marginBottom: 1,
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("policyMain");
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                marginTop: 9,
                marginLeft: 14,
                marginBottom: 15,
              }}
              source={require("../../../assets/images/arrowLeft.png")}
            />
          </TouchableOpacity>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontFamily: "B",
              }}
            >
              나의 혜택
            </Text>
          </View>

          <Icon
            style={{
              marginTop: 10,
              marginRight: 10,
            }}
            onPress={() => setIsSupportedOpen(true)}
            name="wechat"
            size={25}
            color="#2E4B8F"
          />
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 20 }}
        stickyHeaderIndices={[1]} // Make the horizontal scroll section sticky
      >
        {/* 이미지 */}
        {policy.img && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Image
              source={{ uri: policy.img }}
              style={{ width: "100%", height: 250 }}
              onError={() => console.log("Failed to load image")}
            />
          </View>
        )}

        {/* 좌우스크롤 */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white", // Ensure it appears above the content
            marginTop: 4,
            marginHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            showsHorizontalScrollIndicator={false}
          >
            {btnSection.map((item) => (
              <TouchableOpacity
                onPress={() => scrollToSection(item.ref)}
                key={item.title}
                style={{ marginVertical: 10, marginHorizontal: 20 }}
              >
                <Text style={{ fontFamily: "SB", fontSize: 18 }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              marginTop: 4,
              height: 1,
              backgroundColor: "rgba(237,237,237,1.0)",
            }}
          />
        </View>

        {/* 아래스크롤 */}

        <View style={{ marginHorizontal: 15, marginTop: 20, width: "70%" }}>
          <Text style={{ fontFamily: "SB", fontSize: 18 }}>{policy.title}</Text>
        </View>
        <View style={{ marginHorizontal: 15 }}>
          {policy.content?.Application_period && (
            <View
              style={{ marginTop: 10 }}
              ref={applicationPeriodRef}
              supportedPeriodRef
            >
              <Text style={{ fontFamily: "M", fontSize: 17, color: "#2e4b8f" }}>
                신청기간
              </Text>
              <Text style={{ fontFamily: "R", fontSize: 17, marginTop: 4 }}>
                {policy.content?.Application_period}
              </Text>
            </View>
          )}

          {policy.content?.supported_period && (
            <View style={{ marginTop: 10 }} ref={supportedPeriodRef}>
              <Text style={{ fontFamily: "M", fontSize: 17, color: "#2e4b8f" }}>
                지원기간
              </Text>
              <Text style={{ fontFamily: "R", fontSize: 17, marginTop: 4 }}>
                {policy.content?.supported_period}
              </Text>
            </View>
          )}
          {policy.content?.way && (
            <View style={{ marginTop: 10 }} ref={wayRef}>
              <Text style={{ fontFamily: "M", fontSize: 17, color: "#2e4b8f" }}>
                신청방법
              </Text>
              <Text style={{ fontFamily: "R", fontSize: 17, marginTop: 4 }}>
                {policy.content?.way}
              </Text>
            </View>
          )}
        </View>

        <View
          style={{
            marginTop: 15,
            marginRight: 10,
            marginLeft: 10,
            height: 1,
            backgroundColor: "rgba(237,237,237,1.0)",
          }}
        />
        {policy.sub_title && (
          <P.contentBox ref={purposeRef}>
            <P.contentBoxTitle>사업목적</P.contentBoxTitle>
            <P.contentBoxContent>{policy.sub_title}</P.contentBoxContent>
            <View
              style={{
                marginTop: 15,
                marginRight: 10,
                marginLeft: 10,
                height: 1,
                backgroundColor: "rgba(237,237,237,1.0)",
              }}
            />
          </P.contentBox>
        )}

        {policy.supported && (
          <P.contentBox ref={supportedRef}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <P.contentBoxTitle>지원대상</P.contentBoxTitle>
            </View>
            <P.contentBoxContent>
              {policy.content?.supported_target}
            </P.contentBoxContent>
            {Object.keys(policy.supported)
              .filter((key) => key.startsWith("conditions"))
              .map((key, index) => (
                <P.contentBoxContent key={index}>
                  {policy.supported[key]}
                </P.contentBoxContent>
              ))}
            <View
              style={{
                marginTop: 15,
                marginRight: 10,
                marginLeft: 10,
                height: 1,
                backgroundColor: "rgba(237,237,237,1.0)",
              }}
            />
          </P.contentBox>
        )}

        {policy.excluded && (
          <P.contentBox ref={excludedRef}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <P.contentBoxTitle>제외대상</P.contentBoxTitle>
            </View>

            {Object.keys(policy.excluded)
              .filter((key) => key.startsWith("conditions"))
              .map((key, index) => {
                if (!policy.excluded[key]) return null;
                return (
                  <P.contentBoxContent key={index}>
                    {policy.excluded[key]}
                  </P.contentBoxContent>
                );
              })}
            <View
              style={{
                marginTop: 15,
                marginRight: 10,
                marginLeft: 10,
                height: 1,
                backgroundColor: "rgba(237,237,237,1.0)",
              }}
            />
          </P.contentBox>
        )}

        {policy.content?.surpported_contents && (
          <P.contentBox ref={contentRef}>
            <P.contentBoxTitle>지원내용</P.contentBoxTitle>
            <P.contentBoxContent>
              {policy.content?.surpported_contents}
            </P.contentBoxContent>
          </P.contentBox>
        )}
        <View
          style={{
            marginTop: 15,
            marginRight: 10,
            marginLeft: 10,
            height: 1,
            backgroundColor: "rgba(237,237,237,1.0)",
          }}
        />

        {policy.content?.submission_papers && (
          <P.contentBox>
            <P.contentBoxTitle>제출서류</P.contentBoxTitle>
            <P.contentBoxContent>
              {policy.content?.submission_papers}
            </P.contentBoxContent>
          </P.contentBox>
        )}
      </ScrollView>

      <View style={styles.container}>
        <Modal
          visible={isSupportedOpen}
          onShow={() => console.log("AI 정책 매칭")}
          onRequestClose={() => setIsSupportedOpen(false)}
          transparent={true}
          style={{ alignItems: "center" }}
        >
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPressOut={() => setIsSupportedOpen(false)}
          >
            <View style={styles.modalContainer}>
              <MatchAI
                policyKey={key}
                setIsSupportedOpen={setIsSupportedOpen}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default PolicyDetail_fin;
