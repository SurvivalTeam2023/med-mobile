import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback, useEffect } from "react";
import { BackHandler, View, ImageBackground, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { chatGPTAPI } from "../../api/chat.api";
import { parseTokenToRole } from "../../utils/app.util";
import { KeyboardAvoidingView } from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import { Text } from "react-native";
import { useSelector } from "react-redux";

const ChatScreen = ({ navigation }) => {
  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };
  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(true);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Welcome to Meditation Chat AI! Discover inner peace and miFndfulness through guided meditations, mindfulness exercises, and insightful discussions. Ask questions, share experiences, and embark on your journey to tranquility. Let's explore the world of meditation together.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Medy",
          avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712139.png",
        },
      },
    ]);
  }, []);
  const header = () => {
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
            Medy ChatBox
          </Text>
        </View>
        <View style={{ width: "33.33%" }}></View>
      </View>
    );
  };
  const onSend = useCallback((messages = []) => {
    console.log(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    chatGPTAPI(messages[0].text)
      .then((res) => {
        console.log(res);
        const newMessage = [
          {
            _id: 3,
            text: res,
            createdAt: new Date(),
            user: {
              _id: 4,
              name: "Medy",
              avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712139.png",
            },
          },
        ];
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessage)
        );
      })
      .catch((err) => console.log(err));
  }, []);
  const image = {
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6NPQf_WXzpzImkSte3VU5eyvoLsagANiaYA&usqp=CAU",
  };

  return (
    <View style={{ flex: 1 }}>
      {header()}
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.image}
        blurRadius={6}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          isTyping={isTyping}
        />
      </ImageBackground>
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});

export default ChatScreen;
