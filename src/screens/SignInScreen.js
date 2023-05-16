import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useAuth } from '../context/AuthProvider';

const SignInScreen = ({ navigation }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const { error } = await signIn(email, password);
    if (error) {
      console.log('Sign In Error:', error);
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={handleSignIn}>Sign In</Button>
    </>
  );
};

export default SignInScreen;
