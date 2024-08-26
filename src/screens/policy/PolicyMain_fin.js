import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as S from "../../../style/MainStyle";
import * as P from "../../../style/policy";
import axios from "axios";
import { UserContext } from "../../components/UserProvider";
import { useRoute } from "@react-navigation/native";
import { SERVER_URL } from "../../components/ServerAddress";
import PolicyTop from "../../components/PolicyTop";
import MainHeader from "../../components/MainHeader";
import HeaderComponent from "../../components/HeaderComponent";

const PolicyMain_fin = ({ navigation }) => {
  const [allPolicy, setAllPolicy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPolicy, setFilteredPolicy] = useState([]);
  const { user } = useContext(UserContext);
  const route = useRoute();
  const beforeBtn = () => {
    navigation.goBack();
  };
  useEffect(() => {
    if (route.params?.key) {
      navigation.navigate("policyDetail", { key: route.params.key });
    }
  }, [route.params?.key]);

  // 모든 정책 조회
  const getPolicy = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/policy`);
      console.log("Response data:", response.data);
      setAllPolicy(response.data);
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
      console.error("Error config:", error.config);
    }
  };

  // 정책 신청 가능 여부 확인
  const getPolicyMatch = async (email) => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/policy/match?email=${email}`
      );
      console.log(response.data, "가능여부");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("정책 신청 가능 여부 확인 실패:", error);
      throw error;
    }
  };

  // 데이터 로드 및 상태 설정
  const fetchPolicies = async () => {
    try {
      const policies = await getPolicy();
      const email = "tmdgml2595@naver.com"; // 실제 사용자 이메일로 대체
      const policyMatches = await getPolicyMatch(email);

      const policiesWithStatus = policies.map((policy) => {
        const match = policyMatches.find((match) => match.key === policy.key);
        let isEligible;
        if (match) {
          if (match.policy === true) {
            isEligible = "신청 가능";
          } else if (match.policy === false) {
            isEligible = "신청 불가";
          } else {
            isEligible = "보류";
          }
        } else {
          isEligible = "보류";
        }

        return {
          ...policy,
          isEligible,
        };
      });

      setAllPolicy(policiesWithStatus);
    } catch (error) {
      console.error("정책 데이터를 불러오는 데 실패했습니다.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchPolicies();
    getPolicy();
  }, []);
  const handleMyPage = () => {
    if (user) {
      navigation.navigate("mypage");
    } else {
      navigation.navigate("LoginScreen");
    }
  };
  // if (loading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderComponent onPress={beforeBtn} headerText="나만의 맞춤 정책" />
      <PolicyTop allPolicy={allPolicy} setFilteredPolicy={setFilteredPolicy} />
      <ScrollView
        style={{ flex: 1, marginBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredPolicy.map((policy) => (
          <View key={policy.key}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  margin: 15,
                  width: "70%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() =>
                  navigation.navigate("policyDetail", { key: policy.key })
                }
              >
                <Image
                  source={{ uri: policy.img }}
                  style={{ width: "40%", height: 130, borderRadius: 10 }}
                />
                <View style={{ marginLeft: 10 }}>
                  <P.title>{policy.title}</P.title>
                  <P.subtitle>{policy.sub_title}</P.subtitle>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginRight: 10,
                marginLeft: 10,
                height: 1,
                backgroundColor: "rgba(237,237,237,1.0)",
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PolicyMain_fin;
