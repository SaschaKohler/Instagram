import {FlatList, StyleSheet, Text, View} from 'react-native';
import comments from '../../assets/data/comments.json';
import React from 'react';
import Comment from '../../components/Comment';
import Input from './Input';

const CommentsScreen = () => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={comments}
        renderItem={({item}) => <Comment comment={item} includeDetails />}
        style={styles.container}
      />
      <Input />
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
