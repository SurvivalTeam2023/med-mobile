import React, { useState } from "react";
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
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Menu, MenuItem } from "react-native-material-menu";
import { SharedElement } from "react-navigation-shared-element";
import { Navigate } from "../../constants/navigate";
import { useGetGenreList } from "../../hooks/genre.hook";
import { useGetAudioListAPI } from "../../hooks/audio.hook";
import QuizScreen from "../quiz/quizScreen";
import { useGetRecommendAudioByQuizResultAPI } from "../../hooks/recommend.hook";
import { store } from "../../core/store/store";
import { useDispatch, useSelector } from "react-redux";
import { nowPlayingAction } from "../../redux/audio/nowPlayingList.slice";

const { width } = Dimensions.get("window");

const trendingCategoriesList = ["Genre", "Audio", "Quiz"];

const TrendingScreen = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user.data);
  const { data: genreData, isSuccess: isSucessGenre } = useGetGenreList();
  const dispatch = useDispatch();
  //Recommend audio
  const {
    data: dataAudioList,
    isSuccess: isSuccessAudioList,
    isError: isErrorAudioList,
    error: errorAudioList,
  } = useGetRecommendAudioByQuizResultAPI();
  if (isSuccessAudioList) {
    console.log("Rec audios successful");
  }
  if (isErrorAudioList) {
    console.log("Rec audios failed", errorAudioList);
  }

  const [state, setState] = useState({
    selectedCategory: trendingCategoriesList[0],
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { selectedCategory } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        {trendingCategories()}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 12,
            paddingBottom: Sizes.fixPadding * 15.0,
          }}
        >
          {selectedCategory === "Genre" && genre()}
          {selectedCategory === "Audio" && song()}
          {selectedCategory === "Quiz" && startQuizTitle()}
        </ScrollView>
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
                  <ImageBackground
                    source={{ uri: `${item?.image}` }}
                    style={{
                      width: 125,
                      height: 120.0,
                    }}
                    borderRadius={Sizes.fixPadding - 5.0}
                  ></ImageBackground>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  paddingTop: 12,
                  paddingBottom: 8,
                  ...Fonts.light14,
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
          <Text style={styles.titleStyle}>Genres </Text>
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
      <View style={{ flexDirection: "row", marginTop: 8 }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => handleNavigateNowPlayling(item)}
        >
          <SharedElement id={`${item.id}`}>
            <Image
              source={{ uri: `${item.imageUrl}` }}
              style={styles.popularSongImageStyle}
            />
          </SharedElement>
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: "center", marginLeft: 10 }}>
          <Text
            style={{
              ...Fonts.blackColor12SemiBold,
              width: "70%",
            }}
          >
            {item.name}
          </Text>
          <Text style={{ ...Fonts.grayColor10Medium }}>
            {item.artist.artist_name}
          </Text>
        </View>
      </View>
    );

    return (
      <View style={{ marginTop: Sizes.fixPadding }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Audios</Text>
        </View>
        {!dataAudioList ? (
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                fontWeight: "100",
                display: "flex",
                paddingVertical: 8,
              }}
            >
              Please do quiz to get recommended audio
            </Text>
          </View>
        ) : dataAudioList.length > 0 ? (
          <FlatList
            data={dataAudioList}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: Sizes.fixPadding * 2.0,
              paddingRight: Sizes.fixPadding,
            }}
          />
        ) : (
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: "100",
              paddingVertical: 8,
            }}
          >
            Please do quiz to get recommended audio
          </Text>
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
                  colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
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
        <View style={{ marginTop: 44 }}>
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
            style={styles.startQuizInfo}
          >
            <Text style={styles.titleInfoStyle}>Emotion Quiz</Text>
            <View style={{ alignItems: "center", paddingTop: 4 }}>
              <Text style={styles.describeQuizText}>
                Welcome to the Emotion Quiz! This quiz is designed to help you
                gain insight into your emotional landscape and explore the
                complexities of your feelings.
              </Text>
            </View>
          </LinearGradient>
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
        <Pressable
          style={styles.startQuizButtonStyle}
          activeOpacity={0.9}
          onPress={() => {
            navigation.push(Navigate.QUESTION_SCREEN);
          }}
        >
          <LinearGradient
            start={{ x: 1, y: 3 }}
            end={{ x: 0, y: 2 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
            style={styles.startQuizGradientStyle}
          >
            <Text style={{ ...Fonts.whiteColor16Bold }}>Do quiz</Text>
          </LinearGradient>
        </Pressable>
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
        <MaskedView
          style={{ flex: 1, height: 28 }}
          maskElement={<Text style={{ ...Fonts.bold22 }}>Recomendation</Text>}
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
            style={{ flex: 1 }}
          />
        </MaskedView>
        <TouchableOpacity
          onPress={() => navigation.push(Navigate.PROFILE_SCREEN)}
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
      </View>
    );
  }
};

const styles = StyleSheet.create({
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
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
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
    borderRadius: Sizes.fixPadding - 5.0,
  },
  titleStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.blackColor16Bold,
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

export default TrendingScreen;
