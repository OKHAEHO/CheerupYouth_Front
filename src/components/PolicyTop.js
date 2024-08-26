import React, { useEffect, useState } from "react";
import * as P from "../../style/policy";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Row } from "../../style/MainStyle";

const PolicyTop = ({ navigation, allPolicy, setFilteredPolicy }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (text === "") {
      setFilteredPolicy(allPolicy);
    } else {
      const filtered = allPolicy.filter(
        (policy) =>
          policy.title.includes(text) || policy.sub_title.includes(text)
      );
      setFilteredPolicy(filtered);
    }
  }, [text, allPolicy]);

  return (
    <View style={{ margin: 15, marginBottom: 5, marginTop: 10 }}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{
            backgroundColor: "#F7F7F7",
            width: "90%",
            padding: 20,
            marginVertical: 5,
            borderRadius: 10,
            fontSize: 17,
          }}
          placeholder="검색어를 입력해주세요."
          value={text}
          onChangeText={setText}
        />
        <View
          style={{
            width: "15%",
            marginLeft: "-5%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F7F7F7",
            marginVertical: 5,
            borderRadius: 5,
          }}
        >
          <Icon size={20} name={"search"} color={"#898989"} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    margin: 15,
    borderRadius: 15,
    borderColor: "#264886",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    paddingHorizontal: 8,
    flexGrow: 1,
  },
  displayText: {
    fontSize: 18,
  },
});

export default PolicyTop;
