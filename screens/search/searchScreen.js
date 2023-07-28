import React, { useState, createRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  StatusBar,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useGetAudioListByNameAPI } from "../../hooks/audio.hook";
import { useGetPlaylistByNameApi } from "../../hooks/playlist.hook";
import { SharedElement } from "react-navigation-shared-element";
import { ImageBackground } from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Navigate } from "../../constants/navigate";

const SearchScreen = ({ navigation, route }) => {
  const searchValue = route.params.searchValue;

  const {
    data: dataAudio,
    isSuccess: isSuccessAudio,
    isError: isErrorAudio,
    error: errorAudio,
  } = useGetAudioListByNameAPI(searchValue);

  if (isSuccessAudio) {
    console.log("get audio success", dataAudio);
  }
  if (isErrorAudio) {
    console.log("get audio failed", errorAudio);
  }

  //get playlist
  const {
    data: dataPlaylist,
    isSuccess: isSuccessPlaylist,
    isError: isErrorPlaylist,
    error: errorPlaylist,
  } = useGetPlaylistByNameApi(searchValue);
  if (isSuccessPlaylist) {
    console.log("get playlist success", dataPlaylist);
  }
  if (isErrorPlaylist) {
    console.log("get playlist failed", errorPlaylist);
  }
  function titleNotFound() {
    return (
      <View>
        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.pop()}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              colors={[
                {
                  color: Colors.primaryColor,
                  offset: "0.15",
                  opacity: "0.75",
                },
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
            maskElement={<Text style={{ ...Fonts.bold22 }}>Back</Text>}
          >
            <LinearGradient
              start={{ x: 1, y: 0.2 }}
              end={{ x: 1, y: 1 }}
              colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </View>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            fontWeight: "100",
            paddingVertical: 8,
          }}
        >
          Title not found
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
        >
          {cornerImage()}
          {dataAudio?.length === 0 &&
            dataPlaylist?.length === 0 &&
            titleNotFound()}
          {dataAudio && dataAudio.length > 0 && audio()}
          {dataPlaylist && dataPlaylist.length > 0 && playlist()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function audio() {
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
              onPress={() => {
                dispatch(audioArtistAction.setAudioArtistId(id));
                console.log(
                  "Audio artist saved",
                  store.getState().audioArtist.audioArtistId
                );
                getAudioInfo();
                hideMenu();
                console.log(modalVisible);
              }}
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
              onPress={() => {
                dispatch(audioArtistAction.setAudioArtistId(id));
                showConfirmDialog(), hideMenu();
              }}
            >
              Delete
            </MenuItem>
          </View>
        </Menu>
      );
    };

    return dataAudio ? (
      <View>
        <View style={styles.headerWrapStyle}>
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.pop()}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                colors={[
                  {
                    color: Colors.primaryColor,
                    offset: "0.15",
                    opacity: "0.75",
                  },
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
              maskElement={<Text style={{ ...Fonts.bold22 }}>Audio</Text>}
            >
              <LinearGradient
                start={{ x: 1, y: 0.2 }}
                end={{ x: 1, y: 1 }}
                colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
                style={{ flex: 1 }}
              />
            </MaskedView>
          </View>
        </View>

        {dataAudio.length > 0 ? (
          dataAudio.map((item, index) => (
            <View key={`${item.id}`}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handleSelectAudio(dataAudio, index)}
                style={styles.tracksInfoWrapStyle}
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-start" }}
                >
                  <SharedElement id={item.id}>
                    <ImageBackground
                      source={{ uri: `${item.imageUrl}` }}
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      borderRadius={Sizes.fixPadding - 5.0}
                    ></ImageBackground>
                  </SharedElement>
                  <View style={{ marginLeft: 8, marginTop: 10 }}>
                    <Text style={{ ...Fonts.blackColor13SemiBold }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        ...Fonts.grayColor11Medium,
                      }}
                    >
                      {item?.artist?.artist_name}
                    </Text>
                  </View>
                </View>

                <CustomMenu id={item.id} />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: "100",
              paddingVertical: 8,
            }}
          >
            No data!
          </Text>
        )}
      </View>
    ) : (
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          fontWeight: "100",
          paddingVertical: 8,
        }}
      >
        No data!
      </Text>
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

  function playlist() {
    return (
      <View style={{ marginTop: 50 }}>
        <View style={styles.headerWrapStyle}>
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.pop()}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                colors={[
                  {
                    color: Colors.primaryColor,
                    offset: "0.15",
                    opacity: "0.75",
                  },
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
          {dataPlaylist && dataPlaylist.length > 0 ? (
            dataPlaylist.map((playListInfor, index) => (
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
                    paddingHorizontal: 8,
                    paddingVertical: 12,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View style={{ marginLeft: 8 }}>
                    <Image
                      source={{ uri: playListInfor.imageUrl }}
                      style={styles.imagePlaylist}
                    />
                  </View>
                  <View style={{ flexDirection: "column", marginLeft: 10 }}>
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: "400" }}>
                        {playListInfor.name}
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
                        {playListInfor?.author?.lastName || "Unknown"}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                fontWeight: "100",
                paddingVertical: 8,
              }}
            >
              No data!
            </Text>
          )}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  imagePlaylist: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  tracksInfoWrapStyle: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
  },
  headerWrapStyle: {
    flexDirection: "column",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding - 40.0,
  },
});

export default SearchScreen;
