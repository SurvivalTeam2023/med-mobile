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
import { getAudioRecommendByMentalIdAPI } from "../../api/audio.api";
import { useGetMentalHealthListAPI } from "../../hooks/mentalHealth";
import { CATEGORIES, MENTAL_HEALTH, PLAYLIST } from "../../constants/keyword";
import { useGetPlaylist } from "../../hooks/playlist.hook";
import { SimpleLineIcons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

const trendingCategoriesList = CATEGORIES;

const MusicScreen = ({ navigation }) => {
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
  const {
    data: dataMentalHealth,
    isSuccess: isSuccessMentalHealth,
    isError: isErrorMentalHealth,
    error: errorMentalHealth,
  } = useGetMentalHealthListAPI();
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

  const {
    data: dataGetPlaylist,
    isSuccess: isSuccessGetPlaylist,
    isError: isErrorGetPlaylist,
    error: errorGetPlaylist,
  } = useGetPlaylist();

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
  const myPacks = () => {
    return (
      <View>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>
            Select Mental Health To Listen To Music
          </Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {dataMentalHealth ? (
            dataMentalHealth.map((item, index) => (
              <View
                key={item.id}
                style={{
                  width: "50%", // This makes each item take up 50% of the row width
                  padding: 8, // Add padding between items
                  alignItems: "center", // Center items horizontally
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.push(Navigate.AUDIO_MENTAL_SCREEN, {
                      data: item,
                    });
                  }}
                >
                  <ImageBackground
                    source={{ uri: item.imageUrl }}
                    style={{
                      width: 175,
                      height: 200,
                      borderRadius: 10,
                      overflow: "hidden", // Clip the image to the rounded border
                    }} // Adjust the dimensions as needed>
                  >
                    <View
                      style={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        padding: 4,
                      }}
                    >
                      <Text
                        style={{
                          ...Fonts.whiteColor18SemiBold,
                          textAlign: "left",
                          paddingRight: 8,
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.container}>
              <ActivityIndicator size="small" color="#f8b26a" />
            </View>
          )}
        </View>
      </View>
    );
  };

  const playlist = () => {
    return (
      <View style={{ paddingHorizontal: 2, paddingVertical: 16 }}>
        <View style={{ backgroundColor: "white", borderRadius: 16 }}>
          <View style={styles.titleWrapStyle}>
            <Text style={styles.titleStyle}>Mental Health Playlist</Text>
          </View>
          {dataGetPlaylist ? (
            dataGetPlaylist?.map((playListInfor, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.push(Navigate.PLAYLIST_AUDIO_SCREEN, {
                      playlistId: playListInfor.id,
                    })
                  }
                >
                  <View
                    style={{
                      borderColor: "grey",
                      paddingHorizontal: 10,
                      paddingVertical: 12,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text style={{ ...Fonts.grayColor16SemiBold }}>
                        {index + 1}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{ uri: playListInfor.imageUrl }}
                        style={styles.imagePlaylist}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        marginLeft: 10,
                      }}
                    >
                      <View>
                        <Text style={{ ...Fonts.grayColor16SemiBold }}>
                          {playListInfor.name}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.container}>
              <ActivityIndicator size="small" color="#f8b26a" />
            </View>
          )}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View>
        {header()}
        {trendingCategories()}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 12,
            paddingBottom: Sizes.fixPadding * 15.0,
          }}
        >
          {selectedCategory === MENTAL_HEALTH && myPacks()}
          {selectedCategory === PLAYLIST && playlist()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
  function handleNavigateNowPlayling(audio) {
    dispatch(nowPlayingAction.addAudioToPlayList(audio));
    navigation.push("NowPlaying", { audio });
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
    paddingBottom: 4,
    ...Fonts.grey777714,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  imagePlaylist: {
    width: 125,
    height: 100,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: 110,
    height: 100,
    borderColor: "#004d25",
    borderWidth: 0.2,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  titleStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.colorBold18,
  },
  describeQuizText: {
    ...Fonts.whiteColor16Light,
    width: 300,
    justifyContent: "center",
  },
  titleInfoStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor18Bold,
    textAlign: "center",
  },
  startQuizInfo: {
    paddingVertical: Sizes.fixPadding + 10,
    paddingBottom: 30,
    marginHorizontal: Sizes.fixPadding + 10.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 20.0,
  },
  titleWrapStyle: {
    marginRight: Sizes.fixPadding + 5.0,
    marginLeft: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  },
});

export default MusicScreen;
