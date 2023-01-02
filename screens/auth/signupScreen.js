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
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

//aaa
const SignupScreen = ({ navigation }) => {
  const [state, setState] = useState({
    showPassword: false,
    fullName: null,
    phoneNumber: null,
    emailAddress: null,
    password: null,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { showPassword, fullName, phoneNumber, emailAddress, password } = state;

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
              SIGN UP
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
        {fullNameTextField()}
        {phoneNumberTextField()}
        {emailAddressTextField()}
        {passwordTextField()}
        {signupButton()}
        {orIndicator()}
        {socialMediaOptions()}
        {alreadyHaveAccountInfo()}
      </View>
    );
  }

  function emailAddressTextField() {
    return (
      <View style={styles.textFieldWrapStyle}>
        <MaterialIcons name="email" color={Colors.grayColor} size={20} />
        <TextInput
          value={emailAddress}
          onChangeText={(text) => updateState({ emailAddress: text })}
          selectionColor={Colors.grayColor}
          placeholder="Email Address"
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

  function phoneNumberTextField() {
    return (
      <View style={styles.textFieldWrapStyle}>
        <MaterialIcons
          name="phone-android"
          color={Colors.grayColor}
          size={20}
        />
        <TextInput
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={(text) => updateState({ phoneNumber: text })}
          selectionColor={Colors.grayColor}
          placeholder="Phone Number"
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

  function alreadyHaveAccountInfo() {
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
            Already have an account ?
          </Text>
          <TouchableOpacity
            style={{ flex: 0.3 }}
            activeOpacity={0.9}
            onPress={() => navigation.push("Signin")}
          >
            <MaskedView
              style={{ flex: 0.3, height: 18 }}
              maskElement={
                <Text style={{ ...Fonts.blackColor13Bold }}>sign in</Text>
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
            backgroundColor: "#4267B2",
            ...styles.socialMediaIconsStyle,
          }}
        >
          <Image
            source={require("../../assets/images/icon/facebook-icon.png")}
            style={{ width: 15.0, height: 15.0 }}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            backgroundColor: "#EA4335",
            ...styles.socialMediaIconsStyle,
            marginHorizontal: Sizes.fixPadding - 5.0,
          }}
        >
          <Image
            source={require("../../assets/images/icon/google-icon.png")}
            style={{ width: 15.0, height: 15.0 }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            backgroundColor: "#00A1F2",
            ...styles.socialMediaIconsStyle,
          }}
        >
          <Image
            source={require("../../assets/images/icon/twitter-icon.png")}
            style={{ width: 15.0, height: 15.0 }}
            resizeMode="contain"
          />
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

  function signupButton() {
    return (
      <TouchableOpacity
        style={styles.signupButtonStyle}
        activeOpacity={0.9}
        onPress={() => navigation.push("ChooseMusic")}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.signupButtonGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>SIGN UP</Text>
        </LinearGradient>
      </TouchableOpacity>
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

  function fullNameTextField() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 2.5,
          ...styles.textFieldWrapStyle,
        }}
      >
        <MaterialIcons name="person" color={Colors.grayColor} size={20} />
        <TextInput
          value={fullName}
          onChangeText={(text) => updateState({ fullName: text })}
          selectionColor={Colors.grayColor}
          placeholder="Full Name"
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
});

export default SignupScreen;
