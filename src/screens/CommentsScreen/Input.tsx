import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {useState} from 'react';

export default function Input() {
  const [newComment, setNewComment] = useState('hello');

  const onPost = () => {
    console.warn('Trying to comment a post!', newComment);
    setNewComment('');
  };
  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
        }}
        style={styles.image}
      />
      <TextInput
        value={newComment}
        onChangeText={setNewComment}
        inputMode="text"
        placeholder="Write your comment..."
        style={styles.input}
        multiline
      />
      <Text style={styles.button} onPress={onPost}>
        POST
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    padding: 5,
    borderTopWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-end',
  },
  image: {
    width: 40,
    aspectRatio: 1,
    marginRight: 5,
    borderRadius: 25,
  },
  input: {
    flex: 1,
    marginLeft: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingRight: 55,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 25,
  },
  button: {
    position: 'absolute',
    right: 15,
    top: 15,
    fontSize: fonts.size.sm,
    fontWeight: fonts.weight.full,
    color: colors.primary,
    padding: 10,
  },
});
