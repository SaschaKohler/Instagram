import {Alert, StyleSheet, Text} from 'react-native';
import {
  Menu,
  renderers,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../theme/colors';
import {useMutation} from '@apollo/client';
import {deletePost} from './queries';
import {DeletePostMutation, DeletePostMutationVariables} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import {Post} from '../../API';

interface IPostMenu {
  post: Post;
}

const PostMenu = ({post}: IPostMenu) => {
  const {user} = useAuthContext();
  const [doDelete, {data, loading, error}] = useMutation<
    DeletePostMutation,
    DeletePostMutationVariables
  >(deletePost, {variables: {input: {id: post.id}}});
  const isMyPost = user?.userId === post.userID;
  const onEditOptionPressed = () => {};
  const onDeleteOptionPressed = () => {
    Alert.alert('Are you sure?', 'Deleting a post is permanent', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: startDeletingPost,
      },
    ]);
  };

  const startDeletingPost = async () => {
    try {
      const response = await doDelete();
      console.log(response);
    } catch (e) {
      console.log((e as Error).message);
    }
    return true;
  };
  return (
    <Menu renderer={renderers.SlideInMenu} style={styles.threeDots}>
      <MenuTrigger>
        <Entypo
          name="dots-three-horizontal"
          size={16}
          style={styles.threeDots}
        />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => Alert.alert(`Report`)}>
          <Text style={styles.optionText}>Report</Text>
        </MenuOption>
        {isMyPost && (
          <>
            <MenuOption onSelect={onEditOptionPressed}>
              <Text style={styles.optionText}>Edit</Text>
            </MenuOption>
            <MenuOption onSelect={onDeleteOptionPressed}>
              <Text style={[styles.optionText, {color: colors.red}]}>
                Delete
              </Text>
            </MenuOption>
          </>
        )}
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  threeDots: {
    marginLeft: 'auto',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },
});

export default PostMenu;
