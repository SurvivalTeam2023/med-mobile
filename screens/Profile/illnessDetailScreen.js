import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  View,
  ScrollView,
  StatusBar,
  Text,
  StyleSheet,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const trendingCategoriesList = ["Genre", "Audio", "Quiz"];

const IllnessDetailScreen = ({ navigation, route }) => {
  const degree = route?.params?.data;
  console.log(degree);

  const backBtn = () => {
    return (
      <MaterialIcons
        name="keyboard-arrow-left"
        color={Colors.blackColor}
        size={25}
        style={{ paddingTop: 10 }}
        onPress={() => navigation.pop()}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#eeeeee",
            borderRadius: 10,
          }}
        >
          <View style={{ paddingHorizontal: 12, paddingVertical: 16 }}>
            <View style={{ backgroundColor: "white", borderRadius: 16 }}>
              <View
                style={{
                  marginLeft: 8,
                }}
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-start" }}
                >
                  {backBtn()}
                  <Text
                    style={{
                      fontSize: 24,
                      textAlign: "center",
                      fontWeight: "400",
                      paddingVertical: 8,
                      paddingLeft: 100,
                      borderBottomWidth: 1,
                      borderColor: "#ddd",
                    }}
                  >
                    {degree?.mentalHealth}
                  </Text>
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: Sizes.fixPadding,
                  }}
                >
                  <Text>{degree?.mentalHealthDesc}</Text>
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  colorDot: {
    borderRadius: "50%",
    backgroundColor: "red", // You can change the color here
    marginRight: 8, // Adjust this value as needed
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 90,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginVertical: Sizes.fixPadding * 25,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    width: 300,
    height: 50,
    borderWidth: 1, // Add border width
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    marginBottom: 12,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  headerWrapStyle: {
    flexDirection: "row",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
  },
  startQuizGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 20.0,
    marginTop: Sizes.fixPadding - 40.0,
  },
  popularSongImageStyle: {
    marginRight: Sizes.fixPadding,
    width: 110,
    height: 100,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  titleStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.blackColor16Bold,
  },
  describeQuizText: {
    ...Fonts.whiteColor16Light,
    width: 300,
    justifyContent: "center",
  },
  titleInfoStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor18Bold,
    textAlign: "center",
  },
  startQuizInfo: {
    paddingVertical: Sizes.fixPadding + 10,
    paddingBottom: 30,
    marginHorizontal: Sizes.fixPadding + 10.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 20.0,
  },
  titleWrapStyle: {
    marginRight: Sizes.fixPadding + 5.0,
    marginLeft: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  startQuizButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 10.0,
    marginHorizontal: Sizes.fixPadding * 10.0,
    borderRadius: Sizes.fixPadding - 4.0,
  },
  trendingCategoriesWrapStyle: {
    flex: 1,
    marginVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
  },
  trendingCategoriesStyle: {
    alignItems: "center",
    flex: 1,
    borderRadius: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding - 5.0,
  },
  songNumberWrapStyle: {
    width: 18.0,
    height: 18.0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5.0,
  },
  topTrendingInfoWrapStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
});

export default IllnessDetailScreen;
