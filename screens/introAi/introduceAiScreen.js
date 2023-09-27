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
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useIsFavoriteExisted } from "../../hooks/favorite.hook";
import { Navigate } from "../../constants/navigate";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
const Separator = () => <View style={styles.separator} />;
let isFavoriteExisted = [];

const IntroAIScreen = () => {
  const navigation = useNavigation();
  const userInfo = useSelector((state) => state.user.data);

  const onPressHandler = () => {
    navigation.navigate("BottomTabBar");
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      {header()}

      <View>
        {startQuizTitle()}
        {startQuizBtn()}
      </View>
    </SafeAreaView>
  );

  function startQuizTitle() {
    return (
      <View style={{ paddingTop: 36 }}>
        <View>
          <MaskedView
            style={{ height: 60 }}
            maskElement={
              <Text style={{ textAlign: "center", ...Fonts.bold22 }}>
                Brand new AI techonology
              </Text>
            }
          >
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </View>
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
          style={styles.startQuizInfo}
        >
          <Text style={styles.titleInfoStyle}>Facial emotion recognition</Text>
          <View
            style={{ alignItems: "center", paddingTop: 4, paddingBottom: 40 }}
          >
            <Text style={styles.describeQuizText}>
              Facial emotion recognition is a fascinating AI technology that can
              detect and interpret human emotions based on facial expressions.
              By analyzing various facial features such as eyebrows, eyes,
              mouth, and overall facial movements, AI algorithms can accurately
              identify emotions like happiness, sadness, anger, surprise, fear,
              and more.
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{ ...Fonts.grayColor18SemiBold, alignContent: "center" }}>
          {userInfo?.username}'s Space
        </Text>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.push(Navigate.PROFILE_SCREEN)}
            style={{
              borderWidth: 2,
              borderColor: "black",
              borderRadius: 50,
            }}
          >
            <Image
              source={
                userInfo?.avatar?.url
                  ? { uri: userInfo?.avatar?.url }
                  : { uri: "https://e-s-center.kz/images/articles/123123.png" }
              }
              style={styles.image}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.push(Navigate.SETTING_SCREEN);
            }}
          >
            <SimpleLineIcons
              name="menu"
              size={18}
              color="black"
              style={{ paddingTop: 12, paddingLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function startQuizBtn() {
    return (
      <View>
        <Pressable
          style={styles.startQuizButtonStyle}
          activeOpacity={0.9}
          onPress={() => {
            navigation.push(Navigate.SHOW_CAM);
          }}
        >
          <LinearGradient
            start={{ x: 1, y: 3 }}
            end={{ x: 0, y: 2 }}
            colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
            style={styles.startQuizGradientStyle}
          >
            <Text style={{ ...Fonts.whiteColor16Bold }}>Getting started</Text>
          </LinearGradient>
        </Pressable>
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
  describeQuizText: {
    ...Fonts.whiteColor16Light,
    width: 300,
    justifyContent: "center",
  },
  titleInfoStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor18Bold,
    textAlign: "center",
  },
  quizzingTitleStyle: {
    ...Fonts.whiteColor18Bold,
    textAlign: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 90,
  },
  startQuizInfo: {
    paddingTop: Sizes.fixPadding + 15.0,
    marginHorizontal: Sizes.fixPadding + 10.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 10.0,
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
  },
  headerWrapStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    padding: 8,
    borderBottomWidth: 0.5,
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

export default IntroAIScreen;
