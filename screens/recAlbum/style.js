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
    ...Fonts.blackColor26SemiBold,
    paddingHorizontal: 36,
    paddingBottom: 50,
  },
  textInfo: {
    ...Fonts.grayColor18SemiBold,
    paddingHorizontal: 36,
    marginBottom: 50,
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
    ...Fonts.grayColor16SemiBold,
    borderWidth: 1,
    borderColor: Colors.greenDarkColor,
    paddingVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 36,
    backgroundColor: Colors.greenLightColor,
  },
});
