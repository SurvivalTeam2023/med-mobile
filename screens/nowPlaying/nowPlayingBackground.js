import { useEffect } from "react";
import useAudio from "./useAudio";
import { useDispatch, useSelector } from "react-redux";
import {
  ACTION_TYPE,
  nowPlayingAction,
} from "../../redux/audio/nowPlayingList.slice";

const NowPlayingBackground = ({ navigation }) => {
  const audioAction = useSelector((state) => state.nowPlayingList?.audioAction);
  const disableAction = useSelector(
    (state) => state.nowPlayingList.disableAction
  );
  const audioActionValue = useSelector(
    (state) => state.nowPlayingList?.audioActionValue
  );

  const dispatch = useDispatch();
  //generate audio
  const {
    soundStatus,
    currentAudioIndex,
    playSound,
    pauseSound,
    stopSound,
    playNextSound,
    playPrevSound,
    handleChangeSoundTimeline,
    handleAdd10Second,
    handleMinor10Second,
    handlePlaySongWithIndex,
  } = useAudio();
  useEffect(
    () =>
      dispatch(
        nowPlayingAction.setCurrentPlayingAudio({
          currentAudioIndex: currentAudioIndex,
          soundStatus: soundStatus,
        })
      )[soundStatus]
  );

  useEffect(() => {
    if (audioAction && !disableAction) {
      console.log("audio_player_action: ", audioAction, audioActionValue);
      switch (audioAction) {
        case ACTION_TYPE.NEXT_SONG:
          playNextSound();
          break;
        case ACTION_TYPE.START:
          playSound();
          break;
        case ACTION_TYPE.STOP:
          stopSound();
          break;
        case ACTION_TYPE.PAUSE:
          pauseSound();
          break;
        case ACTION_TYPE.PREV_SONG:
          playPrevSound();
          break;
        case ACTION_TYPE.MINOR_10_SEC:
          handleMinor10Second();
          break;
        case ACTION_TYPE.ADD_10_SEC:
          handleAdd10Second();
          break;
        case ACTION_TYPE.CHANGE_SONG_TIMELINE:
          handleChangeSoundTimeline(audioActionValue);
          break;
        case ACTION_TYPE.PLAY_SONG_INDEX:
          handlePlaySongWithIndex(audioActionValue);
          break;
        default:
          console.log("triggering...");
      }
    }
  }, [audioAction, audioActionValue]);
  return <></>;
};

export default NowPlayingBackground;
