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
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
const Separator = () => <View style={styles.separator} />;

const questions = [
  {
    question:
      "This is an example true or false question. This question is required to be answered to submit the quiz. True or False 3+3=6? ??",
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
  {
    question:
      " This is an example multiple response (checkbox) question. There are two correct answers. What is 8+8?",
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
  const [isSelected, setIsSelected] = useState(null);
  //selected answer
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const currentQuestion = data[index];
  console.log(currentQuestion);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsSelected(true);
  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelectedAnswerIndex(null);
    setIsSelected(null);
  }, [index]);

  console.log("index", index);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {cornerImage()}
          <ScrollView
            scrollEnabled={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {startQuizTitle()}
            {startQuizInfo()}
            {startQuizBtn()}
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function startQuizTitle() {
    return (
      <View>
        <View>
          <MaskedView
            style={{ height: 60 }}
            maskElement={
              <Text style={{ textAlign: "center", ...Fonts.bold26 }}>
                How was your day ...
              </Text>
            }
          >
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <Separator />
        </View>
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.startQuizInfo}
        >
          <Text style={styles.titleInfoStyle}>
            Let's know more about yourself
          </Text>
          <View style={{ alignItems: "center", paddingTop: 80 }}>
            <Image
              style={styles.logo}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/1858/1858095.png",
              }}
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
  function startQuizInfo() {
    return (
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
        <View>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {cornerImage()}
            <ScrollView
              scrollEnabled={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              {quizzingTitle()}
              {quizzingInfo()}
            </ScrollView>
          </ScrollView>
        </View>
      </Modal>
    );
  }

  function startQuizBtn() {
    return (
      <TouchableOpacity
        style={styles.startQuizButtonStyle}
        activeOpacity={0.9}
        onPress={() => {
          setShowModal(!showModal);
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 3 }}
          end={{ x: 0, y: 2 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.startQuizGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor16Bold }}>Getting started</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  function cornerImage() {
    return (
      <View>
        <Image
          source={require("../../assets/images/corner-design.png")}
          style={{
            width: "100%",
            height: 170,
          }}
        />
      </View>
    );
  }
  function quizzingTitle() {
    return (
      <View style={styles.titleQuiz}>
        <Text style={styles.titleQuizText}>
          Your Progress: ({index + 1}/{totalQuestions}) answered
        </Text>
        <Separator />
      </View>
    );
  }

  function quizzingInfo() {
    return (
      <View style={styles.quizInfo}>
        <View style={styles.questionInfo}>
          <Text
            style={{
              alignItems: "baseline",
              paddingLeft: 5,
              ...Fonts.blackColor18SemiBold,
            }}
          >
            {currentQuestion?.question}
          </Text>
        </View>
        {currentQuestion?.options.map((item, index) => (
          <Pressable
            onPressIn={() => {
              selectedAnswerIndex === null && setSelectedAnswerIndex(index);
            }}
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
                <TouchableOpacity activeOpacity={0.9}>
                  <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
                    style={styles.roundButton1}
                  >
                    <Text
                      style={{
                        ...Fonts.whiteColor18Bold,
                        paddingLeft: 7,
                      }}
                    >
                      {item.options}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ paddingLeft: 5, ...Fonts.blackColor16SemiBold }}>
                  {item.answer}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
        {index + 1 >= questions.length ? (
          <Pressable
            onPress={() => {
              setShowModal(!showModal), navigation.navigate("Result");
            }}
          >
            <LinearGradient
              start={{ x: 1, y: 3 }}
              end={{ x: 0, y: 2 }}
              colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
              style={styles.nextQuizBtnGradientStyle}
            >
              <Text style={{ ...Fonts.whiteColor16Bold }}>Done</Text>
            </LinearGradient>
          </Pressable>
        ) : isSelected === null ? null : (
          <Pressable
            onPress={() => {
              setIndex(index + 1);
            }}
          >
            <LinearGradient
              start={{ x: 1, y: 3 }}
              end={{ x: 0, y: 2 }}
              colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
              style={styles.nextQuizBtnGradientStyle}
            >
              <Text style={{ ...Fonts.whiteColor16Bold }}>Next</Text>
            </LinearGradient>
          </Pressable>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  titleInfoStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor20Bold,
    textAlign: "center",
  },
  quizzingTitleStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor18Bold,
    textAlign: "center",
  },
  startQuizInfo: {
    paddingVertical: Sizes.fixPadding + 30.0,
    marginHorizontal: Sizes.fixPadding + 10.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 40.0,
  },
  startQuizGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 20.0,
  },

  nextQuizBtnGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Sizes.fixPadding + 20.0,
    marginHorizontal: Sizes.fixPadding * 10.0,

    borderRadius: Sizes.fixPadding + 20.0,
  },
  startQuizButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 10.0,
    marginHorizontal: Sizes.fixPadding * 10.0,
    borderRadius: Sizes.fixPadding - 4.0,
  },

  titleQuizText: {
    ...Fonts.blackColor20Bold,
    textAlign: "justify",
  },

  titleQuiz: {
    width: 350,
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  separator: {
    marginVertical: 20,
    marginHorizontal: -80,
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logo: {
    width: 80,
    height: 90,
    justifyContent: "center",
    tintColor: "white",
  },

  questionInfo: {
    marginTop: 15,
    justifyContent: "flex-start",
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
    padding: 5,
    borderRadius: 100,
  },
});

export default QuizScreen;
