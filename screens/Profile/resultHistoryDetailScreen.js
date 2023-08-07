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
import { generateColor } from "../../utils/app.util";
import { ProgressBar } from "react-native-paper";
import { useGetResultByIdApi } from "../../hooks/question.hook";
const ResultHistoryDetailScreen = ({ navigation, route }) => {
  const quizId = route.params.e.id;
  console.log(quizId);
  let quizResult;
  let resultFilter;
  const {
    data: resultDetailData,
    isSuccess: isSuccessResultDetail,
    isError: isErrorResultDetail,
    error: errorResultDetail,
  } = useGetResultByIdApi(quizId);
  if (isSuccessResultDetail) {
    quizResult = resultDetailData;
    resultFilter = resultDetailData?.filter((e) => {
      return e.point !== 0;
    });

    const dataFilter = resultFilter?.map((e, index) => {
      return {
        id: index + 1,
        value: e.percentage,
        color: generateColor(),
        type: e.mentalHealth,
        percentage: e.percentage,
      };
    });
    console.log(dataFilter);

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
                    fontWeight: "450",
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
            {cornerImage()}
            <ScrollView
              scrollEnabled={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              {progressQuiz()}
            </ScrollView>
          </ScrollView>
        </View>
      </SafeAreaView>
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
  const styles = StyleSheet.create({
    resultBar: {
      marginTop: 12,
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
};
export default ResultHistoryDetailScreen;
