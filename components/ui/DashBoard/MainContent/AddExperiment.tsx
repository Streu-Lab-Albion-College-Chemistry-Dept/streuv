import { Text, View, StyleSheet } from "react-native";
import RelayIcon from "../../../RelayCard";

export function AddExperiment() {
  return <View style={styles.addSection}>
    <Text style={styles.sectionTitle}>Add New Experiment</Text>
    <View style={styles.relayIconContainer}>
      <RelayIcon />
    </View>
  </View>;
}

const styles = StyleSheet.create({
  addSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 16,
  },
  relayIconContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0f172a',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1e293b',
    borderStyle: 'dashed',
  },
})