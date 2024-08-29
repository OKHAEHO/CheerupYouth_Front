import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Button,
  Alert,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import * as S from "../../style/InfoDetailStyle";
import axios from "axios";
import { SERVER_URL } from "../components/ServerAddress";
import { UserContext } from "../components/UserProvider";
import HeaderComponent from "../components/HeaderComponent";

const InfoSet = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [married, setMarried] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [selectedIncome, setSelectedIncome] = useState("");
  const [selectedCity, setSelectedCity] = useState(null); //시/도
  const [selectedDistrict, setSelectedDistrict] = useState(null); //null 이었는데 일단 바꿈
  const [selectedOptionsEdu, setSelectedOptionsEdu] = useState([]);
  const [selectedOptionsCareer, setSelectedOptionsCareer] = useState([]);
  const [selectedOptionsMember, setSelectedOptionsMember] = useState([]);
  const [selectedOptionsTarget, setSelectedOptionsTarget] = useState([]);

  const userId = user.id;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        const [response1, response2] = await Promise.all([
          axios.get(`${SERVER_URL}/users/select`, {
            params: {
              userId: id,
            },
          }),
          axios.get(`${SERVER_URL}/users/selectFull`, {
            params: {
              userId: id,
            },
          }),
        ]);

        const data1 = response1.data;
        const data2 = response2.data;
        console.log("User details (basic):", data1);
        console.log("User details (full):", data2);

        if (data1 && data1.length > 0) {
          setName(data1[0].Name);
          setMarried(data1[0].Married);
          setGender(data1[0].Gender);
          setSelectedIncome(data1[0].Income);
          setSelectedCity(data1[0].City);
          setSelectedDistrict(data1[0].District);
          setBirthDate(new Date(data1[0].BirthDate));
        }

        if (data2 && data2.length > 0) {
          setSelectedOptionsEdu(data2[0].HighestEducation);
          setSelectedOptionsCareer(data2[0].CurrentJob);
          setSelectedOptionsMember(data2[0].ResidentialStatus);
          setSelectedOptionsTarget(data2[0].Special);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(birthDate);

  return (
    <S.Container>
      <View style={{ marginHorizontal: -20 }}>
        <HeaderComponent
          onPress={() => navigation.goBack()}
          headerText="내 정보 확인하기"
        />
      </View>
      <View style={{ paddingVertical: 10 }} />

      <S.Box>
        <S.TitleText>이름</S.TitleText>
        <Text>{name}</Text>
      </S.Box>
      <S.Box>
        <S.TitleText>결혼유무</S.TitleText>
        <Text>{married}</Text>
      </S.Box>
      <S.Box>
        <S.TitleText>성별</S.TitleText>
        <Text>{gender}</Text>
      </S.Box>
      <S.Box>
        <S.TitleText>생년월일</S.TitleText>
        <Text>
          {new Intl.DateTimeFormat("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(birthDate)}
        </Text>
      </S.Box>
      <S.Box>
        <S.TitleText>월소득</S.TitleText>
        <Text>{selectedIncome}</Text>
      </S.Box>
      <S.Box>
        <S.TitleText>거주지역</S.TitleText>
        <Text>
          {selectedCity} {selectedDistrict}
        </Text>
      </S.Box>
      <S.Box>
        <S.TitleText>최종 학력</S.TitleText>
        <Text>{selectedOptionsEdu}</Text>
      </S.Box>

      <S.Box>
        <S.TitleText>현재 직업</S.TitleText>
        <Text>{selectedOptionsCareer}</Text>
      </S.Box>

      <S.Box>
        <S.TitleText>주거 상태</S.TitleText>
        <Text>{selectedOptionsMember}</Text>
      </S.Box>

      <S.LastBox>
        <S.TitleText>대상 특성</S.TitleText>
        <Text>{selectedOptionsTarget}</Text>
      </S.LastBox>
    </S.Container>
  );
};

export default InfoSet;
