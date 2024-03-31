import {FlatList, StyleSheet, Text, View} from 'react-native';
import comments from '../../assets/data/comments.json';
import React from 'react';
import Comment from '../../components/Comment';

const CommentsScreen = () => {
  return (
    <View>
      <FlatList
        data={comments}
        renderItem={({item}) => <Comment comment={item} includeDetails />}
        style={styles.container}
      />
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
