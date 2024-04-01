import {StyleSheet} from 'react-native';
import fonts from '../../theme/fonts';

export default StyleSheet.create({
  root: {
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  avatar: {
    width: 80,
    aspectRatio: 1,
    borderRadius: 50,
  },
  numberContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontWeight: fonts.weight.semi,
    fontSize: fonts.size.md,
  },
  name: {
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.semi,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    margin: 1,
    maxWidth: '33%',
  },
});
