import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure(
    // Abaixo só colocar se estiver rodando em USB.
    { host: '192.168.0.107' }
  )
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
