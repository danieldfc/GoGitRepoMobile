import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

export default function User({ navigation }) {
  return <View>{navigation.getParams('user')}</View>;
}
