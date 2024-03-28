import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import colors from '../../theme/colors';

const Comment = () => {
  return (
    <View style={styles.comment}>
      <Text style={styles.commentText}>
        <Text style={styles.bold}>vadimjustnotdev</Text> Lorem ipsum dolor sit
        amet, officia excepteur ex fugiat reprehenderit enim labore
      </Text>
      <AntDesign
        name={'hearto'}
        size={14}
        style={styles.icon}
        color={colors.black}
      />
    </View>
  );
};

export default Comment;
