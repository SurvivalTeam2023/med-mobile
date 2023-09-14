import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { StatusBar } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Text } from "react-native";
import TimerCountdown from "react-native-timer-countdown";
import { useEffect, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Markdown from "react-native-simple-markdown";
const MeditateScreen = ({ navigation, route }) => {
  const mentalAudioList = route.params.data;
  console.log(mentalAudioList);
  const header = () => {
    return (
      <View style={styles.headerWrapStyle}>
        <View>
          <Text style={{ ...Fonts.blackColor22SemiBold, textAlign: "center" }}>
            Healing Space
          </Text>
        </View>
      </View>
    );
  };

  const countDown = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [secondsRemaining, setSecondsRemaining] = useState(1000 * 60);
    const [currentTime, setCurrentTime] = useState(1000 * 60);
    const [startTimerOnMount, setStartTimerOnMount] = useState(false);
    const [countComplete, setCountComplete] = useState(false);
    useEffect(() => {
      let timer;
      if (startTimerOnMount && isRunning) {
        timer = setInterval(() => {
          setSecondsRemaining((prevSeconds) => {
            if (prevSeconds === 0) {
              setIsRunning(false);

              clearInterval(timer);
              return 0;
            } else if (prevSeconds > 0) {
              return prevSeconds;
            } else {
              setIsRunning(false);
              clearInterval(timer);
              return 0;
            }
          });
        }, 1000);
      }

      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    }, [startTimerOnMount, isRunning]);

    const handleStart = () => {
      setStartTimerOnMount(true);
      setCountComplete(false);
      setIsRunning(true);
    };

    const handleStop = () => {
      setIsRunning(false);
      setCurrentTime(1000 * 60); // Reset the timer to the initial value
      setStartTimerOnMount(false);
    };

    const handlePause = () => {
      setCurrentTime(secondsRemaining);
      setIsRunning(false);
      setStartTimerOnMount(false);
    };

    const handleResume = () => {
      setIsRunning(true);
      setStartTimerOnMount(true);
    };

    return (
      <View>
        <View style={styles.markdownView}>
          <Markdown style={styles.markdownStyles}>
            *"Live slower, savor each moment, and let the unhurried pace of life
            reveal its hidden beauty"*
          </Markdown>
        </View>

        <View style={styles.container}>
          <View style={styles.clockContainer}>
            <TimerCountdown
              initialSecondsRemaining={
                startTimerOnMount ? secondsRemaining : currentTime
              }
              onTick={(remaining) => {
                setSecondsRemaining(remaining); // Update the remaining time
              }}
              onComplete={() => {
                console.log("complete");
                setCountComplete(true);
                // Stop the timer when it completes
                handleStop();
              }}
              formatSecondsRemaining={(milliseconds) => {
                const remainingSec = Math.round(milliseconds / 1000);
                const seconds = parseInt((remainingSec % 60).toString(), 10);
                const minutes = parseInt((remainingSec / 60) % 60, 10);
                const hours = parseInt(remainingSec / 3600, 10);

                const s = seconds < 10 ? "0" + seconds : seconds;
                const m = minutes < 10 ? "0" + minutes : minutes;
                const h = hours < 10 ? "0" + hours : hours;

                return m + ":" + s;
              }}
              allowFontScaling={true}
              style={styles.clockText}
            />
          </View>
          <Text style={{ ...Fonts.grayColor20SemiBold, paddingTop: 36 }}>
            Mediate Song long AF
          </Text>
        </View>
        <View style={{ paddingBottom: 20 }}>
          {countComplete ? (
            <View style={styles.completeContainer}>
              <Text style={{ paddingBottom: 4 }}>
                Healing complete. Press start to start again
              </Text>
              <AntDesign
                name="play"
                size={30}
                color="#435334"
                onPress={handleStart}
              />
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              {isRunning && !countComplete ? (
                <AntDesign
                  name="pausecircleo"
                  size={30}
                  color={Colors.greenDarkColor}
                  onPress={handlePause}
                />
              ) : (
                <AntDesign
                  name="play"
                  size={30}
                  color={Colors.greenDarkColor}
                  onPress={handleStart}
                />
              )}
              <Feather
                name="stop-circle"
                size={30}
                color={Colors.greenDarkColor}
                onPress={handleStop}
              />
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.pop()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 40,
            }}
          >
            <Text
              style={{
                ...Fonts.grayColor18SemiBold,
                borderWidth: 1,
                borderColor: Colors.greenDarkColor,
                paddingVertical: 8,
                borderRadius: 10,
                paddingHorizontal: 36,
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#CEDEBD" }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Sizes.fixPadding * 15.0,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {countDown()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  markdownView: {
    paddingTop: 16,
    paddingHorizontal: 24,
    textAlign: "center",
  },
  markdownStyles: {
    color: "red",
  },
  headerWrapStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 12,
  },
  clockContainer: {
    backgroundColor: "#9EB384",
    width: 225,
    height: 225,
    borderRadius: 150,
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 20, // Adjust the elevation value as needed
      },
    }),
  },
  clockText: {
    display: "flex",
    textAlign: "center",
    alignContent: "center",
    ...Fonts.grayColor24SemiBold,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
  },
  completeContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
});

export default MeditateScreen;
