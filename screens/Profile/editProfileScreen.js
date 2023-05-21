import React, { useState, getState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useGetUserProfile } from "../../hooks/user.hook";
import { store } from "../../core/store/store";

let profile = [];

const editProfileScreen = ({ navigation }) => {
  const userName = store.getState().user.username;
  const userAvatar = store.getState().user?.user?.user_db?.avatar;
  const [avatarImage, setAvatarImage] = useState(null);
  const { data, isSuccess, isError, error } = useGetUserProfile();

  if (isSuccess) {
    profile = data["data"];
    console.log("profile", profile);
  }
  if (isError) {
    console.log("error", error);
  }

  const selectAvatarImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatarImage(result.uri);
    }
  };

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
            </>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
        />
      </View>
    </SafeAreaView>
  );

  function Profile() {
    return (
      <View style={styles.container}>
        <View style={styles.rect}>
          <View style={styles.imageRow}>
            <ImageBackground
              source={{
                uri: `${userAvatar}`,
              }}
              resizeMode="contain"
              style={styles.image}
            >
              {avatarImage && (
                <Image
                  source={{ uri: avatarImage }}
                  style={styles.avatarImage}
                />
              )}
              <TouchableOpacity
                style={styles.overlay}
                onPress={selectAvatarImage}
              >
                <MaterialIcons name="add-a-photo" size={24} color="black" />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.name}>{userName}</Text>
          </View>
          <View style={styles.favoritedRow}>
            <Text style={styles.favorited}>Favorited</Text>
            <Text style={styles.playlists}>Playlists</Text>
            <Text style={styles.following}>Following</Text>
          </View>
          <View style={styles.loremIpsumRow}>
            <Text style={styles.loremIpsum}>{profile.favorite}</Text>
            <Text style={styles.loremIpsum4}>{profile.playlist}</Text>
            <Text style={styles.loremIpsum3}>{profile.following}</Text>
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
          maskElement={<Text style={{ ...Fonts.bold22 }}>Edit</Text>}
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
  },
  image: {
    width: 100,
    height: 121,
    marginLeft: 20,
    borderRadius: 10,
  },
  name: {
    fontFamily: "roboto-regular",
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
    fontFamily: "roboto-regular",
    color: "#121212",
    alignItems: "flex-start",
  },
  playlists: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 51,
    alignItems: "flex-start",
  },
  following: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 51,
    alignItems: "flex-start",
  },
  favoritedRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 21,
    marginRight: 35,
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
  },
  loremIpsum4: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 104,
  },
  loremIpsum3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 92,
  },
  loremIpsumRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 11,
    marginLeft: 42,
    marginRight: 61,
  },
  profileAbout: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 11,
    marginLeft: 27,
  },
  publicPlaylists: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 20,
    marginLeft: 26,
  },
  following2: {
    fontFamily: "roboto-regular",
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
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default editProfileScreen;
