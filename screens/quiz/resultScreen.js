import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

import {
  Modal,
  Button,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../constants/styles";

const Separator = () => <View style={styles.separator} />;

const ResultScreen = () => {
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />

      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={{ fontSize: 24 }}>Thank you for your answer </Text>
          <Image
            style={styles.logo}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3063/3063835.png",
            }}
          />
        </View>

        {/*Button will change state to true and view will re-render*/}
        <Pressable
          style={styles.startBtn}
          onPress={() => {
            navigation.navigate("ChooseMusic");
          }}
        >
          <Text>Enjoyyy</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#223864",
    marginTop: 30,
    paddingBottom: 50,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#223864",
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
  titleText: {
    color: "#D9D9D9",
    fontSize: 26,
  },
  titleQuizText: {
    color: "#D9D9D9",
    fontSize: 16,
    textAlign: "left",
  },
  title: {
    marginTop: 50,
  },
  titleQuiz: {
    marginTop: 50,
    width: 400,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  startBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "#D8E2E8",
    borderRadius: 40,
  },
  nextBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginBottom: 50,
    backgroundColor: "#D8E2E8",
    borderRadius: 40,
  },
  separator: {
    marginVertical: 20,
    marginHorizontal: -80,
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logo: {
    width: 90,
    height: 80,
  },
  info: {
    backgroundColor: "#D8E2E8",
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 50,
    marginVertical: 200,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 50,
  },
  questionInfo: {
    backgroundColor: "#D8E2E8",
    flex: 1,
    flexDirection: "column",
    width: 400,
    maxHeight: 200,
    justifyContent: "flex-start",
    borderRadius: 20,
  },
  answerInfo: {
    alignContent: "center",
    backgroundColor: "#D8E2E8",
    marginTop: 40,
    width: 400,
    height: 50,
    borderRadius: 20,
  },
  answerInfoChoose: {
    alignContent: "center",
    backgroundColor: "#D8E2E8",
    marginTop: 40,
    width: 400,
    backgroundColor: "green",
    height: 50,
    borderRadius: 20,
  },
  quizInfo: {
    flex: 1,
    flexDirection: "column",
  },
  roundButton1: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "orange",
  },
});

export default ResultScreen;
