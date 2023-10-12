import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Routers from './routers';

// https://icons.expo.fyi/

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Routers />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});