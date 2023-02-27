import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { useGetQuestionBankApi } from "../../hooks/question.hook";
import { store } from "../../core/store/store";
import { useDispatch } from "react-redux";
import { questionAction } from "../../redux/auth/question.slice";
import { formatQuestionData } from "../../utils/app.util";
const Separator = () => <View style={styles.separator} />;
import { AntDesign } from "@expo/vector-icons";
let questions = [
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

const QuestionScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const { data, error, isSuccess, isError } = useGetQuestionBankApi();

  let questionData;
  let totalQuestions;

  if (isSuccess) {
    const dataRaw = data["data"].questionBankQuestion;
    const dataFormat = formatQuestionData(dataRaw);
    totalQuestions = dataFormat.length;
    questionData = dataFormat[index];

    questions = dataFormat;
  }
  if (isError) {
    console.log("error", error);
  }

  const pickOption = (question_id, option_id, index) => {
    const questionId = questions.map((item) => {
      return item.id;
    });

    if (questionId.includes(question_id)) {
      dispatch(
        questionAction.storeAnswer({
          questionId: question_id,
          optionId: option_id,
        })
      );
      setSelectedAnswerIndex(index);
    }
  };
  useEffect(() => {
    setSelectedAnswerIndex(null);
  }, [index]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {cornerImage()}
          {quizzingInfo()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function cornerImage() {
    return (
      <View>
        <ImageBackground
          source={require("../../assets/images/corner-design.png")}
          style={{
            width: "100%",
            height: 170,
          }}
        ></ImageBackground>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {index + 1 <= questions?.length && index > 0 ? (
            <View>
              <AntDesign
                onPress={() => {
                  setIndex(index - 1);
                }}
                style={{ width: 30 }}
                name="left"
                size={27}
                color="black"
              />
            </View>
          ) : null}
          {index <= questions?.length ? (
            <View style={{ paddingLeft: 5 }}>
              <AntDesign
                onPress={() => {
                  if (index + 1 < questions?.length) {
                    setIndex(index + 1);
                  } else {
                    navigation.navigate("Result");
                  }
                }}
                style={{ width: 30 }}
                name="right"
                size={27}
                color="black"
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  }

  function addIndex() {
    if (index + 1 < questions?.length) {
      setIndex(index + 1);
    } else {
      return true;
    }
  }

  function quizzingInfo() {
    return (
      <View style={styles.quizInfo}>
        <View style={styles.titleQuiz}>
          <Text style={styles.titleQuizText}>
            Your Progress: ({index + 1}/{totalQuestions}) answered
          </Text>
          <Separator />
        </View>
        <View style={styles.questionInfo}>
          <Text
            style={{
              alignItems: "baseline",
              paddingLeft: 8,
              ...Fonts.blackColor18SemiBold,
            }}
          >
            {questionData?.question}
          </Text>
        </View>
        {questionData?.option.map((item, index) => (
          <Pressable
            key={item.id}
            onPressIn={() => {
              const question_id = questionData?.id;
              setSelectedAnswerIndex(index);
              pickOption(question_id, item.id);
            }}
            onPressOut={() => {
              addIndex();
            }}
            style={
              store
                .getState()
                .question.answer.map((obj) => {
                  return obj.optionId;
                })
                .includes(item.id)
                ? styles.answerInfoChoose
                : styles.answerInfo
            }
          >
            <View
              style={{
                paddingTop: 5,
                paddingLeft: 5,
              }}
            >
              <View>
                <Text
                  style={{
                    paddingLeft: 5,
                    ...Fonts.blackColor16SemiBold,
                    marginTop: 8,
                  }}
                >
                  {item.option}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
        {index + 1 >= questions.length ? (
          <Pressable
            onPress={() => {
              navigation.navigate("Result");
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
        ) : isSelected === null ? null : null}
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
    marginTop: Sizes.fixPadding - 40.0,
  },

  nextQuizBtnGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Sizes.fixPadding + 20.0,
    marginHorizontal: Sizes.fixPadding * 10.0,

    borderRadius: Sizes.fixPadding + 20.0,
  },
  backQuizBtnGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Sizes.fixPadding + 20.0,
    marginHorizontal: Sizes.fixPadding * 10.0,
    marginBottom: Sizes.fixPadding * 5.0,
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
    paddingLeft: 10,
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
    marginHorizontal: 6,
    height: 50,
    borderRadius: 20,
  },
  answerInfoChoose: {
    alignContent: "center",
    backgroundColor: "#D8E2E8",
    marginTop: 40,
    marginHorizontal: 5,
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

export default QuestionScreen;