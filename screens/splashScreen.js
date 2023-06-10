import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
} from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN_KEY_STORAGE, USER_KEY_STORAGE} from "../constants/config";
import {userAction} from "../redux/auth/auth.slice";
import {useDispatch} from "react-redux";
import {store} from "../core/store/store";
import {ARTIST_ROLE} from "../constants/role";
const getTokenFromLocal = async () => {
  try {
    const value = await AsyncStorage.getItem(TOKEN_KEY_STORAGE)
    if(value !== null) {
      try{
        return JSON.parse(value)
      }catch(error){
        console.log("Failed to parse token:", error);
      }
    }
  } catch(e) {
    console.log("fetch_token_local_fail")
  }
}
const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  setTimeout(async () => {
    const retrievedToken  = await getTokenFromLocal()
     if(!retrievedToken ){
       navigation.navigate("SignIn");
     }else{
       dispatch(userAction.storeTokenWithoutLocal(retrievedToken.token));
       const role = store.getState().user.artist_role;
       if (role === ARTIST_ROLE) {
         navigation.push("ArtistProfile");
       } else {
         navigation.push("OptionScreen");
       }
     }
  }, 2000);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.secondaryColor} />
      <View style={{ flex: 1 }}>
        <LinearGradient
          start={{ x: 1, y: 0.2 }}
          end={{ x: 1, y: 1 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
          style={{ flex: 1 }}
        >
          <ImageBackground
            source={require(".././assets/images/bg.png")}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Image
              source={require("../assets/images/white-logo.png")}
              style={{ height: 150.0, width: "100%" }}
            />
            <Text style={{ marginTop: Sizes.fixPadding - 60.0 }}>
              <Text style={{ ...Fonts.whiteColor35Bold }}>Music</Text>
              <Text style={{ ...Fonts.whiteColor15Bold }}>{` `}of you</Text>
            </Text>
          </ImageBackground>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
