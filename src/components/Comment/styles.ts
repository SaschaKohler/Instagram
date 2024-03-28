import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

export default StyleSheet.create({
  icon: {
    marginHorizontal: 5,
  },
  text: {
    color: colors.black,
    lineHeight: 18,
  },
  bold: {
    fontWeight: fonts.weight.bold,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentText: {
    color: colors.black,
    flex: 1,
    lineHeight: 18,
  },
});
