import { StyleSheet, Text, View } from "react-native";

export function PerformanceStats() {
  return <View style={styles.infoCard}>
    <Text style={styles.infoCardTitle}>Performance</Text>
    <View style={styles.perfItem}>
      <Text style={styles.perfLabel}>CPU Usage</Text>
      <Text style={styles.perfValue}>23%</Text>
    </View>
    <View style={styles.perfBar}>
      <View style={[styles.perfBarFill, { width: '23%', backgroundColor: '#10b981' }]} />
    </View>

    <View style={styles.perfItem}>
      <Text style={styles.perfLabel}>Memory</Text>
      <Text style={styles.perfValue}>1.2GB</Text>
    </View>
    <View style={styles.perfBar}>
      <View style={[styles.perfBarFill, { width: '45%', backgroundColor: '#3b82f6' }]} />
    </View>

    <View style={styles.perfItem}>
      <Text style={styles.perfLabel}>Uptime</Text>
      <Text style={styles.perfValue}>7d 14h</Text>
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
  perfItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  perfLabel: {
    fontSize: 11,
    color: '#64748b',
  },
  perfValue: {
    fontSize: 11,
    color: '#f1f5f9',
    fontWeight: '600',
  },
  perfBar: {
    height: 4,
    backgroundColor: '#1e293b',
    borderRadius: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  perfBarFill: {
    height: '100%',
    borderRadius: 2,
  },
})