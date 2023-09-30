import { styles } from "../style";
import { Fonts } from "../../../constants/styles";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useGetExercisesListBySingleMentalIdAPI } from "../../../hooks/exercise.hook";
import { Navigate } from "../../../constants/navigate";
import { DEFAULT } from "../../../constants/keyword";
import { nowPlayingAction } from "../../../redux/audio/nowPlayingList.slice";
import { getAudioRecommendByMentalIdAPI } from "../../../api/audio.api";
import { MaterialIcons } from "@expo/vector-icons";
import { adsAction } from "../../../redux/ads/ads.slice";
export const Exercise = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const idSelected = useSelector((state) => state.mentalHealth.idSelected);
  const dataSelected = useSelector((state) => state.mentalHealth.dataSelected);
  const trialLeft = useSelector((state) => state.ads.trialTurnLeft);
  const subscriptionData = useSelector((state) => state.ads.subscriptionData);

  const { data: dataExercises } =
    useGetExercisesListBySingleMentalIdAPI(idSelected);
  const getAudioByMentalHealthId = async () => {
    if (idSelected) {
      const audioList = await getAudioRecommendByMentalIdAPI(idSelected);
      dispatch(
        nowPlayingAction.addListToPlayList({
          currentId: 1,
          tracklist: audioList.audios,
        })
      );
      navigation.push(Navigate.MEDITATE_SCREEN);
    }
  };
  const handleMinuteTurnTrial = () => {
    dispatch(adsAction.minuteOneTurn());
  };

  const handleClickExercise = (exercise) => {
    handleMinuteTurnTrial();
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

  const isLockExercise = (item) => {
    return (
      (trialLeft < 0 || item.content === "Chat with AI") &&
      (!subscriptionData || subscriptionData?.status !== "ACTIVE")
    );
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
                width: "50%",
                padding: 8,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  isLockExercise(item)
                    ? alert(
                        "You need to be a subscriber to access this exercise."
                      )
                    : handleClickExercise(item)
                }
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
                  {isLockExercise(item) ? (
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
