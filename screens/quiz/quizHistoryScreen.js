import React, { useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { useGetUserDataByUsernameApi } from "../../hooks/user.hook";
import { Ionicons } from "@expo/vector-icons";
import { Navigate } from "../../constants/navigate";
import moment from "moment";
import { useGetFinishedQuizHistoryApi } from "../../hooks/question.hook";
import { useSelector } from "react-redux";
import MaskedView from "@react-native-masked-view/masked-view";
import { MaterialIcons } from "@expo/vector-icons";

const QuizHistoryScreen = ({ navigation }) => {
  const userId = useSelector((state) => state.user.data.id);
  const { data: quizHistoryData, isSuccess: isSuccessQuizHistory } =
    useGetFinishedQuizHistoryApi(userId);
  const quizHistory = () => {
    return (
      <View
        style={{
          borderRadius: 10,
        }}
      >
        {quizHistoryData ? (
          <View
            style={{
              paddingHorizontal: 12,
              paddingVertical: 16,
              borderRadius: 16,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.greenLightColor,
                borderRadius: 16,
              }}
            >
              {quizHistoryData.slice(0, 5).map((e) => (
                <TouchableOpacity
                  key={e.quizId}
                  style={{
                    borderColor: "grey",
                    paddingHorizontal: 36,
                    margin: 12,
                    paddingVertical: 16,
                    borderBottomWidth: 0.5,
                  }}
                  onPress={() => {
                    navigation.push(Navigate.RESULT_HISTORY_DETAIL, {
                      e,
                    });
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.blackColor20SemiBold,
                      textAlign: "center",
                    }}
                  >
                    Mental Health
                  </Text>
                  <Text
                    style={{
                      ...Fonts.blackColor14SemiBold,
                      textAlign: "center",
                      paddingVertical: 14,
                    }}
                  >
                    {e.mentalHealth.join(", ")}
                  </Text>

                  <View style={{ marginTop: 4, alignItems: "flex-end" }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#555555",
                        fontStyle: "italic",
                      }}
                    >
                      Created At: {moment(e.createdDate).format("DD-MM-YYYY")}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          // Render the list of quizzes if quizResult has data

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
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.greenDarkColor} />
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <View>
              {header()}
              {quizHistory()}
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
        />
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
            Survey Result
          </Text>
        </View>
        <View style={{ width: "33.33%" }}></View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  userInfo: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  wrapperUserInfo: {
    paddingHorizontal: 8,
    marginTop: 8,
    marginLeft: 8,
    paddingVertical: 8,
  },
  container: {
    flex: 1,
  },
  rect: {
    width: 350,
    height: 250,
    backgroundColor: "#E6E6E6",
    marginLeft: 20,
    borderRadius: 30,
    borderWidth: 2,
  },
  image: {
    width: 175,
    height: 175,
    marginTop: 8,
    borderRadius: 50,
  },
  name: {
    color: "#121212",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 44,
  },
  imageRow: {
    height: 121,
    flexDirection: "row",
    marginTop: 29,
    marginRight: 124,
  },
  favorited: {
    color: "#121212",
    alignItems: "flex-start",
    fontWeight: "bold",
  },
  noticeText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "100",
    paddingVertical: 8,
  },
  playlists: {
    color: "#121212",
    marginLeft: 51,
    alignItems: "flex-start",
    fontWeight: "bold",
  },
  following: {
    color: "#121212",
    marginLeft: 51,
    alignItems: "flex-start",
    fontWeight: "bold",
  },
  detailWrapper: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginLeft: 21,
    marginRight: 35,
  },
  favoritedTextRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding + 15,
    marginTop: Sizes.fixPadding + 5,
    marginBottom: Sizes.fixPadding,
    marginRight: 50,
  },
  detailedText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  profileAbout: {
    color: "#121212",
    marginTop: 11,
    marginLeft: 27,
  },
  publicPlaylists: {
    color: "#121212",
    marginTop: 20,
    marginLeft: 26,
  },
  following2: {
    color: "#121212",
    marginTop: 125,
    marginLeft: 27,
  },
  recentlyPalyedSongImageStyle: {
    marginRight: Sizes.fixPadding,
    width: 110,
    height: 100,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  titleStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.blackColor15Bold,
  },
  titleWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  recentlyPalyedSongImageStyle: {
    marginRight: Sizes.fixPadding,
    width: 110,
    height: 100,
    borderRadius: Sizes.fixPadding - 5.0,
  },
});

export default QuizHistoryScreen;
