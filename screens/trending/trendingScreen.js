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

const { width } = Dimensions.get("window");

const trendingCategoriesList = ["Genre", "Audio", "Quiz"];

const songOptionsList = [
  "Share",
  "Track Details",
  "Add to Playlist",
  "Album",
  "Artist",
  "Set as",
];

const topTrendingsList = [
  {
    id: "1",
    image: require("../../assets/images/songsCoverPicks/coverImage5.png"),
    songName: "Shape of you",
    artist: "Ed shreean",
    plays: "2.5M",
  },
  {
    id: "2",
    image: require("../../assets/images/songsCoverPicks/coverImage6.png"),
    songName: "Waka waka",
    artist: "Shakira",
    plays: "2.2M",
  },
  {
    id: "3",
    image: require("../../assets/images/songsCoverPicks/coverImage7.png"),
    songName: "Let her go",
    artist: "Passenger",
    plays: "2.0M",
  },
  {
    id: "4",
    image: require("../../assets/images/songsCoverPicks/coverImage8.png"),
    songName: "See you again",
    artist: "Wiz khalifa",
    plays: "1.5M",
  },
  {
    id: "5",
    image: require("../../assets/images/songsCoverPicks/coverImage9.png"),
    songName: "Preety Girl",
    artist: "Maggie Lindemann",
    plays: "1.0M",
  },
];

const TrendingScreen = ({ navigation }) => {
  const { data: genreData, isSuccess: isSucessGenre } = useGetGenreList();
  //Recommend audio
  const {
    data: dataAudioList,
    isSuccess: isSuccessAudioList,
    isError: isErrorAudioList,
    error: errorAudioList,
  } = useGetRecommendAudioByQuizResultAPI();
  if (isSuccessAudioList) {
    console.log("Rec audios successful", dataAudioList);
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
        >
          {cornerImage()}
          {header()}
          {trendingCategories()}
          {selectedCategory === "Genre" && genre()}
          {selectedCategory === "Audio" && song()}
          {selectedCategory === "Quiz" && startQuizTitle()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function genre() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.push(Navigate.GENRE_PLAYLIST_SCREEN, {
            genreId: item.id,
          })
        }
      >
        <ImageBackground
          source={{ uri: `${item?.image}` }}
          style={{
            width: 125,
            height: 120.0,
            marginRight: Sizes.fixPadding,
            marginTop: Sizes.fixPadding,
          }}
          borderRadius={Sizes.fixPadding - 5.0}
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(255, 124, 0,0.5)", "rgba(41, 10, 89, 0.5)"]}
            style={{ flex: 1, borderRadius: Sizes.fixPadding - 5.0 }}
          >
            <Text
              style={{
                padding: Sizes.fixPadding - 5.0,
                ...Fonts.whiteColor12Medium,
              }}
            >
              {item.name}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );

    return (
      <View>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Genres </Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
        </View>
        {genreData ? (
          <FlatList
            data={genreData}
            numColumns={3}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 8,
              width: "50%",
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
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
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
                  if (selectedCategory === "Quiz") {
                    navigation.push(Navigate.QUIZ);
                  }
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
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding - 30.0,
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
    ...Fonts.blackColor15Bold,
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
    flex: 1,
    marginVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
  },
  trendingCategoriesStyle: {
    alignItems: "center",
    flex: 1,
    borderRadius: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding - 5.0,
  },
  songNumberWrapStyle: {
    width: 18.0,
    height: 18.0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5.0,
  },
  topTrendingInfoWrapStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
});

export default TrendingScreen;
