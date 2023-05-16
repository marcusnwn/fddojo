import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useAuth } from '../context/AuthProvider';

const SignUpScreen = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <Button onPress={() => signUp(email, password)}>Sign Up</Button>
    </>
  );
};

export default SignUpScreen;
