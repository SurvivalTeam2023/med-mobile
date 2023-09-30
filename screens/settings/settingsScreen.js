import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Switch } from "react-native-paper";
import Dialog from "react-native-dialog";
import { store } from "../../core/store/store";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/auth/auth.slice";
import { configOptionsGlobal } from "../../utils/app.configuration";
import { Navigate } from "../../constants/navigate";
import { fetchUserData } from "../../redux/auth/auth.action";
import { nowPlayingAction } from "../../redux/audio/nowPlayingList.slice";
import { MaterialIcons } from "@expo/vector-icons";
import { UserInforComponent } from "./userInfor";
import { UpgradePremiumButton } from "./subscriptionScreen";
import { adsAction } from "../../redux/ads/ads.slice";
const { width } = Dimensions.get("window");
const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const access_token = useSelector((state) => state.user.token);
  const getUserDataAndDispatch = () => {
    fetchUserData(access_token).then((res) => {
      if (res) {
        setUserData((pre) => ({ ...pre, ...res }));
        dispatch(userAction.storeUser(res));
        const subscriptionStatus = res?.lastestSub || null;
        dispatch(adsAction.setSubscription(subscriptionStatus));
        setIsLoading((pre) => !pre);
      }
    });
  };
  useEffect(() => {
    getUserDataAndDispatch();
  }, [access_token]);
  const audioConfig = store.getState().user.audio || { ...configOptionsGlobal };
  const [state, setState] = useState({
    password: "••••••••••",
    sleepTime: false,
    musicQuality: 80,
    allowsRecordingIOS: `${audioConfig.allowsRecordingIOS}`,
    interruptionModeAndroid: `${audioConfig.interruptionModeAndroid}`,
    interruptionModeIOS: `${audioConfig.interruptionModeIOS}`,
    playThroughEarpieceAndroid: `${audioConfig.playThroughEarpieceAndroid}`,
    playsInSilentModeIOS: `${audioConfig.playsInSilentModeIOS}`,
    shouldDuckAndroid: `${audioConfig.shouldDuckAndroid}`,
    darkMode: false,
    staysActiveInBackground: `${audioConfig.staysActiveInBackground}`,
    facebookConnection: true,
    twitterConnection: false,
    instagramConnection: true,
    showEmailDialog: false,
    editableEmail: userData?.email,
    showPasswordDialog: false,
    oldPassword: null,
    newPassord: null,
    confirmPassword: null,
    showLogoutDialog: false,
  });
  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const removeData = () => {
    dispatch(userAction.logout());
    dispatch(nowPlayingAction.resetNowPlayingState());
  };
  const {
    showEmailDialog,
    editableEmail,
    showPasswordDialog,
    oldPassword,
    newPassord,
    confirmPassword,
    showLogoutDialog,
    darkMode,
  } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <View>
        <View>
          {header()}
          {isLoading ? loading() : <UserInforComponent userData={userData} />}
          {divider()}
          {isLoading ? (
            loading()
          ) : (
            <UpgradePremiumButton navigation={navigation} userData={userData} />
          )}
          {playBackInfo()}
          {divider()}
          {generalInfo()}
          {divider()}
          {logoutText()}
        </View>
      </View>
      {editEmailDialog()}
      {editPasswordDialog()}
      {logoutDialog()}
    </SafeAreaView>
  );
  function playBackInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.blackColor15Bold }}>PLAYBACK</Text>
        {autoPlayInfo()}
      </View>
    );
  }

  function autoPlayInfo() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ ...Fonts.blackColor14SemiBold }}>Autoplay</Text>
        <Switch
          trackColor={{ true: Colors.grayColor, false: Colors.grayColor }}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          color="#D81B60"
        />
      </View>
    );
  }

  function loading() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.blackColor} />
        <Text style={{ ...Fonts.whiteColor16Light }}>Loading</Text>
      </View>
    );
  }
  function logoutDialog() {
    return (
      <Dialog.Container
        visible={showLogoutDialog}
        contentStyle={styles.dialogWrapStyle}
        headerStyle={{ margin: 0.0, padding: 0.0 }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              ...Fonts.blackColor18Bold,
              paddingTop: Sizes.fixPadding * 2.0,
            }}
          >
            Are you sure want to Logout?
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => updateState({ showLogoutDialog: false })}
              style={styles.cancelButtonStyle}
            >
              <Text style={{ ...Fonts.blackColor15Bold }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                updateState({ showLogoutDialog: false });
                removeData();
                navigation.push(Navigate.SIGN_IN);
              }}
              style={styles.okButtonStyle}
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
                style={styles.okButtonGradientStyle}
              >
                <Text style={{ ...Fonts.whiteColor15Bold }}>Logout</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Container>
    );
  }

  function editPasswordDialog() {
    return (
      <Dialog.Container
        visible={showPasswordDialog}
        contentStyle={styles.dialogWrapStyle}
        headerStyle={{ margin: 0.0, padding: 0.0 }}
      >
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...Fonts.blackColor18Bold,
              paddingVertical: Sizes.fixPadding * 2.0,
            }}
          >
            Change Your Password
          </Text>
          <View style={{ width: "100%" }}>
            <TextInput
              secureTextEntry={true}
              placeholder="Old Password"
              placeholderTextColor={Colors.grayColor}
              selectionColor={Colors.primaryColor}
              value={oldPassword}
              onChangeText={(value) => updateState({ oldPassword: value })}
              style={styles.textFieldStyle}
            />
          </View>
          <View style={{ width: "100%" }}>
            <TextInput
              secureTextEntry={true}
              selectionColor={Colors.primaryColor}
              placeholder="New Password"
              placeholderTextColor={Colors.grayColor}
              value={newPassord}
              onChangeText={(value) => updateState({ newPassord: value })}
              style={{
                marginVertical: Sizes.fixPadding,
                ...styles.textFieldStyle,
              }}
            />
          </View>
          <View style={{ width: "100%" }}>
            <TextInput
              secureTextEntry={true}
              selectionColor={Colors.primaryColor}
              placeholder="Confirm New Password"
              placeholderTextColor={Colors.grayColor}
              value={confirmPassword}
              onChangeText={(value) => updateState({ confirmPassword: value })}
              style={styles.textFieldStyle}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                updateState({
                  showPasswordDialog: false,
                  oldPassword: null,
                  newPassord: null,
                  confirmPassword: null,
                })
              }
              style={styles.cancelButtonStyle}
            >
              <Text style={{ ...Fonts.blackColor15Bold }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                updateState({
                  showPasswordDialog: false,
                  oldPassword: null,
                  newPassord: null,
                  confirmPassword: null,
                });
              }}
              style={styles.okButtonStyle}
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
                style={styles.okButtonGradientStyle}
              >
                <Text style={{ ...Fonts.whiteColor15Bold }}>Okay</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Container>
    );
  }

  function editEmailDialog() {
    return (
      <Dialog.Container
        visible={showEmailDialog}
        contentStyle={styles.dialogWrapStyle}
        headerStyle={{ margin: 0.0, padding: 0.0 }}
      >
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...Fonts.blackColor18Bold,
              paddingVertical: Sizes.fixPadding * 2.0,
            }}
          >
            Change Email
          </Text>
          <View style={{ width: "100%" }}>
            <TextInput
              selectionColor={Colors.primaryColor}
              value={editableEmail}
              onChangeText={(value) => updateState({ editableEmail: value })}
              style={styles.textFieldStyle}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                updateState({ showEmailDialog: false, editableEmail: email })
              }
              style={styles.cancelButtonStyle}
            >
              <Text style={{ ...Fonts.blackColor15Bold }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                updateState({ showEmailDialog: false, email: editableEmail });
              }}
              style={styles.okButtonStyle}
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
                style={styles.okButtonGradientStyle}
              >
                <Text style={{ ...Fonts.whiteColor15Bold }}>Okay</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Container>
    );
  }

  function logoutText() {
    return (
      <Text
        onPress={() => updateState({ showLogoutDialog: true })}
        style={{
          marginBottom: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
          ...Fonts.redColor14SemiBold,
        }}
      >
        Logout
      </Text>
    );
  }

  function generalInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.blackColor15Bold }}>GENERAL</Text>
        {darkModeInfo()}
      </View>
    );
  }

  function darkModeInfo() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ ...Fonts.blackColor14SemiBold }}>Dark Mode</Text>
        <Switch
          trackColor={{ true: Colors.grayColor, false: Colors.grayColor }}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          color="#D81B60"
          value={darkMode}
          onValueChange={() => updateState({ darkMode: !darkMode })}
        />
      </View>
    );
  }

  function divider() {
    return (
      <View
        style={{
          backgroundColor: Colors.grayColor,
          height: 1.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding + 5.0,
        }}
      />
    );
  }

  function header() {
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
            Settings
          </Text>
        </View>
        <View style={{ width: "33.33%" }}></View>
      </View>
    );
  }
};

export const styles = StyleSheet.create({
  headerWrapStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  upgradePremiumButtonStyle: {
    alignItems: "center",
    height: 50.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "center",
    marginTop: Sizes.fixPadding + 5.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  songProcessSliderWrapStyle: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    marginTop: Sizes.fixPadding - 5.0,
  },
  dialogWrapStyle: {
    borderRadius: Sizes.fixPadding,
    width: width - 80,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingTop: -Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
  cancelButtonStyle: {
    flex: 0.5,
    backgroundColor: "#E2E2E2",
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding,
    marginRight: Sizes.fixPadding + 5.0,
  },
  okButtonStyle: {
    flex: 0.5,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Sizes.fixPadding + 5.0,
  },
  okButtonGradientStyle: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    borderRadius: Sizes.fixPadding - 5.0,
  },
  textFieldStyle: {
    ...Fonts.blackColor13Medium,
    paddingBottom: Sizes.fixPadding - 2.0,
    borderBottomColor: Colors.grayColor,
    borderBottomWidth: 0.7,
  },
});

export default SettingsScreen;
