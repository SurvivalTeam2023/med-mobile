import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
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
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useIsFavoriteExisted } from "../../hooks/favorite.hook";

const Separator = () => <View style={styles.separator} />;
let isFavoriteExisted = [];

const ResultScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  const {
    data: dataIsFavoriteExisted,
    isSuccess: successIsFavoriteExisted,
    isError: isErrorIsFavoriteExisted,
    error: errorIsFavoriteExisted,
  } = useIsFavoriteExisted();
  if (successIsFavoriteExisted) {
    isFavoriteExisted = dataIsFavoriteExisted["data"];
    console.log("isFavoriteExisted", isFavoriteExisted.exists);
  }
  if (isErrorIsFavoriteExisted) {
    console.log("error", errorIsFavoriteExisted);
  }

  const onPressHandler = () => {
    if (isFavoriteExisted.exists === true) {
      navigation.push("BottomTabBar");
    }
    if (isFavoriteExisted.exists === false) {
      navigation.push("ChooseMusic");
    }
  };

  const [showModal, setShowModal] = useState(false);

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
            {quizResultTitle()}
            {doneResultBtn()}
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function quizResultTitle() {
    return (
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
        style={styles.resultInfo}
      >
        <Text style={styles.resultInfoStyle}>Thank you for your answers</Text>
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.logo}
            source={{
              uri: "https://cdn2.iconfinder.com/data/icons/working-at-home/512/N_P_182Artboard_1_copy_11-512.png",
            }}
          />
        </View>
      </LinearGradient>
    );
  }

  function doneResultBtn() {
    return (
      <TouchableOpacity
        style={styles.doneQuizButtonStyle}
        activeOpacity={0.9}
        onPress={() => {
          // navigation.navigate("ChooseMusic");
          onPressHandler();
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 3 }}
          end={{ x: 0, y: 2 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.doneQuizGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor16Bold }}>Enjoyyyy</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
};
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
const styles = StyleSheet.create({
  resultInfo: {
    paddingVertical: Sizes.fixPadding + 50.0,
    marginHorizontal: Sizes.fixPadding + 10.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 40.0,
  },
  resultInfoStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor18Bold,
    textAlign: "center",
  },

  logo: {
    width: 80,
    height: 70,
    tintColor: "white",
  },

  doneQuizButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 10.0,
    marginHorizontal: Sizes.fixPadding * 10.0,
    borderRadius: Sizes.fixPadding - 4.0,
  },
  doneQuizGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 20.0,
  },
});

export default ResultScreen;
