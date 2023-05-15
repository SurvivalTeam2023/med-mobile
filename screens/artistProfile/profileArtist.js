import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { AntDesign } from "@expo/vector-icons";
import { useGetArtistTotalFollowerApi } from "../../hooks/artist.hook";
import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useGetArtistWalletApi } from "../../hooks/wallet.hook";
const ProfileArtistScreen = ({ navigation }) => {
  const { data, isSuccess, isError, error } = useGetArtistTotalFollowerApi();
  const [modalVisible, setModalVisible] = useState(false);
  let paymentInfo = {};
  const {
    data: dataWallet,
    isSuccess: isSuccessWallet,
    isError: isErrorWallet,
    error: errorWallet,
  } = useGetArtistWalletApi();
  let follower;
  if (isSuccessWallet) {
    const rawData = dataWallet["data"];
    paymentInfo = rawData[0];
  }
  if (isErrorWallet) {
    console.log("error", errorWallet);
  }

  if (isSuccess) {
    follower = data["data"];
  }
  if (isError) {
    console.log("error", error);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <View>
              {cornerImage()}
              {header()}
              {Profile()}
              {ManageAlbum()}
              {showModal()}
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
        />
      </View>
    </SafeAreaView>
  );
  function showModal() {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ ...Fonts.blackColor20Bold, marginBottom: 40 }}>
                Payment Info
              </Text>
              <View style={{ justifyContent: "flex-start" }}>
                <Text style={styles.modalText}>
                  Owner: {paymentInfo["bankAccountOwner"]}
                </Text>
                <Text style={styles.modalText}>
                  Bank: {paymentInfo["bankName"]}
                </Text>
                <Text style={styles.modalText}>
                  Account number: {paymentInfo["bankAccountNumber"]}
                </Text>
              </View>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Ok</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  function ManageAlbum() {
    return (
      <View>
        <TouchableOpacity
          style={styles.manageAlbumButtonStyle}
          activeOpacity={0.9}
          onPress={() => {
            navigation.push("ManageArtistAlbum");
          }}
        >
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
            style={styles.manageAlbumButtonGradientStyle}
          >
            <Text style={{ ...Fonts.whiteColor18Bold }}>Manage Album</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  function Profile() {
    return (
      <View>
        <View style={styles.backdrop}>
          <View style={styles.imageRow}>
            <Image
              source={{
                uri: "https://www.nme.com/wp-content/uploads/2019/10/Webp.net-resizeimage-12-696x442.jpg",
              }}
              resizeMode="contain"
              style={styles.image}
            ></Image>
            <View>
              <Text style={{ ...Fonts.blackColor20Bold }}>Eminem</Text>
              <Text style={styles.desc}>Dope ass rapper</Text>
            </View>
            <View>
              <AntDesign
                style={{ marginRight: 10 }}
                name="edit"
                size={24}
                color="black"
              />
              <FontAwesome5
                style={{ marginTop: 10 }}
                name="money-bill-alt"
                size={24}
                color="black"
                onPress={() => setModalVisible(true)}
              />
            </View>
          </View>

          <View style={styles.favoritedRow}>
            <View>
              <Text>Favorited</Text>
              <Text>1M</Text>
            </View>
            <View>
              <Text>Playlist</Text>
              <Text>1M</Text>
            </View>
            <View style={{ justifyContent: "flex-start" }}>
              <Text>Followers</Text>
              <Text>{follower}</Text>
            </View>
          </View>
        </View>
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

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaskedView
          style={{ flex: 1, height: 28 }}
          maskElement={<Text style={{ ...Fonts.bold22 }}>Profile</Text>}
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding - 30.0,
    marginBottom: Sizes.fixPadding + 5.0,
  },
  backdrop: {
    backgroundColor: "#E6E6E6",
    borderRadius: 30,
    marginHorizontal: 10,
    borderWidth: 2,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 200,
  },

  desc: {
    color: "#121212",
  },
  imageRow: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 5,
    marginTop: 5,
  },

  favoritedRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding + 10,
    marginTop: Sizes.fixPadding + 10,
    marginBottom: Sizes.fixPadding,
  },

  titleStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.blackColor15Bold,
  },
  titleWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  manageAlbumButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2.5,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  manageAlbumButtonGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 5.0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ProfileArtistScreen;
