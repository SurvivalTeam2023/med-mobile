import { ImageBackground, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "../style";
import { TouchableOpacity } from "react-native";
import { useGetAudioRecommendByMentalIdAPI } from "../../../hooks/audio.hook";
import { LinearGradient } from "expo-linear-gradient";
import { useIsValidQuiz } from "../../../hooks/question.hook";
import { Navigate } from "../../../constants/navigate";

export const introRecAlbumBody = ({ navigation }) => {
  const selectedMentalhealth = useSelector((state) => state.mentalHealth);
  const { name } = selectedMentalhealth.dataSelected;
  const { idSelected } = selectedMentalhealth;
  const { data: dataAudio, isSuccess: isSuccessAudio } =
    useIsValidQuiz(idSelected);
  const { data: dataIsExistQuiz, isSuccess: isSuccessExistQuiz } =
    useIsValidQuiz();

  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
      style={styles.startQuizInfo}
    >
      <View style={styles.bodyWrapper}>
        <View>
          <ImageBackground
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/4472/4472584.png",
            }}
            style={styles.image}
          ></ImageBackground>
        </View>

        <Text style={styles.textTitle}>Sound for {name}</Text>
        {dataIsExistQuiz ? (
          <View>
            <Text style={styles.textInfo}>
              Introducing our innovative music recommendation feature, curated
              specifically for your mental health needs. Discover tunes that
              resonate with your emotional well-being and uplift your spirits.
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.push(Navigate.AUDIO_MENTAL_SCREEN, {
                  data: selectedMentalhealth.dataSelected,
                });
              }}
              style={styles.btn}
            >
              <LinearGradient
                start={{ x: 1, y: 3 }}
                end={{ x: 0, y: 1 }}
                colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
                style={{ borderRadius: 10 }}
              >
                <Text style={styles.btnText}>Getting started</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.textInfo}>
              Please Do Our Survey To Get Recommend Sound
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.push(Navigate.MENTAL_SURVEY_SCREEN),
                  { data: selectedMentalhealth.dataSelected };
              }}
              style={styles.btn}
            >
              <LinearGradient
                start={{ x: 1, y: 3 }}
                end={{ x: 0, y: 1 }}
                colors={["rgb(146,255,192)", "rgb(0,38,97)"]}
                style={{ borderRadius: 10 }}
              >
                <Text style={styles.btnText}>Do Survey</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};
