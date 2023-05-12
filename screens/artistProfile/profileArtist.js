import React from "react";
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
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";

const ProfileArtistScreen = ({ navigation }) => {
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
              {About()}
            </>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
        />
      </View>
    </SafeAreaView>
  );

  function About() {
    return (
      <View style={styles.publicPlaylists}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>About</Text>
          <Button onPress={navigation.push("ManageArtistAlbum")}>hello</Button>
        </View>
      </View>
    );
  }

  function Profile() {
    return (
      <View>
        <View style={styles.backdrop}>
          <View style={styles.imageRow}>
            <Image
              source={{
                uri: "https://www.nme.com/wp-content/uploads/2019/10/Webp.net-resizeimage-12-696x442.jpg",
              }}
              resizeMode="contain"
              style={styles.image}
            ></Image>
            <View>
              <Text style={{ ...Fonts.blackColor20Bold }}>Eminem</Text>
              <Text style={styles.desc}>Dope ass rapper</Text>
            </View>
            <AntDesign
              style={{ marginRight: 10 }}
              name="edit"
              size={24}
              color="black"
            />
          </View>
          <View style={styles.favoritedRow}>
            <View>
              <Text>Favorited</Text>
              <Text>1M</Text>
            </View>
            <View>
              <Text>Playlist</Text>
              <Text>1M</Text>
            </View>
            <View>
              <Text>Followers</Text>
              <Text>1M</Text>
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
  backdrop: {
    backgroundColor: "#E6E6E6",
    borderRadius: 30,
    marginHorizontal: 10,
    borderWidth: 2,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 200,
  },

  desc: {
    fontFamily: "roboto-regular",
    color: "#121212",
  },
  imageRow: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 5,
    marginTop: 5,
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding + 10,
    marginTop: Sizes.fixPadding + 10,
    marginBottom: Sizes.fixPadding,
  },
  about: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: -250,
    marginLeft: 27,
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
});

export default ProfileArtistScreen;
