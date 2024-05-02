import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

export default StyleSheet.create({
  page: {
    padding: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
  textButton: {
    margin: 10,
    color: colors.primary,
    fontWeight: fonts.weight.semi,
  },
  textButtonDanger: {
    margin: 10,
    color: colors.error,
    fontWeight: fonts.weight.semi,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  label: {
    width: 75,
  },
  input: {
    borderBottomWidth: 1,
  },
});
