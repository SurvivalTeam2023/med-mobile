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
import { MaterialIcons } from "@expo/vector-icons";

import { useIsFavoriteExisted } from "../../hooks/favorite.hook";
import { ImageBackground } from "react-native";
import { FlatList } from "react-native";
const ResultScreen = ({ navigation, route }) => {
  const result = route.params.data;
  const userId = useSelector((state) => state.user.data.id);
  let quizResult;
  let isFavoriteExisted;
  const { data: dataIsFavoriteExisted, isSuccess: successIsFavoriteExisted } =
    useIsFavoriteExisted();
  if (successIsFavoriteExisted) {
    isFavoriteExisted = dataIsFavoriteExisted;
  }
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
    quizResult = quizHistoryData.map((e) => {
      return {
        id: e.id,
        mentalHealth: e.mentalHealth,
        questionBankId: e.questionBankId,
        imgUrl: "https://cdn-icons-png.flaticon.com/128/3930/3930447.png",
      };
    });
    console.log(quizResult);
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
      mentalHealthImg: e?.mentalHealthImg,
    };
  });

  //None: #00CD00, Mild: #FFFF00, Moderate: #A67E00, Severe: #FF0000

  const progressQuiz = () => {
    return (
      <View style={{ paddingHorizontal: 12, paddingVertical: 16 }}>
        <View style={{ backgroundColor: "white", borderRadius: 16 }}>
          <View>
            <Text
              style={{
                ...Fonts.blackColor20SemiBold,
                textAlign: "center",
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderColor: "#ddd",
              }}
            >
              Survey Result
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
                  Remind: {e.desc}
                </Text>
              </Pressable>
            ))}
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
      <View style={{ paddingHorizontal: 12, paddingBottom: 8 }}>
        <View style={{ backgroundColor: "white", borderRadius: 16 }}>
          <View>
            <Text
              style={{
                ...Fonts.blackColor20SemiBold,

                textAlign: "center",
                paddingVertical: 8,
                borderColor: "#ddd",
              }}
            >
              Survey History
            </Text>
          </View>

          {quizResult ? (
            // Render the list of quizzes if quizResult has data
            quizResult.slice(0, 3).map((e) => (
              <TouchableOpacity
                key={e.quizId}
                style={{
                  borderTopWidth: 0.5,
                  borderColor: "grey",
                  paddingVertical: 24,
                  paddingHorizontal: 2,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                onPress={() => {
                  navigation.push(Navigate.RESULT_HISTORY_DETAIL, {
                    e,
                  });
                }}
              >
                <View style={{}}>
                  <ImageBackground
                    source={{ uri: `${e.imgUrl}` }}
                    style={{
                      width: 60,
                      height: 60,
                      overflow: "hidden",
                    }}
                  ></ImageBackground>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    paddingLeft: 16,
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.blackColor14SemiBold,
                      width: "80%",
                    }}
                  >
                    {e.mentalHealth.join(", ")}
                  </Text>
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
    );
  };

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={{ flexDirection: "row", width: "33.33%" }}></View>

        <View style={{ width: "33.33%" }}>
          <Text style={{ ...Fonts.blackColor18SemiBold, textAlign: "center" }}>
            Settings
          </Text>
        </View>
        <View style={{ width: "33.33%" }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onPressHandler()}
            style={{ flexDirection: "row", justifyContent: "flex-end" }}
          >
            <Text style={{ ...Fonts.grayColor18SemiBold }}>Next</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              colors={[
                { color: Colors.primaryColor, offset: "0.15", opacity: "0.75" },
                { color: Colors.secondaryColor, offset: "1", opacity: "0.8" },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <View>
        {header()}
        <FlatList
          ListHeaderComponent={
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
            >
              {progressQuiz()}
              {quizHistory()}
            </LinearGradient>
          }
          showsVerticalScrollIndicator={true}
        />
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
  headerWrapStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
});

export default ResultScreen;
