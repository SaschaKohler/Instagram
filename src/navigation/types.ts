import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootNavigatorParamList = {
  Home: undefined;
  Comments: {postId: string};
};
export type CommentsNavigationProp = NativeStackNavigationProp<
  RootNavigatorParamList,
  'Comments'
>;
// ParamList + RouteProp
export type BottomTabNavigatorParamList = {
  HomeStack: undefined;
  Search: undefined;
  Upload: undefined;
  Notifications: undefined;
  MyProfile: undefined;
};
export type SearchTabNavigationParamList = {
  Users: undefined;
  Posts: undefined;
};
export type MyProfileNavigationProp = BottomTabNavigationProp<
  BottomTabNavigatorParamList,
  'MyProfile'
>;
export type MyProfileRouteProp = RouteProp<
  BottomTabNavigatorParamList,
  'MyProfile'
>;

//
// ParamList + RouteProp ProfileStackNavigator
//
export type ProfileStackNavigatorParamList = {
  Profile: undefined;
  'Edit Profile': undefined;
};
export type ProfileNavigationProp = NativeStackNavigationProp<
  ProfileStackNavigatorParamList,
  'Edit Profile'
>;
//
// ParamList + RouteProp HomeStackNavigator
//
export type HomeStackNavigatorParamList = {
  Feed: undefined;
  UserProfile: {userId: string};
};

export type UserProfileRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'UserProfile'
>;
export type UserProfileNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'UserProfile'
>;
export type FeedNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Feed'
>;
