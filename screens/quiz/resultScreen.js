import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";

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
import { useIsFavoriteExisted } from "../../hooks/favorite.hook";
import { Navigate } from "../../constants/navigate";
import { generateColor } from "../../utils/app.util";
import { ProgressBar } from "react-native-paper";

let isFavoriteExisted;

const ResultScreen = ({ navigation }) => {
  // const {
  //   data: dataIsFavoriteExisted,
  //   isSuccess: successIsFavoriteExisted,
  //   isError: isErrorIsFavoriteExisted,
  //   error: errorIsFavoriteExisted,
  //   refetch: refetchFav,
  // } = useIsFavoriteExisted();
  // if (successIsFavoriteExisted) {
  //   isFavoriteExisted = dataIsFavoriteExisted.exists;
  // }
  // if (isErrorIsFavoriteExisted) {
  //   console.log("Failed to get favorited existed", errorIsFavoriteExisted);
  // }

  let feeling = [
    {
      Confidence: 52.84242630004883,
      Type: "HAPPY",
    },
    {
      Confidence: 31.79851531982422,
      Type: "CALM",
    },
    {
      Confidence: 6.743500232696533,
      Type: "SURPRISED",
    },
    {
      Confidence: 6.225941181182861,
      Type: "FEAR",
    },
    {
      Confidence: 5.255831718444824,
      Type: "CONFUSED",
    },
    {
      Confidence: 3.8689191341400146,
      Type: "SAD",
    },
    {
      Confidence: 2.0175960063934326,
      Type: "ANGRY",
    },
    {
      Confidence: 1.977848768234253,
      Type: "DISGUSTED",
    },
  ];
  const data = feeling?.map((e, index) => {
    return {
      id: index + 1,
      value: e.Confidence * 0.01,
      color: generateColor(),
      type: e.Type.charAt(0).toUpperCase() + e.Type.slice(1).toLowerCase(),
      percentage: e.Confidence.toFixed(2),
    };
  });

  const progressQuiz = () => {
    return (
      <View
        style={{
          backgroundColor: "#eeeeee",
          borderRadius: 10,
          marginTop: 8,
        }}
      >
        <View style={{ paddingHorizontal: 12, paddingVertical: 16 }}>
          <View style={{ backgroundColor: "white", borderRadius: 16 }}>
            <View>
              <Text
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  fontWeight: "450",
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderColor: "#ddd",
                }}
              >
                Quiz Result
              </Text>
            </View>
            <View
              style={{
                marginBottom: Sizes.fixPadding * 2,
                paddingHorizontal: 12,
              }}
            >
              {data.map((e) => (
                <View key={e.Confidence} style={styles.progressBar}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "400" }}>
                      {e.type}
                    </Text>
                    <Text
                      style={{ fontSize: 14, fontWeight: "400", marginTop: 4 }}
                    >
                      {e.percentage}%
                    </Text>
                  </View>
                  <View>
                    <ProgressBar
                      style={{ height: 20, borderRadius: 8, marginTop: 4 }}
                      progress={e.value}
                      color={e.color}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const onPressHandler = () => {
    navigation.push("ReccommendedGenreScreen");
  };

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
            {progressQuiz()}
            {doneResultBtn()}
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function doneResultBtn() {
    return (
      <Pressable
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
      </Pressable>
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
