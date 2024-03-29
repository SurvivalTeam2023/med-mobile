import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { chatGPTAPI } from "../../api/chat.api";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import {
  BackHandler,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

const ChatScreen = ({ navigation }) => {
  const backAction = () => {
    backClickCount === 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchFirstMessages();
  }, []);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  const fetchFirstMessages = () => {
    const staticMessages = [
      {
        _id: 1,
        text: "Welcome to Meditation Chat AI! Discover inner peace and mindfulness through guided meditations, mindfulness exercises, and insightful discussions. Ask questions, share experiences, and embark on your journey to tranquility. Let's explore the world of meditation together.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Medy",
          avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712139.png",
        },
      },
    ];
    setMessages(staticMessages);
  };

  const sendMessage = (text) => {
    chatGPTAPI(text)
      .then((res) => {
        const newMessage = {
          _id: Math.random().toString(36).substring(7),
          text: res,
          createdAt: new Date(),
          user: {
            _id: 4,
            name: "Medy",
            avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712139.png",
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [newMessage])
        );
      })
      .catch((err) => console.log(err));
  };

  const onSend = useCallback((messages = []) => {
    const latestMessage = messages[0];
    if (
      latestMessage &&
      latestMessage.text !== messages[messages.length - 2]?.text
    ) {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      const { text } = latestMessage;
      sendMessage(text);
    }
  }, []);

  const image = {
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6NPQf_WXzpzImkSte3VU5eyvoLsagANiaYA&usqp=CAU",
  };

  const header = useMemo(() => {
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
              color={[
                { color: Colors.primaryColor, offset: "0.15", opacity: "0.75" },
                { color: Colors.secondaryColor, offset: "1", opacity: "0.8" },
              ]}
            />
            <Text style={Fonts.grayColor18SemiBold}>Back</Text>
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
  }, [navigation]);

  return (
    <View style={styles.container}>
      {header}
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.image}
        blurRadius={6}
      >
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: 1,
          }}
          isTyping={true}
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
});
export default ChatScreen;
