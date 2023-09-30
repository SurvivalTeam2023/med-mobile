import { TouchableOpacity } from "react-native-gesture-handler";
import { Navigate } from "../../constants/navigate";
import { ImageBackground, Text } from "react-native";
import { SUBSCRIPTION_STATUS } from "../../constants/app";
import { Fonts, Sizes } from "../../constants/styles";
import { styles } from "./settingsScreen";

const SubscriptionTitle = (props) => {
  const { text, navigation } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.push(Navigate.SUBSCRIBE)}
    >
      <ImageBackground
        source={require("../../assets/images/banner-design.png")}
        style={styles.upgradePremiumButtonStyle}
        borderRadius={Sizes.fixPadding - 7.0}
        resizeMode="contain"
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>{text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};
const subscriptedTitle = (text) => (
  <TouchableOpacity activeOpacity={0.9}>
    <ImageBackground
      source={require("../../assets/images/banner-design.png")}
      style={styles.upgradePremiumButtonStyle}
      borderRadius={Sizes.fixPadding - 7.0}
      resizeMode="contain"
    >
      <Text style={{ ...Fonts.whiteColor18Bold }}>{text}</Text>
    </ImageBackground>
  </TouchableOpacity>
);
export const UpgradePremiumButton = (props) => {
  const { userData, navigation } = props;
  const subscriptionStatus = userData?.lastestSub || null;
  console.log(subscriptionStatus);
  if (!subscriptionStatus) {
    return (
      <SubscriptionTitle
        text={"Upgrade to My Music Premium"}
        navigation={navigation}
      />
    );
  } else {
    switch (subscriptionStatus.status) {
      case SUBSCRIPTION_STATUS.ACTIVE:
        return subscriptedTitle("You are Subscribed!");
      case SUBSCRIPTION_STATUS.APPROVAL_PENDING:
        return subscriptedTitle("Your Supscription is Processing");
      case SUBSCRIPTION_STATUS.APPROVED:
        return subscriptedTitle("Your Supscription is Processing");
      case SUBSCRIPTION_STATUS.CANCELLED:
        return (
          <SubscriptionTitle
            text={"Upgrade to My Music Premium"}
            navigation={navigation}
          />
        );
      case SUBSCRIPTION_STATUS.EXPIRED:
        return (
          <SubscriptionTitle
            text={"Subscription is EXPIRED!"}
            navigation={navigation}
          />
        );
      case SUBSCRIPTION_STATUS.SUSPENDED:
        return (
          <SubscriptionTitle
            text={"Subscription is SUSPENDED!"}
            navigation={navigation}
          />
        );
    }
  }
};
