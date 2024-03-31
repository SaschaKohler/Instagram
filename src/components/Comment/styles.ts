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
  middleColumn: {
    flex: 1,
  },
  commentText: {
    color: colors.black,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  footerText: {
    flexDirection: 'row',
    marginRight: 10,
  },
  avatar: {
    width: 40,
    borderRadius: 25,
    aspectRatio: 1,
    marginRight: 5,
  },
});
