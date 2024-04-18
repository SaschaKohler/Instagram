import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {
  ConfirmEmailNavigationProp,
  ConfirmEmailRouteProp,
} from '../../../types/navigation';
import {useRoute} from '@react-navigation/native';
import {
  ConfirmSignInInput,
  confirmSignUp,
  resendSignUpCode,
  type ConfirmSignUpInput,
} from 'aws-amplify/auth';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

type ConfirmEmailData = {
  username: string;
  confirmationCode: string;
};

const ConfirmEmailScreen = () => {
  const route = useRoute<ConfirmEmailRouteProp>();
  const {control, handleSubmit, watch} = useForm<ConfirmEmailData>({
    defaultValues: {email: route.params.email},
  });
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<ConfirmEmailNavigationProp>();

  const username = watch('username');

  const onConfirmPressed = async ({
    username,
    confirmationCode,
  }: ConfirmEmailData) => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      await confirmSignUp({username, confirmationCode});
      Alert.alert(
        'Signup confirmed',
        'Please login with your username/password',
      );
      navigation.navigate('Sign in');
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('Sign in');
  };

  const onResendPress = async () => {
    try {
      await resendSignUpCode({username});
      Alert.alert('Check your email', 'The code has been sent');
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <FormInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Name should be max 24 characters long',
            },
          }}
        />

        <FormInput
          name="confirmationCode"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
        />

        <CustomButton
          text={loading ? 'Loading...' : 'Confirm'}
          onPress={handleSubmit(onConfirmPressed)}
        />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ConfirmEmailScreen;
