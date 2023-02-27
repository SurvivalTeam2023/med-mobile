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
  Image,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Icon } from "react-native-gradient-icon";
import { Menu, MenuItem } from "react-native-material-menu";
import { SharedElement } from "react-navigation-shared-element";
import { useGetTracksFromPlaylist } from "../../hooks/playlistTracks.hook";

const { width } = Dimensions.get("window");

let songOptionsList = [
  "Share",
  "Track Details",
  "Add to Playlist",
  "Album",
  "Artist",
  "Set as",
];

let tracksList = [
  {
    id: "1",
    songName: "Leave Me Lonely",
    artist: "Ariana Grande",
  },
  {
    id: "2",
    songName: "There's Nothing Holdin' Me Back",
    artist: "Shawn Menders",
  },
  {
    id: "3",
    songName: "Yeh Dosti Hum Nahi Todenge",
    artist: "Kishore Kumar And RD Barman",
  },
  {
    id: "4",
    songName: "Bhanware Ki Gunjan",
    artist: "Kishore Kumar",
  },
  {
    id: "5",
    songName: "Dangerous Woman",
    artist: "Ariana Grande",
  },
  {
    id: "6",
    songName: "Party Rock Anthem",
    artist: "GoonRock",
  },
  {
    id: "7",
    songName: "What Makes You Beautiful",
    artist: "One Direction",
  },
  {
    id: "8",
    songName: "Neele Neele Ambar Par",
    artist: "Kishore Kumar",
  },
  {
    id: "9",
    songName: "Rim Jhim Gire Sawan",
    artist: "Hasrat Jaipuri",
  },
  {
    id: "10",
    songName: "Aate Jaate Khoobsurat Awara Sadko",
    artist: "Kishore Kumar",
  },
  {
    id: "11",
    songName: "Leave Me Lonely",
    artist: "Ariana Grande",
  },
  {
    id: "12",
    songName: "There's Nothing Holdin' Me Back",
    artist: "Shawn Menders",
  },
  {
    id: "13",
    songName: "Dangerous Woman",
    artist: "Ariana Grande",
  },
  {
    id: "14",
    songName: "Aate Jaate Khoobsurat Awara Sadko",
    artist: "Kishore Kumar",
  },
  {
    id: "15",
    songName: "Party Rock Anthem",
    artist: "GoonRock",
  },
];

const sortOptions = ["Name", "Date Added", "Artist"];

const artistTracksScreen = ({ navigation }) => {
  const [state, setState] = useState({
    showSortOptions: false,
    selectedSortCriteria: sortOptions[0],
    pauseSong: true,
  });

  const {
    data: dataTracksFromPlaylist,
    isSuccess: successTracksFromPlaylist,
    isError: isErrorTracksFromPlaylist,
    error: errorTracksFromPlaylist,
  } = useGetTracksFromPlaylist();

  if (successTracksFromPlaylist) {
    tracksList = dataTracksFromPlaylist["data"].items;
    console.log("dataListtrack", tracksList);
  }
  if (isErrorTracksFromPlaylist) {
    console.log("errorTrack", errorTracksFromPlaylist);
  }

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { showSortOptions, selectedSortCriteria, pauseSong } = state;

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
          {sortingIcons()}
          {tracks()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function tracks() {
    const CustomMenu = () => {
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
          {songOptionsList.map((item, index) => (
            <View key={`${index}`}>
              <MenuItem
                pressColor="transparent"
                style={{ height: 30.0 }}
                textStyle={{
                  marginRight: Sizes.fixPadding * 5.0,
                  ...Fonts.blackColor12SemiBold,
                }}
                onPress={hideMenu}
              >
                {item}
              </MenuItem>
            </View>
          ))}
        </Menu>
      );
    };

    return tracksList.map((item) => (
      <View key={`${item.id}`}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.push("NowPlaying", { item })}
          style={styles.tracksInfoWrapStyle}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SharedElement id={item.id}>
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
              <Text style={{ ...Fonts.blackColor13SemiBold }}>{item.name}</Text>
              <Text style={{ ...Fonts.grayColor11Medium }}>{item.artist}</Text>
            </View>
          </View>
          <CustomMenu />
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
            <Icon
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              size={30}
              mode="linear"
              colors={[
                { color: Colors.primaryColor, offset: "0.15", opacity: "0.75" },
                { color: Colors.secondaryColor, offset: "1", opacity: "0.8" },
              ]}
              style={{
                marginRight: Sizes.fixPadding - 5.0,
                marginTop: Sizes.fixPadding - 5.0,
                alignSelf: "center",
              }}
              name="keyboard-arrow-left"
              type="material"
            />
          </TouchableOpacity>
          <MaskedView
            style={{ flex: 1, height: 28 }}
            maskElement={<Text style={{ ...Fonts.bold22 }}>Tracks</Text>}
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
          onPress={() => navigation.push("Search")}
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
});

export default artistTracksScreen;
