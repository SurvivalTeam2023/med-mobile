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

import { store } from "../../core/store/store";
let profile = [];
const ProfileScreen = ({ navigation }) => {
  const userId = useSelector((state) => state.user.data.id);
  let quizResult;
  const { data: quizHistoryData, isSuccess: isSuccessQuizHistory } =
    useGetFinishedQuizHistoryApi(userId);
  const username = useSelector((state) => state.user.data.username);
  if (isSuccessQuizHistory) {
    quizResult = quizHistoryData;
  }

  const { data, isSuccess } = useGetUserDataByUsernameApi(username);

  if (isSuccess) {
    profile = data?.user_db;
  }

  useEffect(() => {
    if (isSuccess) {
      profile = data?.user_db;
    }
  }, []);

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
            <View>
              <MaskedView
                style={{ flex: 1, height: 28 }}
                maskElement={
                  <Text style={{ ...Fonts.bold22, paddingLeft: 8 }}>
                    Quiz History
                  </Text>
                }
              >
                <LinearGradient
                  start={{ x: 1, y: 0.2 }}
                  end={{ x: 1, y: 1 }}
                  colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
                  style={{ flex: 1 }}
                />
              </MaskedView>

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
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <View>
              {header()}
              {Profile()}
              {quizHistory()}
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
        />
      </View>
    </SafeAreaView>
  );

  function Profile() {
    return (
      <View
        style={{
          backgroundColor: "#eeeeee",
          borderRadius: 14,
        }}
      >
        <View style={{ paddingHorizontal: 12, paddingVertical: 16 }}>
          <View style={{ backgroundColor: "white", borderRadius: 16 }}>
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Image
                source={
                  profile?.avatar?.url
                    ? { uri: profile?.avatar?.url }
                    : {
                        uri: "https://e-s-center.kz/images/articles/123123.png",
                      }
                }
                style={styles.image}
              />
            </View>

            <View>
              <View style={styles.wrapperUserInfo}>
                <View style={styles.userInfo}>
                  <Text style={{ fontSize: 16, fontWeight: "400" }}>
                    Username
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "100",
                    }}
                  >
                    {profile.username}
                  </Text>
                </View>
              </View>
              <View style={styles.wrapperUserInfo}>
                <View style={styles.userInfo}>
                  <Text style={{ fontSize: 16, fontWeight: "400" }}>Email</Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "100",
                    }}
                  >
                    {profile.email}
                  </Text>
                </View>
              </View>
              <View style={styles.wrapperUserInfo}>
                <View style={styles.userInfo}>
                  <Text style={{ fontSize: 16, fontWeight: "400" }}>
                    Firstname
                  </Text>
                  {profile.firstName ? (
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "100",
                      }}
                    >
                      {profile.firstName}
                    </Text>
                  ) : (
                    <Text style={styles.noticeText}>
                      Please update firstname
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.wrapperUserInfo}>
                <View style={styles.userInfo}>
                  <Text style={{ fontSize: 16, fontWeight: "400" }}>
                    Lastname
                  </Text>
                  {profile.lastName ? (
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "100",
                      }}
                    >
                      {profile.lastName}
                    </Text>
                  ) : (
                    <Text style={styles.noticeText}>
                      Please update lastname
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.wrapperUserInfo}>
                <View style={styles.userInfo}>
                  <Text style={{ fontSize: 16, fontWeight: "400" }}>
                    Gender
                  </Text>
                  {profile.gender ? (
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "100",
                      }}
                    >
                      {profile.gender}
                    </Text>
                  ) : (
                    <Text style={styles.noticeText}>Please update gender</Text>
                  )}
                </View>
              </View>
              <View style={styles.wrapperUserInfo}>
                <View style={styles.userInfo}>
                  <Text style={{ fontSize: 16, fontWeight: "400" }}>
                    Address
                  </Text>
                  {profile.address ? (
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "100",
                      }}
                    >
                      {profile.address}
                    </Text>
                  ) : (
                    <Text style={styles.noticeText}>Please update address</Text>
                  )}
                </View>
              </View>
              <View style={styles.wrapperUserInfo}>
                <View style={styles.userInfo}>
                  <Text style={{ fontSize: 16, fontWeight: "400" }}>
                    Date of birth
                  </Text>
                  {profile.dob ? (
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "100",
                      }}
                    >
                      {moment(profile.dob).format("DD-MM-YYYY")}
                    </Text>
                  ) : (
                    <Text style={styles.noticeText}>Please update dob</Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
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

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.pop()}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            colors={[
              { color: Colors.primaryColor, offset: "0.15", opacity: "0.75" },
              { color: Colors.secondaryColor, offset: "1", opacity: "0.8" },
            ]}
            style={{
              marginRight: Sizes.fixPadding - 5.0,
              marginTop: Sizes.fixPadding - 5.0,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>
        <MaskedView
          style={{ flex: 1, height: 28 }}
          maskElement={<Text style={{ ...Fonts.bold22 }}>Profile</Text>}
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
            style={{ flex: 1 }}
          />
        </MaskedView>
        <TouchableOpacity
          onPress={() => {
            navigation.push(Navigate.EDIT_USER_SCREEN, { profile });
          }}
        >
          <Ionicons name="md-create" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 5.0,
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

export default ProfileScreen;
