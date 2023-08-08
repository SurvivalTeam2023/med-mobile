import React, { createRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Menu, MenuItem } from "react-native-material-menu";
import { SharedElement } from "react-navigation-shared-element";
import { useGetPlaylist } from "../../hooks/playlist.hook";
import { useGetGenreList } from "../../hooks/genre.hook";
import { Navigate } from "../../constants/navigate";
import { useGetFavoriteGenreAPI } from "../../hooks/favorite.hook";
import {
  useGetAudioListAPI,
  useGetRecentlyPlayHistoryAudioListAPI,
} from "../../hooks/audio.hook";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { nowPlayingAction } from "../../redux/audio/nowPlayingList.slice";

let recentlyPlayedList = null;

let forYouList = [];

let topArtistList = [
  {
    id: "1a",
    image: require("../../assets/images/artist/artist1.png"),
    artistName: "Arijit Singh",
    songsCount: 179,
  },
  {
    id: "2a",
    image: require("../../assets/images/artist/artist2.png"),
    artistName: "Justin Biber",
    songsCount: 250,
  },
  {
    id: "3a",
    image: require("../../assets/images/artist/artist3.png"),
    artistName: "Lady Gaga",
    songsCount: 200,
  },
  {
    id: "4a",
    image: require("../../assets/images/artist/artist1.png"),
    artistName: "Arijit Singh",
    songsCount: 179,
  },
];
//top music

