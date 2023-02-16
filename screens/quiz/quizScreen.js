import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import {
  Modal,
  Button,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const Separator = () => <View style={styles.separator} />;

const QuizScreen = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />

      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>How was your day ?</Text>
          <Separator />
        </View>
        <View style={styles.info}>
          <Text style={{ paddingHorizontal: 5, fontSize: 16 }}>
            Let's know more about yourself
          </Text>
          <Image
            style={styles.logo}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1858/1858095.png",
            }}
          />
        </View>

        <Modal
          animationType={"fade"}
          transparent={false}
          visible={showModal}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          {/*All views of Modal*/}
          {/*Animation can be slide, slide, none*/}
          <View style={styles.modal}>
            <Text style={styles.text}>Modal is open!</Text>
            <Button
              title="Click To Close Modal"
              onPress={() => {
                setShowModal(!showModal);
              }}
            />
          </View>
        </Modal>
        {/*Button will change state to true and view will re-render*/}
        <Pressable
          style={styles.startBtn}
          onPress={() => {
            setShowModal(!showModal);
          }}
        >
          <Text style={{ color: "" }}>Getting started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#223864",
    marginTop: 30,
    paddingBottom: 50,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00ff00",
    padding: 100,
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
  titleText: {
    color: "#D9D9D9",
    fontSize: 24,
  },
  title: {
    marginTop: 50,
  },
  startBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "#D8E2E8",
    borderRadius: 40,
  },
  separator: {
    marginVertical: 20,
    marginHorizontal: -80,
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logo: {
    width: 90,
    height: 80,
  },
  info: {
    backgroundColor: "#D8E2E8",
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 50,
    marginVertical: 200,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 50,
  },
});

export default QuizScreen;
