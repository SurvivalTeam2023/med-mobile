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
import { useGetRecommendAudioByQuizResultAPI } from "../../hooks/recommend.hook";
import { useGetMentalHealthListAPI } from "../../hooks/mentalHealth";
import {
  useGetFinishedQuizHistoryApi,
  useGetResultByIdApi,
} from "../../hooks/question.hook";
import { getAudioRecommendByMentalIdAPI } from "../../api/audio.api";
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

  //Recommend audio ID
  const {
    data: dataAudioRec,
    isSuccess: isSuccessAudioRec,
    isError: isErrorAudioRec,
    error: errorAudioRec,
  } = useGetRecommendAudioByQuizResultAPI();
  if (isSuccessAudioRec) {
    console.log("Rec audios successful");
  }
  if (isErrorAudioRec) {
    console.log("Rec audios failed", errorAudioRec);
  }

  const mentalData = dataAudioRec?.mentalHealths?.map((e, index) => {
    return {
      id: index + 1,
      point: e.point,
      mentalHealth: e.mentalHealth,
    };
  });
  //Get mental health list
  const {
    data: dataMentalHealth,
    isSuccess: isSuccessMentalHealth,
    isError: isErrorMentalHealth,
    error: errorMentalHealth,
  } = useGetMentalHealthListAPI();
  if (isSuccessMentalHealth) {
    console.log("Get mentalhealth successful");
  }
  if (isErrorMentalHealth) {
    console.log("Rec audios failed", errorMentalHealth);
  }

  const mentalHealth = () => {
    const renderItem = ({ item }) => (
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.push(Navigate.AUDIO_MENTAL_SCREEN, {
              item,
            })
          }
        >
          <SharedElement id={`${item.id}`}>
            <Image
              source={{ uri: `${item.imageUrl}` }}
              style={styles.popularSongImageStyle}
            />
          </SharedElement>
        </TouchableOpacity>
        <View>
          <Text style={styles.infoTextStyle}>{item.name}</Text>
        </View>
      </View>
    );

    return (
      <View style={{ marginTop: Sizes.fixPadding }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>How do you feel?</Text>
        </View>
        {!dataMentalHealth ? (
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
              Loading
            </Text>
          </View>
        ) : dataMentalHealth.length > 0 ? (
          <FlatList
            data={dataMentalHealth}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal={true}
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
            Loading...
          </Text>
        )}
      </View>
    );
  };

  //Recommend audio ID
  const {
    data: dataPlaylist,
    isSuccess: isSuccessPlaylist,
    isError: isErrorPlaylist,
    error: errorPlaylist,
  } = useGetPlaylist();
  if (isSuccessPlaylist) {
    console.log("Rec audios successful");
  }
  if (isErrorPlaylist) {
    console.log("Rec audios failed", errorPlaylist);
  }
  function handleNavigateNowPlayling(audio) {
    dispatch(nowPlayingAction.addAudioToPlayList(audio));
    navigation.push("NowPlaying", { audio });
  }

  function song() {
    const renderItem = ({ item }) => (
      <View>
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
        <View>
          <Text style={styles.infoTextStyle}>{item.name}</Text>
        </View>
      </View>
    );

    return (
      <View style={{ marginTop: Sizes.fixPadding }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Healing Through Sound</Text>

          <Text style={styles.descriptionTextStyle}>
            Audio based on your survey result:
          </Text>
        </View>
        {!quizHistoryData ? (
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
              Please do survey to get recommended audio
            </Text>
          </View>
        ) : quizHistoryData.length > 0 ? (
          <FlatList
            data={quizHistoryData}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal={true}
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
            Please do survey to get recommended audio
          </Text>
        )}
      </View>
    );
  }

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
        {header()}
        {searchField()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
        >
          {mentalHealth()}
          {recommendedInfo()}
          {albumsInfo()}
          {forYouInfo()}

          {recentlyPlayedInfo()}
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
        onPress={() =>
          navigation.push(Navigate.PLAYLIST_AUDIO_SCREEN, {
            playlistId: item.id,
          })
        }
      >
        <SharedElement id={item.id}>
          <Image
            source={{ uri: `${item?.imageUrl}` }}
            style={styles.popularSongImageStyle}
          />
        </SharedElement>
        <Text style={styles.infoTextStyle}>{item?.name}</Text>
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>
            Healing Playlist: Embrace the Journey
          </Text>
        </View>
        {isSuccessPlaylist ? (
          <FlatList
            data={dataPlaylist}
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
            style={styles.popularSongImageStyle}
          />
        </SharedElement>
        <Text style={styles.infoTextStyle}>{item.name}</Text>
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Favorited Playlist</Text>
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
          <Text style={styles.titleStyle}>Favorited Genres</Text>
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
                      style={styles.popularSongImageStyle}
                    />
                  </SharedElement>
                  <View style={{ marginLeft: Sizes.fixPadding }}>
                    <Text style={styles.infoTextStyle}>{item.genre.name}</Text>
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
            style={styles.popularSongImageStyle}
          />
        </SharedElement>
        <Text style={styles.infoTextStyle}>{item.audio.name}</Text>
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>History Listened</Text>
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
        <Image
          source={{ uri: `${item?.image}` }}
          style={styles.popularSongImageStyle}
        ></Image>
        <Text style={styles.infoTextStyle}>{item.name}</Text>
      </TouchableOpacity>
    );

    return (
      <View>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>
            Healing Genres: Music for the Mind
          </Text>
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
          maskElement={
            <Text style={{ ...Fonts.bold22 }}>Healing Companion</Text>
          }
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
          style={{ borderWidth: 2, borderColor: "black", borderRadius: 50 }}
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
  descriptionTextStyle: {
    paddingBottom: 4,
    ...Fonts.light14Italic,
  },
  infoTextStyle: {
    paddingBottom: 4,
    ...Fonts.grey777714,
  },
  headerWrapStyle: {
    flexDirection: "row",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
    alignItems: "center",
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
    marginTop: Sizes.fixPadding,
    marginBottom: 4,
    ...Fonts.colorBold18,
  },
  titleWrapStyle: {
    marginRight: Sizes.fixPadding + 5.0,
    marginLeft: Sizes.fixPadding * 2.0,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  popularSongImageStyle: {
    marginRight: Sizes.fixPadding,
    width: 110,
    height: 100,
    borderColor: "#004d25",
    borderWidth: 0.2,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  recentlyPlayedSongImageStyle: {
    marginRight: Sizes.fixPadding,
    width: 110,
    height: 100,
    borderWidth: 1.5,
    borderColor: "#11823b",
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
