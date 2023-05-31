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
import { useGetUserProfile } from "../../hooks/user.hook";
import { store } from "../../core/store/store";
import { Ionicons } from "@expo/vector-icons";

let profile = [];
const ProfileScreen = ({ navigation }) => {
  const userName = store.getState().user.username;
  const userAvatar = store.getState().user.user.user_db.avatar.url;

  const { data, isSuccess, isError, error } = useGetUserProfile();

  if (isSuccess) {
    profile = data["data"];
  }
  if (isError) {
    console.log("error", error);
  }

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
          data={profile}
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
          data={profile}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
  // function About() {
  //   return (
  //     <View style={styles.publicPlaylists}>
  //       <View style={styles.titleWrapStyle}>
  //         <Text style={styles.titleStyle}>About</Text>
  //       </View>
  //     </View>
  //   );
  // }

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
            navigation.push("editScreen");
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
  },
  image: {
    width: 100,
    height: 121,
    marginLeft: 20,
    borderRadius: 10,
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
  },
  playlists: {
    color: "#121212",
    marginLeft: 51,
    alignItems: "flex-start",
  },
  following: {
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
    color: "#121212",
  },
  loremIpsum4: {
    color: "#121212",
    marginLeft: 104,
  },
  loremIpsum3: {
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
  // about: {
  //
  //   color: "#121212",
  //   marginTop: -250,
  //   marginLeft: 27,
  // },
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
});

export default ProfileScreen;
