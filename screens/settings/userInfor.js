import { View, Text } from "react-native";
import { Fonts, Sizes } from "../../constants/styles";

export const UserInforComponent = (props) => {
  const { userData } = props;
  const { username, email } = userData;
  return (
    <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
      <Text
        style={{
          marginVertical: Sizes.fixPadding,
          ...Fonts.blackColor18Bold,
        }}
      >
        USER ACCOUNT
      </Text>
      <View
        style={{
          marginBottom: Sizes.fixPadding - 5.0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ ...Fonts.semiBold16 }}>{username}</Text>
      </View>
      <View
        style={{
          marginBottom: Sizes.fixPadding - 5.0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ ...Fonts.semiBold16 }}>{email}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          onPress={() => updateState({ showPasswordDialog: true })}
          style={{ ...Fonts.grayColor12SemiBold }}
        >
          Change password
        </Text>
      </View>
    </View>
  );
};
