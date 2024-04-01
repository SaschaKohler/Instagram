import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import colors from '../../theme/colors';

export default function Input() {
  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
        }}
        style={styles.image}
      />
      <TextInput placeholder="Write your comment..." style={styles.input} />
      <Text style={styles.button}>POST</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flex: 1,
    padding: 5,
    marginTop: 5,
  },
  image: {
    width: 40,
    aspectRatio: 1,
    marginRight: 5,
    borderRadius: 25,
  },
  input: {
    padding: 10,
    borderColor: colors.lightgrey,
    borderRadius: 3,
    borderWidth: 1,
    flex: 1,
  },
  button: {
    padding: 10,
  },
});
