import {
  View,
  Image,
  FlatList,
  useWindowDimensions,
  StyleSheet,
  ViewabilityConfig,
} from 'react-native';
import React, {useState, useRef} from 'react';
import colors from '../../theme/colors';
import DoublePressable from '../DoublePressable';
import {ViewToken} from 'react-native';

interface ICarousel {
  images: string[];
  onDoublePress?: () => void;
}

const Carousel = ({images, onDoublePress = () => {}}: ICarousel) => {
  const {width} = useWindowDimensions();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const viewabilityConfig = {
    waitForInteraction: true,
    // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
    viewAreaCoveragePercentThreshold: 95,
    itemVisiblePercentThreshold: 75,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActiveImageIndex(viewableItems[0].index || 0);
      }
    },
  );

  return (
    <View>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <DoublePressable onDoublePress={onDoublePress}>
            <Image source={{uri: item}} style={[{width}, styles.image]} />
          </DoublePressable>
        )}
        pagingEnabled
        horizontal
        onViewableItemsChanged={onViewableItemsChanged.current} //
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        {images.map((_, index) => (
          <View
            key={index}
            style={{
              width: 10,
              aspectRatio: 1,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 5,
              backgroundColor:
                activeImageIndex === index ? colors.primary : colors.white,
            }}
          />
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
  },
});
export default Carousel;
