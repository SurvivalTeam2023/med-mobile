import { ImageBackground, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "../style";
import { TouchableOpacity } from "react-native";
import { useGetAudioRecommendByMentalIdAPI } from "../../../hooks/audio.hook";

export const introRecAlbumBody = () => {
  const selectedMentalhealth = useSelector((state) => state.mentalHealth);
  const { name } = selectedMentalhealth.dataSelected;
  const { idSelected } = selectedMentalhealth;
  const { data: dataAudio, isSuccess: isSuccessAudio } =
    useGetAudioRecommendByMentalIdAPI(idSelected);
  if (isSuccessAudio) {
    console.log(dataAudio);
  }

  return (
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
      <Text style={styles.textInfo}>
        Introducing our innovative music recommendation feature, curated
        specifically for your mental health needs. Discover tunes that resonate
        with your emotional well-being and uplift your spirits.
      </Text>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.pop()}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Getting Started</Text>
      </TouchableOpacity>
    </View>
  );
};
