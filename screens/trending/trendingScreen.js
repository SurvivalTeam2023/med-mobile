import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Pressable,
  ActivityIndicator,
  Modal,
  Button,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { SharedElement } from "react-navigation-shared-element";
import { Navigate } from "../../constants/navigate";
import { useGetGenreList } from "../../hooks/genre.hook";
import { useGetRecommendAudioByQuizResultAPI } from "../../hooks/recommend.hook";
import { useDispatch, useSelector } from "react-redux";
import { nowPlayingAction } from "../../redux/audio/nowPlayingList.slice";
import {
  useGetFinishedQuizHistoryApi,
  useGetResultByIdApi,
} from "../../hooks/question.hook";
import { AntDesign } from "@expo/vector-icons";

import { getAudioRecommendByMentalIdAPI } from "../../api/audio.api";
import { SimpleLineIcons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

const trendingCategoriesList = ["Song", "Survey"];

const TrendingScreen = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user.data);
  const [value, setValue] = useState([]);

  //Get quiz History
  const {
    data: quizHistoryData,
    isSuccess: isSuccessQuizHistory,
    isError: isErrorQuizHistory,
    error: errorQuizHistory,
  } = useGetFinishedQuizHistoryApi(userInfo.id);
  if (isSuccessQuizHistory) {
    console.log("History quiz call success");
  }
  if (isErrorQuizHistory) {
    console.log("History quiz call failed", errorQuizHistory);
  }

  // Sort the array based on createdAt timestamps in descending order
  let latestItem;
  const getLatestQuiz = () => {
    try {
      if (quizHistoryData) {
        quizHistoryData?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        latestItem = quizHistoryData[0];
      }
    } catch (error) {
      console.log("sorting failed");
    }
  };

  // Get the first item (latest) after sorting
  getLatestQuiz();

  const {
    data: resultDetailData,
    isSuccess: isSuccessResultDetail,
    isError: isErrorResultDetail,
    error: errorResultDetail,
  } = useGetResultByIdApi(latestItem?.id);

  if (isSuccessResultDetail) {
    console.log("get result success");
  }

  useEffect(() => {
    let data;
    const getAudioMental = async () => {
      try {
        if (resultDetailData) {
          let responses = [];

          for (const item of resultDetailData) {
            const response = await getAudioRecommendByMentalIdAPI(item.id);
            responses.push(response);
          }
          data = responses;
          setValue(responses);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getAudioMental();
  }, [resultDetailData]);
  // console.log(audioMental);
  const { data: genreData, isSuccess: isSucessGenre } = useGetGenreList();
  const dispatch = useDispatch();
  //Recommend audio
  const {
    data: dataAudioList,
    isSuccess: isSuccessAudioList,
    isError: isErrorAudioList,
    error: errorAudioList,
  } = useGetRecommendAudioByQuizResultAPI();

  const [state, setState] = useState({
    selectedCategory: trendingCategoriesList[0],
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { selectedCategory } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View>
        {header()}
        <LinearGradient
          start={{ x: 1.1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgb(120,240,250)", "rgb(3,38,95)"]}
          style={styles.startQuizInfo}
        >
          {trendingCategories()}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 12,
              paddingHorizontal: Sizes.fixPadding * 6,
            }}
          >
            {selectedCategory === "Song" && song()}
            {selectedCategory === "Survey" && startQuizTitle()}
          </ScrollView>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
  function handleNavigateNowPlayling(audio) {
    dispatch(nowPlayingAction.addAudioToPlayList(audio));
    navigation.push("NowPlaying", { audio });
  }

  function genre() {
    const renderItem = ({ item }) => (
      <View
        style={{
          backgroundColor: "#eeeeee",
          borderRadius: 8,
        }}
      >
        <View style={{ paddingHorizontal: 8, paddingVertical: 8 }}>
          <View style={{ backgroundColor: "white", borderRadius: 4 }}>
            <View style={{ paddingHorizontal: 8 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    navigation.push(Navigate.GENRE_PLAYLIST_SCREEN, {
                      genreId: item.id,
                    })
                  }
                  style={{ paddingTop: 12, alignItems: "center" }}
                >
                  <Text
                    style={{
                      paddingTop: 12,
                      paddingBottom: 8,
                      ...Fonts.grey5555Color15SemiBold,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Image
                    source={{ uri: `${item?.image}` }}
                    style={{
                      width: 125,
                      height: 120.0,
                      borderWidth: 0.2,
                      borderColor: "#11823b",
                      borderRadius: "5",
                    }}
                  ></Image>
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  paddingTop: 12,
                  paddingBottom: 8,
                  ...Fonts.grey4444,
                }}
              >
                {item.desc}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );

    return (
      <View>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Healing Genres </Text>
        </View>

        {genreData ? (
          <FlatList
            data={genreData}
            numColumns={1}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 8,
              width: "100%",
            }}
          />
        ) : (
          <View style={styles.container}>
            <ActivityIndicator size="small" color="#f8b26a" />
          </View>
        )}
      </View>
    );
  }

  function song() {
    const renderItem = ({ item }) => (
      <View style={{ marginTop: 8 }}>
        <Text
          style={{
            paddingBottom: 36,
            ...Fonts.whiteColor20Light,
            textAlign: "center",
          }}
        >
          {item.mentalHealth}
        </Text>
        {item?.audios?.map((e) => (
          <View key={e?.id}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleNavigateNowPlayling(e)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 16,
                borderRadius: 50,
                paddingVertical: 10,
                borderColor: "black",
                borderWidth: 1,
                marginBottom: Sizes.fixPadding * 2,
                // Android shadow
                elevation: 5, // Adjust the elevation value as needed
                // iOS shadow
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 5,
              }}
            >
              <SharedElement id={`${e?.id}`}>
                <Image
                  source={{ uri: `${e?.imageUrl}` }}
                  style={styles.popularSongImageStyle}
                />
              </SharedElement>
              <View
                style={{ flex: 1, justifyContent: "center", marginLeft: 10 }}
              >
                <Text style={styles.infoTextStyle}>{e?.name}</Text>
              </View>
              <AntDesign name="play" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );

    return (
      <View style={{ marginTop: Sizes.fixPadding }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>
            Audios based on your survey's result
          </Text>
        </View>
        {!value ? (
          <Text
            style={{
              ...Fonts.whiteColor18SemiBold,
              textAlign: "center",
              paddingVertical: 8,
            }}
          >
            Please do a survey to get recommended audio
          </Text>
        ) : value?.length > 0 ? (
          <FlatList
            data={value}
            keyExtractor={(item) => `${item.mentalHealth}`}
            renderItem={renderItem}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <View style={styles.container}>
            <ActivityIndicator size="small" color="#f8b26a" />
          </View>
        )}
      </View>
    );
  }

  function trendingCategories() {
    return (
      <View style={styles.trendingCategoriesWrapStyle}>
        {trendingCategoriesList.map((item, index) => (
          <View style={{ flex: 1 }} key={`${index}`}>
            {selectedCategory == item ? (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  updateState({ selectedCategory: item });
                }}
              >
                <LinearGradient
                  key={`${index}`}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
                  style={{
                    marginRight:
                      trendingCategoriesList.length - 1 == index
                        ? 0.0
                        : Sizes.fixPadding,
                    ...styles.trendingCategoriesStyle,
                  }}
                >
                  <Text numberOfLines={1} style={{ ...Fonts.whiteColor15Bold }}>
                    {item}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedCategory: item })}
                style={{
                  ...styles.trendingCategoriesStyle,
                  backgroundColor: "#E8E8E8",
                  marginRight:
                    trendingCategoriesList.length - 1 == index
                      ? 0.0
                      : Sizes.fixPadding,
                }}
              >
                <Text numberOfLines={1} style={{ ...Fonts.grayColor15Bold }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    );
  }

  function startQuizTitle() {
    // Check if userInfo.dob has data
    const hasDobData = !!userInfo.dob;

    if (hasDobData) {
      return (
        <View style={{ height: "100%" }}>
          <Text style={styles.titleInfoStyle}>Emotion Survey</Text>
          <View style={{ alignItems: "center", paddingTop: 4 }}>
            <Text style={styles.describeQuizText}>
              Welcome to the Emotion Survey! This quiz is designed to help you
              gain insight into your emotional landscape and explore the
              complexities of your feelings.
            </Text>
            <ImageBackground
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/5336/5336520.png",
              }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 10,
                overflow: "hidden",
              }}
            ></ImageBackground>
          </View>
          {startQuizBtn()}
        </View>
      );
    } else {
      // Render the Text element if userInfo.dob does not have data
      return (
        <View>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: "100",
              paddingVertical: 8,
            }}
          >
            No quiz available. Please provide your date of birth in Profile.
          </Text>
        </View>
      );
    }
  }

  function startQuizBtn() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.push(Navigate.QUESTION_SCREEN);
          }}
          style={styles.btn}
        >
          <LinearGradient
            start={{ x: 1, y: 3 }}
            end={{ x: 0, y: 1 }}
            colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
            style={{ borderRadius: 10 }}
          >
            <Text style={styles.btnText}>Getting started</Text>
          </LinearGradient>
        </TouchableOpacity>
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
        <Text style={{ ...Fonts.grayColor18SemiBold, alignContent: "center" }}>
          {userInfo?.username}'s Space
        </Text>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.push(Navigate.PROFILE_SCREEN)}
            style={{
              borderWidth: 2,
              borderColor: "black",
              borderRadius: 50,
            }}
          >
            <Image
              source={
                userInfo?.avatar?.url
                  ? { uri: userInfo?.avatar?.url }
                  : { uri: "https://e-s-center.kz/images/articles/123123.png" }
              }
              style={styles.image}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.push(Navigate.SETTING_SCREEN);
            }}
          >
            <SimpleLineIcons
              name="menu"
              size={18}
              color="black"
              style={{ paddingTop: 12, paddingLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  infoTextStyle: {
    ...Fonts.whiteColor14Light,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },
  btnText: {
    ...Fonts.whiteColor18SemiBold,
    borderWidth: 1,
    borderColor: Colors.greenDarkColor,
    paddingVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 36,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  clockContainer: {
    flex: 1,
    backgroundColor: "#9CAF88",
    width: 150,
    height: 150,
    borderRadius: 90,
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 20, // Adjust the elevation value as needed
      },
    }),
  },
  clockText: {
    display: "flex",
    textAlign: "center",
    alignContent: "center",
    ...Fonts.grayColor24SemiBold,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  colorDot: {
    borderRadius: "50%",
    backgroundColor: "red", // You can change the color here
    marginRight: 8, // Adjust this value as needed
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 90,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginVertical: Sizes.fixPadding * 25,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    width: 300,
    height: 50,
    borderWidth: 1, // Add border width
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    marginBottom: 12,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  headerWrapStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    padding: 8,
    borderBottomWidth: 0.5,
  },
  startQuizGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 20.0,
    marginTop: Sizes.fixPadding - 40.0,
  },
  popularSongImageStyle: {
    marginRight: Sizes.fixPadding,
    width: 65,
    height: 65,
    borderColor: "#004d25",
    borderWidth: 0.5,
    borderRadius: 50,
    overflow: "hidden",
  },
  titleStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor18SemiBold,
    textAlign: "center",
  },
  describeQuizText: {
    ...Fonts.whiteColor16Light,
    textAlign: "center",
    paddingHorizontal: 36,
    justifyContent: "center",
    paddingBottom: 20,
  },
  titleInfoStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor30Bold,
    textAlign: "center",
  },
  startQuizInfo: {
    paddingVertical: Sizes.fixPadding,
    paddingBottom: 30,
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
  },
  titleWrapStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
  },
  startQuizButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 10.0,
    marginHorizontal: Sizes.fixPadding * 10.0,
    borderRadius: Sizes.fixPadding - 4.0,
  },
  trendingCategoriesWrapStyle: {
    marginVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
  },
  trendingCategoriesStyle: {
    alignItems: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingVertical: 8,
    borderWidth: 0.2,
  },
});

export default TrendingScreen;
