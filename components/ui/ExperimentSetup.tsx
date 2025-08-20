import {
  View,
  StyleSheet,
  Text,
} from 'react-native'

export default function ExperimentSetup(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Experiment Setup</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00deb3'

  }
})
