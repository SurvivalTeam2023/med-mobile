import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./style";
import { introRecAlbumBody } from "./components/introBody";
const IntroRecAlbumScreen = ({ navigation, route }) => {
  const header = () => {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={{ flexDirection: "row", width: "33.33%" }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.pop()}
            style={{ flexDirection: "row" }}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              colors={[
                { color: Colors.primaryColor, offset: "0.15", opacity: "0.75" },
                { color: Colors.secondaryColor, offset: "1", opacity: "0.8" },
              ]}
            />
            <Text style={{ ...Fonts.grayColor18SemiBold }}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: "33.33%" }}>
          <Text style={{ ...Fonts.blackColor18SemiBold, textAlign: "center" }}>
            Music
          </Text>
        </View>
        <View style={{ width: "33.33%" }}></View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <View style={{ flex: 1 }}>
        {header()}
        {introRecAlbumBody({ navigation })}
      </View>
    </SafeAreaView>
  );
};

export default IntroRecAlbumScreen;
