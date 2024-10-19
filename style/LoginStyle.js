import styled from "styled-components/native";
import { SafeAreaView, View } from "react-native";

export const DivisionContainer = styled.View`
  align-items: center;
  margin-top: 10%;
`;

export const Line = styled.View`
  height: 1px;
  width: 350px;
  background-color: grey;
  margin-bottom: -8px;
`;

export const DivisionText = styled.Text`
  background-color: white;
  padding-horizontal: 10px;
  padding-bottom: 5px;
  font-size: 15px;
`; //회색선

export const Id_Pw_SignContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const EachButton = styled.TouchableOpacity`
  margin-right: 10px;
`; //버튼과 세로선간의 간격

export const WordButtonText = styled.Text`
  margin-top: 15px;
  font-size: 16px;
  color: grey;
  font-weight: bold;
`; //각 단어의 윗부분 패딩

export const WordBetweenVerticalLine = styled.View`
  height: 50%;
  width: 1px;
  background-color: grey;
  margin-top: 17px;
  margin-right: 2.5%;
`; //각 단어 사이의 선

export const IdContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 10px;
  width: 360px;
  height: 205px;
`; //세 구역 값

export const LonginPassBox = styled.TextInput`
  margin-vertical: 5px;
  height: 55px;
  width: 100%;
  padding-left: 16px;
  border-radius: 10px;
  font-size: 16px;
  background-color: white;
  border-width: 1px; /* 테두리 두께 */
  border-color: grey; /* 테두리 색상 */
`; //아이디,비번상자
export const Signup_FstName = styled.TextInput`
  margin-vertical: 5px;
  height: 45px;
  width: 36%;
  padding-left: 10px;
  border-radius: 10px;
  font-size: 15px;
  background-color: #f7f7f7;
  border-width: 0px;
  border-color: grey;
`; //회원가입 이름창
export const Signup_lstName = styled.TextInput`
  margin-vertical: 5px;
  height: 45px;
  width: 61%;
  padding-left: 16px;
  border-radius: 10px;
  font-size: 15px;
  background-color: #f7f7f7;
  border-width: 0px; /* 테두리 두께 */
  border-color: grey; /* 테두리 색상 */
  margin-left: 5px;
`;
export const Signup_Id = styled.TextInput`
  margin-vertical: 5px;
  height: 45px;
  width: 80%;
  padding-left: 16px;
  border-radius: 10px;
  font-size: 15px;
  background-color: #f7f7f7;
  border-width: 0px; /* 테두리 두께 */
  border-color: grey; /* 테두리 색상 */
  margin-right: 5px;
`;
export const Id_Duplicate = styled.TouchableOpacity`
  margin-vertical: 5px;
  height: 45px;
  width: 23%;
  border-radius: 10px;
  font-size: 15px;
  border-width: 0px; /* 테두리 두께 */
  border-color: grey; /* 테두리 색상 */
`;
export const Signup_Phone = styled.TextInput`
  margin-vertical: 5px;
  height: 45px;
  width: 70%;
  padding-left: 10px;
  border-radius: 10px;
  font-size: 15px;
  background-color: #f7f7f7;
  border-width: 0px;
  border-color: grey;
`;
export const Auth_get = styled.TouchableOpacity`
  margin-vertical: 5px;
  height: 45px;
  width: 26%;
  border-radius: 10px;
  font-size: 15px;
  background-color: lightgrey;
  border-width: 0px;
  border-color: grey;
`;
export const Signup_Auth = styled.TextInput`
  margin-vertical: 5px;
  height: 45px;
  width: 98%;
  padding-left: 10px;
  border-radius: 10px;
  font-size: 15px;
  background-color: #f7f7f7;
  border-width: 0px;
  border-color: grey;
`;
export const Signup_password = styled.TextInput`
  margin-vertical: 5px;
  height: 45px;
  width: 98%;
  padding-left: 16px;
  border-radius: 10px;
  font-size: 15px;
  background-color: #f7f7f7;
  border-width: 0px; /* 테두리 두께 */
  border-color: grey; /* 테두리 색상 */
`;
export const Signup_passwordChk = styled.TextInput`
  margin-vertical: 5px;
  height: 45px;
  width: 98%;
  padding-left: 16px;
  border-radius: 10px;
  font-size: 15px;
  background-color: #f7f7f7;
  border-width: 0px; /* 테두리 두께 */
  border-color: grey; /* 테두리 색상 */
  margin-right: 5px;
`;

export const Signup_Finish = styled.TouchableOpacity`
  margin-vertical: 5px;
  height: 45px;
  width: 80%;
  border-radius: 10px;
  font-size: 15px;
  border-width: 0px;
  border-color: grey;
  marginleft: 10%;
  margintop: 10%;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: #2d4b8e;
  padding: 10px;

  height: 55px;
  width: 100%;
  border-radius: 10px;
  align-items: center;
  margin-top: 15px;
  justify-content: center;
`; //로그인버튼 디자인

export const LoginButtonInside = styled.Text`
  color: white;
  font-size: 21px;
  font-weight: bold;
`; //로그인버튼 속

export const SafeAreaViewWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const LogoeContainer = styled.View`
  flex: 1;
`;

export const LogoContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 150px;
  background-color: white;
`;

export const InputContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const StyledImage = styled.Image`
  width: 230px;
  height: 240px;
  margin-bottom: 60px;
`;

export const MainLogoContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 150px;
`;

export const MainInputContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
