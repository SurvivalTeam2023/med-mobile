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
import { Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Markdown from "react-native-simple-markdown";
const MeditateScreen = ({ navigation }) => {
  const header = () => {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={{ flexDirection: "row", width: "33.33%" }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.pop()}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              colors={[
                { color: Colors.primaryColor, offset: "0.15", opacity: "0.75" },
                { color: Colors.secondaryColor, offset: "1", opacity: "0.8" },
              ]}
            />
          </TouchableOpacity>
          <Text style={{ ...Fonts.grayColor18SemiBold }}>Back</Text>
        </View>

        <View style={{ width: "33.33%" }}>
          <Text style={{ ...Fonts.blackColor18SemiBold, textAlign: "center" }}>
            Timer
          </Text>
        </View>
        <View style={{ width: "33.33%" }}></View>
      </View>
    );
  };

  const countDown = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [secondsRemaining, setSecondsRemaining] = useState(1000 * 60);
    const [currentTime, setCurrentTime] = useState(1000 * 60);
    const [startTimerOnMount, setStartTimerOnMount] = useState(false);

    useEffect(() => {
      let timer;

      if (startTimerOnMount && isRunning) {
        timer = setInterval(() => {
          setSecondsRemaining((prevSeconds) => {
            if (prevSeconds === 0) {
              setIsRunning(false);

              clearInterval(timer);
              return 0;
            }
            return prevSeconds - 1000;
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
      setIsRunning(true);
    };

    const handleStop = () => {
      setIsRunning(false);
      setSecondsRemaining(1000 * 60); // Reset the timer to the initial value
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
        <View style={{ paddingLeft: 125, paddingTop: 16 }}>
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
                setIsRunning(false); // Stop the timer when it completes
              }}
              formatSecondsRemaining={(milliseconds) => {
                const remainingSec = Math.round(milliseconds / 1000);
                const seconds = parseInt((remainingSec % 60).toString(), 10);
                const minutes = parseInt((remainingSec / 60) % 60, 10);
                const hours = parseInt(remainingSec / 3600, 10);

                const s = seconds < 10 ? "0" + seconds : seconds;
                const m = minutes < 10 ? "0" + minutes : minutes;
                const h = hours < 10 ? "0" + hours : hours;

                return h + ":" + m + ":" + s;
              }}
              allowFontScaling={true}
              style={styles.clockText}
            />
          </View>
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <AntDesign
              name="play"
              size={24}
              color="black"
              onPress={handleStart}
            />
            <Button title="Stop" onPress={handleStop} disabled={!isRunning} />
            <Button title="Pause" onPress={handlePause} disabled={!isRunning} />
            <Button
              title="Resume"
              onPress={handleResume}
              disabled={isRunning}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.greenLightColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
        >
          {countDown()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    backgroundColor: Colors.lightGrayColor,
  },
  clockContainer: {
    flex: 1,
    backgroundColor: "#9CAF88",
    width: 150,
    height: 150,
    borderRadius: 90,
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
    marginTop: 20,
  },
});

export default MeditateScreen;
