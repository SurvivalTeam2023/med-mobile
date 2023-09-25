import { styles } from "../style";
import { Fonts } from "../../../constants/styles";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { ImageBackground } from "react-native";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetExercisesListBySingleMentalIdAPI } from "../../../hooks/exercise.hook";
import { Navigate } from "../../../constants/navigate";
import { DEFAULT, MEDITATION } from "../../../constants/keyword";
import { nowPlayingAction } from "../../../redux/audio/nowPlayingList.slice";
import { useGetAudioRecommendByMentalIdAPI } from "../../../hooks/audio.hook";
import { getAudioRecommendByMentalIdAPI } from "../../../api/audio.api";

export const exercise = ({ navigation }) => {
  const idSelected = useSelector((state) => state.mentalHealth.idSelected);
  const dataSelected = useSelector((state) => state.mentalHealth.dataSelected);
  const { data: dataExercises, isSuccess: isSuccessExercises } =
    useGetExercisesListBySingleMentalIdAPI(idSelected);
  const dispatch = useDispatch();

  const getAudioByMentalHealthId = async () => {
    if (idSelected) {
      const promises = await getAudioRecommendByMentalIdAPI(idSelected);
      console.log(promises);
      console.log("here");
      // dispatch(nowPlayingAction.addAudioToPlayList(responses));
    }
  };

  // const getAudioByMentalHealthId = async () => {
  //   try {
  //     if (isSuccessSelectedMental) {
  //       let selectedMentalList = dataSelectedMental;
  //       let responses = [];
  //       let audioListMentalId;
  //       let audioSingleMental;
  //       let randomAudio;
  //       if (selectedMentalList) {
  //         const promises = selectedMentalList.map((item) =>
  //           getAudioRecommendByMentalIdAPI(item.id)
  //         );

  //         responses = await Promise.all(promises);
  //         if (responses) {
  //           audioListMentalId = responses?.map((e, index) => e.audios);
  //           randomAudio =
  //             audioListMentalId[
  //               Math.floor(Math.random() * audioListMentalId.length)
  //             ];
  //         }
  //         navigation.push(Navigate.MEDITATE_SCREEN, {
  //           data: audioListMentalId,
  //         });
  //       }
  //     }
  //   } catch (error) {}
  // };

  const handleClickExercise = (exercise) => {
    const { type, content } = exercise;
    if (type === DEFAULT) {
      if (content === "Meditate") {
        getAudioByMentalHealthId();
      } else if (content !== "Meditate") {
        console.log(content);
        navigation.push(content, { data: dataSelected });
      }
    } else {
      navigation.push(Navigate.EXERCISE_CONTENT_SCREEN, { data: exercise });
    }
  };

  return (
    <View>
      <View style={styles.titleWrapStyle}>
        <Text style={styles.titleStyle}>The Exercise</Text>
      </View>
      {dataExercises ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: 16,
          }}
        >
          {dataExercises?.map((item, index) => (
            <View
              key={item?.id}
              style={{
                width: "50%", // This makes each item take up 50% of the row width
                padding: 8, // Add padding between items
                alignItems: "center", // Center items horizontally
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  handleClickExercise(item);
                }}
              >
                <ImageBackground
                  source={{
                    uri:
                      item.image ||
                      "https://e0.pxfuel.com/wallpapers/219/820/desktop-wallpaper-chill-cartoon-top-chill-cartoon-background-for-your-mobile-tablet-explore-chill-background-chill-vibes-be-more-chill-chill-aesthetic.jpg",
                  }}
                  style={{
                    width: 175,
                    height: 200,
                    borderRadius: 10,
                    borderWidth: 0.2,
                    overflow: "hidden", // Clip the image to the rounded border
                  }} // Adjust the dimensions as needed>
                >
                  <View
                    style={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      padding: 4,
                    }}
                  >
                    <Text
                      style={{
                        ...Fonts.grayColorf8f9fa18SemiBold,
                        textAlign: "left",
                        paddingRight: 8,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            fontWeight: "100",
            paddingVertical: 8,
          }}
        >
          Select Mental Health To Get Exercises
        </Text>
      )}
    </View>
  );
};
