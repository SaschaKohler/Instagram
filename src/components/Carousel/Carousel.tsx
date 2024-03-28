import {
  View,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../theme/colors';

interface ICarousel {
  images: string[];
}
const Carousel = ({images}: ICarousel) => {
  const {width} = useWindowDimensions();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  return (
    <View>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <View>
            <Image source={{uri: item}} style={{width, aspectRatio: 1}} />
          </View>
        )}
        horizontal
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

export default Carousel;
