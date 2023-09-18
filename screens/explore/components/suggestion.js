import { styles } from "../style";
import { Fonts, Sizes } from "../../../constants/styles";
import { View, Text, ImageBackground } from "react-native";
import { useMemo } from "react";

const data = [
  {
    id: 0,
    name: "Access Yourself",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTMfJ06eDdiUlrFayVQCVrp3KeIcvFZF_j3A&usqp=CAU",
    numOfExercises: 7,
    desc: "Something to describe",
  },
  {
    id: 1,
    name: "Put Your Mind To Ease",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTMfJ06eDdiUlrFayVQCVrp3KeIcvFZF_j3A&usqp=CAU",
    numOfExercises: 7,
    desc: "Something to describe",
  },
  {
    id: 2,
    name: "Sleep Habit Pack",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTMfJ06eDdiUlrFayVQCVrp3KeIcvFZF_j3A&usqp=CAU",
    numOfExercises: 7,
    desc: "Something to describe",
  },
  {
    id: 3,
    name: "For Being Mindful",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTMfJ06eDdiUlrFayVQCVrp3KeIcvFZF_j3A&usqp=CAU",
    numOfExercises: 7,
    desc: "Something to describe",
  },
];

export const suggestion = () =>
  useMemo(() => {
    return (
      <View>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Recommended</Text>
        </View>
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          {data.map((item, index) => (
            <View
              key={item.id}
              style={{
                padding: 8,
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{ uri: item.imageUrl }}
                style={{
                  width: 375,
                  height: 200,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    padding: 4,
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.whiteColor18SemiBold,
                      textAlign: "left",
                      paddingRight: 8,
                    }}
                  >
                    {item.desc}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          ))}
        </View>
      </View>
    );
  }, []);
