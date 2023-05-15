import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useRegisterUser } from "../../hooks/auth.hook";
import { useIsValidQuiz } from "../../hooks/question.hook";
import { useIsFavoriteExisted } from "../../hooks/favorite.hook";
import { useEffect } from "react";

const OptionScreen = ({ navigation }) => {
  //null to compare
  let isQuestionValid = null;
  let isFavoriteExisted = null;
  const {
    data: dataIsValidQuiz,
    isSuccess: successIsValidQuiz,
    isError: isErrorIsValidQuiz,
    error: errorIsValidQuiz,
    refetch: refetchQuiz,
  } = useIsValidQuiz();

  const {
    data: dataIsFavoriteExisted,
    isSuccess: successIsFavoriteExisted,
    isError: isErrorIsFavoriteExisted,
    error: errorIsFavoriteExisted,
    refetch: refetchExistFav,
  } = useIsFavoriteExisted();

  if (successIsFavoriteExisted) {
    isFavoriteExisted = dataIsFavoriteExisted["data"];
  }
  if (isErrorIsFavoriteExisted) {
    console.log("error", errorIsFavoriteExisted);
  }

  if (successIsValidQuiz) {
    isQuestionValid = dataIsValidQuiz["data"];
  }

  if (isErrorIsValidQuiz) {
    console.log("error", errorIsValidQuiz);
  }
  useEffect(() => {
    if (isQuestionValid !== null && isFavoriteExisted !== null) {
      isQuestionValid = null;
      isFavoriteExisted = null;
    }
  }, []);

  useEffect(() => {
    if (isQuestionValid && isFavoriteExisted) {
      validate();
    }
  }, [isQuestionValid, isFavoriteExisted]);

  const validate = () => {
    if (isQuestionValid.isValid === true && isFavoriteExisted.exists === true) {
      navigation.push("BottomTabBar");
    } else if (
      isQuestionValid.isValid === false &&
      isFavoriteExisted.exists === true
    ) {
      navigation.push("Quiz");
    } else if (
      isQuestionValid.isValid === true &&
      isFavoriteExisted.exists === false
    ) {
      navigation.push("ChooseMusic");
    } else if (
      isQuestionValid.isValid === false &&
      isFavoriteExisted.exists === false
    ) {
      navigation.push("Quiz");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {cornerImage()}
          <ScrollView
            scrollEnabled={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {signupInfo()}
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function signupInfo() {
    return (
      <View style={{ marginTop: Sizes.fixPadding + 5.0 }}>
        <MaskedView
          style={{ flex: 1, height: 35 }}
          maskElement={
            <Text style={{ textAlign: "center", ...Fonts.bold30 }}>
              Let’s find out yourself
            </Text>
          }
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
            style={{ flex: 1 }}
          />
        </MaskedView>

        {QuizButton()}
        {CamButton()}
      </View>
    );
  }

  function QuizButton() {
    return (
      <TouchableOpacity
        style={styles.signupButtonStyle}
        activeOpacity={0.9}
        onPress={() => {
          refetchExistFav(), refetchQuiz(), validate();
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.signupButtonGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>Take quiz</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  function CamButton() {
    return (
      <TouchableOpacity
        style={styles.signupButtonStyle}
        activeOpacity={0.9}
        onPress={() => {
          navigation.push("ShowCam");
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.signupButtonGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>Show Cam</Text>
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
};

const styles = StyleSheet.create({
  textFieldWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 1.0,
    marginBottom: Sizes.fixPadding + 10.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  passwordTextFieldWrapstyle: {
    marginBottom: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    paddingVertical: Sizes.fixPadding + 1.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  orWrapStyle: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    marginTop: Sizes.fixPadding + 5.0,
    marginBottom: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  socialMediaIconsStyle: {
    width: 32.0,
    height: 32.0,
    borderRadius: 16.0,
    alignItems: "center",
    justifyContent: "center",
  },
  socialMediaIconsWrapStyle: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  signupButtonGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 5.0,
  },
  signupButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2.5,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
});

export default OptionScreen;