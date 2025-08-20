import { View, Text, StyleSheet } from "react-native";

export function QuickStats() {
  return <View style={styles.infoCard}>
    <Text style={styles.infoCardTitle}>Today's Stats</Text>
    <View style={styles.quickStat}>
      <Text style={styles.quickStatValue}>12</Text>
      <Text style={styles.quickStatLabel}>Experiments Run</Text>
    </View>
    <View style={styles.quickStat}>
      <Text style={styles.quickStatValue}>8</Text>
      <Text style={styles.quickStatLabel}>Users Active</Text>
    </View>
    <View style={styles.quickStat}>
      <Text style={styles.quickStatValue}>99.2%</Text>
      <Text style={styles.quickStatLabel}>Success Rate</Text>
    </View>
    <View style={styles.quickStat}>
      <Text style={styles.quickStatValue}>4.2h</Text>
      <Text style={styles.quickStatLabel}>Avg Duration</Text>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  infoCardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quickStat: {
    alignItems: 'center',
    marginBottom: 12,
  },
  quickStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 2,
  },
  quickStatLabel: {
    fontSize: 9,
    color: '#64748b',
    textAlign: 'center',
  },
})