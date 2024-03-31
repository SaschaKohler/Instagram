import {useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import colors from '../../theme/colors';

import IonIcons from 'react-native-vector-icons/Ionicons';
interface IVideoPlayer {
  uri: string;
  paused: boolean;
}

const VideoPlayer = ({uri, paused}: IVideoPlayer) => {
  const [muted, setMuted] = useState(true);

  return (
    <View>
      <Video
        source={{uri}}
        repeat
        style={styles.video}
        resizeMode="cover"
        muted={muted}
        paused={paused}
      />
      <Pressable onPress={() => setMuted(v => !v)} style={styles.muteButton}>
        <IonIcons
          name={muted ? 'volume-mute' : 'volume-medium'}
          size={20}
          color={colors.white}
        />
      </Pressable>
      <Image></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    aspectRatio: 1,
  },
  muteButton: {
    backgroundColor: colors.black,
    padding: 5,
    borderRadius: 25,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
export default VideoPlayer;
