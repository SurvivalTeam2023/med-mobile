import { styles } from "../style";
import { Fonts } from "../../../constants/styles";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { ImageBackground } from "react-native";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetExercisesListBySingleMentalIdAPI } from "../../../hooks/exercise.hook";
import { Navigate } from "../../../constants/navigate";
import { CHAT_WITH_AI, DEFAULT, MEDITATION } from "../../../constants/keyword";
import { nowPlayingAction } from "../../../redux/audio/nowPlayingList.slice";
import { useGetAudioRecommendByMentalIdAPI } from "../../../hooks/audio.hook";
import { getAudioRecommendByMentalIdAPI } from "../../../api/audio.api";
import { MaterialIcons } from "@expo/vector-icons";
import { validatePathConfig } from "@react-navigation/native";
import { useGetSubscriptionByUserId } from "../../../hooks/subscription.hook";
export const exercise = ({ navigation }) => {
  const idSelected = useSelector((state) => state.mentalHealth.idSelected);
  const dataSelected = useSelector((state) => state.mentalHealth.dataSelected);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const { data: dataExercises, isSuccess: isSuccessExercises } =
    useGetExercisesListBySingleMentalIdAPI(idSelected);
  const {
    data: subscriptionData,
    isSuccess: isSuccessSubscription,
    isError: isErrorSubScription,
    error: errorSubScription,
  } = useGetSubscriptionByUserId();

  const dispatch = useDispatch();

  const getAudioByMentalHealthId = async () => {
    if (idSelected) {
      // Assuming getAudioRecommendByMentalIdAPI returns a promise
      const audioList = await getAudioRecommendByMentalIdAPI(idSelected);
      const audio = audioList.audios.map((item) =>
        dispatch(nowPlayingAction.addAudioToPlayList(item))
      );
      navigation.push(Navigate.MEDITATE_SCREEN);
      // Loop through the 'audios' array and dispatch each audio item

      // Wrap audios in a resolved promise and dispatch the action
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
                  // Check if the user is a subscriber before allowing access
                  if (isSubscriber && item.content === "Chat with AI") {
                    handleClickExercise(item);
                  } else {
                    // Handle non-subscriber action, e.g., show a message
                    alert(
                      "You need to be a subscriber to access this exercise."
                    );
                  }
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
                  }}
                >
                  {item.content === "Chat with AI" &&
                  !subscriptionData.length > 0 ? (
                    // Render a lock layer only for "Chat with AI" and non-subscribers
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "rgba(128, 128, 128, 0.7)",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MaterialIcons name="lock" size={24} color="white" />
                    </View>
                  ) : null}
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
