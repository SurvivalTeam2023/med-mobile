import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Navigate } from "../../constants/navigate";
import { useDispatch, useSelector } from "react-redux";
import { useGetSelectedMentalHealthListAPI } from "../../hooks/mentalHealth";
import { SimpleLineIcons } from "@expo/vector-icons";
import { styles } from "./style";
import { mentalHealth } from "./components/mentalHealth";
import { suggestion } from "./components/suggestion";
import { exercise } from "./components/exercise";

const ExploreScreen = ({ navigation }) => {
  const userData = useSelector((state) => state.user.data);

  const { data: dataSelectedMental, isSuccess: isSuccessSelectedMental } =
    useGetSelectedMentalHealthListAPI();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
        >
          {mentalHealth(dataSelectedMental)}
          {exercise({ navigation })}
          {suggestion()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{ ...Fonts.grayColor18SemiBold, alignContent: "center" }}>
          {userData?.username}'s Space
        </Text>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.push(Navigate.PROFILE_SCREEN)}
            style={{
              borderWidth: 2,
              borderColor: "black",
              borderRadius: 50,
            }}
          >
            <Image
              source={
                userData?.avatar?.url
                  ? { uri: userData?.avatar?.url }
                  : { uri: "https://e-s-center.kz/images/articles/123123.png" }
              }
              style={styles.image}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.push(Navigate.SETTING_SCREEN);
            }}
          >
            <SimpleLineIcons
              name="menu"
              size={18}
              color="black"
              style={{ paddingTop: 12, paddingLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default ExploreScreen;
