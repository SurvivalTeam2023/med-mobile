import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useIsFavoriteExisted } from "../../hooks/favorite.hook";
import { Navigate } from "../../constants/navigate";
import { store } from "../../core/store/store";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { useCreateQuestionBankByMentalHealthIdApi } from "../../hooks/question.hook";

const MentalSurveyScreen = ({ navigation, route }) => {
  const mentalHealth = route.params.data;

  const { mutate } = useCreateQuestionBankByMentalHealthIdApi();
  const handleCreateQuestion = () => {
    mutate(
      {
        mentalHealthId: mentalHealth.id,
        noQuestion: 5,
      },
      {
        onSuccess: async (data) => {
          navigation.push(Navigate.QUESTION_MENTAL_HEALTH_SCREEN, {
            data: data,
          });
        },
        onError: (error) => {
          console.log("Create question failed", error);
        },
      }
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <View>
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
          style={styles.startQuizInfo}
        >
          <Text style={styles.titleInfoStyle}>{mentalHealth.name} Survey</Text>
          <View style={{ alignItems: "center", paddingTop: 4 }}>
            <Text style={styles.describeQuizText}>
              Welcome to the Emotion Survey! This quiz is designed to help you
              gain insight into your emotional landscape and explore the
              complexities of your feelings.
            </Text>
            <ImageBackground
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/5336/5336520.png",
              }}
              style={styles.image}
            ></ImageBackground>
          </View>
          {startQuizBtn()}
        </LinearGradient>
      </View>
    </SafeAreaView>
  );

  function startQuizBtn() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            handleCreateQuestion();
          }}
          style={styles.btn}
        >
          <LinearGradient
            start={{ x: 1, y: 3 }}
            end={{ x: 0, y: 1 }}
            colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
            style={{ borderRadius: 10 }}
          >
            <Text style={styles.btnText}>Getting started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    ...Fonts.whiteColor30Bold,
    textAlign: "center",
  },
  quizzingTitleStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor26Bold,
    textAlign: "center",
  },
  startQuizInfo: {
    paddingVertical: Sizes.fixPadding + 10,
    paddingBottom: 30,
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
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
    marginTop: Sizes.fixPadding * 5.0,
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
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
  },
  separator: {
    marginVertical: 20,
    marginHorizontal: -80,
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  describeQuizText: {
    ...Fonts.whiteColor16Light,
    textAlign: "center",
    paddingHorizontal: 36,
    justifyContent: "center",
    paddingBottom: 20,
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
    marginHorizontal: 5,
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

export default MentalSurveyScreen;
