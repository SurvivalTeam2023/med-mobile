import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useIsValidQuiz } from "../../hooks/question.hook";
import { useIsFavoriteExisted } from "../../hooks/favorite.hook";
import { Ionicons } from "@expo/vector-icons";
import { Navigate } from "../../constants/navigate";
import { store } from "../../core/store/store";
import { FlatList } from "react-native-gesture-handler";
import { useState } from "react";
import {
  getDisclaimerFromLocal,
  storeDisclaimerToLocal,
} from "../../utils/app.local_handler";

const OptionScreen = ({ navigation }) => {
  const [isRead, setIsRead] = useState();

  let isQuestionValid;
  let isFavoriteExisted;
  const userInfo = store.getState().user.data;
  const hasUserInfoDob = !!userInfo.dob; // Check if userInfo.dob has data

  const {
    data: dataIsValidQuiz,
    isSuccess: successIsValidQuiz,
    isError: isErrorIsValidQuiz,
    error: errorIsValidQuiz,
  } = useIsValidQuiz();
  const {
    data: dataIsFavoriteExisted,
    isSuccess: successIsFavoriteExisted,
    isError: isErrorIsFavoriteExisted,
    error: errorIsFavoriteExisted,
  } = useIsFavoriteExisted();

  if (successIsValidQuiz && successIsFavoriteExisted) {
    isQuestionValid = dataIsValidQuiz;
    isFavoriteExisted = dataIsFavoriteExisted?.exists;
  } else {
    console.log("error fav existed", errorIsFavoriteExisted);
    console.log("error valid quiz", errorIsValidQuiz);
  }

  function startQuizTitle() {
    return (
      <View style={{ height: "90%" }}>
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.startQuizInfo}
        >
          <Text style={styles.titleInfoStyle}>Meditation App Disclaimer</Text>
          <View
            style={{ alignItems: "center", paddingTop: 28, paddingBottom: 40 }}
          >
            <ScrollView showsVerticalScrollIndicator={true}>
              <Text style={styles.describeQuizText}>
                The Meditation Healing App is designed to provide meditation and
                mindfulness resources for relaxation, stress reduction, and
                personal growth. The content and techniques offered by the App
                are intended to complement, not replace, professional medical
                advice, diagnosis, or treatment. It is essential to consult with
                a qualified healthcare provider before making any changes to
                your health regimen.
                {"\n\n"}
                The meditation practices and healing content provided by the App
                are not intended as a substitute for medical or psychological
                treatment. The App developers, content creators, and platform
                providers are not licensed medical professionals, therapists, or
                counselors. Therefore, the information provided should not be
                construed as medical, psychological, or professional advice.
                {"\n\n"}
                Individuals with pre-existing medical or psychological
                conditions should exercise caution when using the App. If you
                have any concerns about the suitability of the meditation and
                healing practices for your specific circumstances, it is
                recommended that you consult with a qualified healthcare
                professional before proceeding.
                {"\n\n"}
                By using the App, you understand and acknowledge that meditation
                and healing experiences can vary widely among individuals. The
                results and outcomes of meditation practices may not be
                guaranteed, and any benefits experienced may differ from person
                to person.
                {"\n\n"}
                The App's content may include guided imagery, relaxation
                exercises, and meditation techniques that encourage
                introspection and emotional exploration. It's important to note
                that engaging in these practices can sometimes bring up
                unexpected emotions or thoughts. If you find yourself
                experiencing discomfort, distress, or psychological discomfort
                during or after using the App, consider discontinuing use and
                seeking professional assistance if needed.
                {"\n\n"}
                The App is meant to be used in a safe and appropriate
                environment. Do not engage with the App's content while
                operating machinery, driving, or participating in any activity
                that requires your full attention.
                {"\n\n"}
                Your use of the Meditation Healing App indicates your acceptance
                of these terms and conditions. If you do not agree with these
                terms, please refrain from using the App. The App developers,
                content creators, and platform providers shall not be held
                liable for any direct, indirect, incidental, consequential, or
                special damages arising from your use of the App or reliance on
                any information provided.
                {"\n\n"}
                Remember that healing is a complex and individualized process.
                The App's practices are intended to be part of a holistic
                approach to well-being and should be used as such. Consistent
                practice and patience are often necessary to experience the full
                benefits of meditation and healing.
                {"\n\n"}
                <Text style={{ fontWeight: "bold" }}>
                  Survey Content and Results based on PHQ-9 Standard
                </Text>
                {"\n"}
                During your usage of this app, you might encounter mood and
                mental health surveys. One common survey used is the Patient
                Health Questionnaire-9 (PHQ-9), which assesses levels of anxiety
                and depression according to medical standards. However, please
                be aware that the results of these surveys are provided for
                informational purposes only and cannot replace the evaluation of
                a mental health professional.
                {"\n\n"}
                <Text style={{ fontWeight: "bold" }}>
                  Seek Expert Guidance for Accurate Results
                </Text>
                {"\n"}
                If you experience any signs of anxiety, depression, or other
                mental health concerns, it is strongly recommended to seek
                guidance from a mental health expert or a medical professional.
                Professionals can offer a more accurate assessment of your
                situation and provide recommendations for suitable treatment or
                support based on your individual needs.
                {"\n\n"}
                <Text style={styles.importantNote}>Important Note</Text>
                {"\n"}
                It's important to note that using this app and participating in
                surveys is not a substitute for professional medical advice.
                Always consult with a qualified medical professional whenever
                necessary. Remember, your mental well-being is a priority. If
                you have any concerns about your mental health, seeking
                assistance from trained professionals is the best course of
                action.
              </Text>
            </ScrollView>
            {startQuizBtn()}
          </View>
        </LinearGradient>
      </View>
    );
  }
  const validate = () => {
    if (
      isQuestionValid === true &&
      isFavoriteExisted === true &&
      hasUserInfoDob === false
    ) {
      navigation.push(Navigate.BOTTOM_TAB_BAR);
    } else if (
      isQuestionValid === false &&
      isFavoriteExisted === true &&
      hasUserInfoDob === true
    ) {
      navigation.push(Navigate.QUIZ);
    } else if (
      isQuestionValid === true &&
      isFavoriteExisted === false &&
      hasUserInfoDob === true
    ) {
      navigation.push(Navigate.CHOOSE_MUSIC);
    } else if (
      isQuestionValid === false &&
      isFavoriteExisted === false &&
      hasUserInfoDob === true
    ) {
      navigation.push(Navigate.QUIZ);
    } else if (
      isQuestionValid === false &&
      isFavoriteExisted === false &&
      hasUserInfoDob === false
    ) {
      navigation.push(Navigate.BOTTOM_TAB_BAR);
    } else if (
      isQuestionValid === true &&
      isFavoriteExisted === true &&
      hasUserInfoDob === true
    ) {
      navigation.push(Navigate.BOTTOM_TAB_BAR);
    }
  };
  useEffect(() => {
    const initializeIsRead = async () => {
      try {
        const disclaimerValue = await getDisclaimerFromLocal();
        setIsRead(disclaimerValue);
        if (disclaimerValue) {
          validate();
        }
      } catch (error) {
        console.log("Failed fetching disclaimer:", error);
      }
    };

    initializeIsRead();
  }, [isQuestionValid, isFavoriteExisted]);
  function startQuizBtn() {
    return (
      <Pressable
        style={styles.startQuizButtonStyle}
        activeOpacity={0.9}
        onPress={() => {
          storeDisclaimerToLocal(true);
          validate();
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 3 }}
          end={{ x: 0, y: 2 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.startQuizGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor16Bold }}>I agree</Text>
        </LinearGradient>
      </Pressable>
    );
  }

  function cornerImage() {
    return (
      <View style={{ height: "90%" }}>
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.startQuizInfo}
        >
          <Text style={styles.titleInfoStyle}>Loading...</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1, paddingTop: 24 }}>
        {!isRead ? startQuizTitle() : cornerImage()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  importantNote: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  startQuizButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2,
    marginLeft: Sizes.fixPadding * 4,
    borderRadius: Sizes.fixPadding - 4.0,
    paddingBottom: Sizes.fixPadding * 2,
    width: 150,
    height: 150,
  },
  startQuizGradientStyle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 20.0,
    backgroundColor: "red",
    width: 125,
    height: 40,
  },

  startQuizInfo: {
    paddingTop: Sizes.fixPadding + 20.0,
    marginHorizontal: Sizes.fixPadding + 10.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 10.0,
  },
  titleInfoStyle: {
    marginTop: Sizes.fixPadding * 10,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor18Bold,
    textAlign: "center",
  },
  describeQuizText: {
    ...Fonts.whiteColor16,
    width: 300,
    justifyContent: "center",
  },
});

export default OptionScreen;
