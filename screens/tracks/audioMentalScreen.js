import React, { createRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { SharedElement } from "react-navigation-shared-element";
import { Menu, MenuItem } from "react-native-material-menu";
import { Icon } from "react-native-gradient-icon";
import { audioArtistAction } from "../../redux/audio/audioArtist";
import { store } from "../../core/store/store";
import { Navigate } from "../../constants/navigate";
import { useGetPlaylistByIdApi } from "../../hooks/playlist.hook";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { nowPlayingAction } from "../../redux/audio/nowPlayingList.slice";
import { useGetAudioRecommendByMentalIdAPI } from "../../hooks/audio.hook";
import {
  useGetFinishedQuizHistoryApi,
  useGetResultByIdApi,
} from "../../hooks/question.hook";

const AudioMentalScreen = ({ navigation, route }) => {
  let tracksList;
  const userInfo = useSelector((state) => state.user.data);
  const mentalDetail = route?.params.data;
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
        console.log(latestItem);
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
    console.log("get result success", resultDetailData);
  }

  const sortOptions = ["Name", "Date Added", "Artist"];
  const { data, isSuccess, isError, error } = useGetAudioRecommendByMentalIdAPI(
    mentalDetail?.id
  );
  if (isSuccess) {
    tracksList = data["audios"];
    console.log("Success get audio");
  }
  if (isError) {
    console.log("Errot get audio", error);
  }
  const dispatch = useDispatch();
  const [state, setState] = useState({
    search: "",
    showSortOptions: false,
    selectedSortCriteria: sortOptions[0],
    pauseSong: true,
    name: null,
  });
  const handleSelectAudio = (audio) => {
    dispatch(nowPlayingAction.addAudioToPlayList(audio));
    navigation.push(Navigate.NOW_PLAYING);
  };
  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { showSortOptions, selectedSortCriteria, search } = state;
  const degree = () => {
    return (
      <View style={styles.titleWrapStyle}>
        {resultDetailData?.map((e) => (
          <Text style={styles.titleStyle} key={e.degree}>
            Mental Health Degree: {e.degree}
          </Text>
        ))}
        <Text
          style={{
            paddingBottom: 36,
            ...Fonts.whiteColor14Light,
            textAlign: "center",
          }}
        >
          Audios based on your mental health
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <View style={{ flex: 1 }}>
        {header()}

        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient
            start={{ x: 1.1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={["rgb(120,240,250)", "rgb(3,38,95)"]}
            style={styles.startQuizInfo}
          >
            {degree()}
            <View style={{ paddingHorizontal: 16 }}>{tracks()}</View>
          </LinearGradient>
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function tracks() {
    const CustomMenu = ({ id }) => {
      var _menu = null;

      const setMenuRef = (ref) => {
        _menu = ref;
      };

      const hideMenu = () => {
        _menu.hide();
      };

      const showMenu = () => {
        _menu.show();
      };

      return (
        <Menu
          ref={setMenuRef}
          anchor={
            <MaterialIcons
              name="more-vert"
              color={Colors.grayColor}
              size={20}
              onPress={showMenu}
            />
          }
          style={{
            paddingTop: Sizes.fixPadding,
            backgroundColor: Colors.whiteColor,
          }}
        >
          <View>
            <MenuItem
              pressColor="transparent"
              style={{ height: 30.0 }}
              textStyle={{
                marginRight: Sizes.fixPadding * 5.0,
                ...Fonts.blackColor12SemiBold,
              }}
              onPress={() => {}}
            >
              Edit
            </MenuItem>
            <MenuItem
              pressColor="transparent"
              style={{ height: 30.0 }}
              textStyle={{
                marginRight: Sizes.fixPadding * 5.0,
                ...Fonts.blackColor12SemiBold,
              }}
              onPress={() => {}}
            >
              Delete
            </MenuItem>
          </View>
        </Menu>
      );
    };
    if (search !== null) {
      tracksList = tracksList?.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return tracksList && tracksList.length > 0 ? (
      tracksList.map((item, index) => (
        <View key={item.id} style={styles.tracksInfoWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleSelectAudio(item)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <SharedElement id={item?.id}>
                <ImageBackground
                  source={{ uri: `${item?.imageUrl}` }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 90,
                    overflow: "hidden",
                  }}
                  borderRadius={Sizes.fixPadding - 5.0}
                ></ImageBackground>
              </SharedElement>
              <View style={{ marginLeft: 16 }}>
                <Text style={{ ...Fonts.whiteColor14Light }}>{item?.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <AntDesign name="play" size={24} color="black" />
        </View>
      ))
    ) : (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#f8b26a" />
      </View>
    );
  }

  function sortingIcons() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding + 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Menu
          visible={showSortOptions}
          style={styles.sortingOptionsWrapStyle}
          anchor={
            <MaterialIcons
              name="menu"
              color={Colors.blackColor}
              size={20}
              onPress={() => updateState({ showSortOptions: true })}
            />
          }
          onRequestClose={() => updateState({ showSortOptions: false })}
        >
          {sortOptions.map((item, index) => (
            <View key={`${index}`}>
              {selectedSortCriteria == item ? (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    updateState({
                      selectedSortCriteria: item,
                      showSortOptions: false,
                    })
                  }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom:
                      sortOptions.length - 1 == index
                        ? 0.0
                        : Sizes.fixPadding + 5.0,
                  }}
                >
                  <MaskedView
                    style={{ flex: 0.5 }}
                    maskElement={
                      <Text
                        numberOfLines={1}
                        style={{ ...Fonts.blackColor12SemiBold }}
                      >
                        {item}
                      </Text>
                    }
                  >
                    <LinearGradient
                      start={{ x: 1, y: 0.2 }}
                      end={{ x: 1, y: 1 }}
                      colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
                    >
                      <Text style={[{ opacity: 0 }]} />
                    </LinearGradient>
                  </MaskedView>
                  <Icon
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    size={15}
                    mode="linear"
                    colors={[
                      {
                        color: Colors.primaryColor,
                        offset: "0.15",
                        opacity: "0.75",
                      },
                      {
                        color: Colors.secondaryColor,
                        offset: "1",
                        opacity: "0.8",
                      },
                    ]}
                    style={{ marginLeft: Sizes.fixPadding * 2.0 }}
                    name="check"
                    type="material"
                  />
                </TouchableOpacity>
              ) : (
                <Text
                  onPress={() =>
                    updateState({
                      selectedSortCriteria: item,
                      showSortOptions: false,
                    })
                  }
                  style={{
                    marginBottom:
                      sortOptions.length - 1 == index
                        ? 0.0
                        : Sizes.fixPadding + 5.0,
                    ...Fonts.blackColor12SemiBold,
                  }}
                >
                  {item}
                </Text>
              )}
            </View>
          ))}
        </Menu>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="add-outline"
            size={20}
            color="black"
            style={{ marginRight: Sizes.fixPadding }}
            onPress={() => {
              navigation.push("CreateAudioArtist");
            }}
          />
          <MaterialCommunityIcons
            name="arrow-right-drop-circle"
            size={20}
            color="black"
          />
        </View>
      </View>
    );
  }

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
            {mentalDetail.name}
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
  searchFieldWrapStyle: {
    backgroundColor: Colors.lightGrayColor,
    borderRadius: Sizes.fixPadding * 2.5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  startQuizInfo: {
    paddingVertical: Sizes.fixPadding + 10,
    paddingBottom: 30,
    height: "100%",
  },
  headerWrapStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  musicIconWrapStyle: {
    width: 35.0,
    height: 35.0,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  tracksInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    borderRadius: 90,
    paddingVertical: 8,
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sortingOptionsWrapStyle: {
    paddingTop: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
    width: 190.0,
  },
  forwardBackwardButtonWrapStyle: {
    width: 35.0,
    backgroundColor: Colors.whiteColor,
    height: 35.0,
    borderRadius: 17.5,
    borderColor: "#DFDFDF",
    borderWidth: 0.5,
    elevation: 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
  pausePlayButtonWrapStyle: {
    width: 45.0,
    height: 45.0,
    backgroundColor: Colors.whiteColor,
    borderRadius: 22.5,
    borderColor: "#DFDFDF",
    borderWidth: 0.5,
    elevation: 2.0,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding + 5.0,
  },
  currentlyPlayedSongInfoWrapStyle: {
    position: "absolute",
    left: 0.0,
    right: 0.0,
    bottom: 0.0,
    backgroundColor: Colors.whiteColor,
    elevation: 5.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Sizes.fixPadding * 2.0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ECECEC",
    borderRadius: 20,
    padding: 50,
    paddingHorizontal: 70,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  titleWrapStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
  },
  titleStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor18SemiBold,
    textAlign: "center",
  },
});

export default AudioMentalScreen;
