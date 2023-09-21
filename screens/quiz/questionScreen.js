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
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import {
  useCreateQuestionBankApi,
  useGetQuestionBankApi,
  useSaveQuizResultApi,
  useSetQuizStatus,
} from "../../hooks/question.hook";
import { store } from "../../core/store/store";
import { useDispatch } from "react-redux";
import { questionAction } from "../../redux/other/question.slice";
import { formatQuestionData } from "../../utils/app.util";
const Separator = () => <View style={styles.separator} />;
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
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
  const { data, error, isSuccess, isError } = useCreateQuestionBankApi();
  const { mutate } = useSetQuizStatus();
  const { mutate: mutateSaveQuizResult } = useSaveQuizResultApi();
  const questionBankId = store.getState().question.questionBankId;

  let questionData;
  let totalQuestions;
  let optionIdArr;
  let questBankId;

  const setQuizStatus = () => {
    mutate(questionBankId, {
      onSuccess: (data) => {
        console.log("Set quiz status success");
      },
      onError: (error) => {
        console.log("Failing set quiz status", error);
      },
    });
  };

  const getOptionAndQuestionBankId = () => {
    const answer = store.getState().question.answer;
    questBankId = store.getState().question.questionBankId;
    const optionId = answer.map((obj) => {
      return obj.optionId;
    });
    optionIdArr = optionId;
    if (questBankId && optionIdArr) {
      saveQuizResult(questBankId, optionIdArr);
    }
  };

  const saveQuizResult = (questBankId, optionIdArr) => {
    mutateSaveQuizResult(
      {
        questionBankId: questBankId,
        optionId: optionIdArr,
      },
      {
        onSuccess: (data) => {
          console.log("Save quiz result successfully");
          setQuizStatus();
          dispatch(questionAction.resetState());
          navigation.navigate("Result", { data });
        },
        onError: (error) => {
          console.log("Failing save quiz result", error);
        },
      }
    );
  };

  if (isSuccess) {
    const dataRaw = data.questionBankQuestion;
    const dataFormat = formatQuestionData(dataRaw);
    totalQuestions = dataFormat.length;
    questionData = dataFormat[index];
    const questionBankId = data.id;
    dispatch(questionAction.storeQuestionBankId(questionBankId));
    questions = dataFormat;
  }

  if (isError) {
    console.log("error from create question bank", error);
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
    pickOption;
    setSelectedAnswerIndex(null);
  }, [index]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <View>
        <LinearGradient
          start={{ x: 2, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
          style={styles.startQuizInfo}
        >
          {isSuccess ? (
            quizzingInfo()
          ) : (
            <View style={styles.container}>
              <ActivityIndicator size="small" color="#f8b26a" />
            </View>
          )}
        </LinearGradient>
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
            Question {index + 1} out of {totalQuestions}
          </Text>
        </View>
        <View style={styles.questionInfo}>
          <Text
            style={{
              textAlign: "center",
              ...Fonts.whiteColor20Bold,
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
            <View>
              <Text
                style={{
                  textAlign: "center",
                  ...Fonts.blackColor16SemiBold,
                }}
              >
                {item.option}
              </Text>
            </View>
          </Pressable>
        ))}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 16,
          }}
        >
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
          <View>
            <Text
              style={{
                ...Fonts.blackColor16SemiBold,
                marginTop: 4,
                paddingLeft: 10,
              }}
            >
              {index + 1}/{totalQuestions}
            </Text>
          </View>
          {index + 1 < questions?.length ? (
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
        {index + 1 >= questions.length ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                getOptionAndQuestionBankId();
              }}
              style={styles.btn}
            >
              <LinearGradient
                start={{ x: 1, y: 3 }}
                end={{ x: 0, y: 1 }}
                colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
                style={{ borderRadius: 10 }}
              >
                <Text style={styles.btnText}>Done</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : isSelected === null ? null : null}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },
  btnText: {
    ...Fonts.whiteColor18SemiBold,
    borderWidth: 1,
    borderColor: Colors.greenDarkColor,
    paddingVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 36,
  },
  titleInfoStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor20Bold,
    textAlign: "center",
  },
  startQuizInfo: {
    paddingVertical: Sizes.fixPadding + 10,
    paddingBottom: 30,
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
  },
  quizzingTitleStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor18Bold,
    textAlign: "center",
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
    ...Fonts.blackColor16SemiBold,
    textAlign: "center",
    paddingLeft: 10,
  },

  titleQuiz: {
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
    paddingTop: 15,
    paddingBottom: 36,
    paddingHorizontal: 8,
    maxHeight: "95%",
  },
  answerInfo: {
    alignContent: "center",
    backgroundColor: "white",
    marginTop: 40,
    width: 380,
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 10,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  answerInfoChoose: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 40,
    marginHorizontal: 5,
    width: 380,
    backgroundColor: "#95E02F",
    height: 50,

    borderRadius: 10,
  },
  quizInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 8,
  },
  roundButton1: {
    width: 38,
    height: 38,
    padding: 5,
    borderRadius: 100,
  },
});

export default QuestionScreen;
