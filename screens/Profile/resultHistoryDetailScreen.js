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
import MaskedView from "@react-native-masked-view/masked-view";
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
    const dataFilter = resultFilter?.map((e, index) => {
      return {
        id: index + 1,
        value: e.percentage * 0.01,
        color: getColorForDegree(e.degree),
        type: e.mentalHealth,
        percentage: e.percentage.toFixed(2),
        degree: e.degree,
      };
    });
    console.log(dataFilter);

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
                {dataFilter?.map((e) => (
                  <View key={e.id} style={{ marginTop: 18 }}>
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
                        style={{ height: 20, borderRadius: 8, marginTop: 4 }}
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
                  </View>
                ))}
              </View>
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
