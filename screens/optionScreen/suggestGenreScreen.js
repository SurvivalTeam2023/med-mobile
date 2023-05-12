import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { FlatList } from "react-native";

import { ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Checkbox } from "react-native-paper";
import { useGetGenreList } from "../../hooks/genre.hook";
const genreSuggestionScreen = ({ navigation }) => {
  const [checked, setChecked] = React.useState(false);
  const { data, error, isSuccess, isError } = useGetGenreList();
  let recommendedList = [
    {
      id: "1r",
      image: require("../../assets/images/songsCoverPicks/coverImage1.png"),
      category: "Morning chill",
    },
    {
      id: "2r",
      image: require("../../assets/images/songsCoverPicks/coverImage2.png"),
      category: "Daily Mix",
    },
    {
      id: "3r",
      image: require("../../assets/images/songsCoverPicks/coverImage3.png"),
      category: "Top Trending",
    },
  ];
  if (isSuccess) {
    recommendedList = data["data"];
    console.log("alo", recommendedList);
  }
  if (isError) {
    console.log("error", error);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {cornerImage()}
          <ScrollView
            scrollEnabled={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {signupInfo()}
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function signupInfo() {
    return (
      <View style={{ marginTop: Sizes.fixPadding + 5.0 }}>
        <MaskedView
          style={{ flex: 1, height: 35 }}
          maskElement={
            <Text style={{ textAlign: "center", ...Fonts.bold30 }}>
              You might interested in
            </Text>
          }
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
            style={{ flex: 1 }}
          />
        </MaskedView>
        {recommendedInfo()}
        {ContinueButton()}
      </View>
    );
  }

  function ContinueButton() {
    return (
      <TouchableOpacity
        style={styles.signupButtonStyle}
        activeOpacity={0.9}
        onPress={() => {
          navigation.push("CamResult");
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.signupButtonGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function recommendedInfo() {
    // Set the checkbox interval
    const checkboxInterval = 3;

    // Calculate the item count based on the current index
    const renderItem = ({ item, index }) => (
      <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
        <ImageBackground
          source={{ uri: `${item.image}` }}
          style={{
            width: 100.0,
            height: 90.0,
            marginTop: Sizes.fixPadding + 5.0,
            marginRight: Sizes.fixPadding,
          }}
          borderRadius={Sizes.fixPadding - 5.0}
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(255, 124, 0,0.5)", "rgba(41, 10, 89, 0.5)"]}
            style={{ flex: 1, borderRadius: Sizes.fixPadding - 5.0 }}
          >
            <Text
              style={{
                padding: Sizes.fixPadding - 5.0,
                ...Fonts.whiteColor12Medium,
              }}
            >
              {item.name}
            </Text>
          </LinearGradient>
        </ImageBackground>
        {index % 3 === 0 && (
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        )}
      </TouchableOpacity>
    );

    return (
      <View>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Happy</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.blackColor}
            size={25}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <FlatList
            data={recommendedList}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            numColumns={3}
            contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 1.5 }}
          />
          <View
            style={{
              marginTop: Sizes.fixPadding + 30.0,
              marginRight: Sizes.fixPadding + 10.0,
            }}
          ></View>
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
};

const styles = StyleSheet.create({
  textFieldWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 1.0,
    marginBottom: Sizes.fixPadding + 10.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  passwordTextFieldWrapstyle: {
    marginBottom: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    paddingVertical: Sizes.fixPadding + 1.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  orWrapStyle: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    marginTop: Sizes.fixPadding + 5.0,
    marginBottom: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  socialMediaIconsStyle: {
    width: 32.0,
    height: 32.0,
    borderRadius: 16.0,
    alignItems: "center",
    justifyContent: "center",
  },
  socialMediaIconsWrapStyle: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  signupButtonGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 5.0,
  },
  signupButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2.5,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  titleWrapStyle: {
    marginRight: Sizes.fixPadding + 5.0,
    marginLeft: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleStyle: {
    marginTop: Sizes.fixPadding + 20.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.blackColor15Bold,
  },
  checkbox: {
    alignSelf: "center",
  },
});

export default genreSuggestionScreen;
