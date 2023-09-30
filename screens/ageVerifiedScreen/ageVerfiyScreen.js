import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFavoriteExisted } from "../../hooks/favorite.hook";
import { Navigate } from "../../constants/navigate";
import { store } from "../../core/store/store";
import { fetchUserData } from "../../redux/auth/auth.action";

import { useDispatch, useSelector } from "react-redux";
import { getFormatedDate, DatePicker } from "react-native-modern-datepicker";
import moment from "moment";
import { useUpdateUserAccountDetails } from "../../hooks/user.hook";
import { userAction } from "../../redux/auth/auth.slice";
import { adsAction } from "../../redux/ads/ads.slice";
const Separator = () => <View style={styles.separator} />;

let isFavoriteExisted = [];
const AgeVerifyScreen = ({ navigation }) => {
  const userInfo = store.getState().user.data;
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY-MM-DD"
  );
  useEffect(() => {
    if (userInfo) {
      navigation.push(Navigate.CHOOSE_MENTAL_SCREEN);
    }
  }, []);
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [startedDate, setStartedDate] = useState(startDate);
  const { mutate } = useUpdateUserAccountDetails();
  const dispatch = useDispatch();

  const access_token = store.getState().user.token;
  const getAge = (date) => {
    const curDate = date.split("-");
    var newDate = new Date(curDate[0], curDate[1] - 1, curDate[2]);
    const currentYear = moment();
    const age = currentYear.diff(newDate, "years");
  };

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  const userData = useSelector((state) => state?.user?.data);

  const { data: dataIsFavoriteExisted, isSuccess: successIsFavoriteExisted } =
    useIsFavoriteExisted();
  if (successIsFavoriteExisted) {
    isFavoriteExisted = dataIsFavoriteExisted;
  }
  const handleUpdateAccountDetails = async (form) => {
    mutate(form, {
      onSuccess: async (data) => {
        Alert.alert("Update Success");
        const userData = await fetchUserData(access_token);
        if (userData) {
          dispatch(userAction.storeUser(userData));
          const subscriptionStatus = userData?.lastestSub || null;
        dispatch(adsAction.setSubscription(subscriptionStatus));
          setTimeout(() => {
            navigation.push(Navigate.CHOOSE_MENTAL_SCREEN);
          }, 1000);
        }
      },
      onError: (error) => {
        console.log("Update failed", error);
      },
    });
  };

  const saveUpdateAccountDetails = async () => {
    const formData = new FormData();
    const curDate = selectedStartDate.split("/");
    var newDate = new Date(curDate[0], curDate[1] - 1, curDate[2]);
    moment(newDate).format("YYYY-MM-DD");
    console.log(typeof moment(newDate).format("YYYY-MM-DD"));

    // newDate = moment().format("YYYY-MM-DD");
    if (newDate) {
      formData.append("dob", moment(newDate).format("YYYY-MM-DD"));
    }

    console.log(formData);
    handleUpdateAccountDetails(formData);
  };
  const onPressHandler = () => {
    if (isFavoriteExisted.exists === true) {
      navigation.push(Navigate.BOTTOM_TAB_BAR);
    }
    if (isFavoriteExisted.exists === false) {
      navigation.push(Navigate.CHOOSE_MUSIC);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <View>{startQuizTitle()}</View>
    </SafeAreaView>
  );

  function startQuizTitle() {
    return (
      <View>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : ""}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.textHeader}>
              {userData?.username}, how old are you?
            </Text>
            <Text
              style={{
                ...Fonts.grayColor18Medium,
                textAlign: "left",
                marginTop: 16,
                paddingLeft: 16,
              }}
            >
              We would like to help you by providing approriate support based on
              your date of birth?
            </Text>

            <View
              style={{
                width: "100%",
                paddingHorizontal: 22,
                marginTop: Sizes.fixPadding * 15,
              }}
            >
              <View>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                  Date of birth
                </Text>
                <TouchableOpacity
                  style={styles.inputBtn}
                  onPress={handleOnPressStartDate}
                >
                  <Text>{selectedStartDate}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  saveUpdateAccountDetails();
                }}
                style={styles.signInButtonStyle}
              >
                <LinearGradient
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}
                  colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
                  style={styles.signInButtonGradientStyle}
                >
                  <Text style={{ ...Fonts.whiteColor18Bold }}>Continue</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Create modal for date picker */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={openStartDatePicker}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <DatePicker
                    mode="calendar"
                    selected={startedDate}
                    onDateChanged={handleChangeStartDate}
                    onSelectedChange={(date) => setSelectedStartDate(date)}
                    options={{
                      backgroundColor: "#080516",
                      textHeaderColor: "#469ab6",
                      textDefaultColor: "#FFFFFF",
                      selectedTextColor: "#FFF",
                      mainColor: "#469ab6",
                      textSecondaryColor: "#FFFFFF",
                      borderColor: "rgba(122, 146, 165, 0.1)",
                    }}
                  />

                  <TouchableOpacity onPress={handleOnPressStartDate}>
                    <Text style={{ color: "white" }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textHeader: {
    ...Fonts.grey26Color333333,
    marginTop: 36,
    textAlign: "left",
    paddingLeft: 16,
  },
  signInButtonGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 10,
  },
  textSubHeader: {
    fontSize: 25,
    color: "#111",
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#222",
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 14,
  },
  submitBtn: {
    backgroundColor: "linear-gradient(#342342, #123123)",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 16,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    marginTop: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginHorizontal: 150,
  },
  picker: { width: "99%" },
  pickerItemIOS: {
    fontSize: 20,
  },
  titleInfoStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor18Bold,
    textAlign: "center",
  },
  signInButtonStyle: {
    marginTop: Sizes.fixPadding * 15,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  signInButtonGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 5,
    marginHorizontal: Sizes.fixPadding * 5,
  },
  quizzingTitleStyle: {
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
  startQuizGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 20.0,
    marginTop: Sizes.fixPadding - 40.0,
  },

  nextQuizBtnGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Sizes.fixPadding + 20.0,
    marginHorizontal: Sizes.fixPadding * 10.0,

    borderRadius: Sizes.fixPadding + 20.0,
  },
  backQuizBtnGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Sizes.fixPadding + 20.0,
    marginHorizontal: Sizes.fixPadding * 10.0,
    marginBottom: Sizes.fixPadding * 5.0,
    borderRadius: Sizes.fixPadding + 20.0,
  },
  startQuizButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 5.0,
    marginHorizontal: Sizes.fixPadding * 10.0,
    borderRadius: Sizes.fixPadding - 4.0,
  },

  titleQuizText: {
    ...Fonts.blackColor20Bold,
    textAlign: "justify",
  },

  titleQuiz: {
    width: 350,
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  separator: {
    marginVertical: 20,
    marginHorizontal: -80,
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  describeQuizText: {
    ...Fonts.whiteColor16Light,
    width: 300,
    justifyContent: "center",
  },

  questionInfo: {
    marginTop: 15,
    justifyContent: "flex-start",
  },
  answerInfo: {
    alignContent: "center",
    backgroundColor: "#D8E2E8",
    marginTop: 40,
    width: 400,
    marginHorizontal: 5,
    height: 50,
    borderRadius: 20,
  },
  answerInfoChoose: {
    alignContent: "center",
    backgroundColor: "#D8E2E8",
    marginTop: 40,
    marginHorizontal: 5,
    width: 400,
    backgroundColor: "green",
    height: 50,
    borderRadius: 20,
  },
  quizInfo: {
    flex: 1,
    flexDirection: "column",
  },
  roundButton1: {
    width: 38,
    height: 38,
    padding: 5,
    borderRadius: 100,
  },
});

export default AgeVerifyScreen;
