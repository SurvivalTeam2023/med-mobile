import { StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

export const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    padding: 8,
    borderBottomWidth: 0.5,
  },
  bodyWrapper: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
  },
  textTitle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor26Bold,
    textAlign: "center",
  },
  textInfo: {
    ...Fonts.whiteColor16Light,
    justifyContent: "center",
    textAlign: "center",
    paddingHorizontal: 36,
    paddingBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  btnText: {
    ...Fonts.whiteColor18SemiBold,
    borderWidth: 1,
    borderColor: Colors.greenDarkColor,
    paddingVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 36,
  },
  startQuizInfo: {
    paddingVertical: Sizes.fixPadding + 10,
    paddingBottom: 30,
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
  },
});
