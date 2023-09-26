import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Dimensions,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useGetGenreList } from "../../hooks/genre.hook";
import { Navigate } from "../../constants/navigate";
import {
  useGetMentalHealthListAPI,
  useSelectUserMentalHealthAPI,
} from "../../hooks/mentalHealth";

const { width } = Dimensions.get("window");

let musicsList = [];

const ChooseMentalHealthScreen = ({ navigation }) => {
  const { data, error, isSuccess, isError } = useGetGenreList();
  const { mutate } = useSelectUserMentalHealthAPI();
  const [isSelect, setIsSelected] = useState();
  //Get mental health list
  const {
    data: dataMentalHealth,
    isSuccess: isSuccessMentalHealth,
    isError: isErrorMentalHealth,
    isLoading: isLoadingMentalHealth,
    error: errorMentalHealth,
  } = useGetMentalHealthListAPI();

  if (isSuccessMentalHealth) {
    musicsList = dataMentalHealth;
  }

  const selectMentalHealth = () => {
    mutate(
      { mentalHealthId: [selectedGenreIds] },

      {
        onSuccess: (data) => {
          console.log(data);
          navigation.push(Navigate.BOTTOM_TAB_BAR);
        },
        onError: (error) => {
          console.log("error creating favorite", error);
        },
      }
    );
  };

  const [state, setState] = useState({
    musicsData: [],
  });

  useEffect(() => {
    setState({ musicsData: musicsList });
  }, [musicsList]);

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { musicsData } = state;

  const selectedGenreIds = musicsData
    .filter((item) => item.selected === true)
    .map((item) => item.id);

  const button = () => {
    return selectedGenreIds.length > 0 ? (
      <TouchableOpacity
        onPress={() => {
          selectMentalHealth();
        }}
        style={styles.signInButtonStyle}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
          style={styles.signInButtonGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>That's all for now</Text>
        </LinearGradient>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          navigation.push(Navigate.BOTTOM_TAB_BAR);
        }}
        style={styles.signInButtonStyle}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
          style={styles.signInButtonGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>Maybe Later</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <>
              {chooseMusicTitle()}
              {musics()}
            </>
          }
          showsVerticalScrollIndicator={false}
        ></FlatList>
        {button()}
      </View>
    </SafeAreaView>
  );

  function updateMusics({ id }) {
    const newList = musicsData?.map((item) => {
      ({ ...item, selected: false });
      if (item?.id === id) {
        const updatedItem = { ...item, selected: !item.selected };
        return updatedItem;
      }
      return item;
    });
    updateState({ musicsData: newList });
  }

  function musics() {
    const renderItem = ({ item, index }) => (
      <View
        style={{
          marginHorizontal: 12,
          marginVertical: 12,
          alignItems: "center",
        }}
      >
        {isSuccessMentalHealth ? (
          <TouchableOpacity
            activeOpacity={0.9}
            style={item.selected ? styles.selectedItem : styles.item}
            onPress={() => {
              updateMusics({ id: item?.id });
            }}
          >
            <ImageBackground
              source={{ uri: `${item.imageUrl}` }}
              style={{
                width: width / 2.4,
                height: width / 4.0,
                justifyContent: "center", // Center vertically
                alignItems: "center", // Center horizontally
                borderRadius: 20, // Adjust the borderRadius value to control roundness
                overflow: "hidden", // Clip the contents within the rounded border
                position: "relative", // To enable absolute positioning of the checkbox
              }}
            >
              {item.selected ? (
                <View
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    padding: 2, // Adjust the padding to position the checkbox
                    backgroundColor: "#FAF9F6",
                    borderRadius: 90,
                  }}
                >
                  <MaterialIcons
                    name="check"
                    color={Colors.greenLightColor}
                    size={20}
                  />
                </View>
              ) : null}
              <Text
                style={{
                  display: "flex",
                  textAlign: "center",
                  alignContent: "center",
                  paddingHorizontal: 12,
                  marginTop: Sizes.fixPadding - 8.0,
                  ...Fonts.blackColor14SemiBold,
                }}
              >
                {item.name}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        ) : (
          <View style={styles.container}>
            <ActivityIndicator size="small" color="#f8b26a" />
          </View>
        )}
      </View>
    );
    return (
      <FlatList
        scrollEnabled={false}
        data={musicsData}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "center",
        }}
      />
    );
  }

  function chooseMusicTitle() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding,
          marginBottom: Sizes.fixPadding * 3.5,
        }}
      >
        <Text style={{ textAlign: "center", ...Fonts.grey26Color55555 }}>
          Building up your space...
        </Text>
        <Text
          style={{
            ...Fonts.grayColor18Medium,
            textAlign: "center",
            marginTop: 16,
          }}
        >
          Add mental health you want to improve
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  skipAndNextTextWrapStyle: {
    flexDirection: "row",
    marginTop: Sizes.fixPadding - 30.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "space-between",
  },
  signInButtonStyle: {
    marginBottom: Sizes.fixPadding * 10,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  signInButtonGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 5,
    marginHorizontal: Sizes.fixPadding * 5,
  },
});

export default ChooseMentalHealthScreen;
