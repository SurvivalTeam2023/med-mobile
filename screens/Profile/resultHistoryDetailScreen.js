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
import { generateColor } from "../../utils/app.util";
import { ProgressBar } from "react-native-paper";
import { useGetResultByIdApi } from "../../hooks/question.hook";
import MaskedView from "@react-native-masked-view/masked-view";
import { Navigate } from "../../constants/navigate";
import { MaterialIcons } from "@expo/vector-icons";
const ResultHistoryDetailScreen = ({ navigation, route }) => {
  const quizId = route.params.e.id;
  let quizResult;
  console.log(quizId);
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
  const dataFilter = resultFilter?.map((e, index) => {
    return {
      id: index + 1,
      value: e?.percentage * 0.01,
      color: getColorForDegree(e?.degree),
      type: e?.mentalHealth,
      percentage: e.percentage?.toFixed(2),
      degree: e?.degree,
      desc: e?.degreeDesc,
      mentalHealthDesc: e?.mentalHealthDesc,
      mentalHealth: e?.mentalHealth,
      mentalHealthImg: e?.mentalHealthImg,
    };
  });
  const progressQuiz = () => {
    return (
      <View
        style={{
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <View style={{ paddingHorizontal: 12 }}>
          <View style={{ backgroundColor: "white", borderRadius: 16 }}>
            <View
              style={{
                marginBottom: Sizes.fixPadding * 2,
                paddingHorizontal: 12,
              }}
            >
              {dataFilter ? (
                dataFilter?.map((e) => (
                  <Pressable
                    key={e.id}
                    style={{ marginTop: 18 }}
                    onPress={() => {
                      navigation.push(Navigate.ILLNESS_DETAIL_SCREEN, {
                        data: {
                          mentalHealth: e.mentalHealth,
                          mentalHealthDesc: e.mentalHealthDesc,
                          mentalHealthImg: e.mentalHealthImg,
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
                      <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        {e.type}
                      </Text>
                      <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        {e.percentage}%
                      </Text>
                    </View>
                    <View>
                      <ProgressBar
                        style={{
                          height: 25,
                          borderRadius: 8,
                          marginTop: 4,
                        }}
                        progress={e.value}
                        color={e.color}
                      />
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 4 }}>
                      <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        Degree:
                      </Text>
                      <Text
                        style={{
                          ...Fonts.blackColor16SemiBold,
                          paddingLeft: 8,
                          color: e.color,
                        }}
                      >
                        {e.degree}
                      </Text>
                    </View>
                    <Text
                      style={{
                        ...Fonts.blackColor16SemiBold,
                        paddingTop: 4,
                        color: e.color,
                      }}
                    >
                      {e.desc}
                    </Text>
                  </Pressable>
                ))
              ) : (
                <View style={styles.container}>
                  <ActivityIndicator size="small" color="#f8b26a" />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <View style={{ flex: 1 }}>
        <View>
          {header()}

          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
            style={styles.startQuizInfo}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {progressQuiz()}
            </ScrollView>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={{ flexDirection: "row", width: "33.33%" }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.pop()}
            style={{ flexDirection: "row" }}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              colors={[
                { color: Colors.primaryColor, offset: "0.15", opacity: "0.75" },
                { color: Colors.secondaryColor, offset: "1", opacity: "0.8" },
              ]}
            />
            <Text style={{ ...Fonts.grayColor18SemiBold }}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: "33.33%" }}>
          <Text style={{ ...Fonts.blackColor18SemiBold, textAlign: "center" }}>
            Survey Detail
          </Text>
        </View>
        <View style={{ width: "33.33%" }}></View>
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
  resultBar: {
    marginTop: 12,
  },
  startQuizInfo: {
    paddingVertical: Sizes.fixPadding + 10,
    paddingBottom: 30,
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
  },
  headerWrapStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
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
export default ResultHistoryDetailScreen;
