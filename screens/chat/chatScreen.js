import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback, useEffect } from "react";
import { BackHandler, View, ImageBackground, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { chatGPTAPI } from "../../api/chat.api";
import { parseTokenToRole } from "../../utils/app.util";

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
        text: "Welcome to Meditation Chat AI! Discover inner peace and mindfulness through guided meditations, mindfulness exercises, and insightful discussions. Ask questions, share experiences, and embark on your journey to tranquility. Let's explore the world of meditation together.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    chatGPTAPI(messages[0].text)
      .then((res) => {
        console.log(res);
        const newMessage = [
          {
            _id: 1,
            text: res,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "Med AI",
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
    uri: "https://www.mordeo.org/files/uploads/2020/03/Miku-Anime-Girl-Flowers-4K-Ultra-HD-Mobile-Wallpaper-1152x2048.jpg",
  };

  return (
    <View style={{ flex: 1 }}>
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
