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
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Navigate } from "../../constants/navigate";
import { generateColor } from "../../utils/app.util";
import { ProgressBar } from "react-native-paper";
import { store } from "../../core/store/store";
import { useGetFinishedQuizHistoryApi } from "../../hooks/question.hook";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import MaskedView from "@react-native-masked-view/masked-view";
const ResultScreen = ({ navigation, route }) => {
  const result = route.params.data;
  console.log(result);
  const userId = useSelector((state) => state.user.data.id);
  let quizResult;

  const {
    data: quizHistoryData,
    isSuccess: isSuccessQuizHistory,
    isError: isErrorQuizHistory,
    error: errorQuizHistory,
  } = useGetFinishedQuizHistoryApi(userId);

  let feeling = result;

  let feelingFilter = feeling.filter((e) => {
    return e.point !== 0;
  });

  if (isSuccessQuizHistory) {
    console.log("Get quiz History success");
    quizResult = quizHistoryData;
  }
  if (isErrorQuizHistory) {
    console.log("Get quiz history failed", errorQuizHistory);
  }

  const getColorForDegree = (degree) => {
    switch (degree) {
      case "None":
        return "#00CD00";
      case "Mild":
        return "#fdc500";
      case "Moderate":
        return "#fd8c00";
      case "Severe":
        return "#dc0000";
      default:
        return "black"; // Default color if degree doesn't match any case
    }
  };
  const data = feelingFilter?.map((e, index) => {
    return {
      id: index + 1,
      value: e.point * 0.01,
      color: getColorForDegree(e.degree),
      type:
        e.mentalHealth?.charAt(0).toUpperCase() +
        e.mentalHealth?.slice(1).toLowerCase(),
      percentage: e.point?.toFixed(2),
      degree: e.degree,
      desc: e?.degreeDesc,
      mentalHealthDesc: e?.mentalHealthDesc,
      mentalHealth: e?.mentalHealth,
    };
  });

  //None: #00CD00, Mild: #FFFF00, Moderate: #A67E00, Severe: #FF0000

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
                  fontWeight: "400",
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
              {data?.map((e) => (
                <Pressable
                  key={e.id}
                  style={{ marginTop: 18 }}
                  onPress={() => {
                    navigation.push(Navigate.ILLNESS_DETAIL_SCREEN, {
                      data: {
                        mentalHealth: e.mentalHealth,
                        mentalHealthDesc: e.mentalHealthDesc,
                      },
                    });
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: "400" }}>
                      {e.type}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        marginTop: 4,
                      }}
                    >
                      {e.percentage}%
                    </Text>
                  </View>
                  <View>
                    <ProgressBar
                      style={{
                        height: 20,
                        borderRadius: 8,
                        marginTop: 4,
                      }}
                      progress={e.value}
                      color={e.color}
                    />
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 4 }}>
                    <Text style={{ fontSize: 16, fontWeight: "400" }}>
                      Degree:
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        fontStyle: "italic",
                        paddingLeft: 8,
                        color: e.color,
                      }}
                    >
                      {e.degree}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      fontStyle: "italic",
                      paddingTop: 4,
                      color: e.color,
                    }}
                  >
                    {e.desc}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const onPressHandler = () => {
    navigation.push(Navigate.BOTTOM_TAB_BAR);
  };

  const quizHistory = () => {
    return (
      <View
        style={{
          backgroundColor: "#eeeeee",
          borderRadius: 10,
        }}
      >
        <View style={{ paddingHorizontal: 12, paddingVertical: 16 }}>
          <View style={{ backgroundColor: "white", borderRadius: 16 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 8,
              }}
            >
              <MaskedView
                style={{ flex: 1, height: 28 }}
                maskElement={
                  <Text style={{ ...Fonts.bold22 }}>Quiz History</Text>
                }
              >
                <LinearGradient
                  start={{ x: 1, y: 0.2 }}
                  end={{ x: 1, y: 1 }}
                  colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
                  style={{ flex: 1 }}
                />
              </MaskedView>
            </View>

            {quizResult ? (
              // Render the list of quizzes if quizResult has data
              quizResult.slice(0, 5).map((e) => (
                <TouchableOpacity
                  key={e.quizId}
                  style={{
                    borderTopWidth: 0.5,
                    borderColor: "grey",
                    paddingHorizontal: 8,
                    paddingVertical: 12,
                  }}
                  onPress={() => {
                    navigation.push(Navigate.RESULT_HISTORY_DETAIL, {
                      e,
                    });
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: "400" }}>
                      Symptoms:
                    </Text>
                    <Text style={{ fontSize: 14, marginTop: 2 }}>
                      {e.mentalHealth.toString()}
                    </Text>
                  </View>
                  <View style={{ marginTop: 4 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#aaa",
                        fontStyle: "italic",
                      }}
                    >
                      Created At: {moment(e.createdDate).format("DD-MM-YYYY")}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              // Render the "No data" text if quizResult is empty
              <Text
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  fontWeight: "400",
                  paddingVertical: 8,
                }}
              >
                No data
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />

      <View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <ScrollView
            scrollEnabled={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {progressQuiz()}
            {quizHistory()}
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
          onPressHandler();
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 3 }}
          end={{ x: 0, y: 2 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.doneQuizGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor16Bold }}>Enjoy</Text>
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
  progressBar: {
    marginTop: 18,
  },
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
    marginTop: 16,
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
