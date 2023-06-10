import React, { useState, useCallback, useEffect } from "react";
import {
  BackHandler,
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
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useFocusEffect } from "@react-navigation/native";
import { useLogin } from "../../hooks/auth.hook";
import { useLoginWithGmail } from "../../hooks/auth.hook";
import {
  EXPO_CLIENT_ID,
  TOKEN_KEY_STORAGE,
  WEB_CLIENT_ID,
} from "../../constants/config";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/auth/auth.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import axios from "axios";
import { useGetUserByNameApi } from "../../hooks/user.hook";
import { store } from "../../core/store/store";
import { Audio } from "expo-av";
import { Pressable } from "react-native";
import { ARTIST_ROLE } from "../../constants/role";

const SigninScreen = ({ navigation }) => {
  const [errorCode, setErrorCode] = useState(null);
  const [ortherErrorCode, setOtherErrorCode] = useState(null);

  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };
  const { mutate } = useLogin();
  const { mutate: mutateLoginGoogle } = useLoginWithGmail();
  const dispatch = useDispatch();
  const { userData, isError, isSuccess, refetch } = useGetUserByNameApi();

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  function _spring() {
    updateState({ backClickCount: 1 });
    setTimeout(() => {
      updateState({ backClickCount: 0 });
    }, 1000);
  }

  const [state, setState] = useState({
    showPassword: false,
    userName: null,
    password: null,
    email: null,
    backClickCount: 0,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const { showPassword, userName, password, backClickCount } = state;

  if (isSuccess) {
    const userInfo = userData["data"];
    dispatch(userAction.storeUser(userInfo));
  }

  if (isError) {
    console.log("error", isError);
  }

  const handleLogin = () => {
    mutate(
      {
        username: state["userName"],
        password: state["password"],
      },

      {
        onSuccess: (data) => {
          const dataRaw = data["data"];
          const access_token = dataRaw["access_token"];
          dispatch(userAction.storeToken(access_token));

          refetch();
          AsyncStorage.setItem(
            TOKEN_KEY_STORAGE,
            JSON.stringify({ token: access_token })
          );
          const role = store.getState().user.artist_role;

          if (role === ARTIST_ROLE) {
            navigation.push("ArtistProfile");
          } else {
            navigation.push("OptionScreen");
          }
        },
        onError: (error) => {
          let err = error.response.status;
          switch (err) {
            case 400:
              setErrorCode(err);
              break;
            case 401:
              setErrorCode(err);
              break;
            case 404:
              setErrorCode(err);
              break;
            default:
              setOtherErrorCode(err);
              break;
          }
        },
      }
    );
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  });
  //variable can be get in the function below
  let token = null;
  let email = null;

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      const subject_token = response.authentication.accessToken;
      token = subject_token;

      //username is email so we get email from api and pass it to handleLoginWithGmail function
      axios
        .get(
          "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" +
            `${subject_token}`
        )
        .then(function (response) {
          const userDetails = response.data["email"];
          console.log(userDetails);
          email = userDetails;
          handleLoginWithGmail();
        });
    }
  }, [response]);

  const handleLoginWithGmail = () => {
    mutateLoginGoogle(
      {
        subject_token: token,
        username: email,
        email: email,
      },
      {
        onSuccess: (data) => {
          const dataRaw = data["data"];
          const access_token = dataRaw["access_token"];
          dispatch(userAction.storeToken(access_token));
          refetch();
          AsyncStorage.setItem(
            TOKEN_KEY_STORAGE,
            JSON.stringify({ token: access_token })
          );
          const role = store.getState().user.artist_role;

          if (role === ARTIST_ROLE) {
            navigation.push("ArtistProfile");
          } else {
            navigation.push("OptionScreen");
          }
        },
        onError: (error) => {
          let err = error.response.status;
          switch (err) {
            case 400:
              setErrorCode(err);
              break;
            case 401:
              setErrorCode(err);
              break;
            case 404:
              setErrorCode(err);
              break;
            default:
              setOtherErrorCode(err);
              break;
          }
        },
      }
    );
  };

  let configOptions = {
    allowsRecordingIOS: false,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    staysActiveInBackground: true,
    playThroughEarpieceAndroid: true,
  };

  const configAudio = async () => {
    try {
      await Audio.setAudioModeAsync(configOptions);
    } catch (e) {
      console.log(e);
    }
  };

  const storeConfig = async () => {
    try {
      const value = await AsyncStorage.getItem("Configuration");
      if (value == null) {
        // value previously stored
        configAudio();
        dispatch(userAction.storeAudio(configOptions));
      }
    } catch (e) {
      // error reading value
    }
  };

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
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {signinInfo()}
          </ScrollView>
        </ScrollView>
      </View>
      {backClickCount == 1 ? (
        <View style={[styles.animatedView]}>
          <Text style={{ ...Fonts.whiteColor12Medium }}>
            Press Back Once Again to Exit
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );

  function signinInfo() {
    return (
      <View>
        <MaskedView
          style={{ flex: 1, height: 35 }}
          maskElement={
            <Text style={{ textAlign: "center", ...Fonts.bold30 }}>
              SIGN IN
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
        {errorCode === 400 && (
          <View style={styles.failWarningWrapper}>
            <Text style={styles.warningText}>
              Something went wrong. Please double-check and try again
            </Text>
          </View>
        )}
        {errorCode === 401 && (
          <View style={styles.failWarningWrapper}>
            <Text style={styles.warningText}>
              Incorrect username or password. Please double-check and try again
            </Text>
          </View>
        )}
        {errorCode === 404 && (
          <View style={styles.failWarningWrapper}>
            <Text style={styles.warningText}>
              User not found. Please sign up and try again
            </Text>
          </View>
        )}
        {ortherErrorCode !== null && (
          <View style={styles.failWarningWrapper}>
            <Text style={styles.warningText}>
              Something went wrong. Please sign up and try again
            </Text>
          </View>
        )}
        {userNameTextField()}
        {passwordTextField()}
        {signinButton()}
        {orIndicator()}
        {socialMediaOptions()}
        {dontHaveAccountInfo()}
      </View>
    );
  }

  function dontHaveAccountInfo() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              marginRight: Sizes.fixPadding + 5.0,
              ...Fonts.blackColor13SemiBold,
            }}
          >
            Don't have an account ?
          </Text>
          <TouchableOpacity
            style={{ flex: 0.3 }}
            activeOpacity={0.9}
            onPress={() => navigation.push("SignUp")}
          >
            <MaskedView
              style={{ flex: 0.3, height: 18 }}
              maskElement={
                <Text style={{ ...Fonts.blackColor13Bold }}>sign up</Text>
              }
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={[
                  "rgba(255, 124, 0,1)",
                  "rgba(255, 124, 0,1)",
                  "rgba(41, 10, 89, 0.9)",
                ]}
                style={{ flex: 1 }}
              />
            </MaskedView>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function socialMediaOptions() {
    return (
      <View style={styles.socialMediaIconsWrapStyle}>
        <View
          style={{
            backgroundColor: "#EA4335",
            ...styles.socialMediaIconsStyle,
            marginHorizontal: Sizes.fixPadding - 5.0,
          }}
        >
          <TouchableOpacity onPress={() => promptAsync()}>
            <Image
              source={require("../../assets/images/icon/google-icon.png")}
              style={{ width: 15.0, height: 15.0 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function orIndicator() {
    return (
      <View style={styles.orWrapStyle}>
        <View style={{ flex: 1, backgroundColor: "#D5D5D5", height: 1.5 }} />
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding,
            ...Fonts.grayColor12SemiBold,
          }}
        >
          Or sign in with
        </Text>
        <View style={{ flex: 1, backgroundColor: "#D5D5D5", height: 1.5 }} />
      </View>
    );
  }

  function signinButton() {
    return (
      <Pressable
        style={styles.signinButtonStyle}
        activeOpacity={0.9}
        onPressIn={() => {
          handleLogin();
          storeConfig();
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.signinButtonGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>SIGN IN</Text>
        </LinearGradient>
      </Pressable>
    );
  }

  function passwordTextField() {
    return (
      <View style={styles.passwordTextFieldWrapstyle}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="lock-open" size={20} color={Colors.grayColor} />
          <TextInput
            value={password}
            onChangeText={(text) => updateState({ password: text })}
            secureTextEntry={showPassword}
            selectionColor={Colors.grayColor}
            placeholder="Password"
            placeholderTextColor={Colors.grayColor}
            style={{
              flex: 1,
              ...Fonts.blackColor13Bold,
              marginLeft: Sizes.fixPadding,
            }}
          />
        </View>
        <MaterialCommunityIcons
          name={showPassword ? "eye-outline" : "eye-off-outline"}
          color={Colors.grayColor}
          size={20}
          onPress={() => updateState({ showPassword: !showPassword })}
        />
      </View>
    );
  }

  function userNameTextField() {
    return (
      <View style={styles.userNameTextFieldWrapStyle}>
        <MaterialIcons name="person" color={Colors.grayColor} size={20} />
        <TextInput
          value={userName}
          onChangeText={(text) => updateState({ userName: text })}
          selectionColor={Colors.grayColor}
          placeholder="User Name"
          placeholderTextColor={Colors.grayColor}
          style={{
            marginLeft: Sizes.fixPadding,
            flex: 1,
            ...Fonts.blackColor14Bold,
          }}
        />
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
  animatedView: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
  userNameTextFieldWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 1.0,
    marginTop: Sizes.fixPadding * 2.5,
    marginBottom: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  passwordTextFieldWrapstyle: {
    marginVertical: Sizes.fixPadding,
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
  signinButtonGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 5.0,
  },
  signinButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2.5,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  failWarningWrapper: {
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding + 9,
    marginTop: Sizes.fixPadding,
  },
  warningText: { color: "red", fontSize: 17 },
});

export default SigninScreen;
