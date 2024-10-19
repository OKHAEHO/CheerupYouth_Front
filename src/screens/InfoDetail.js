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
  ScrollView,
} from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import * as S from "../../style/InfoDetailStyle";
import { cities, districts, incomeOptions } from "../../utils/InfoDetailData";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import { SERVER_URL } from "../components/ServerAddress";
import { UserContext } from "../components/UserProvider";
import HeaderComponent from "../components/HeaderComponent";

import Icon from "react-native-vector-icons/FontAwesome";

const InfoDetail = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [married, setMarried] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [selectedIncome, setSelectedIncome] = useState("");

  const [consentGiven, setConsentGiven] = useState(false); //개인정보 동의
  const [selectedCity, setSelectedCity] = useState(null); //시/도
  const [selectedDistrict, setSelectedDistrict] = useState(null); //null 이었는데 일단 바꿈
  // const { userDataP, setUserDataP } = useContext(UserContext);

  const userId = user.id;

  const handleBirthDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setBirthDate(currentDate);
  };

  const handleConsentToggle = () => {
    setConsentGiven(!consentGiven);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedDistrict(null);
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
  };

  const handleIncomeSelect = (income) => {
    setSelectedIncome(income);
    console.log(income);
  };

  const InfoDetailSubmit = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      const response = await axios.post(`${SERVER_URL}/users/insert`, {
        id: id,
        Name: name,
        Married: married,
        Gender: gender,
        BirthDate: birthDate,
        Income: selectedIncome,
        ConsentGiven: consentGiven,
        City: selectedCity,
        District: selectedDistrict,
      });
      console.log("회원정보 입력 완료", response);
      navigation.navigate("InfoDetailFull");
    } catch (error) {
      console.log("에러 발생:", error);
    }
  };
  // const handleSubmit = () => {
  //   if (!name || !gender || !birthDate || !income) {
  //     Alert.alert("모든 항목을 입력하세요.");
  //     return;
  //   }
  //   console.log("Name:", name);
  //   console.log("Married:", married);
  //   console.log("Gender:", gender);
  //   console.log("Birth Date:", birthDate);
  //   console.log("District:", selectedDistrict);
  //   console.log("Income:", income);
  //   navigation.navigate("InfoDetailFull");
  // };

  useEffect(() => {
    if (user && user.name) {
      setName(user.name);
    }

    const fetchUserDetails = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        const response = await axios.get(`${SERVER_URL}/users/select`, {
          params: {
            userId: id,
          },
        });
        const data = response.data;
        console.log("User details:", data);

        if (data && data.length > 0) {
          setName(data[0].Name);
          setMarried(data[0].Married);
          setGender(data[0].Gender);
          setSelectedIncome(data[0].Income);
          setSelectedCity(data[0].City);
          setSelectedDistrict(data[0].District);
          setBirthDate(new Date(data[0].BirthDate));
        }
        console.log(selectedIncome);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <S.Container>
      <View style={{ marginHorizontal: -20 }}>
        <HeaderComponent
          onPress={() => navigation.goBack()}
          headerText="상세 정보 입력하기"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",

              padding: 5,
              marginTop: 15,
              marginBottom: 0,
            }}
          >
            STEP 1. 내 정보
          </Text>
          <Text
            style={{
              fontSize: 15,

              color: "#71777C",
              padding: 5,
            }}
          >
            정보가 정확할수록 알맞는 정책 정보를
            {"\n"}추천 받을 수 있어요.
            {/* {user ? user.name : "로그인"} */}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#EDF1F3",
            flexDirection: "column",
            borderRadius: 10,
            marginTop: 15,
          }}
        >
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "#8A9095",
                padding: 5,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              01
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                padding: 5,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              성함을 알려주세요.
            </Text>
          </View>
          <TextInput
            style={{
              fontSize: 15,
              borderWidth: 1,
              borderColor: "#EDF1F3",
              borderRadius: 5,
              margin: 15,
              padding: 10,
              color: "#8A9095",
            }}
            onChangeText={setName}
            value={name}
            placeholder="이름"
            returnKeyType="done"
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#EDF1F3",
            flexDirection: "column",
            borderRadius: 10,
            marginTop: 15,
          }}
        >
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "#8A9095",
                padding: 5,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              02
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                padding: 5,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              생년월일은 언제인가요?
            </Text>
          </View>
          {/* <TextInput
          style={{
            fontSize: 15,
            borderWidth: 1,
            borderColor: "#EDF1F3",
            borderRadius: 5,
            margin: 15,
            padding: 10,
            color: "#8A9095",
          }}
          onChangeText={setName}
          value={name}
          placeholder="이름"
          returnKeyType="done"
        /> */}
          <DatePicker
            style={{
              fontSize: 15,
              borderWidth: 1,
              borderColor: "#EDF1F3",
              borderRadius: 5,
              margin: 15,
              padding: 10,
              color: "#8A9095",
            }}
            value={birthDate}
            onChange={handleBirthDateChange}
            mode="date"
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#EDF1F3",
            flexDirection: "column",
            borderRadius: 10,
            marginTop: 15,
          }}
        >
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "#8A9095",
                padding: 5,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              03
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                padding: 5,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              결혼유무
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              margin: 10,
            }}
          >
            {/* 미혼 버튼 */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setMarried("미혼")}
            >
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: married === "미혼" ? "#2e4b8f" : "gray",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                }}
              >
                {married === "미혼" && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#2e4b8f",
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: married === "미혼" ? "#2e4b8f" : "gray",
                }}
              >
                미혼
              </Text>
            </TouchableOpacity>

            {/* 기혼 버튼 */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setMarried("기혼")}
            >
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: married === "기혼" ? "#2e4b8f" : "gray",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                }}
              >
                {married === "기혼" && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#2e4b8f",
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: married === "기혼" ? "#2e4b8f" : "gray",
                }}
              >
                기혼
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <S.Box>
        <S.TitleText>결혼유무</S.TitleText>
        <S.Row>
          <Button
            title="미혼"
            onPress={() => setMarried("미혼")}
            color={married === "미혼" ? "#2e4b8f" : "gray"}
          />
          <Button
            title="기혼"
            onPress={() => setMarried("기혼")}
            color={married === "기혼" ? "#2e4b8f" : "gray"}
          />
        </S.Row>
      </S.Box> */}
        <View
          style={{
            borderWidth: 1,
            borderColor: "#EDF1F3",
            flexDirection: "column",
            borderRadius: 10,
            marginTop: 15,
          }}
        >
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "#8A9095",
                padding: 5,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              04
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                padding: 5,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              성별
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              margin: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setGender("남성")}
            >
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: gender === "남성" ? "#2e4b8f" : "gray",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                }}
              >
                {gender === "남성" && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#2e4b8f",
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: gender === "남성" ? "#2e4b8f" : "gray",
                }}
              >
                남성
              </Text>
            </TouchableOpacity>

            {/* 기혼 버튼 */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setGender("여성")}
            >
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: gender === "여성" ? "#2e4b8f" : "gray",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                }}
              >
                {gender === "여성" && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#2e4b8f",
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: gender === "여성" ? "#2e4b8f" : "gray",
                }}
              >
                여성
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <S.Box>
        <S.TitleText>성별</S.TitleText>
        <S.Row>
          <Button
            title="남성"
            onPress={() => setGender("남성")}
            color={gender === "남성" ? "#2e4b8f" : "gray"}
          />
          <Button
            title="여성"
            onPress={() => setGender("여성")}
            color={gender === "여성" ? "#2e4b8f" : "gray"}
          />
        </S.Row>
      </S.Box> */}
        {/* <S.Box>
        <S.TitleText>생년월일</S.TitleText>
        <DatePicker
          value={birthDate}
          onChange={handleBirthDateChange}
          mode="date"
        />
      </S.Box> */}
        <View
          style={{
            borderWidth: 1,
            borderColor: "#EDF1F3",
            flexDirection: "column",
            borderRadius: 10,
            marginTop: 15,
          }}
        >
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "#8A9095",
                padding: 5,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              05
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                padding: 5,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              거주지역
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              margin: 5,
            }}
          >
            <View style={styles.Picker}>
              <RNPickerSelect
                onValueChange={handleCityChange}
                items={cities}
                placeholder={{ label: "시/도", value: null, color: "gray" }}
                value={selectedCity}
                textInputProps={{ style: { fontSize: 15 } }} // 글씨 크기 지정
              />
            </View>

            <View style={styles.Picker}>
              <RNPickerSelect
                onValueChange={handleDistrictChange}
                items={
                  selectedCity
                    ? districts[selectedCity].map((d) => ({
                        label: d,
                        value: d,
                      }))
                    : []
                }
                placeholder={{ label: "구/군", value: null, color: "gray" }}
                value={selectedDistrict}
                disabled={!selectedCity}
                textInputProps={{ style: { fontSize: 15 } }} // 글씨 크기 지정
              />
            </View>
          </View>
        </View>
        {/* <S.Box>
          <S.TitleText>거주지역</S.TitleText>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 10 }}>
              <View style={styles.Picker}>
                <RNPickerSelect
                  onValueChange={handleCityChange}
                  items={cities}
                  placeholder={{ label: "시/도", value: null, color: "gray" }}
                  value={selectedCity}
                  textInputProps={{ style: { fontSize: 15 } }} // 글씨 크기 지정
                />
              </View>
            </View>

            <View style={styles.Picker}>
              <RNPickerSelect
                onValueChange={handleDistrictChange}
                items={
                  selectedCity
                    ? districts[selectedCity].map((d) => ({
                        label: d,
                        value: d,
                      }))
                    : []
                }
                placeholder={{ label: "구/군", value: null, color: "gray" }}
                value={selectedDistrict}
                disabled={!selectedCity}
                textInputProps={{ style: { fontSize: 15 } }} // 글씨 크기 지정
              />
            </View>
          </View>
        </S.Box> */}
        <View
          style={{
            borderWidth: 1,
            borderColor: "#EDF1F3",
            flexDirection: "column",
            borderRadius: 10,
            marginTop: 15,
          }}
        >
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "#8A9095",
                padding: 5,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              06
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                padding: 5,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              월소득
            </Text>
          </View>
          <View style={styles.Picker}>
            <RNPickerSelect
              onValueChange={handleIncomeSelect}
              items={incomeOptions}
              placeholder={{
                label: selectedIncome || "소득 구간을 선택하세요",
                value: null,
                color: "gray",
              }}
              value={selectedIncome}
              textInputProps={{ style: { fontSize: 15 } }} // 글씨 크기 지정
            />
          </View>
        </View>
        {/* <S.LastBox>
          <S.TitleText>월소득</S.TitleText>
          <S.Row>
            <TextInput
            onChangeText={setIncome}
            value={income}
            placeholder="0"
            keyboardType="numeric"
            returnKeyType="done"
          />
          <S.WonText>만원</S.WonText>
            <View style={styles.Picker}>
              <RNPickerSelect
                onValueChange={handleIncomeSelect}
                items={incomeOptions}
                placeholder={{
                  label: selectedIncome || "소득 구간을 선택하세요",
                  value: null,
                  color: "gray",
                }}
                value={selectedIncome}
                textInputProps={{ style: { fontSize: 15 } }} // 글씨 크기 지정
              />
            </View>
          </S.Row>
        </S.LastBox> */}
        <S.Text>
          입력해주신 정보를 기반으로 맞춤 정책을 추천해 드립니다.{"\n"}다른
          목적으로 사용되거나 제 3자에게 공개되지 않습니다.
        </S.Text>
        <View
          style={{
            alignItems: "center",
            padding: 5,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={handleConsentToggle}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Icon
              name="check-circle"
              size={20}
              style={{
                color: consentGiven ? "#2e4b8f" : "#626262",
              }}
            />
            <Text
              style={{
                color: consentGiven ? "#2e4b8f" : "#626262",
                fontWeight: "bold",
                marginLeft: 7,
              }}
            >
              [필수] 개인정보 수집 및 이용 동의
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View
        style={{ alignItems: "center", justifyContent: "center", padding: 15 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{ textAlign: "center", textDecorationLine: "underline" }}
          >
            다음에 입력하기
          </Text>
        </TouchableOpacity>
      </View> */}
        <S.BlueButtonBox>
          <TouchableOpacity onPress={() => InfoDetailSubmit()}>
            <S.BlueButtonText>다음</S.BlueButtonText>
          </TouchableOpacity>
        </S.BlueButtonBox>
      </ScrollView>
    </S.Container>
  );
};

const styles = StyleSheet.create({
  Picker: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#EDF1F3",
    borderRadius: 5,
    margin: 15,
    padding: 10,
    color: "gray",
  },
});

export default InfoDetail;
