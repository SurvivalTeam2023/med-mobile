import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../core/store/store";
import {
  ACTION_TYPE,
  nowPlayingAction,
} from "../../redux/audio/nowPlayingList.slice";
import { Audio } from "expo-av";

const NowPlayingBackground = ({ navigation }) => {
  console.log("background_music_renderer");
  const dispatch = useDispatch();
  const audioList = store.getState().nowPlayingList.playingList;
  const [soundStatus, setSoundStatus] = useState({
    isSoundLoaded: false,
    isPlaying: false,
    positionMillis: 0,
    durationMillis: 60000,
    songRunningInPercentage: 0,
  });
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [sound, setSound] = useState(null);
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);
  const loadSound = async () => {
    const { url } = audioList[currentAudioIndex];
    try {
      console.log("Sound Loading...");
      const { sound } = await Audio.Sound.createAsync(
        {
          uri: url,
        },
        { shouldPlay: true }
      );
      setSound((prevSound) => {
        if (prevSound) {
          prevSound.unloadAsync();
        }
        return sound;
      });
      if (soundStatus.positionMillis) {
        handleUpdateSoundTime(soundStatus.positionMillis);
      }
      const status = await sound.getStatusAsync();
      setSoundStatus({
        ...soundStatus,
        isSoundLoaded: true,
        isPlaying: true,
        positionMillis: status.positionMillis,
        durationMillis: status.durationMillis,
        songRunningInPercentage: +(
          (status.positionMillis / status.durationMillis) *
          100
        ).toFixed(0),
      });
    } catch (error) {
      console.log("Error loading sound:", error);
    }
  };
  const playSound = async () => {
    try {
      console.log("Sound playing...");
      if (sound) {
        await sound.playAsync();
        setSoundStatus({ ...soundStatus, isPlaying: true });
      }
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };
  const pauseSound = async () => {
    console.log("Audio paused....");
    if (sound) {
      await sound.pauseAsync();
      setSoundStatus({ ...soundStatus, isPlaying: false });
    }
  };
  useEffect(() => {
    dispatch(
      nowPlayingAction.setCurrentPlayingAudio({
        soundStatus: soundStatus,
        currentPlaying: audioList[currentAudioIndex],
      })
    );
  }, [soundStatus]);

  //get sound status time line
  useEffect(() => {
    const timer = setInterval(async () => {
      if (sound && soundStatus.isSoundLoaded) {
        const status = await sound.getStatusAsync();
        setSoundStatus({
          ...soundStatus,
          positionMillis: status.positionMillis,
          durationMillis: status.durationMillis,
          songRunningInPercentage: +(
            (status.positionMillis / status.durationMillis) *
            100
          ).toFixed(0),
        });
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [soundStatus.isPlaying]);

  const playNextSound = async () => {
    if (sound) {
      sound.unloadAsync();
    }
    const nextIndex = (currentAudioIndex + 1) % audioList.length;
    setCurrentAudioIndex(nextIndex);
    setSoundStatus({ ...soundStatus, isPlaying: false });
  };

  const playSoundSelect = (soundId) => {
    if (sound && audioList.some((audio) => audio.id === soundId)) {
      sound.unloadAsync();
      const newIndex = audioList.findIndex((audio) => audio.id === soundId);
      setCurrentAudioIndex(newIndex);
      setSoundStatus({ ...soundStatus, isPlaying: false });
    }
  };
  const playPrevSound = () => {
    if (sound) {
      sound.unloadAsync();
    }
    const prevIndex =
      (currentAudioIndex - 1 + audioList.length) % audioList.length;
    setCurrentAudioIndex(prevIndex);
    setSoundStatus({ ...soundStatus, isPlaying: false });
  };
  //load Audio when change audio
  useEffect(() => {
    loadSound();
  }, [currentAudioIndex]);

  const handleChangeSoundTimeline = (value) => {
    let upcomingTime = +((soundStatus.durationMillis * value) / 100).toFixed(0);
    handleUpdateSoundTime(upcomingTime);
  };

  const handleUpdateSoundTime = async (positionMillis) => {
    try {
      if (!sound) return;
      await sound.setPositionAsync(positionMillis);
      await sound.playFromPositionAsync(positionMillis);
    } catch (error) {
      console.log("Error playing audio:", error);
    }
  };

  const handleMoveSoundTimeLine = (time) => {
    if (!time) return;
    let upcomingTime = soundStatus.positionMillis + time;
    handleUpdateSoundTime(upcomingTime);
  };
  //master trigger
  const actionTrigger = useSelector(
    (state) => state.nowPlayingList.currentAction
  );
  useEffect(() => {
    if (actionTrigger) {
      switch (actionTrigger) {
        case ACTION_TYPE.NEXT_SONG:
          playNextSound();
          break;
        case ACTION_TYPE.START:
          playSound();
          break;
        case ACTION_TYPE.PAUSE:
          pauseSound();
          break;
        case ACTION_TYPE.PREV_SONG:
          playPrevSound();
          break;

        default:
          console.log("triggering...");
      }
    }
  }, [actionTrigger]);
  return <></>;
};

export default NowPlayingBackground;
