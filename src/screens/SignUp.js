import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { SERVER_URL } from "../components/ServerAddress";
import HeaderComponent from "../components/HeaderComponent";
import Icon from "react-native-vector-icons/Ionicons";

const SignUp = () => {
  const navigation = useNavigation();
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Contact, setContact] = useState("");
  const [EmailStatus, setEmailStatus] = useState("");
  const [EmailStatusColor, setEmailStatusColor] = useState("");
  const [EmailStyle, setEmailStyle] = useState(true);
  const [PasswordStatus, setPasswordStatus] = useState("");
  const [PasswordStatusColor, setPasswordStatusColor] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const showAlert = (msg, onSuccess = null) => {
    Alert.alert("알림", msg, [{ text: "확인", onPress: onSuccess }]);
  };

  const checkEmail = () => {
    if (!Email) {
      setEmailStatus("이메일을 입력 해주세요.");
      setEmailStatusColor("red");
      setEmailStyle(false);
      return;
    }
    if (!Email.includes("@")) {
      setEmailStatus("이메일 형식을 올바르게 입력해주세요.");
      setEmailStatusColor("red");
      setEmailStyle(false);
      return;
    }

    axios
      .post(`${SERVER_URL}/users/checkEmail`, { Email })
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.exists) {
          setEmailStatus("사용할 수 없는 이메일이에요.");
          setEmailStatusColor("red");
          setEmailStyle(false);
        } else {
          setEmailStatus("사용할 수 있는 이메일이에요!");
          setEmailStatusColor("green");
          setEmailStyle(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$_!%*?&])[A-Za-z\d@$_!%*?&]{6,}$/;
    return regex.test(password);
  };

  const checkPassword = (password) => {
    console.log(password);
    if (!validatePassword(password)) {
      setPasswordStatus(
        "최소 6자리, 영어 대소문자, 숫자, 특수문자 중 1개를 포함해야 합니다."
      );
      setPasswordStatusColor("red");
    } else {
      setPasswordStatus("사용 가능한 비밀번호에요!");
      setPasswordStatusColor("green");
    }
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    checkPassword(password);
  };

  const handleConfirmPasswordChange = (password) => {
    setConfirmPassword(password);
  };

  const handleSignUp = () => {
    if (
      Firstname &&
      Lastname &&
      Email &&
      Password &&
      ConfirmPassword &&
      Contact
    ) {
      if (Password !== ConfirmPassword) {
        showAlert("비밀번호가 일치하지 않아요!");
        return;
      }
      axios
        .post(`${SERVER_URL}/users/signup`, {
          name: Firstname + Lastname,
          id: Email,
          password: Password,
          contact: Contact,
        })
        .then((response) => {
          console.log("회원가입완료");
          showAlert("회원가입 완료", () => navigation.goBack());
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      showAlert("모든 정보를 입력해 주세요.");
      console.log("회원가입 불가");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const backBtn = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderComponent onPress={backBtn} headerText="회원가입" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ margin: 20, marginBottom: 0, marginTop: 0 }}
        >
          <View style={{ marginTop: 25, marginBottom: 30 }}>
            <Text style={{ margin: 10, fontSize: 17 }}>이름</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{
                  backgroundColor: "#F7F7F7",
                  padding: 15,
                  borderRadius: 10,
                  marginVertical: 5,
                  fontSize: 15,
                  width: "40%",
                }}
                placeholder="성을 입력해주세요."
                value={Firstname}
                onChangeText={setFirstname}
              />
              <TextInput
                style={{
                  backgroundColor: "#f7f7f7",
                  padding: 15,
                  borderRadius: 10,
                  marginVertical: 5,
                  fontSize: 15,
                  marginLeft: "2%",
                  width: "58%",
                }}
                placeholder="이름을 입력해주세요."
                value={Lastname}
                onChangeText={setLastname}
              />
            </View>
          </View>

          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 17, margin: 10 }}>이메일</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="이메일을 입력해주세요."
                value={Email}
                onChangeText={setEmail}
                style={{
                  backgroundColor: "#f7f7f7",
                  padding: 15,
                  borderRadius: 10,
                  marginVertical: 5,
                  fontSize: 15,
                  width: "70%",
                }}
              />
              <TouchableOpacity
                onPress={checkEmail}
                style={{
                  backgroundColor: "#EEEEEE",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 5,
                  borderRadius: 10,
                  marginLeft: "2%",
                  width: "28%",
                }}
              >
                <Text>중복확인</Text>
              </TouchableOpacity>
            </View>

            <View style={{ margin: 10 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: EmailStatusColor || "white",
                }}
              >
                {EmailStatus}
              </Text>
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 17, margin: 10 }}>비밀번호</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{
                  backgroundColor: "#f7f7f7",
                  padding: 15,
                  borderRadius: 10,
                  marginVertical: 5,
                  fontSize: 15,
                  width: "80%",
                }}
                placeholder="비밀번호를 입력해주세요."
                secureTextEntry={!passwordVisible}
                value={Password}
                onChangeText={handlePasswordChange}
              />
              <View
                style={{
                  backgroundColor: "#f7f7f7",
                  marginVertical: 5,
                  borderRadius: 10,
                  width: "25%",
                  marginLeft: "-5%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Text style={{ fontSize: 35 }}>
                    {passwordVisible ? (
                      <Icon name="eye-outline" size={35} />
                    ) : (
                      <Icon name="eye-off-outline" size={35} />
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {Password && (
              <View style={{ margin: 10 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: PasswordStatusColor || "white",
                  }}
                >
                  {PasswordStatus}
                </Text>
              </View>
            )}

            <View>
              <TextInput
                style={{
                  backgroundColor: "#f7f7f7",
                  padding: 15,
                  borderRadius: 10,
                  marginVertical: 5,
                  fontSize: 15,
                  width: "100%",
                }}
                placeholder="비밀번호 확인"
                secureTextEntry={true}
                value={ConfirmPassword}
                onChangeText={handleConfirmPasswordChange}
              />
            </View>

            {ConfirmPassword !== "" &&
              (Password === ConfirmPassword ? (
                <Text style={{ color: "green", marginLeft: 10 }}>
                  비밀번호가 같아요!
                </Text>
              ) : (
                <Text style={{ color: "red", marginLeft: 10 }}>
                  비밀번호가 달라요!
                </Text>
              ))}
          </View>

          <View style={{ marginBottom: 30 }}>
            <Text style={{ fontSize: 17, margin: 10 }}>휴대폰번호</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{
                  backgroundColor: "#f7f7f7",
                  padding: 15,
                  borderRadius: 10,
                  marginVertical: 5,
                  fontSize: 15,
                  width: "100%",
                }}
                placeholder="휴대폰번호를 입력해주세요."
                value={Contact}
                onChangeText={setContact}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            height: 80,
            backgroundColor: "#2D4B8E",
            alignItems: "center",
          }}
          onPress={handleSignUp}
        >
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontFamily: "B", color: "white" }}>
              회원가입
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
