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

const questions = [
  {
    question: "WHAT IS YOUR NAME ??",
    options: [
      {
        id: 0,
        options: "A",
        answer: "Tony",
      },
      {
        id: 1,
        options: "B",
        answer: "Ezekel",
      },

      {
        id: 2,
        options: "C",
        answer: "Tonyyy",
      },
      {
        id: 3,
        options: "D",
        answer: "Fuck you Tony",
      },
    ],
  },
  {
    question: " You see that fire over there ??",
    options: [
      {
        id: 0,
        options: "A",
        answer: "Don't you dare ",
      },
      {
        id: 1,
        options: "B",
        answer: "Don't you say it",
      },

      {
        id: 2,
        options: "C",
        answer: "I built it last night",
      },
      {
        id: 3,
        options: "D",
        answer: "...And next to it",
      },
    ],
  },
  {
    question: " Biet ong Liem ko",
    options: [
      {
        id: 0,
        options: "A",
        answer: "Liem nao ",
      },
      {
        id: 1,
        options: "B",
        answer: "Liem hai hon",
      },

      {
        id: 2,
        options: "C",
        answer: "Liem dep trai",
      },
      {
        id: 3,
        options: "D",
        answer: "Liem si~",
      },
    ],
  },
];

const QuizScreen = () => {
  const navigation = useNavigation();
  //points
  // const [points, setPoints] = useState(0);
  const data = questions;
  const totalQuestions = data.length;

  //Index of question
  const [index, setIndex] = useState(0);

  //answer status (Choose)
  const [answerStatus, setAnswerStatus] = useState(null);

  //answers
  const [answers, setAnswer] = useState([]);
  const [isSelected, setIsSelected] = useState(null);
  //selected answer
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const currentQuestion = data[index];
  console.log(currentQuestion);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsSelected(true);
    answers.push({ questions: index + 1 });
  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelectedAnswerIndex(null);
    setIsSelected(null);
  }, [index]);

  useEffect(() => {
    if (index + 1 > data.length) {
      navigation.navigate("ChooseMusic");
    }
  }, [currentQuestion]);

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
            <View style={styles.titleQuiz}>
              <Text style={styles.titleQuizText}>Your Progress</Text>
              <Text style={styles.titleQuizText}>
                ({index}/{totalQuestions}) answered
              </Text>
              <Separator />
            </View>

            <View style={styles.quizInfo}>
              <View style={styles.questionInfo}>
                <Text style={{ marginLeft: 8, marginTop: 5 }}>
                  {currentQuestion?.question}
                </Text>
              </View>
              {currentQuestion?.options.map((item, index) => (
                <Pressable
                  onPress={() =>
                    selectedAnswerIndex === null &&
                    setSelectedAnswerIndex(index)
                  }
                  style={
                    selectedAnswerIndex === index && isSelected
                      ? styles.answerInfoChoose
                      : styles.answerInfo
                  }
                >
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
                        <Text>{item.options}</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text style={{ paddingLeft: 5 }}>{item.answer}</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
            <View>
              {index + 1 >= questions.length ? (
                <Pressable
                  style={styles.nextBtn}
                  onPress={() => {
                    setShowModal(!showModal), navigation.navigate("Result");
                  }}
                >
                  <Text>Done</Text>
                </Pressable>
              ) : isSelected === null ? null : (
                <Pressable
                  style={styles.nextBtn}
                  onPress={() => {
                    setIndex(index + 1);
                  }}
                >
                  <Text>Next</Text>
                </Pressable>
              )}
            </View>
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

export default QuizScreen;
