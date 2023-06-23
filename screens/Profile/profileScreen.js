import React, { useState } from "react";
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
import MaskedView from "@react-native-masked-view/masked-view";
import { useGetUserProfile } from "../../hooks/user.hook";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import { Menu, MenuItem } from "react-native-material-menu";
import { getUserFromDb } from "../../utils/app.util";
import { Navigate } from "../../constants/navigate";

let profile = [];
const ProfileScreen = ({ navigation }) => {
  const [showOptions, setShowOptions] = useState(false);
  const userAvatar = getUserFromDb()?.avatar?.url || {};
  const userFirstName = getUserFromDb()?.firstName || "none";
  const formatNumber = (number) => {
    if (number >= 1e9) {
      return (number / 1e9).toFixed(1) + "B";
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(1) + "M";
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(1) + "K";
    }
    return number?.toString();
  };

  const { data, isSuccess, isError, error } = useGetUserProfile();

  if (isSuccess) {
    console.log(data);
    profile = data["data"];
  }
  if (isError) {
    console.log("error", error);
  }
  const favoritedCount = formatNumber(profile?.favorite);
  const playlistCount = formatNumber(profile?.playlist);
  const followingCount = formatNumber(profile?.following);
  let playlist = profile?.publicPlaylist;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <>
              {cornerImage()}
              {header()}
              {Profile()}
              {publicPlaylists()}
              {Following()}
            </>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
        />
      </View>
    </SafeAreaView>
  );

  function publicPlaylists() {
    const renderItem = ({ item }) => (
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.push(Navigate.TRACK)}
          style={styles.recentlyPalyedSongImageStyle}
        >
          <SharedElement id={item.id}>
            <Image
              source={{ uri: `${item?.imageUrl}` }}
              style={styles.recentlyPalyedSongImageStyle}
            />
          </SharedElement>
        </TouchableOpacity>
        <Text
          style={{
            ...Fonts.blackColor12SemiBold,
            marginTop: Sizes.fixPadding - 7.0,
          }}
        >
          {item.name}
        </Text>
      </View>
    );
    return (
      <View style={styles.publicPlaylists}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Playlists</Text>
          <Menu
            visible={showOptions}
            style={{ backgroundColor: Colors.whiteColor }}
            anchor={
              <MaterialIcons
                name="more-vert"
                size={24}
                color={Colors.blackColor}
                style={{ alignSelf: "flex-end" }}
                onPress={() => setShowOptions(true)}
              />
            }
            onRequestClose={() => setShowOptions(false)}
          >
            <MenuItem
              pressColor="transparent"
              textStyle={{
                marginRight: Sizes.fixPadding * 3.0,
                ...Fonts.blackColor12SemiBold,
              }}
              onPress={() => {
                updateState({ showOptions: false }),
                  navigation.push("CreatePlaylistUser");
              }}
            >
              Add New Album
            </MenuItem>
            <MenuItem
              pressColor="transparent"
              textStyle={{
                marginRight: Sizes.fixPadding * 3.0,
                ...Fonts.blackColor12SemiBold,
              }}
              onPress={() => {
                updateState({ showOptions: false }),
                  navigation.push("DeletePlaylistUser");
              }}
            >
              Delete Album
            </MenuItem>
          </Menu>
        </View>

        <FlatList
          data={playlist}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  function Following() {
    const renderItem = ({ item, index }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push(Navigate.TRACK)}
        style={styles.recentlyPalyedSongImageStyle}
      >
        <Image
          source={item.image}
          style={{
            width: "100%",
            height: 160.0,
            borderRadius: Sizes.fixPadding - 5.0,
          }}
        />
        <Text
          style={{
            marginTop: Sizes.fixPadding - 7.0,
            ...Fonts.blackColor12SemiBold,
          }}
        >
          {item.libraryFor}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View style={styles.publicPlaylists}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Following</Text>
        </View>
        <FlatList
          data={profile}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  function Profile() {
    return (
      <View style={styles.container}>
        <View style={styles.rect}>
          <View style={styles.imageRow}>
            <Image
              source={{
                uri: `${userAvatar}`,
              }}
              resizeMode="contain"
              style={styles.image}
            ></Image>
            <Text style={styles.name}>{userFirstName}</Text>
          </View>
          <View style={styles.detailWrapper}>
            <View>
              <Text style={styles.detailedText}>Favorited</Text>
              <Text>{favoritedCount}</Text>
            </View>
            <View>
              <Text style={styles.detailedText}>Playlist</Text>
              <Text>{playlistCount}</Text>
            </View>
            <View>
              <Text style={styles.detailedText}>Following</Text>
              <Text>{followingCount}</Text>
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
            navigation.push(Navigate.EDIT_SCREEN);
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
    marginTop: Sizes.fixPadding - 30.0,
    marginBottom: Sizes.fixPadding + 5.0,
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
    width: 100,
    height: 121,
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 2,
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
