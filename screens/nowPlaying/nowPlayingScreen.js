import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Icon } from "react-native-gradient-icon";
import { MaterialIcons } from "@expo/vector-icons";
import { Slider } from "@rneui/themed";
import { Audio } from "expo-av";
import { useCreateHisoryApi } from "../../hooks/history.hook";
import { useGetTracksFromFavorite } from "../../hooks/favoriteTracks.hook";
import { useGetTracksFromPlaylist } from "../../hooks/playlistTracks.hook";
import { genreAction, genreReducer } from "../../redux/auth/genre.slice";
import { store } from "../../core/store/store";

const NowPlayingScreen = ({ navigation }) => {
  let nextOnList = store.getState().genre.genreTrack;
  const [sound, setSound] = React.useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const [songIndex, setSongIndex] = useState(0);
  const { mutate } = useCreateHisoryApi();

  const saveHistory = () => {
    mutate(
      {
        audioId: 11,
      },

      {
        onSuccess: (data) => {
          console.log("Created!!!");
        },
        onError: (error) => {
          console.log("error", error);
        },
      }
    );
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync({
      uri: nextOnList[songIndex]?.audio?.file?.url,
    });
    setIsPlaying(false);
    setSound(sound);

    await sound.playAsync();
  };

  const stopSound = async () => {
    setIsPlaying(true);
    await sound.pauseAsync();
  };

  function playNextSong() {
    if (songIndex < nextOnList.length - 1) {
      setSongIndex(songIndex + 1);
      playSound();
    } else {
      setSongIndex(0);
    }
  }

  const handleSongPress = (index) => {
    setSongIndex(index);
  };

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const [state, setState] = useState({
    songRunningInPercentage: 60,
    pauseSong: true,
    currentSongInFavorite: true,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { songRunningInPercentage, pauseSong, currentSongInFavorite } = state;
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
          {songInfo()}
          {nextOnTheLists()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function nextOnTheLists() {
    return (
      <View>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            marginBottom: Sizes.fixPadding + 5.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor15Bold,
          }}
        >
          Tracks list
        </Text>
        {nextOnList?.map((item, index) => (
          <View key={`${item?.id}`}>
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              onPress={() => {
                handleSongPress(index);
                stopSound();
              }}
              style={styles.nextOnTheListInfoWrapStyle}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: item?.audio.imageUrl }}
                  style={{
                    width: 50.0,
                    height: 50.0,
                    borderRadius: Sizes.fixPadding - 5.0,
                  }}
                />
                <View style={{ marginLeft: Sizes.fixPadding }}>
                  <Text style={{ ...Fonts.blackColor12SemiBold }}>
                    {item?.audio.name}
                  </Text>
                  <Text style={{ ...Fonts.grayColor10Medium }}>
                    {item?.audio.artist.artist_name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }

  function songInfo() {
    return (
      <View>
        {songNameWithPoster()}
        {songTimeInfo()}
        {songProcessSlider()}
        {songPlayInfo()}
        {favoriteShuffleAndRepeatInfo()}
        {lyricsTextWithIcon()}
      </View>
    );
  }

  function lyricsTextWithIcon() {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <MaterialIcons
          name="keyboard-arrow-up"
          size={20}
          color={Colors.blackColor}
        />
        <Text style={{ ...Fonts.grayColor10SemiBold }}>Lyrics</Text>
      </View>
    );
  }

  function favoriteShuffleAndRepeatInfo() {
    return (
      <View style={styles.favoriteShuffleAndRepeatInfoWrapStyle}>
        <MaterialIcons name="repeat" size={20} color="black" />
        <TouchableOpacity
          activeOpacity={0.9}
          style={{}}
          onPress={() => {
            updateState({ currentSongInFavorite: !currentSongInFavorite });
          }}
        >
          {currentSongInFavorite ? (
            <Icon
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              size={18}
              mode="linear"
              colors={[
                { color: Colors.primaryColor, offset: "0.15", opacity: "0.75" },
                { color: Colors.secondaryColor, offset: "1", opacity: "0.8" },
              ]}
              style={{
                marginHorizontal: Sizes.fixPadding * 4.0,
                alignSelf: "center",
              }}
              name="favorite"
              type="material"
            />
          ) : (
            <MaterialIcons
              name="favorite-border"
              size={18}
              style={{
                marginHorizontal: Sizes.fixPadding * 4.0,
                alignSelf: "center",
              }}
              color="rgba(255, 124, 0,1)"
            />
          )}
        </TouchableOpacity>
        <MaterialIcons name="shuffle" size={20} color="black" />
      </View>
    );
  }

  function songPlayInfo() {
    return (
      <View style={styles.songPlayInfoWrapStyle}>
        <MaterialIcons
          name="replay-10"
          size={25}
          style={{ marginRight: Sizes.fixPadding * 2.0 }}
          color="black"
        />
        <View style={styles.forwardBackwardButtonWrapStyle}>
          <MaterialIcons name="arrow-left" size={30} color="black" />
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => (isPlaying ? playSound() : stopSound())}
        >
          <LinearGradient
            start={{ x: 0, y: 0.1 }}
            end={{ x: 0, y: 1 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
            style={styles.pausePlayButtonWrapStyle}
          >
            <MaterialIcons
              name={isPlaying ? "play-arrow" : "pause"}
              color={Colors.whiteColor}
              size={25}
            />
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.forwardBackwardButtonWrapStyle}>
          <MaterialIcons name="arrow-right" size={30} color="black" />
        </View>
        <MaterialIcons
          name="forward-10"
          size={25}
          color="black"
          style={{ marginLeft: Sizes.fixPadding * 2.0 }}
        />
      </View>
    );
  }

  function songNameWithPoster() {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: `${nextOnList[songIndex]?.audio?.imageUrl}` }}
          style={{
            marginVertical: Sizes.fixPadding,
            width: 190.0,
            height: 210.0,
            borderRadius: Sizes.fixPadding - 5.0,
          }}
        />
        <Text style={{ ...Fonts.blackColor14Bold }}>
          {nextOnList[songIndex]?.audio.name}
        </Text>
        <Text style={{ ...Fonts.grayColor10Medium }}>
          {nextOnList[songIndex]?.audio.artist.artist_name}
        </Text>
      </View>
    );
  }

  function songProcessSlider() {
    return (
      <View style={styles.songProcessSliderWrapStyle}>
        <Slider
          value={songRunningInPercentage}
          onValueChange={(value) =>
            updateState({ songRunningInPercentage: value })
          }
          maximumValue={100}
          minimumValue={0}
          style={{ height: 12.0 }}
          minimumTrackTintColor={Colors.primaryColor}
          maximumTrackTintColor={Colors.secondaryColor}
          thumbTintColor={Colors.secondaryColor}
          trackStyle={{ height: 4.5, backgroundColor: Colors.primaryColor }}
          thumbStyle={{
            height: 15,
            width: 15,
            backgroundColor: Colors.primaryColor,
          }}
        />
      </View>
    );
  }

  function songTimeInfo() {
    return (
      <View style={styles.songTimeInfoWrapStyle}>
        <Text style={{ ...Fonts.grayColor10Medium }}>0:00</Text>
        <Text style={{ ...Fonts.grayColor10Medium }}>3:58</Text>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.pop()}>
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
            name="keyboard-arrow-down"
            type="material"
          />
        </TouchableOpacity>
        <MaskedView
          style={{ flex: 1, height: 28 }}
          maskElement={<Text style={{ ...Fonts.bold22 }}>Now Playing</Text>}
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
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding - 40.0,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  songTimeInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "space-between",
    marginTop: Sizes.fixPadding + 5.0,
  },
  songProcessSliderWrapStyle: {
    flex: 1,
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignItems: "stretch",
    justifyContent: "center",
  },
  forwardBackwardButtonWrapStyle: {
    width: 30.0,
    backgroundColor: Colors.whiteColor,
    height: 30.0,
    borderRadius: 15.0,
    borderColor: "#DFDFDF",
    borderWidth: 0.5,
    elevation: 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
  pausePlayButtonWrapStyle: {
    width: 37.0,
    height: 37.0,
    borderRadius: 18.5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding + 2.0,
  },
  favoriteShuffleAndRepeatInfoWrapStyle: {
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding - 5.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  songPlayInfoWrapStyle: {
    marginTop: Sizes.fixPadding + 10.0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nextOnTheListInfoWrapStyle: {
    marginBottom: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default NowPlayingScreen;
