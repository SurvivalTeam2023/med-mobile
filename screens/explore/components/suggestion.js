import { styles } from "../style";
import { Fonts, Sizes } from "../../../constants/styles";
import { View, Text, ImageBackground } from "react-native";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetFinishedQuizHistoryApi } from "../../../hooks/question.hook";
import { QUIZ_RESULT } from "../../../constants/keyword";
import { Navigate } from "../../../constants/navigate";
import { TouchableOpacity } from "react-native";

const data = [
  {
    id: 0,
    name: "Quiz Result",
    imageUrl:
      "data:image/jpeg;base64,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",
    numOfExercises: 7,
    desc: "Quiz Result",
    notify: "Take Our Survey To Get Your Mental Health Evaluation",
    notify_2: "Press To See Your Survey Result",
  },
  {
    id: 1,
    name: "Music For Today",
    imageUrl:
      "https://pub-static.fotor.com/assets/bg/246400f6-8a87-48ad-9698-281d55b388f5.jpg",
    numOfExercises: 7,
    desc: "Music For Today",
    notify: "Take Our Survey To Get Your Mental Health Evaluation",
    notify_2: "Press To See Your Survey Result",
  },
  {
    id: 2,
    name: "Sleep Habit Pack",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTMfJ06eDdiUlrFayVQCVrp3KeIcvFZF_j3A&usqp=CAU",
    numOfExercises: 7,
    desc: "Something to describe",
    notify: "Take Our Survey To Get Your Music Recommendation",
    notify_2: "Press To See Your Survey Result",
  },
  {
    id: 3,
    name: "For Being Mindful",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTMfJ06eDdiUlrFayVQCVrp3KeIcvFZF_j3A&usqp=CAU",
    numOfExercises: 7,
    desc: "Something to describe",
    notify: "Take Our Survey To Get Your Mental Health Evaluation",
    notify_2: "Press To See Your Survey Result",
  },
];

export const suggestion = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user.data);
  const { id } = userInfo;

  const handleClick = (name) => {
    switch (name) {
      case QUIZ_RESULT:
        if (dataQuizHis.length > 0) {
          navigation.push(Navigate.QUIZ_HISTORY_SCREEN);
        } else {
          navigation.push(Navigate.QUIZ);
        }
        break;

      default:
        break;
    }
  };

  const { data: dataQuizHis, isSuccess: isSuccessQuizHis } =
    useGetFinishedQuizHistoryApi(id);
  return (
    <View>
      <View style={styles.titleWrapStyle}>
        <Text style={styles.titleStyle}>Recommended</Text>
      </View>
      <View style={{ flexDirection: "column", justifyContent: "center" }}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              handleClick(item.name);
            }}
          >
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
                onProgress={() => {
                  console.log("testtt");
                }}
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
                      ...Fonts.whiteColor18SemiBold,
                      textAlign: "center", // Center text within the View
                      paddingRight: 8,
                    }}
                  >
                    {item.desc}
                  </Text>
                </View>

                {dataQuizHis?.length > 0 ? (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 8,
                      left: 8,
                      paddingRight: 4,
                    }}
                  >
                    <Text
                      style={{
                        ...Fonts.whiteColor16Light,
                      }}
                    >
                      {item.notify_2}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 8,
                      left: 8,
                      paddingRight: 4,
                    }}
                  >
                    <Text
                      style={{
                        ...Fonts.whiteColor16Light,
                      }}
                    >
                      {item.notify}
                    </Text>
                  </View>
                )}
              </ImageBackground>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
