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
import { MaterialIcons } from "@expo/vector-icons";

const libraryList = [
  {
    id: "1",
    image: require("../../assets/images/albumsCoverImages/1.png"),
    libraryFor: "Liked Songs",
  },
  {
    id: "2",
    image: require("../../assets/images/albumsCoverImages/2.png"),
    libraryFor: "Gym",
  },
  {
    id: "3",
    image: require("../../assets/images/albumsCoverImages/3.png"),
    libraryFor: "Chill",
  },
  {
    id: "4",
    image: require("../../assets/images/albumsCoverImages/4.png"),
    libraryFor: "Liked Prodcasts",
  },
  {
    id: "5",
    image: require("../../assets/images/albumsCoverImages/5.png"),
    libraryFor: "Party",
  },
  {
    id: "6",
    image: require("../../assets/images/albumsCoverImages/6.png"),
    libraryFor: "BGM's",
  },
];

const ProfileScreen = ({ navigation }) => {
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
    const renderItem = ({ item, index }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("Tracks")}
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
          <Text style={styles.titleStyle}>Public Playlists</Text>
        </View>
        <FlatList
          data={libraryList}
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
        onPress={() => navigation.push("Tracks")}
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
          data={libraryList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
  function About() {
    return (
      <View style={styles.publicPlaylists}>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>About</Text>
        </View>
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
                uri: "https://product-images.tcgplayer.com/167191.jpg",
              }}
              resizeMode="contain"
              style={styles.image}
            ></Image>
            <Text style={styles.name}>Name</Text>
          </View>
          <View style={styles.favoritedRow}>
            <Text style={styles.favorited}>Favorited</Text>
            <Text style={styles.playlists}>Playlists</Text>
            <Text style={styles.following}>Following</Text>
          </View>
          <View style={styles.loremIpsumRow}>
            <Text style={styles.loremIpsum}>1</Text>
            <Text style={styles.loremIpsum4}>1</Text>
            <Text style={styles.loremIpsum3}>1</Text>
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
  container: {
    flex: 1,
  },
  rect: {
    width: 330,
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

export default ProfileScreen;
