import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  View,
  StyleSheet,
  Text,
  Modal,
  Image,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Icon } from "react-native-gradient-icon";
import { Menu, MenuItem } from "react-native-material-menu";
import { SharedElement } from "react-navigation-shared-element";
import { useGetTracksFromPlaylist } from "../../hooks/playlistTracks.hook";
import { BlurView } from "expo-blur";
import { Navigate } from "../../constants/navigate";
import { useGetPlaylisByGenreIdApi } from "../../hooks/playlist.hook";
import { SimpleLineIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

let songOptionsList = [
  "Share",
  "Track Details",
  "Add to Playlist",
  "Album",
  "Artist",
  "Set as",
];

let playlist;
let genreData;
let totalPlaylist;
const sortOptions = ["Name", "Date Added", "Artist"];

const PlaylistGenreScreen = ({ navigation, route }) => {
  const genreId = route.params.genreId;
  console.log(genreId);
  const [state, setState] = useState({
    showSortOptions: false,
    selectedSortCriteria: sortOptions[0],
    pauseSong: true,
  });
  const {
    data: dataGetPlaylistByGenreId,
    isSuccess: isSuccessGetPlaylistByGenreId,
    isError: isErrorGetPlaylistByGenreId,
    error: errorGetPlaylistByGenreId,
  } = useGetPlaylisByGenreIdApi(genreId);

  if (isSuccessGetPlaylistByGenreId) {
    genreData = dataGetPlaylistByGenreId;
    playlist = genreData["playlist"];
    totalPlaylist = playlist.length;
    console.log(playlist);
    console.log("Get Playlist successfully", dataGetPlaylistByGenreId);
  }

  if (isErrorGetPlaylistByGenreId) {
    console.log("Get playlist failed", errorGetPlaylistByGenreId);
  }

  const handleOptionSelect = (option) => {
    switch (option) {
      case "Share":
        console.log("Share option selected");
        break;
      case "Track Details":
        setIsModalVisible(true);
        break;
      case "Add to Playlist":
        console.log("Add to playlist option selected");
        break;
      case "Album":
        console.log("Album option selected");
        break;
      case "Artist":
        console.log("Artist option selected");
        break;
      case "Set as":
        console.log("Set as option selected");
        break;
      default:
        console.log("Invalid option selected");
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { showSortOptions, selectedSortCriteria, pauseSong } = state;
  const genreInfo = () => {
    return (
      <View
        style={{
          backgroundColor: "#eeeeee",
          borderRadius: 10,
          marginTop: 8,
        }}
      >
        <View style={{ paddingHorizontal: 12, paddingVertical: 16 }}>
          <View style={{ backgroundColor: "white", borderRadius: 16 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View style={{ paddingVertical: 12, marginLeft: 8 }}>
                <Image
                  source={{
                    uri: genreData?.image,
                  }}
                  style={styles.image}
                />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "450",
                  }}
                >
                  {genreData?.name}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    fontStyle: "italic",
                    fontWeight: "200",
                  }}
                >
                  {genreData?.desc}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "35%",
                }}
              >
                <SimpleLineIcons
                  name="playlist"
                  size={14}
                  color="black"
                  style={{ marginTop: 4 }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "300",
                    marginLeft: 6,
                  }}
                >
                  {totalPlaylist}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const genrePlaylist = () => {
    return (
      <View style={{ backgroundColor: "#eeeeee", borderRadius: 10 }}>
        <View style={{ paddingHorizontal: 12, paddingVertical: 16 }}>
          <View style={{ backgroundColor: "white", borderRadius: 16 }}>
            {playlist?.map((item, index) => (
              <TouchableOpacity key={index}>
                <View
                  style={{
                    borderColor: "grey",
                    paddingHorizontal: 8,
                    paddingVertical: 12,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text>{index + 1}</Text>
                  </View>
                  <View style={{ marginLeft: 8 }}>
                    <Image
                      source={{ uri: item.imageUrl }}
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
                      <Text style={{ fontSize: 16, fontWeight: "400" }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          marginTop: 2,
                          fontWeight: "200",
                          color: "#808080",
                          fontStyle: "italic",
                        }}
                      >
                        TamPham
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
        >
          {cornerImage()}
          {header()}
          {genreInfo()}
          {genrePlaylist()}
        </ScrollView>
      </View>
      {currentlyPlayedSong()}
    </SafeAreaView>
  );

  function currentlyPlayedSong() {
    return;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.push(Navigate.NOW_PLAYING, { item: { id: "image" } })
        }
        style={styles.currentlyPlayedSongInfoWrapStyle}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SharedElement id="image">
            <Image
              source={require("../../assets/images/songsCoverPicks/coverImage16.png")}
              style={{
                width: 55.0,
                height: 55.0,
                borderRadius: Sizes.fixPadding - 5.0,
              }}
            />
          </SharedElement>
          <View style={{ marginLeft: Sizes.fixPadding }}>
            <Text
              numberOfLines={1}
              style={{
                maxWidth: width / 3.0,
                ...Fonts.blackColor15Bold,
              }}
            >
              Dunya
            </Text>
            <Text style={{ ...Fonts.grayColor11Medium }}>Mahir Skekh</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.forwardBackwardButtonWrapStyle}>
            <MaterialIcons name="arrow-left" size={30} color="black" />
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => updateState({ pauseSong: !pauseSong })}
            style={styles.pausePlayButtonWrapStyle}
          >
            <MaterialIcons
              name={pauseSong ? "pause" : "play-arrow"}
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <View style={styles.forwardBackwardButtonWrapStyle}>
            <MaterialIcons name="arrow-right" size={30} color="black" />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  function tracks() {
    const CustomMenu = ({ item }) => {
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
        <View>
          <Modal
            visible={isModalVisible}
            animationType="fade"
            transparent={true}
          >
            <BlurView intensity={200} style={StyleSheet.absoluteFill}>
              <View style={styles.modalContainer}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Track Details</Text>
                </View>
                <Text style={styles.headerSubtext}>Track Name</Text>
                <Text>{item?.name}</Text>
                <Text style={styles.headerSubtext}>Artist</Text>
                <Text>{item?.artist.artist_name}</Text>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                  }}
                >
                  <MaterialCommunityIcons
                    name="close-circle-outline"
                    size={32}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </BlurView>
          </Modal>
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
            {songOptionsList.map((item, index) => (
              <View key={`${index}`}>
                <MenuItem
                  pressColor="transparent"
                  style={{ height: 30.0 }}
                  textStyle={{
                    marginRight: Sizes.fixPadding * 5.0,
                    ...Fonts.blackColor12SemiBold,
                  }}
                  onPress={() => {
                    hideMenu();
                    handleOptionSelect(item);
                  }}
                >
                  {item}
                </MenuItem>
              </View>
            ))}
          </Menu>
        </View>
      );
    };

    return playlist?.map((item) => (
      <View key={`${item.id}`}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.push(Navigate.PLAYLIST_AUDIO_SCREEN, { item })
          }
          style={styles.tracksInfoWrapStyle}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SharedElement id={item?.id}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={[
                  "rgba(255, 124, 0,0.9)",
                  "rgba(255, 124, 0,0.7)",
                  "rgba(255, 124, 0,0.4)",
                  "rgba(41, 10, 89, 0.9)",
                ]}
                style={styles.musicIconWrapStyle}
              >
                <MaterialIcons
                  name="music-note"
                  color={Colors.whiteColor}
                  size={24}
                />
              </LinearGradient>
            </SharedElement>
            <View style={{ marginLeft: Sizes.fixPadding }}>
              <Text style={{ ...Fonts.blackColor13SemiBold }}>
                {item?.name}
              </Text>
              <Text style={{ ...Fonts.grayColor11Medium }}>
                {item?.artist.artist_name}
              </Text>
            </View>
          </View>

          <CustomMenu item={item} />
        </TouchableOpacity>
      </View>
    ));
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
          <MaterialIcons
            name="shuffle"
            size={20}
            color="black"
            style={{ marginRight: Sizes.fixPadding }}
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
        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.pop()}
          >
            <MaterialIcons
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
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
            maskElement={<Text style={{ ...Fonts.bold22 }}>Playlist</Text>}
          >
            <LinearGradient
              start={{ x: 1, y: 0.2 }}
              end={{ x: 1, y: 1 }}
              colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </View>
        <MaterialIcons
          name="search"
          size={20}
          style={{ alignSelf: "flex-end" }}
          onPress={() => navigation.push(Navigate.SEARCH)}
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
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding - 40.0,
    justifyContent: "space-between",
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
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 80,
  },
  imagePlaylist: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    margin: 40,
    height: 269.0,
    alignSelf: "center",
    position: "absolute",
    left: 0.0,
    right: 0.0,
    bottom: "30%",
    elevation: 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: 22.5,
    borderColor: "#DFDFDF",
    borderWidth: 0.5,
    marginHorizontal: Sizes.fixPadding + 5.0,
  },
  header: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 0,
  },
  headerSubtext: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
});

export default PlaylistGenreScreen;
