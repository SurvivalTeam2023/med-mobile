import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

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

const QuizScreen = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />

      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>How was your day ?</Text>
          <Separator />
        </View>
        <View style={styles.info}>
          <Text style={{ fontSize: 16 }}>Let's know more about yourself</Text>
          <Image
            style={styles.logo}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1858/1858095.png",
            }}
          />
        </View>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={showModal}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          {/*All views of Modal*/}
          {/*Animation can be slide, slide, none*/}
          <View style={styles.modal}>
            <View style={styles.title}>
              <Text style={styles.titleText}>Quiz</Text>
              <Separator />
            </View>

            <View style={styles.quizInfo}>
              <View style={styles.questionInfo}>
                <Text style={{ marginLeft: 8, marginTop: 5 }}>Question</Text>
              </View>
              <View style={styles.answerInfo}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "baseline",
                    paddingTop: 5,
                    paddingLeft: 5,
                  }}
                >
                  <View>
                    <TouchableOpacity style={styles.roundButton1}>
                      <Text>A</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={{ paddingLeft: 5 }}>Answer</Text>
                  </View>
                </View>
              </View>
              <View style={styles.answerInfo}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "baseline",
                    paddingTop: 5,
                    paddingLeft: 5,
                  }}
                >
                  <View>
                    <TouchableOpacity style={styles.roundButton1}>
                      <Text>A</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={{ paddingLeft: 5 }}>Answer</Text>
                  </View>
                </View>
              </View>
              <View style={styles.answerInfo}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "baseline",
                    paddingTop: 5,
                    paddingLeft: 5,
                  }}
                >
                  <View>
                    <TouchableOpacity style={styles.roundButton1}>
                      <Text>A</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={{ paddingLeft: 5 }}>Answer</Text>
                  </View>
                </View>
              </View>
              <View style={styles.answerInfo}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "baseline",
                    paddingTop: 5,
                    paddingLeft: 5,
                  }}
                >
                  <View>
                    <TouchableOpacity style={styles.roundButton1}>
                      <Text>A</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={{ paddingLeft: 5 }}>Answer</Text>
                  </View>
                </View>
              </View>
            </View>

            <Pressable
              style={styles.nextBtn}
              onPress={() => {
                setShowModal(!showModal);
              }}
            >
              <Text>Next</Text>
            </Pressable>
          </View>
        </Modal>
        {/*Button will change state to true and view will re-render*/}
        <Pressable
          style={styles.startBtn}
          onPress={() => {
            setShowModal(!showModal);
          }}
        >
          <Text>Getting started</Text>
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
    fontSize: 20,
    textAlign: "left",
  },
  title: {
    marginTop: 50,
    width: 400,
    height: 30,
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

export default QuizScreen;
