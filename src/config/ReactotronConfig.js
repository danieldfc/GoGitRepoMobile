import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  // Abaixo só colocar se estiver rodando em USB.
  // Reactotron.configure({ host: '192.168.0.101' })
  const tron = Reactotron.configure({ host: '192.168.0.101' })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
