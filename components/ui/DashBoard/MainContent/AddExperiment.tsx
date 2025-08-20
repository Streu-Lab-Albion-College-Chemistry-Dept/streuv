import { View, StyleSheet } from "react-native";
import { QuickExperimentForm } from "./QuickExperimentForm";

export function AddExperiment() {
  return <View style={styles.addSection}>
    <View style={styles.addContent}>
      <View style={styles.formSection}>
        <QuickExperimentForm />
      </View>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  addSection: {
    flex: 1,
  },
  addContent: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(30, 41, 59, 0.8)',
    overflow: 'hidden',
  },
  formSection: {
    flex: 1,
    padding: 20,
  },
})