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
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useIsFavoriteExisted } from "../../hooks/favorite.hook";
import { Navigate } from "../../constants/navigate";
import { store } from "../../core/store/store";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";

const Separator = () => <View style={styles.separator} />;

let isFavoriteExisted = [];
const AgeVerifyScreen = ({ navigation }) => {
  const [age, setAge] = useState(1);
  const userData = useSelector((state) => state?.user?.data);

  const { data: dataIsFavoriteExisted, isSuccess: successIsFavoriteExisted } =
    useIsFavoriteExisted();
  if (successIsFavoriteExisted) {
    isFavoriteExisted = dataIsFavoriteExisted;
  }

  const ageSelect = () => {
    const ageRange = new Array(100).fill(0);
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={age}
          style={styles.picker}
          onValueChange={(itemValue) => setAge(itemValue)}
        >
          {ageRange.map((_, i) => (
            <Picker.Item key={i} label={i.toString()} value={i} />
          ))}
        </Picker>
      </View>
    );
  };

  const onPressHandler = () => {
    if (isFavoriteExisted.exists === true) {
      navigation.push(Navigate.BOTTOM_TAB_BAR);
    }
    if (isFavoriteExisted.exists === false) {
      navigation.push(Navigate.CHOOSE_MUSIC);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View>
        {cornerImage()}
        {startQuizTitle()}
        {ageSelect()}
      </View>
    </SafeAreaView>
  );

  function ageTextField() {
    return (
      <View style={styles.userNameTextFieldWrapStyle}>
        <MaterialIcons name="person" color={Colors.grayColor} size={20} />
        <TextInput
          value={age}
          onChangeText={(text) => updateState({ age: text })}
          selectionColor={Colors.grayColor}
          placeholder="Input Age"
          placeholderTextColor={Colors.grayColor}
          style={{
            marginLeft: Sizes.fixPadding,
            flex: 1,
            ...Fonts.blackColor14Bold,
          }}
        />
      </View>
    );
  }
  function startQuizTitle() {
    return (
      <View>
        <Text style={{ ...Fonts.bold22 }}>
          {userData?.username}, how old are you?
        </Text>
      </View>
    );
  }

  function startQuizBtn() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 30,
          marginTop: 20,
        }}
      >
        <View stylele={{ marginBottom: 8 }}>
          <Text
            style={{ ...Fonts.medium16, color: "#583D72" }}
            onPress={() => {
              onPressHandler();
            }}
          >
            Skip
          </Text>
        </View>
        <View>
          <Pressable
            activeOpacity={0.9}
            onPress={() => {
              navigation.push(Navigate.QUESTION_SCREEN);
            }}
          >
            <LinearGradient
              start={{ x: 1, y: 3 }}
              end={{ x: 0, y: 2 }}
              colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
              style={{ borderRadius: 20 }}
            >
              <Ionicons name="arrow-forward" size={30} color="white" />
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    );
  }

  function askAgeButton() {
    return (
      <View>
        <Pressable
          style={styles.signInButtonStyle}
          activeOpacity={0.9}
          onPress={() => {
            navigation.push(Navigate.CHOOSE_MENTAL_SCREEN);
          }}
        >
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={["rgb(94, 252, 232)", "rgb(115, 110, 254)"]}
            style={styles.signInButtonGradientStyle}
          >
            <Text style={{ ...Fonts.whiteColor18Bold }}>
              18 years and older
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    );
  }
  function askAgeButton_2() {
    return (
      <Pressable
        style={styles.signInButtonStyle}
        activeOpacity={0.9}
        onPress={() => {
          navigation.push("ShowMentalHealth");
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
          style={styles.signInButtonGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>13-17 years old</Text>
        </LinearGradient>
      </Pressable>
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
  container: {
    marginTop: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginHorizontal: 150,
  },
  picker: { width: "99%" },
  pickerItemIOS: {
    fontSize: 20,
  },
  titleInfoStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor18Bold,
    textAlign: "center",
  },
  signInButtonStyle: {
    marginTop: Sizes.fixPadding * 2.5,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  signInButtonGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 10,
  },
  quizzingTitleStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor18Bold,
    textAlign: "center",
  },
  startQuizInfo: {
    paddingVertical: Sizes.fixPadding + 10,
    paddingBottom: 30,
    marginHorizontal: Sizes.fixPadding + 10.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 20.0,
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

  separator: {
    marginVertical: 20,
    marginHorizontal: -80,
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  describeQuizText: {
    ...Fonts.whiteColor16Light,
    width: 300,
    justifyContent: "center",
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

export default AgeVerifyScreen;
