import {Pressable, StyleSheet, Text, View} from 'react-native';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
interface IButton {
  text?: string;
  onPress?: () => void;
}
const Button = ({text = 'Button', onPress = () => {}}: IButton) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.lightgrey,
    margin: 5,
  },
  text: {
    fontWeight: fonts.weight.semi,
  },
});

export default Button;
