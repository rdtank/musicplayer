import Slider from '@react-native-community/slider';
import React, {useRef, useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Animated,
  Dimensions,
  BackHandler,
  Alert,
} from 'react-native';
import TrackPlayer, {
  Capability,
  Event,
  State,
  RepeatMode,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import styles from './MusicPlayerStyles';
import songs from '../Model/Data';
import {Colors} from '../utils';
import IconButton from '../components/IconButton';
import FooterMenu from '../components/FooterMenu';

const {width, height} = Dimensions.get('window');

const setupPlyer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
    });
    await TrackPlayer.add(songs);
  } catch (error) {
    console.log(error);
  }
};

const togglePlayBack = async playBackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack !== null) {
    if (playBackState == State.Paused || playBackState == State.Ready) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const MusicPlayer = () => {
  const playBackState = usePlaybackState();
  const progress = useProgress();
  const [songIndex, setSongIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState('repeat');
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();

  //Custom Refrences
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

  //Change Track
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, artist, artwork} = track;
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });

  useTrackPlayerEvents([Event.PlaybackQueueEnded], async event => {
    await TrackPlayer.reset();
  });

  const changeRepeatMode = () => {
    if (repeatMode == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }
    if (repeatMode == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    }
    if (repeatMode == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  };

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  useEffect(() => {
    setupPlyer();
    scrollX.addListener(({value}) => {
      var index = Math.round(value / width);
      skipTo(index);
      setSongIndex(index);
    });

    const backAction = () => {
      Alert.alert('Exit!', 'Are you sure you want exit app?', [
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      scrollX.removeAllListeners();
      TrackPlayer.destroy();
      backHandler.remove();
    };
  }, []);

  const skipToNextOrPrevious = isNext => {
    const updateIndex = isNext ? songIndex + 1 : songIndex - 1;
    songSlider.current.scrollToOffset({
      offset: updateIndex * width,
    });
  };

  const renderSongs = ({item, index}) => {
    return (
      <Animated.View style={styles.mainImageWrapper}>
        <View style={styles.imageWrapper}>
          <Image
            source={{uri: trackArtwork}}
            style={styles.musicImage}
            resizeMode={'stretch'}
          />
        </View>
      </Animated.View>
    );
  };

  const millisToMinutesAndSeconds = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        {/* Album Image */}
        <View style={{width: width}}>
          <Animated.FlatList
            ref={songSlider}
            style={{maxHeight: 450}}
            data={songs}
            renderItem={renderSongs}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
          />
        </View>

        {/* Song Content */}
        <View>
          <Text style={[styles.songContent, styles.songTitle]}>
            {trackTitle}
          </Text>
          <Text style={[styles.songContent, styles.songArtist]}>
            {trackArtist}
          </Text>
        </View>

        {/* Progress SLider */}
        <View>
          <Slider
            style={styles.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor={Colors.Yellow}
            minimumTrackTintColor={Colors.Yellow}
            maximumTrackTintColor={Colors.WHITE}
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
              if (playBackState == State.Playing) {
                await TrackPlayer.play();
              } else {
                await TrackPlayer.pause();
              }
            }}
          />
          {/* Progress Duration */}
          <View style={styles.progressDuration}>
            <Text style={styles.progressText}>
              {millisToMinutesAndSeconds(progress.position * 1000)}
            </Text>
            <Text style={styles.progressText}>
              {millisToMinutesAndSeconds(
                (progress.duration - progress.position) * 1000,
              )}
            </Text>
          </View>
        </View>

        {/* Music Controls */}
        <View style={styles.musicControlContainer}>
          <IconButton
            name="skip-previous"
            size={45}
            onPress={() => skipToNextOrPrevious(false)}
          />
          <IconButton
            name={
              playBackState === State.Playing ? 'pause-circle' : 'play-circle'
            }
            size={75}
            onPress={() => togglePlayBack(playBackState)}
          />
          <IconButton
            name="skip-next"
            size={45}
            onPress={() => skipToNextOrPrevious(true)}
          />
        </View>
      </View>
      <FooterMenu repeatMode={repeatMode} onPress={changeRepeatMode} />
    </SafeAreaView>
  );
};

export default MusicPlayer;
