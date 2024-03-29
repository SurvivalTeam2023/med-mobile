import React, { useEffect, useState } from "react";
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
  Alert,
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
import {
  useDeleteAudioArtistAPI,
  useGetAudioByIdForArtistAPI,
  useGetAudioForArtistAPI,
} from "../../hooks/playlistTracks.hook";
import { useDispatch } from "react-redux";
import { audioArtistAction } from "../../redux/audio/audioArtist";
import { store } from "../../core/store/store";
import { Navigate } from "../../constants/navigate";

const artistTracksScreen = ({ navigation }) => {
  const sortOptions = ["Name", "Date Added", "Artist"];
  const [tracksList, setTrackList] = useState(null);
  const dispatch = useDispatch();
  const { mutate } = useDeleteAudioArtistAPI();
  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: dataTracksFromPlaylist,
    isSuccess: successTracksFromPlaylist,
    isError: isErrorTracksFromPlaylist,
    error: errorTracksFromPlaylist,
  } = useGetAudioForArtistAPI();
  const {
    data: dataById,
    isSuccess: isSuccessById,
    isError: isErrorById,
    error: errorById,
  } = useGetAudioByIdForArtistAPI();
  const [state, setState] = useState({
    showSortOptions: false,
    selectedSortCriteria: sortOptions[0],
    pauseSong: true,
    name: null,
  });

  const getAudioInfo = () => {
    if (isSuccessById) {
      const audioInfo = dataById["data"];
      console.log("Get audio info successfully", dataById["data"]);
      dispatch(audioArtistAction.setAudioInfo(audioInfo));
      navigation.push("editAudioArtistScreen");
    }
    if (isErrorById) {
      console.log("Error when get audio info by id", errorById);
    }
  };

  useEffect(() => {
    if (successTracksFromPlaylist) {
      const filteredTracksList = dataTracksFromPlaylist["data"].items.filter(
        (item) => item.status === "ACTIVE"
      );
      setTrackList(filteredTracksList);
    }
  }, [successTracksFromPlaylist]);

  function updateAudioList() {
    const audioId = store.getState().audioArtist.audioArtistId;
    const updatedAudioList = tracksList.filter((item) => item.id !== audioId);
    tracksList = updatedAudioList;
  }

  const handleDeleteAudio = () => {
    mutate({
      onSuccess: (data) => {},
      onError: (error) => {
        alert("Some errors happened please try again later");
      },
    });
    updateAudioList();
  };

  const showConfirmDialog = () => {
    return Alert.alert("Are your sure?", "Do you want to delete this audio?", [
      // The "Yes" button
      {
        text: "Yes",
        onPress: () => {
          handleDeleteAudio();
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ]);
  };

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

    return tracksList?.map((item) => (
      <View key={`${item.id}`}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.push(Navigate.NOW_PLAYING, { item })}
          style={styles.tracksInfoWrapStyle}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
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
            <View
              style={{
                marginLeft: Sizes.fixPadding,
              }}
            >
              <View>
                <Text style={{ ...Fonts.blackColor13SemiBold }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    ...Fonts.grayColor11Medium,
                  }}
                >
                  {item.length}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text>{item.liked}</Text>
          </View>

          <CustomMenu id={item.id} />
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
        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.pop()}
          >
            <Icon
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
          {
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
          }
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
});

export default artistTracksScreen;
