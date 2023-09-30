import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useRegisterUser } from "../../hooks/auth.hook";
import { Navigate } from "../../constants/navigate";
const SignupScreen = ({ navigation }) => {
  const [isFailed, setIsFailed] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  //signup
  const [state, setState] = useState({
    showPassword: true,
    username: null,
    emailAddress: null,
    password: null,
    rePassword: null,
    dob: null,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const { mutate } = useRegisterUser();
  const handleSignUp = () => {
    mutate(
      {
        username: state["username"],
        email: state["emailAddress"],
        password: state["password"],
        repassword: state["rePassword"],
        dob: state["dob"],
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            navigation.push("VerifyEmail");
          }, 2000);
        },
        onError: (error) => {
          setErrorMessage(
            error.response.data.error[0].message.errorMessage ||
              error.response.data.error[0].message
          );
          setIsFailed(true);
        },
      }
    );
  };
  const { showPassword, username, emailAddress, password, rePassword, dob } =
    state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
          ListHeaderComponent={
            <View>
              {header()}
              {signupInfo()}
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
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
          <Text
            style={{ ...Fonts.blackColor18SemiBold, textAlign: "center" }}
          ></Text>
        </View>
        <View style={{ width: "33.33%" }}></View>
      </View>
    );
  }
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
            colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
            style={{ flex: 1 }}
          />
        </MaskedView>
        {isFailed && (
          <View style={styles.failWarningWrapper}>
            <Text style={{ color: "red", fontStyle: "italic" }}>
              {errorMessage}
            </Text>
            <Feather
              name="delete"
              size={24}
              color="red"
              onPress={() => {
                setIsFailed(false);
              }}
            />
          </View>
        )}

        {usernameTextField()}
        {emailAddressTextField()}
        {dobTextField()}
        {passwordTextField()}
        {rePasswordTextField()}
        {signupButton()}
        {orIndicator()}
        {socialMediaOptions()}
        {alreadyHaveAccountInfo()}
      </View>
    );
  }

  function dobTextField() {
    return (
      <View style={styles.textFieldWrapStyle}>
        <MaterialIcons name="email" color={Colors.grayColor} size={20} />
        <TextInput
          value={dob}
          onChangeText={(text) => updateState({ dob: text })}
          selectionColor={Colors.grayColor}
          placeholder="Input dob format YYYY-MM-DD"
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
            onPress={() => navigation.push(Navigate.SIGN_IN)}
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
                colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
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
          <Image
            source={require("../../assets/images/icon/google-icon.png")}
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
        onPress={() => handleSignUp()}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
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
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          color={Colors.grayColor}
          size={20}
          onPress={() => updateState({ showPassword: !showPassword })}
        />
      </View>
    );
  }
  function rePasswordTextField() {
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
            value={rePassword}
            onChangeText={(text) => updateState({ rePassword: text })}
            secureTextEntry={showPassword}
            selectionColor={Colors.grayColor}
            placeholder="Confirm Password"
            placeholderTextColor={Colors.grayColor}
            style={{
              flex: 1,
              ...Fonts.blackColor13Bold,
              marginLeft: Sizes.fixPadding,
            }}
          />
        </View>
        <MaterialCommunityIcons
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          color={Colors.grayColor}
          size={20}
          onPress={() => updateState({ showPassword: !showPassword })}
        />
      </View>
    );
  }

  function usernameTextField() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 2.5,
          ...styles.textFieldWrapStyle,
        }}
      >
        <MaterialIcons name="person" color={Colors.grayColor} size={20} />
        <TextInput
          value={username}
          onChangeText={(text) => updateState({ username: text })}
          selectionColor={Colors.grayColor}
          placeholder="Username"
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
  headerWrapStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
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
  failWarningWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Sizes.fixPadding + 15,
    marginTop: Sizes.fixPadding,
  },
});

export default SignupScreen;