//Random playlist
const ExploreScreen = ({ navigation }) => {
  const userData = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  //Recommend gendre (if user finished their exam)
  const { data: recommendedGenre, isSuccess: isRecommendedGenreSucess } =
    useGetGenreList();

  //Recently played
  const {
    data: dataRecentlyPlay,
    isSuccess: isSuccessRecentlyPlay,
    isError: isErrorRecentlyPlay,
    error: errorRecentlyPlay,
  } = useGetRecentlyPlayHistoryAudioListAPI();

  //Recommend audio
  const {
    data: dataAudioList,
    isSuccess: isSuccessAudioList,
    isError: isErrorAudioList,
    error: errorAudioList,
  } = useGetAudioListAPI();
  //Favorited gendre (first time and user choose and user like gendre)
  const {
    data: dataFavGenre,
    isSuccess: isSuccessFavGenre,
    isError: isErrorFavGenre,
    error: errorFavGenre,
  } = useGetFavoriteGenreAPI();
  //Favorited Playlist
  const { data: playListFavoritedData, isSuccess: isPlayListFavoritedSuccess } =
    useGetPlaylist({
      status: "ACTIVE",
      playListType: "LIKED",
      page: 1,
      limit: 10,
    });

  const { data: allPlayListData } = useGetPlaylist({
    status: "ACTIVE",
    page: 1,
    limit: 10,
  });

  //Random gendre
  const { data: allGendreData, isSuccess: isAllGendreSuccess } =
    useGetGenreList();

  const [state, setState] = useState({
    search: null,
    forYouData: forYouList,
    pauseSong: true,
    showOptions: false,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { showOptions, search } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
        >
          {header()}
          {searchField()}
          {recommendedInfo()}
          {popularSongsInfo()}
          {recentlyPlayedInfo()}
          {forYouInfo()}
          {playListInfo()}
          {albumsInfo()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function topArtistInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("TopArtist", { item })}
      >
        <SharedElement id={item.id}>
          <Image source={item.image} style={styles.topArtistImageStyle} />
        </SharedElement>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 7.0,
            ...Fonts.blackColor12SemiBold,
          }}
        >
          {item.artistName}
        </Text>
        <Text style={{ ...Fonts.grayColor10Medium }}>
          {item.songsCount} songs
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Top Tracks</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
        </View>
        <FlatList
          data={topArtistList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }

  function albumsInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.push("GenreTracks");
        }}
      >
        <SharedElement id={item.id}>
          <Image
            source={{ uri: `${item?.image}` }}
            style={styles.recentlyPlayedSongImageStyle}
          />
        </SharedElement>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 7.0,
            ...Fonts.blackColor12SemiBold,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Genres</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
        </View>
        {isAllGendreSuccess ? (
          <FlatList
            data={allGendreData}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: Sizes.fixPadding * 2.0,
              paddingRight: Sizes.fixPadding,
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

  function playListInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.push("Tracks");
        }}
      >
        <SharedElement id={item.id}>
          <Image
            source={{ uri: `${item?.imageUrl}` }}
            style={styles.recentlyPlayedSongImageStyle}
          />
        </SharedElement>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 7.0,
            ...Fonts.blackColor12SemiBold,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Favorited Playlist</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
        </View>
        {isPlayListFavoritedSuccess ? (
          <FlatList
            data={playListFavoritedData}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: Sizes.fixPadding * 2.0,
              paddingRight: Sizes.fixPadding,
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

  function forYouInfo() {
    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Favorited Genre</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
        </View>
        {isSuccessFavGenre ? (
          dataFavGenre?.map((item) => (
            <View key={`${item.id}`}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  navigation.push(Navigate.GENRE_PLAYLIST_SCREEN, {
                    genreId: item.genreId,
                  })
                }
                style={styles.forYouInfoWrapStyle}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <SharedElement id={item?.genreId}>
                    <Image
                      source={{ uri: `${item.genre.image}` }}
                      style={{
                        width: 50.0,
                        height: 50.0,
                        borderRadius: Sizes.fixPadding - 5.0,
                      }}
                    />
                  </SharedElement>
                  <View style={{ marginLeft: Sizes.fixPadding }}>
                    <Text style={{ ...Fonts.blackColor12SemiBold }}>
                      {item.genre.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.container}>
            <ActivityIndicator size="small" color="#f8b26a" />
          </View>
        )}
      </View>
    );
  }

  function recentlyPlayedInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleNavigateNowPlayling(item)}
      >
        <SharedElement id={item.id}>
          <Image
            source={{ uri: `${item.audio?.imageUrl}` }}
            style={styles.recentlyPlayedSongImageStyle}
          />
        </SharedElement>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 7.0,
            ...Fonts.blackColor12SemiBold,
            width: "90%",
          }}
        >
          {item.audio.name}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Recently Played</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
        </View>
        {!dataRecentlyPlay ? (
          <View style={styles.container}>
            <ActivityIndicator size="small" color="#f8b26a" />
          </View>
        ) : (
          <FlatList
            data={dataRecentlyPlay}
            // keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: Sizes.fixPadding * 2.0,
              paddingRight: Sizes.fixPadding,
            }}
          />
        )}
      </View>
    );
  }

  function handleNavigateNowPlayling(audio) {
    dispatch(nowPlayingAction.addAudioToPlayList(audio));
    navigation.push("NowPlaying", { audio });
  }

  function popularSongsInfo() {
    const renderItem = ({ item }) => (
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
        <Text
          style={{
            marginTop: Sizes.fixPadding - 7.0,
            ...Fonts.blackColor12SemiBold,
            width: "60%",
          }}
        >
          {item.name}
        </Text>
        <Text style={{ ...Fonts.grayColor10Medium }}>
          {item.artist.artist_name}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
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
            <ActivityIndicator size="small" color="#f8b26a" />
          </View>
        ) : (
          <FlatList
            data={dataAudioList}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: Sizes.fixPadding * 2.0,
              paddingRight: Sizes.fixPadding,
            }}
          />
        )}
      </View>
    );
  }

  function recommendedInfo() {
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
          style={{ width: 130.0, height: 120.0, marginRight: Sizes.fixPadding }}
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
          <Text style={styles.titleStyle}>Recommended Genres For You</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
        </View>
        {isRecommendedGenreSucess ? (
          <FlatList
            data={recommendedGenre}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0 }}
          />
        ) : (
          <View style={styles.container}>
            <ActivityIndicator size="small" color="#f8b26a" />
          </View>
        )}
      </View>
    );
  }

  function searchField() {
    const textInputRef = createRef();
    return (
      <View style={styles.searchBarWrapStyle}>
        <TextInput
          ref={textInputRef}
          selectionColor={Colors.grayColor}
          style={{ ...Fonts.grayColor15Medium, flex: 1 }}
          value={search}
          placeholder="Search for artist,song or lyrics..."
          placeholderTextColor={Colors.grayColor}
          onChangeText={(text) => updateState({ search: text })}
        />
        <MaterialIcons
          name="search"
          color={Colors.grayColor}
          size={25}
          onPress={() => {
            if (state["search"] !== null) {
              navigation.push(Navigate.SEARCH, {
                searchValue: state["search"],
              });
            }
            updateState({ search: null });
          }}
        />
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
          style={{ flex: 1 }}
          maskElement={<Text style={{ ...Fonts.bold22 }}>Explore</Text>}
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
              userData?.avatar?.url
                ? { uri: userData?.avatar?.url }
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
  image: {
    width: 40,
    height: 40,
    borderRadius: 90,
  },
  headerWrapStyle: {
    flexDirection: "row",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
  },
  searchFieldWrapStyle: {
    backgroundColor: Colors.lightGrayColor,
    borderRadius: Sizes.fixPadding * 2.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding + 5.0,
    marginTop: Sizes.fixPadding - 30.0,
    paddingVertical: Sizes.fixPadding + 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
  },
  searchBarWrapStyle: {
    backgroundColor: Colors.lightGrayColor,
    borderRadius: Sizes.fixPadding * 2.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
  },
  titleStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.blackColor15Bold,
  },
  titleWrapStyle: {
    marginRight: Sizes.fixPadding + 5.0,
    marginLeft: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  popularSongImageStyle: {
    marginRight: Sizes.fixPadding,
    width: 110,
    height: 100,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  recentlyPlayedSongImageStyle: {
    marginRight: Sizes.fixPadding,
    width: 110,
    height: 100,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  forYouInfoWrapStyle: {
    marginBottom: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  playListImageStyle: {
    alignSelf: "center",
    height: 100,
    borderWidth: 2.0,
    borderColor: Colors.lightGrayColor,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  albumImageWrapStyle: {
    alignSelf: "center",
    backgroundColor: Colors.whiteColor,
    borderWidth: 2.0,
    borderColor: Colors.lightGrayColor,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  topArtistImageStyle: {
    marginRight: Sizes.fixPadding,
    width: 110,
    height: 100,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
  },
});

export default ExploreScreen;
